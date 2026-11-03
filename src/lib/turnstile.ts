/**
 * Server-side verification for Cloudflare Turnstile tokens.
 * Docs: https://developers.cloudflare.com/turnstile/get-started/server-side-validation/
 *
 * Only import this from server code (Route Handlers / Server Actions) — it reads the secret key.
 */

const SITEVERIFY_URL = "https://challenges.cloudflare.com/turnstile/v0/siteverify";
/** Siteverify normally answers in well under a second; keep the budget small so the mail send still fits. */
const REQUEST_TIMEOUT_MS = 3_000;
/** Turnstile tokens are at most 2048 characters. */
const MAX_TOKEN_LENGTH = 2048;

/** Siteverify error codes that mean our secret is wrong, not that the visitor failed. */
const CONFIG_ERROR_CODES = ["missing-input-secret", "invalid-input-secret"];

/** Response body for `POST /turnstile/v0/siteverify` (subset of fields we use). */
interface SiteverifyResponse {
  success: boolean;
  "error-codes"?: string[];
  challenge_ts?: string;
  hostname?: string;
  action?: string;
  metadata?: { result_with_testing_key?: boolean };
}

export type TurnstileResult =
  | { ok: true }
  | {
      ok: false;
      /**
       * `rejected` — the visitor's token is missing, invalid, expired or already used.
       * `unavailable` — Cloudflare couldn't be reached or errored; worth retrying.
       * `misconfigured` — our secret key is missing or wrong.
       */
      reason: "rejected" | "unavailable" | "misconfigured";
      detail: string;
    };

/**
 * Validate a Turnstile token once (tokens are single-use and expire after 5 minutes).
 * `action` must match the `action` the widget was rendered with.
 */
export async function verifyTurnstile(
  token: unknown,
  { action, remoteIp }: { action: string; remoteIp?: string | null }
): Promise<TurnstileResult> {
  const secret = process.env.TURNSTILE_SECRET_KEY?.trim();
  if (!secret) {
    return { ok: false, reason: "misconfigured", detail: "TURNSTILE_SECRET_KEY is not configured" };
  }

  if (typeof token !== "string" || !token || token.length > MAX_TOKEN_LENGTH) {
    return { ok: false, reason: "rejected", detail: "missing or malformed token" };
  }

  const body = new URLSearchParams({ secret, response: token });
  if (remoteIp) body.set("remoteip", remoteIp);

  let res: Response;
  try {
    res = await fetch(SITEVERIFY_URL, {
      method: "POST",
      body,
      cache: "no-store",
      signal: AbortSignal.timeout(REQUEST_TIMEOUT_MS),
    });
  } catch (err) {
    const timedOut = err instanceof Error && err.name === "TimeoutError";
    return {
      ok: false,
      reason: "unavailable",
      detail: timedOut ? "siteverify timed out" : `siteverify request failed: ${String(err)}`,
    };
  }

  // A bad secret comes back as HTTP 400 with a JSON body, so read the body before checking status.
  const result = (await res.json().catch(() => null)) as SiteverifyResponse | null;
  const codes = result?.["error-codes"] ?? [];

  if (codes.some((code) => CONFIG_ERROR_CODES.includes(code))) {
    return { ok: false, reason: "misconfigured", detail: codes.join(", ") };
  }
  if (!res.ok || !result || codes.includes("internal-error")) {
    return {
      ok: false,
      reason: "unavailable",
      detail: codes.join(", ") || `siteverify HTTP ${res.status}`,
    };
  }
  if (!result.success) {
    return { ok: false, reason: "rejected", detail: codes.join(", ") || "verification failed" };
  }

  // Cloudflare's test keys don't echo an action, so only enforce it for real keys.
  if (!result.metadata?.result_with_testing_key && result.action !== action) {
    return {
      ok: false,
      reason: "rejected",
      detail: `action mismatch (expected "${action}", got "${result.action ?? ""}")`,
    };
  }

  return { ok: true };
}
