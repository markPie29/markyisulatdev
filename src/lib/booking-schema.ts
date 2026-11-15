import { z } from "zod";

export const BOOKING_TIERS = ["business", "speaking", "thesis-capstone"] as const;

export const BOOKING_SERVICE_FOCUSES = [
  "software-development",
  "multimedia-design",
  "digital-marketing",
  "general-advisory",
] as const;

export const bookingSchema = z
  .object({
    consultationTier: z.enum(BOOKING_TIERS),
    serviceFocus: z.enum(BOOKING_SERVICE_FOCUSES),
    fullName: z
      .string()
      .trim()
      .min(2, "Please enter your full name (at least 2 characters).")
      .max(100, "Name must be 100 characters or fewer."),
    email: z
      .string()
      .trim()
      .email("Please enter a valid email address."),
    organizationOrSchool: z
      .string()
      .trim()
      .min(2, "Please enter your company, organization, or university.")
      .max(140, "Organization or school must be 140 characters or fewer."),
    preferredSchedule: z
      .string()
      .trim()
      .min(3, "Share a preferred date/window in PHT (UTC+8) or timezone.")
      .max(120, "Preferred schedule must be 120 characters or fewer."),
    projectSummary: z
      .string()
      .trim()
      .min(20, "Please describe your project, goals, or review questions (at least 20 characters).")
      .max(2000, "Project summary must be 2000 characters or fewer."),
    coffeeSupportReference: z
      .string()
      .trim()
      .max(140, "Reference must be 140 characters or fewer.")
      .optional(),
  })
  .superRefine((data, ctx) => {
    if (
      data.consultationTier === "thesis-capstone" &&
      (!data.coffeeSupportReference ||
        data.coffeeSupportReference.trim().length < 2)
    ) {
      ctx.addIssue({
        code: "custom",
        path: ["coffeeSupportReference"],
        message:
          "Please enter your Buy Me a Coffee receipt code, sender handle, or support note for Thesis & Capstone reviews.",
      });
    }
  });

export type BookingInput = z.infer<typeof bookingSchema>;
