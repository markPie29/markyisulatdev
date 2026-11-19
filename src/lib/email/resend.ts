import { Resend, type CreateEmailOptions } from "resend";
import { PROFILE } from "@/data/profile";
import {
  buildClientConfirmationEmail,
  buildOwnerNotificationEmail,
  type BookingEmailPayload,
} from "@/lib/email/booking-templates";

const DEFAULT_SANDBOX_FROM = "Marky Isulat Portfolio <onboarding@resend.dev>";

export interface ResendConfig {
  apiKey: string | null;
  fromEmail: string;
  toEmail: string;
  isSandboxSender: boolean;
  sendConfirmation: boolean;
}

export interface BookingDispatchResult {
  dispatched: boolean;
  ownerEmailId?: string;
  confirmationSent: boolean;
  confirmationEmailId?: string;
}

/** Extracts the raw address from `"Display Name <user@domain.com>"` or `"user@domain.com"`. */
export function extractEmailAddress(value: string): string {
  const bracketMatch = value.match(/<([^>]+)>/);
  return (bracketMatch ? bracketMatch[1] : value).trim().toLowerCase();
}

function cleanEnvValue(raw: string | undefined): string {
  return (raw ?? "").trim().replace(/^["']+|["']+$/g, "").trim();
}

function parseConfirmationOverride(raw: string | undefined): boolean | null {
  const normalized = cleanEnvValue(raw).toLowerCase();
  if (!normalized) return null;
  if (normalized === "true" || normalized === "1") return true;
  if (normalized === "false" || normalized === "0") return false;
  return null;
}

/** Reads server-only Resend configuration from environment variables with safe defaults. */
export function getResendConfig(): ResendConfig {
  const apiKey = cleanEnvValue(process.env.RESEND_API_KEY) || null;
  const fromEmail =
    cleanEnvValue(process.env.RESEND_FROM_EMAIL) || DEFAULT_SANDBOX_FROM;
  const toEmail = cleanEnvValue(process.env.RESEND_TO_EMAIL) || PROFILE.email;
  const isSandboxSender =
    extractEmailAddress(fromEmail).endsWith("@resend.dev");
  const override = parseConfirmationOverride(
    process.env.RESEND_SEND_CONFIRMATION,
  );

  return {
    apiKey,
    fromEmail,
    toEmail,
    isSandboxSender,
    sendConfirmation: override ?? !isSandboxSender,
  };
}

async function sendSingleEmail(
  resend: Resend,
  options: CreateEmailOptions,
  idempotencyKey: string,
  contextLabel: "owner-notification" | "client-confirmation",
): Promise<string | null> {
  try {
    let { data, error } = await resend.emails.send(options, {
      idempotencyKey,
    });

    if (
      error &&
      (error.statusCode === 429 || error.name === "rate_limit_exceeded")
    ) {
      await new Promise((resolve) => setTimeout(resolve, 750));
      ({ data, error } = await resend.emails.send(options, {
        idempotencyKey,
      }));
    }

    if (error) {
      console.error("[Resend] Email delivery rejected:", {
        context: contextLabel,
        statusCode: error.statusCode,
        name: error.name,
        message: error.message,
        fromAddress: extractEmailAddress(options.from ?? ""),
      });
      return null;
    }

    return data?.id ?? null;
  } catch (err) {
    console.error("[Resend] Unexpected email transport error:", {
      context: contextLabel,
      message: err instanceof Error ? err.message : String(err),
      fromAddress: extractEmailAddress(options.from ?? ""),
    });
    return null;
  }
}

/**
 * Dispatches the booking notification to Marky and (when configured with a verified
 * custom domain or explicit override) sends a confirmation receipt to the requester.
 */
export async function dispatchBookingEmails(
  payload: BookingEmailPayload,
): Promise<BookingDispatchResult> {
  const config = getResendConfig();

  if (!config.apiKey) {
    return { dispatched: false, confirmationSent: false };
  }

  const resend = new Resend(config.apiKey);
  const ownerEmail = buildOwnerNotificationEmail(payload);
  const sharedTags = [
    { name: "tier", value: payload.consultationTier },
    { name: "service", value: payload.serviceFocus },
  ];

  const ownerEmailId = await sendSingleEmail(
    resend,
    {
      from: config.fromEmail,
      to: [config.toEmail],
      replyTo: payload.email,
      subject: ownerEmail.subject,
      html: ownerEmail.html,
      text: ownerEmail.text,
      tags: [{ name: "source", value: "portfolio_booking" }, ...sharedTags],
    },
    `${payload.referenceId}-owner`,
    "owner-notification",
  );

  if (!ownerEmailId) {
    return { dispatched: false, confirmationSent: false };
  }

  if (!config.sendConfirmation) {
    return {
      dispatched: true,
      ownerEmailId,
      confirmationSent: false,
    };
  }

  const confirmationEmail = buildClientConfirmationEmail(payload);
  const confirmationEmailId = await sendSingleEmail(
    resend,
    {
      from: config.fromEmail,
      to: [payload.email],
      replyTo: config.toEmail,
      subject: confirmationEmail.subject,
      html: confirmationEmail.html,
      text: confirmationEmail.text,
      tags: [
        { name: "source", value: "portfolio_booking_confirmation" },
        ...sharedTags,
      ],
    },
    `${payload.referenceId}-confirm`,
    "client-confirmation",
  );

  return {
    dispatched: true,
    ownerEmailId,
    confirmationSent: Boolean(confirmationEmailId),
    confirmationEmailId: confirmationEmailId ?? undefined,
  };
}
