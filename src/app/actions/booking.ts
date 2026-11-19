"use server";

import { PROFILE } from "@/data/profile";
import { CORE_SERVICES, CONSULTATION_TIERS } from "@/data/services";
import { bookingSchema, type BookingInput } from "@/lib/booking-schema";
import {
  buildBookingTextSummary,
  formatPhtTimestamp,
  sanitizeSingleLine,
  type BookingEmailPayload,
} from "@/lib/email/booking-templates";
import { dispatchBookingEmails } from "@/lib/email/resend";

export interface BookingActionResult {
  ok: boolean;
  deliveryMode?: "resend" | "structured-receipt";
  confirmationSent?: boolean;
  referenceId?: string;
  tierLabel?: string;
  serviceLabel?: string;
  mailtoUrl?: string;
  summaryText?: string;
  statusNote?: string;
  error?: string;
  fieldErrors?: Partial<Record<keyof BookingInput, string[]>>;
}

function getServiceLabel(focus: BookingInput["serviceFocus"]): string {
  if (focus === "general-advisory") {
    return "General Consultation / Speaking / Review";
  }
  const found = CORE_SERVICES.find((s) => s.id === focus);
  return found ? found.title : focus;
}

function getTierLabel(tier: BookingInput["consultationTier"]): string {
  const found = CONSULTATION_TIERS.find((t) => t.id === tier);
  return found ? `${found.title} (${found.priceLabel})` : tier;
}

function createReferenceId(): string {
  const timestamp = Date.now().toString(36).toUpperCase();
  const suffix = crypto.randomUUID().slice(0, 4).toUpperCase();
  return `MI-${timestamp}-${suffix}`;
}

/**
 * Validates consultation/service booking requests via Zod and dispatches via Resend
 * (when RESEND_API_KEY is configured), falling back to a structured receipt + mailto link.
 */
export async function submitBookingInquiry(
  rawInput: BookingInput,
): Promise<BookingActionResult> {
  const parsed = bookingSchema.safeParse(rawInput);

  if (!parsed.success) {
    const flattened = parsed.error.flatten();
    return {
      ok: false,
      error: "Please review the highlighted booking fields and try again.",
      fieldErrors: flattened.fieldErrors,
    };
  }

  const data = parsed.data;
  const referenceId = createReferenceId();
  const tierLabel = getTierLabel(data.consultationTier);
  const serviceLabel = getServiceLabel(data.serviceFocus);

  const emailPayload: BookingEmailPayload = {
    referenceId,
    submittedAtPht: formatPhtTimestamp(),
    tierLabel,
    serviceLabel,
    consultationTier: data.consultationTier,
    serviceFocus: data.serviceFocus,
    fullName: data.fullName,
    email: data.email,
    organizationOrSchool: data.organizationOrSchool,
    preferredSchedule: data.preferredSchedule,
    projectSummary: data.projectSummary,
    coffeeSupportReference: data.coffeeSupportReference,
    recipientEmail: PROFILE.email,
    websiteUrl: PROFILE.website,
  };

  const summaryText = buildBookingTextSummary(emailPayload);
  const subject = `[Portfolio Booking ${referenceId}] ${sanitizeSingleLine(tierLabel)} — ${sanitizeSingleLine(data.fullName)}`;
  const mailtoUrl = `mailto:${PROFILE.email}?subject=${encodeURIComponent(
    subject,
  )}&body=${encodeURIComponent(summaryText)}`;

  const dispatch = await dispatchBookingEmails(emailPayload);

  if (dispatch.dispatched) {
    return {
      ok: true,
      deliveryMode: "resend",
      confirmationSent: dispatch.confirmationSent,
      referenceId,
      tierLabel,
      serviceLabel,
      mailtoUrl,
      summaryText,
      statusNote: dispatch.confirmationSent
        ? `Your inquiry (${referenceId}) was dispatched directly to ${PROFILE.email}, and a confirmation receipt was sent to ${data.email}.`
        : `Your inquiry (${referenceId}) was dispatched directly to ${PROFILE.email}. You can also copy the receipt below for your records.`,
    };
  }

  return {
    ok: true,
    deliveryMode: "structured-receipt",
    confirmationSent: false,
    referenceId,
    tierLabel,
    serviceLabel,
    mailtoUrl,
    summaryText,
    statusNote: `Structured receipt ${referenceId} generated. Open your prefilled email client or copy the formatted brief to send directly to ${PROFILE.email}.`,
  };
}
