import { COMPANY } from "@/constants/company";
import type { ContactFormData } from "@/types";

/**
 * Escapes characters that are special in HTML to prevent formatting breaks and XSS.
 */
export function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

/**
 * Strips formatting characters from phone string for tel: and sms: links.
 */
export function sanitizePhoneForLink(phone: string): string {
  return phone.replace(/[^\d+]/g, "");
}

/**
 * Formats a Date into a human-readable Chicago / Central timezone string.
 */
export function formatInquiryDate(date = new Date()): string {
  try {
    return new Intl.DateTimeFormat("en-US", {
      dateStyle: "full",
      timeStyle: "short",
      timeZone: "America/Chicago",
    }).format(date);
  } catch {
    return date.toUTCString();
  }
}

export interface EmailTemplateOptions {
  data: ContactFormData;
  submittedAt?: Date;
}

/**
 * Generates the styled HTML email and plain-text alternative sent to the website owner.
 */
export function generateInquiryEmail({ data, submittedAt = new Date() }: EmailTemplateOptions): {
  html: string;
  text: string;
  subject: string;
} {
  const { name, email, phone, subject, message } = data;
  const safeName = escapeHtml(name);
  const safeEmail = escapeHtml(email);
  const safePhone = escapeHtml(phone);
  const safeSubject = escapeHtml(subject || "Website Message");
  const safeMessage = escapeHtml(message).replace(/\n/g, "<br />");
  const cleanPhone = sanitizePhoneForLink(phone);
  const formattedDate = formatInquiryDate(submittedAt);

  // Subject line starting with "New message:" as requested
  const emailSubject = `New message: ${subject || "Contact Form"} - ${name}`;
  const previewSnippet = message.length > 100 ? `${message.slice(0, 97)}…` : message;
  const safePreview = escapeHtml(previewSnippet);

  const telHref = `tel:${cleanPhone}`;

  const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${escapeHtml(emailSubject)}</title>
  <!--[if mso]>
  <style type="text/css">
    body, table, td {font-family: Arial, Helvetica, sans-serif !important;}
  </style>
  <![endif]-->
</head>
<body style="margin: 0; padding: 0; background-color: #f4efe6; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #141210; -webkit-font-smoothing: antialiased; -moz-osx-font-smoothing: grayscale;">

  <!-- Inbox Preheader Snippet -->
  <div style="display: none; font-size: 1px; color: #f4efe6; line-height: 1px; max-height: 0px; max-width: 0px; opacity: 0; overflow: hidden; mso-hide: all;">
    New message from ${safeName} (${safeEmail} &bull; ${safePhone}): &quot;${safePreview}&quot;
  </div>

  <!-- Outer Background Wrapper -->
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color: #f4efe6; width: 100%; table-layout: fixed;">
    <tr>
      <td align="center" style="padding: 28px 12px 48px 12px;">
        
        <!-- Main Card Container (Max 600px) -->
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="max-width: 600px; background-color: #ffffff; border-radius: 14px; overflow: hidden; border: 1px solid #e7ddd0; box-shadow: 0 6px 20px rgba(20, 18, 16, 0.08);">
          
          <!-- Flame Accent Line -->
          <tr>
            <td style="height: 5px; background: linear-gradient(90deg, #ff5c1a 0%, #ff7538 50%, #ffa043 100%); background-color: #ff5c1a; font-size: 0; line-height: 0;">&nbsp;</td>
          </tr>

          <!-- Header Banner (Dark Obsidian) -->
          <tr>
            <td style="background-color: #141210; padding: 26px 30px; text-align: left;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td>
                    <!-- Brand Heading -->
                    <h1 style="margin: 0 0 4px 0; color: #ffffff; font-size: 24px; font-weight: 800; letter-spacing: 0.04em; text-transform: uppercase; line-height: 1.2;">
                      ${COMPANY.name.toUpperCase()}
                    </h1>
                    <p style="margin: 0; color: #a39a90; font-size: 12px; letter-spacing: 0.02em;">
                      ${COMPANY.divisions.apparel} &bull; ${COMPANY.divisions.catering}
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Card Content Body -->
          <tr>
            <td style="padding: 28px 30px 24px 30px;">
              
              <!-- Greeting to Owners -->
              <h2 style="margin: 0 0 6px 0; font-size: 18px; font-weight: 800; color: #141210;">
                Hi ${COMPANY.owners.combined},
              </h2>
              <p style="margin: 0 0 20px 0; font-size: 14px; color: #6b6259; line-height: 1.5;">
                You received a new message from the contact form on <strong style="color: #141210;">hottminds.com</strong>.
              </p>

              <!-- Customer Details Specs Table -->
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color: #fcfaf6; border: 1px solid #e7ddd0; border-radius: 8px; margin-bottom: 24px; overflow: hidden;">
                <tr>
                  <td style="padding: 12px 16px; border-bottom: 1px solid #eee5da; width: 32%; color: #6b6259; font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.06em;">
                    Customer
                  </td>
                  <td style="padding: 12px 16px; border-bottom: 1px solid #eee5da; color: #141210; font-size: 15px; font-weight: 800;">
                    ${safeName}
                  </td>
                </tr>
                <tr>
                  <td style="padding: 12px 16px; border-bottom: 1px solid #eee5da; width: 32%; color: #6b6259; font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.06em;">
                    Email
                  </td>
                  <td style="padding: 12px 16px; border-bottom: 1px solid #eee5da; font-size: 15px; font-weight: 700;">
                    <a href="mailto:${safeEmail}" style="color: #ff5c1a; text-decoration: none;">
                      ${safeEmail}
                    </a>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 12px 16px; border-bottom: 1px solid #eee5da; width: 32%; color: #6b6259; font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.06em;">
                    Phone / Text
                  </td>
                  <td style="padding: 12px 16px; border-bottom: 1px solid #eee5da; font-size: 15px; font-weight: 700;">
                    <a href="${telHref}" style="color: #ff5c1a; text-decoration: none;">
                      ${safePhone}
                    </a>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 12px 16px; border-bottom: 1px solid #eee5da; width: 32%; color: #6b6259; font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.06em;">
                    Subject
                  </td>
                  <td style="padding: 12px 16px; border-bottom: 1px solid #eee5da; color: #141210; font-size: 14px; font-weight: 600;">
                    ${safeSubject}
                  </td>
                </tr>
                <tr>
                  <td style="padding: 12px 16px; width: 32%; color: #6b6259; font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.06em;">
                    Received
                  </td>
                  <td style="padding: 12px 16px; color: #6b6259; font-size: 12px;">
                    ${escapeHtml(formattedDate)}
                  </td>
                </tr>
              </table>

              <!-- Customer Message Box -->
              <div>
                <span style="display: block; color: #6b6259; font-size: 11px; font-weight: 800; text-transform: uppercase; letter-spacing: 0.08em; margin-bottom: 8px;">
                  Customer Message &amp; Details
                </span>
                <div style="background-color: #fdfbf7; border: 1px solid #e7ddd0; border-left: 4px solid #ff5c1a; border-radius: 6px; padding: 18px 20px; font-size: 14px; line-height: 1.6; color: #141210;">
                  ${safeMessage}
                </div>
              </div>

            </td>
          </tr>

          <!-- Footer (Dark Obsidian) -->
          <tr>
            <td style="background-color: #141210; padding: 20px 30px; text-align: center;">
              <p style="margin: 0 0 4px 0; color: #ffffff; font-size: 12px; font-weight: 700; letter-spacing: 0.05em; text-transform: uppercase;">
                ${COMPANY.legalName} &bull; ${COMPANY.owners.combined}
              </p>
              <p style="margin: 0; color: #a39a90; font-size: 11px;">
                ${COMPANY.contacts.location.serviceArea}
              </p>
            </td>
          </tr>

        </table>
        <!-- /Main Card -->

      </td>
    </tr>
  </table>

</body>
</html>`;

  const text = [
    `==================================================`,
    `  ${COMPANY.name.toUpperCase()} — NEW MESSAGE`,
    `==================================================`,
    ``,
    `Hi ${COMPANY.owners.combined},`,
    `You received a new message from the contact form on hottminds.com:`,
    ``,
    `CUSTOMER DETAILS:`,
    `--------------------------------------------------`,
    `Name:     ${name}`,
    `Email:    ${email}`,
    `Phone:    ${phone}`,
    `Subject:  ${subject || "Website Message"}`,
    `Received: ${formattedDate}`,
    ``,
    `CUSTOMER MESSAGE:`,
    `--------------------------------------------------`,
    message,
    `==================================================`,
  ].join("\n");

  return { html, text, subject: emailSubject };
}
