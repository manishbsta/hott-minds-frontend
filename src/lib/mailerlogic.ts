/**
 * Minimal server-side client for the MailerLogic Customer API.
 * Spec: https://developers.mailerlogic.com/customer-api.openapi
 *
 * Only import this from server code (Route Handlers / Server Actions) — it reads the secret API key.
 */

const DEFAULT_BASE_URL = "https://api.mailerlogic.net";
/**
 * Per-attempt timeout in ms. Kept to 4,000ms so 2 attempts + backoff delay stay strictly
 * within standard 10-second serverless execution limits (e.g. Vercel Hobby).
 */
const REQUEST_TIMEOUT_MS = 4_000;
/** Total attempts for transient failures (network error, 409 in-flight replay, 5xx). */
const MAX_ATTEMPTS = 2;

/** Body for `POST /api/v1/send` (subset of the spec we use). */
export interface MailerLogicSendRequest {
  from: string | { email: string; name?: string };
  to: string;
  subject: string;
  html?: string;
  text?: string;
  reply_to?: string;
  tag?: string;
  stream_type?: "transactional" | "broadcast" | "shared";
  track_opens?: boolean;
  track_clicks?: boolean;
  metadata?: Record<string, unknown>;
}

/** 200 response for `POST /api/v1/send`. */
export interface MailerLogicSendResponse {
  email_id: string;
  message_id?: string;
  status: "queued";
  to: string;
  submitted_at?: string;
  message?: string;
}

export class MailerLogicError extends Error {
  constructor(
    message: string,
    /** HTTP status from MailerLogic, or 0 for network/timeout/config failures. */
    readonly status: number,
    readonly requestId: string | null = null,
    readonly body: unknown = null
  ) {
    super(message);
    this.name = "MailerLogicError";
  }
}

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

/**
 * Send a single email via `POST /api/v1/send` (auth: `X-API-Key`).
 * Uses an `Idempotency-Key` so automatic retries can never deliver a duplicate.
 */
export async function sendEmail(
  payload: MailerLogicSendRequest,
  { idempotencyKey = crypto.randomUUID() }: { idempotencyKey?: string } = {}
): Promise<MailerLogicSendResponse> {
  const apiKey = process.env.MAILERLOGIC_API_KEY?.trim();
  if (!apiKey) throw new MailerLogicError("MAILERLOGIC_API_KEY is not configured", 0);

  const baseUrl = (process.env.MAILERLOGIC_BASE_URL || DEFAULT_BASE_URL).replace(/\/+$/, "");
  let lastError: MailerLogicError | null = null;

  for (let attempt = 1; attempt <= MAX_ATTEMPTS; attempt++) {
    let res: Response;
    try {
      res = await fetch(`${baseUrl}/api/v1/send`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          "X-API-Key": apiKey,
          "Idempotency-Key": idempotencyKey,
        },
        body: JSON.stringify(payload),
        cache: "no-store",
        signal: AbortSignal.timeout(REQUEST_TIMEOUT_MS),
      });
    } catch (err) {
      const timedOut = err instanceof Error && err.name === "TimeoutError";
      lastError = new MailerLogicError(
        timedOut ? "MailerLogic request timed out" : `MailerLogic request failed: ${String(err)}`,
        0
      );
      if (attempt < MAX_ATTEMPTS) await sleep(500);
      continue;
    }

    const requestId = res.headers.get("x-request-id");
    const body: unknown = await res.json().catch(() => null);

    if (res.ok) return body as MailerLogicSendResponse;

    const { error, message } = (body ?? {}) as { error?: string; message?: string };
    lastError = new MailerLogicError(
      [error, message].filter((v, i, a) => v && a.indexOf(v) === i).join(": ") ||
        `HTTP ${res.status}`,
      res.status,
      requestId,
      body
    );

    // 409 = same Idempotency-Key still processing; 5xx responses aren't stored, so retrying is safe.
    const transient = res.status === 409 || res.status >= 500;
    if (!transient) break;
    if (attempt < MAX_ATTEMPTS) await sleep(res.status === 409 ? 1000 : 500);
  }

  throw lastError ?? new MailerLogicError("MailerLogic request failed", 0);
}
