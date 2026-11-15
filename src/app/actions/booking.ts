"use server";

import { PROFILE } from "@/data/profile";
import { CORE_SERVICES, CONSULTATION_TIERS } from "@/data/services";
import { bookingSchema, type BookingInput } from "@/lib/booking-schema";

export interface BookingActionResult {
  ok: boolean;
  deliveryMode?: "resend" | "structured-receipt";
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

/**
 * Validates consultation/service booking requests via Zod and either sends via Resend
 * (when RESEND_API_KEY is configured) or returns a structured receipt with mailto fallback.
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
  const referenceId = `MI-${Date.now().toString(36).toUpperCase()}`;
  const tierLabel = getTierLabel(data.consultationTier);
  const serviceLabel = getServiceLabel(data.serviceFocus);

  const summaryLines = [
    `MARKY ISULAT — CONSULTATION & SERVICE RECEIPT`,
    `Reference ID: ${referenceId}`,
    `Consultation Tier: ${tierLabel}`,
    `Service Focus: ${serviceLabel}`,
    `Full Name: ${data.fullName}`,
    `Email: ${data.email}`,
    `Organization / School: ${data.organizationOrSchool}`,
    `Preferred Schedule: ${data.preferredSchedule}`,
    data.consultationTier === "thesis-capstone" && data.coffeeSupportReference
      ? `Buy Me a Coffee Support Ref: ${data.coffeeSupportReference}`
      : null,
    ``,
    `Project / Review Summary:`,
    data.projectSummary,
  ].filter((line): line is string => line !== null);

  const summaryText = summaryLines.join("\n");
  const subject = `[Portfolio Booking ${referenceId}] ${tierLabel} — ${data.fullName}`;
  const mailtoUrl = `mailto:${PROFILE.email}?subject=${encodeURIComponent(
    subject,
  )}&body=${encodeURIComponent(summaryText)}`;

  const resendApiKey = process.env.RESEND_API_KEY?.trim();

  if (resendApiKey) {
    try {
      const fromAddress =
        process.env.RESEND_FROM_EMAIL?.trim() ||
        "Marky Isulat Portfolio <onboarding@resend.dev>";

      const response = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${resendApiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: fromAddress,
          to: [PROFILE.email],
          reply_to: data.email,
          subject,
          text: summaryText,
        }),
      });

      if (response.ok) {
        return {
          ok: true,
          deliveryMode: "resend",
          referenceId,
          tierLabel,
          serviceLabel,
          mailtoUrl,
          summaryText,
          statusNote: `Your inquiry (${referenceId}) was dispatched directly to ${PROFILE.email}. You can also copy the receipt below for your records.`,
        };
      }
    } catch {
      // Fall through to structured receipt + mailto fallback so user inquiry is never lost.
    }
  }

  return {
    ok: true,
    deliveryMode: "structured-receipt",
    referenceId,
    tierLabel,
    serviceLabel,
    mailtoUrl,
    summaryText,
    statusNote: `Structured receipt ${referenceId} generated. Open your prefilled email client or copy the formatted brief to send directly to ${PROFILE.email}.`,
  };
}
