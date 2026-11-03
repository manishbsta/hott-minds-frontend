import { generateInquiryEmail } from "@/lib/email-template";
import { MailerLogicError, sendEmail } from "@/lib/mailerlogic";
import { verifyTurnstile } from "@/lib/turnstile";
import type { ContactFormData } from "@/types";

export const dynamic = "force-dynamic";
export const maxDuration = 30;

const FROM_ADDRESS = process.env.CONTACT_FROM_EMAIL ?? "notifications@hottminds.com";
const FROM_NAME = process.env.CONTACT_FROM_NAME ?? "Hott Minds Website";
const TO_ADDRESS = process.env.CONTACT_TO_EMAIL ?? "macinvestments40@yahoo.com";

/** Must match the `action` ContactForm renders its Turnstile widget with. */
const CAPTCHA_ACTION = "contact";

const LIMITS: Record<keyof ContactFormData, number> = {
  name: 100,
  email: 150,
  phone: 30,
  subject: 150,
  message: 5000,
};

type FieldErrors = Partial<Record<keyof ContactFormData, string>>;

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/** Trim, strip control characters (keeping newlines/tabs in the message), collapse single-line fields. */
function clean(value: unknown, multiline = false): string {
  if (typeof value !== "string") return "";

  const stripped = value.replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, "");
  return (multiline ? stripped.replace(/\r\n?/g, "\n") : stripped.replace(/\s+/g, " ")).trim();
}

function validate(body: unknown): { data: ContactFormData } | { errors: FieldErrors } {
  const raw = (body && typeof body === "object" ? body : {}) as Record<string, unknown>;
  const data: ContactFormData = {
    name: clean(raw.name),
    email: clean(raw.email),
    phone: clean(raw.phone),
    subject: clean(raw.subject),
    message: clean(raw.message, true),
  };

  const errors: FieldErrors = {};
  if (!data.name) errors.name = "Please enter your name.";
  if (!data.email) errors.email = "Please enter your email address.";
  else if (!EMAIL_REGEX.test(data.email)) errors.email = "Please enter a valid email address.";
  if (!data.phone) errors.phone = "Please enter your phone number.";
  else if (!/^[0-9+().\-\s]+$/.test(data.phone) || data.phone.replace(/\D/g, "").length < 7)
    errors.phone = "Please enter a valid phone number.";
  if (!data.message) errors.message = "Please enter a message.";

  for (const field of Object.keys(LIMITS) as (keyof ContactFormData)[]) {
    if (!errors[field] && data[field].length > LIMITS[field]) {
      errors[field] = `Must be ${LIMITS[field]} characters or fewer.`;
    }
  }

  return Object.keys(errors).length > 0 ? { errors } : { data };
}

/** Vercel overwrites these headers with the real client address, so visitors can't spoof them. */
function clientIp(request: Request): string | null {
  return (
    request.headers.get("x-real-ip") ??
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    null
  );
}

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Invalid request body." }, { status: 400 });
  }

  const result = validate(body);
  if ("errors" in result) {
    return Response.json(
      { error: "Please correct the highlighted fields.", fields: result.errors },
      { status: 422 }
    );
  }

  const captcha = await verifyTurnstile((body as { turnstileToken?: unknown })?.turnstileToken, {
    action: CAPTCHA_ACTION,
    remoteIp: clientIp(request),
  });
  if (!captcha.ok) {
    if (captcha.reason === "rejected") {
      console.warn(`[contact] Turnstile rejected submission — ${captcha.detail}`);
      return Response.json(
        { error: "The security check failed or expired. Please complete it again and resend." },
        { status: 403 }
      );
    }

    console.error(`[contact] Turnstile ${captcha.reason} — ${captcha.detail}`);
    return Response.json(
      {
        error:
          captcha.reason === "misconfigured"
            ? "Messaging is temporarily unavailable. Please call or text us instead."
            : "We couldn't run the security check right now. Please try again.",
      },
      { status: 503 }
    );
  }

  const { html, text, subject: emailSubject } = generateInquiryEmail({ data: result.data });

  try {
    const sent = await sendEmail({
      from: { email: FROM_ADDRESS, name: FROM_NAME },
      to: TO_ADDRESS,
      reply_to: result.data.email,
      subject: emailSubject,
      html,
      text,
      // Internal notification: keep it on the transactional stream and don't rewrite links / add pixels.
      stream_type: "transactional",
      track_opens: false,
      track_clicks: false,
      tag: "contact-form",
      metadata: { source: "hottminds.com/contact" },
    });
    console.info(`[contact] Notification queued (email_id=${sent.email_id})`);
  } catch (err) {
    if (!(err instanceof MailerLogicError)) {
      console.error("[contact] Unexpected error sending notification:", err);
      return Response.json(
        { error: "We couldn't send your message right now. Please try again shortly." },
        { status: 500 }
      );
    }

    console.error(
      `[contact] MailerLogic send failed: status=${err.status} request_id=${err.requestId ?? "n/a"} — ${err.message}`
    );

    // Missing/invalid key, unverified domain, paused account, sender mismatch: a server config problem.
    const configError =
      (err.status === 0 && /not configured/.test(err.message)) ||
      [400, 401, 403, 404].includes(err.status);
    if (configError) {
      return Response.json(
        { error: "Messaging is temporarily unavailable. Please call or text us instead." },
        { status: 503 }
      );
    }
    if (err.status === 429) {
      return Response.json(
        {
          error: "We're receiving a lot of messages right now. Please try again in a few minutes.",
        },
        { status: 429 }
      );
    }
    if (err.status === 0 && /timed out/.test(err.message)) {
      return Response.json(
        { error: "The mail service took too long to respond. Please try again." },
        { status: 504 }
      );
    }
    return Response.json(
      { error: "We couldn't send your message right now. Please try again shortly." },
      { status: 502 }
    );
  }

  return Response.json({ ok: true }, { status: 200 });
}
