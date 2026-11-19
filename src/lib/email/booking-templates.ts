import type { BookingInput } from "@/lib/booking-schema";

export interface BookingEmailPayload {
  referenceId: string;
  submittedAtPht: string;
  tierLabel: string;
  serviceLabel: string;
  consultationTier: BookingInput["consultationTier"];
  serviceFocus: BookingInput["serviceFocus"];
  fullName: string;
  email: string;
  organizationOrSchool: string;
  preferredSchedule: string;
  projectSummary: string;
  coffeeSupportReference?: string;
  recipientEmail: string;
  websiteUrl: string;
}

export interface EmailMessageContent {
  subject: string;
  html: string;
  text: string;
}

interface DetailRow {
  label: string;
  value: string;
  href?: string;
}

interface EditorialEmailLayoutOptions {
  eyebrow: string;
  heading: string;
  intro: string;
  payload: BookingEmailPayload;
  footerNote: string;
  cta?: {
    label: string;
    href: string;
  };
}

const HTML_ESCAPE_MAP: Record<string, string> = {
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
  '"': "&quot;",
  "'": "&#39;",
};

/** Escapes special HTML characters to prevent markup injection from user input. */
export function escapeHtml(value: string): string {
  return value.replace(/[&<>"']/g, (char) => HTML_ESCAPE_MAP[char] ?? char);
}

/** Strips CR/LF characters so user input cannot break single-line email headers. */
export function sanitizeSingleLine(value: string): string {
  return value.replace(/[\r\n]+/g, " ").trim();
}

/** Formats a timestamp in Philippine Time (UTC+8) for booking receipts. */
export function formatPhtTimestamp(date = new Date()): string {
  const formatted = new Intl.DateTimeFormat("en-PH", {
    timeZone: "Asia/Manila",
    year: "numeric",
    month: "short",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  }).format(date);

  return `${formatted} PHT`;
}

function formatMultilineHtml(value: string): string {
  return escapeHtml(value).replace(/\r\n|\n|\r/g, "<br />");
}

function buildDetailRows(payload: BookingEmailPayload): DetailRow[] {
  const rows: DetailRow[] = [
    { label: "REFERENCE ID", value: payload.referenceId },
    { label: "SUBMITTED", value: payload.submittedAtPht },
    { label: "CONSULTATION TIER", value: payload.tierLabel },
    { label: "SERVICE FOCUS", value: payload.serviceLabel },
    { label: "FULL NAME", value: payload.fullName },
    {
      label: "EMAIL",
      value: payload.email,
      href: `mailto:${sanitizeSingleLine(payload.email)}`,
    },
    { label: "ORG / SCHOOL", value: payload.organizationOrSchool },
    { label: "PREFERRED SCHEDULE", value: payload.preferredSchedule },
  ];

  if (
    payload.consultationTier === "thesis-capstone" &&
    payload.coffeeSupportReference
  ) {
    rows.push({
      label: "BMC SUPPORT REF",
      value: payload.coffeeSupportReference,
    });
  }

  return rows;
}

function renderDetailRowsHtml(rows: DetailRow[]): string {
  return rows
    .map((row) => {
      const escapedValue = escapeHtml(row.value);
      const renderedValue = row.href
        ? `<a href="${escapeHtml(row.href)}" style="color:#0A0A0A;text-decoration:underline;">${escapedValue}</a>`
        : escapedValue;

      return `
        <tr>
          <td style="width:170px;padding:11px 14px;border-bottom:1px solid #E5E5E3;font-family:'JetBrains Mono',ui-monospace,SFMono-Regular,Menlo,monospace;font-size:11px;letter-spacing:0.08em;color:#6B6B6B;vertical-align:top;">
            ${escapeHtml(row.label)}
          </td>
          <td style="padding:11px 14px;border-bottom:1px solid #E5E5E3;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;font-size:14px;line-height:1.5;color:#0A0A0A;vertical-align:top;">
            ${renderedValue}
          </td>
        </tr>
      `;
    })
    .join("");
}

function renderEditorialEmailLayout({
  eyebrow,
  heading,
  intro,
  payload,
  footerNote,
  cta,
}: EditorialEmailLayoutOptions): string {
  const rowsHtml = renderDetailRowsHtml(buildDetailRows(payload));
  const summaryHtml = formatMultilineHtml(payload.projectSummary);
  const websiteHost = payload.websiteUrl
    .replace(/^https?:\/\//i, "")
    .replace(/\/$/, "")
    .toUpperCase();

  const ctaHtml = cta
    ? `
      <div style="margin-top:24px;">
        <a href="${escapeHtml(cta.href)}" style="display:inline-block;background-color:#0A0A0A;color:#F5F5F3;padding:12px 20px;font-family:'JetBrains Mono',ui-monospace,SFMono-Regular,Menlo,monospace;font-size:11px;letter-spacing:0.1em;text-transform:uppercase;text-decoration:none;">
          ${escapeHtml(cta.label)}
        </a>
      </div>
    `
    : "";

  return `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>${escapeHtml(heading)}</title>
  </head>
  <body style="margin:0;padding:0;background-color:#F5F5F3;color:#0A0A0A;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;">
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background-color:#F5F5F3;padding:32px 16px;">
      <tr>
        <td align="center">
          <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="max-width:640px;background-color:#FFFFFF;border:1px solid #D4D4D4;">
            <tr>
              <td style="background-color:#0A0A0A;padding:18px 24px;border-bottom:1px solid #222222;">
                <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
                  <tr>
                    <td style="font-family:'JetBrains Mono',ui-monospace,SFMono-Regular,Menlo,monospace;font-size:11px;letter-spacing:0.12em;color:#EDEDED;text-transform:uppercase;">
                      MARKY ISULAT // PORTFOLIO BRIEF
                    </td>
                    <td align="right" style="font-family:'JetBrains Mono',ui-monospace,SFMono-Regular,Menlo,monospace;font-size:11px;letter-spacing:0.1em;color:#A1A1A1;text-transform:uppercase;">
                      ${escapeHtml(websiteHost)}
                    </td>
                  </tr>
                </table>
              </td>
            </tr>

            <tr>
              <td style="padding:28px 24px;">
                <p style="margin:0 0 8px 0;font-family:'JetBrains Mono',ui-monospace,SFMono-Regular,Menlo,monospace;font-size:11px;letter-spacing:0.1em;color:#6B6B6B;text-transform:uppercase;">
                  ${escapeHtml(eyebrow)}
                </p>
                <h1 style="margin:0 0 12px 0;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;font-size:24px;line-height:1.2;font-weight:600;letter-spacing:-0.02em;color:#0A0A0A;">
                  ${escapeHtml(heading)}
                </h1>
                <p style="margin:0 0 24px 0;font-size:14px;line-height:1.6;color:#525252;">
                  ${escapeHtml(intro)}
                </p>

                <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="border:1px solid #D4D4D4;border-bottom:none;background-color:#FAFAF9;">
                  ${rowsHtml}
                </table>

                <div style="margin-top:20px;border:1px solid #D4D4D4;background-color:#FAFAF9;padding:16px;">
                  <p style="margin:0 0 8px 0;font-family:'JetBrains Mono',ui-monospace,SFMono-Regular,Menlo,monospace;font-size:11px;letter-spacing:0.08em;color:#6B6B6B;text-transform:uppercase;">
                    PROJECT / REVIEW SUMMARY
                  </p>
                  <p style="margin:0;font-size:14px;line-height:1.65;color:#0A0A0A;">
                    ${summaryHtml}
                  </p>
                </div>

                ${ctaHtml}
              </td>
            </tr>

            <tr>
              <td style="padding:16px 24px;border-top:1px solid #E5E5E3;background-color:#F5F5F3;">
                <p style="margin:0;font-family:'JetBrains Mono',ui-monospace,SFMono-Regular,Menlo,monospace;font-size:11px;line-height:1.6;color:#6B6B6B;">
                  ${escapeHtml(footerNote)}
                </p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`;
}

/** Builds the plain-text booking brief shared across emails, receipts, and mailto fallback. */
export function buildBookingTextSummary(payload: BookingEmailPayload): string {
  const lines = [
    "MARKY ISULAT — CONSULTATION & SERVICE RECEIPT",
    `Reference ID: ${payload.referenceId}`,
    `Submitted: ${payload.submittedAtPht}`,
    `Consultation Tier: ${payload.tierLabel}`,
    `Service Focus: ${payload.serviceLabel}`,
    `Full Name: ${payload.fullName}`,
    `Email: ${payload.email}`,
    `Organization / School: ${payload.organizationOrSchool}`,
    `Preferred Schedule: ${payload.preferredSchedule}`,
    payload.consultationTier === "thesis-capstone" &&
    payload.coffeeSupportReference
      ? `Buy Me a Coffee Support Ref: ${payload.coffeeSupportReference}`
      : null,
    "",
    "Project / Review Summary:",
    payload.projectSummary,
  ].filter((line): line is string => line !== null);

  return lines.join("\n");
}

/** Builds the internal notification email sent to Marky when a booking form is submitted. */
export function buildOwnerNotificationEmail(
  payload: BookingEmailPayload,
): EmailMessageContent {
  const safeName = sanitizeSingleLine(payload.fullName);
  const safeTier = sanitizeSingleLine(payload.tierLabel);
  const subject = `[Portfolio Booking ${payload.referenceId}] ${safeTier} — ${safeName}`;
  const replySubject = encodeURIComponent(`Re: ${subject}`);
  const safeSenderEmail = sanitizeSingleLine(payload.email);

  return {
    subject,
    text: buildBookingTextSummary(payload),
    html: renderEditorialEmailLayout({
      eyebrow: "05 // NEW BOOKING INQUIRY",
      heading: `${safeName} requested ${safeTier}`,
      intro: `A new consultation & service brief was submitted through ${payload.websiteUrl}/services. Reply directly to this email to respond to ${safeName}.`,
      payload,
      cta: {
        label: `Reply to ${safeName} ↗`,
        href: `mailto:${safeSenderEmail}?subject=${replySubject}`,
      },
      footerNote: `Dispatched via Resend from ${payload.websiteUrl}/services · Reply-To is set to ${safeSenderEmail}.`,
    }),
  };
}

/** Builds the automated confirmation receipt sent to the prospective client or student. */
export function buildClientConfirmationEmail(
  payload: BookingEmailPayload,
): EmailMessageContent {
  const safeFirstName = sanitizeSingleLine(payload.fullName).split(" ")[0] || "there";
  const subject = `Booking brief received (${payload.referenceId}) — Marky Isulat`;
  const text = [
    `Hi ${safeFirstName},`,
    "",
    `Thanks for reaching out via ${payload.websiteUrl}/services. Your structured booking brief (${payload.referenceId}) has been received.`,
    "I typically respond within 24–48 business hours (PHT / UTC+8).",
    "",
    buildBookingTextSummary(payload),
    "",
    `Need to add more context? Simply reply to this email or write directly to ${payload.recipientEmail}.`,
  ].join("\n");

  return {
    subject,
    text,
    html: renderEditorialEmailLayout({
      eyebrow: "05 // INQUIRY CONFIRMATION RECEIPT",
      heading: `Brief received — Reference ${payload.referenceId}`,
      intro: `Hi ${safeFirstName}, thanks for reaching out. Your structured booking brief has been logged and delivered. I typically respond within 24–48 business hours (PHT / UTC+8).`,
      payload,
      cta: {
        label: "View Services & Tiers ↗",
        href: `${payload.websiteUrl}/services`,
      },
      footerNote: `Need to add context or files? Reply directly to this message or email ${payload.recipientEmail}.`,
    }),
  };
}
