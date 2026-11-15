"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  ArrowDown,
  ArrowUpRight,
  Check,
  Coffee,
  Copy,
  Mail,
  RotateCcw,
} from "lucide-react";
import type {
  ConsultationTier,
  ConsultationTierId,
  ServiceId,
  ServiceOffering,
} from "@/types/portfolio";
import {
  bookingSchema,
  type BookingInput,
} from "@/lib/booking-schema";
import {
  submitBookingInquiry,
  type BookingActionResult,
} from "@/app/actions/booking";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Reveal } from "@/components/motion/Reveal";
import { cn } from "@/lib/utils";

export interface CoffeeConfig {
  url: string | null;
  label: string;
  recipientEmail: string;
}

export interface ServicesBookingClientProps {
  services: ServiceOffering[];
  consultations: ConsultationTier[];
  coffeeConfig: CoffeeConfig;
  recipientEmail: string;
}

const SERVICE_ID_SET = new Set<string>([
  "software-development",
  "multimedia-design",
  "digital-marketing",
]);

const TIER_ID_SET = new Set<string>([
  "business",
  "speaking",
  "thesis-capstone",
]);

export function ServicesBookingClient({
  services,
  consultations,
  coffeeConfig,
  recipientEmail,
}: ServicesBookingClientProps) {
  const [serverResult, setServerResult] = useState<BookingActionResult | null>(
    null,
  );
  const [copied, setCopied] = useState(false);

  const {
    register,
    control,
    handleSubmit,
    setValue,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<BookingInput>({
    resolver: zodResolver(bookingSchema),
    defaultValues: {
      consultationTier: "business",
      serviceFocus: "software-development",
      fullName: "",
      email: "",
      organizationOrSchool: "",
      preferredSchedule: "",
      projectSummary: "",
      coffeeSupportReference: "",
    },
  });

  const selectedTier = useWatch({ control, name: "consultationTier" });
  const selectedService = useWatch({ control, name: "serviceFocus" });

  useEffect(() => {
    const applyHashSelection = () => {
      const rawHash = window.location.hash.replace(/^#/, "");
      if (!rawHash) return;

      if (SERVICE_ID_SET.has(rawHash)) {
        setValue("serviceFocus", rawHash as ServiceId, { shouldDirty: false });
      } else if (TIER_ID_SET.has(rawHash)) {
        setValue("consultationTier", rawHash as ConsultationTierId, {
          shouldDirty: false,
        });
      }
    };

    const timer = window.setTimeout(applyHashSelection, 0);
    window.addEventListener("hashchange", applyHashSelection);

    return () => {
      window.clearTimeout(timer);
      window.removeEventListener("hashchange", applyHashSelection);
    };
  }, [setValue]);

  const scrollToBooking = () => {
    const el = document.getElementById("booking");
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const handleServiceInquire = (serviceId: ServiceId) => {
    setServerResult(null);
    setValue("serviceFocus", serviceId, { shouldValidate: true });
    if (selectedTier !== "business") {
      setValue("consultationTier", "business", { shouldValidate: true });
    }
    scrollToBooking();
  };

  const handleSelectTier = (
    tierId: ConsultationTierId,
    shouldScroll = false,
  ) => {
    setServerResult(null);
    setValue("consultationTier", tierId, { shouldValidate: true });
    if (tierId === "speaking" || tierId === "thesis-capstone") {
      setValue("serviceFocus", "general-advisory", { shouldValidate: true });
    }
    if (shouldScroll) {
      scrollToBooking();
    }
  };

  const onSubmit = async (values: BookingInput) => {
    setServerResult(null);
    const result = await submitBookingInquiry(values);
    setServerResult(result);
  };

  const handleCopySummary = async () => {
    if (!serverResult?.summaryText) return;
    try {
      await navigator.clipboard.writeText(serverResult.summaryText);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2200);
    } catch {
      setCopied(false);
    }
  };

  const handleResetForm = () => {
    setServerResult(null);
    setCopied(false);
    reset({
      consultationTier: selectedTier,
      serviceFocus: selectedService,
      fullName: "",
      email: "",
      organizationOrSchool: "",
      preferredSchedule: "",
      projectSummary: "",
      coffeeSupportReference: "",
    });
  };

  return (
    <div className="space-y-16">
      {/* Part 1: 3 Core Services (4/8 Split) */}
      <section aria-label="Core engineering and design services">
        <SectionHeader
          index="01"
          title="CORE SERVICES"
          actionLabel="Jump to Booking"
          actionHref="#booking"
          className="mb-2"
        />

        <div className="divide-y divide-line border-b border-line">
          {services.map((service, idx) => (
            <article
              key={service.id}
              id={service.id}
              className="scroll-mt-20 grid grid-cols-1 gap-8 py-10 lg:grid-cols-12 lg:gap-12 lg:py-12"
            >
              {/* Left 4 columns */}
              <div className="lg:col-span-4 lg:sticky lg:top-10 lg:self-start">
                <Reveal delay={idx * 0.04}>
                  <p className="font-mono text-xs tracking-wider text-fg-subtle">
                    SERVICE {service.index}
                  </p>
                  <h3 className="text-h2 mt-2 text-fg">{service.title}</h3>
                  <p className="mt-2 font-mono text-xs uppercase tracking-wider text-fg-muted">
                    {service.headline}
                  </p>

                  <ul className="mt-4 flex flex-wrap gap-2">
                    {service.shortTags.map((tag) => (
                      <li
                        key={tag}
                        className="border border-line bg-surface px-2.5 py-1 font-mono text-[11px] uppercase tracking-wider text-fg-muted"
                      >
                        {tag}
                      </li>
                    ))}
                  </ul>

                  <button
                    type="button"
                    onClick={() => handleServiceInquire(service.id)}
                    className="mt-6 inline-flex items-center gap-2 bg-invert-bg px-4 py-2.5 font-mono text-xs uppercase tracking-wider text-invert-fg transition-opacity hover:opacity-90"
                  >
                    <span>Inquire for {service.title}</span>
                    <ArrowDown size={13} aria-hidden="true" />
                  </button>
                </Reveal>
              </div>

              {/* Right 8 columns */}
              <div className="space-y-6 lg:col-span-8">
                <Reveal delay={0.05 + idx * 0.04}>
                  <p className="text-base leading-relaxed text-fg-muted">
                    {service.description}
                  </p>

                  <div className="mt-6 border border-line bg-surface p-5 sm:p-6">
                    <p className="text-mono-label mb-3 text-fg-subtle">
                      Typical Deliverables
                    </p>
                    <ul className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
                      {service.deliverables.map((item) => (
                        <li
                          key={item}
                          className="flex items-start gap-2.5 text-sm leading-relaxed text-fg"
                        >
                          <Check
                            size={14}
                            className="mt-1 shrink-0 text-fg-subtle"
                            aria-hidden="true"
                          />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {service.proofs.length > 0 && (
                    <div className="mt-6 flex flex-wrap items-center gap-3">
                      <span className="font-mono text-xs uppercase tracking-wider text-fg-subtle">
                        Shipped Proof:
                      </span>
                      {service.proofs.map((proof) => (
                        <Link
                          key={proof.projectSlug}
                          href={`/projects/${proof.projectSlug}`}
                          className="inline-flex items-center gap-1.5 border border-line bg-bg px-3 py-1.5 font-mono text-xs text-fg transition-colors hover:bg-invert-bg hover:text-invert-fg"
                        >
                          <span>{proof.label}</span>
                          <ArrowUpRight size={13} aria-hidden="true" />
                        </Link>
                      ))}
                    </div>
                  )}
                </Reveal>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Part 2: Consultation Tiers */}
      <section id="consultations" className="scroll-mt-20" aria-label="Consultation tiers">
        <SectionHeader
          index="02"
          title="CONSULTATION & ADVISORY TIERS"
          actionLabel="Proceed to Form"
          actionHref="#booking"
          className="mb-6"
        />

        <div className="grid grid-cols-1 gap-px border border-line bg-line lg:grid-cols-3">
          {consultations.map((tier, idx) => {
            const isSelected = selectedTier === tier.id;
            return (
              <Reveal
                key={tier.id}
                delay={idx * 0.04}
                className={cn(
                  "flex flex-col justify-between p-6 transition-colors sm:p-7",
                  isSelected ? "bg-surface" : "bg-bg",
                )}
              >
                <div>
                  <div className="mb-4 flex items-center justify-between gap-2 border-b border-line pb-3">
                    <span className="font-mono text-xs tracking-wider text-fg-subtle">
                      {`${tier.index} // ${tier.kicker}`}
                    </span>
                    {isSelected && (
                      <span className="bg-invert-bg px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider text-invert-fg">
                        Selected
                      </span>
                    )}
                  </div>

                  <h3 className="text-h3 text-fg">{tier.title}</h3>

                  <div className="mt-3 flex flex-wrap items-baseline gap-3 font-mono text-xs">
                    <span className="border border-line bg-bg px-2.5 py-1 font-medium text-fg">
                      {tier.priceLabel}
                    </span>
                    <span className="text-fg-subtle">{tier.durationLabel}</span>
                  </div>

                  <p className="mt-4 text-sm leading-relaxed text-fg-muted">
                    {tier.description}
                  </p>

                  <ul className="mt-5 space-y-2 border-t border-line pt-4">
                    {tier.highlights.map((item) => (
                      <li
                        key={item}
                        className="flex items-start gap-2.5 text-xs leading-relaxed text-fg-muted sm:text-sm"
                      >
                        <span
                          className="mt-2 h-1 w-1 shrink-0 bg-fg-subtle"
                          aria-hidden="true"
                        />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <button
                  type="button"
                  onClick={() => handleSelectTier(tier.id, true)}
                  className={cn(
                    "mt-6 inline-flex w-full items-center justify-between border px-4 py-2.5 font-mono text-xs uppercase tracking-wider transition-colors",
                    isSelected
                      ? "border-fg bg-invert-bg text-invert-fg"
                      : "border-line bg-bg text-fg hover:border-fg hover:bg-surface",
                  )}
                >
                  <span>
                    {isSelected ? "Selected — Continue to Form" : "Select Tier"}
                  </span>
                  <ArrowDown size={13} aria-hidden="true" />
                </button>
              </Reveal>
            );
          })}
        </div>
      </section>

      {/* Part 3: Modular Booking Form */}
      <section id="booking" className="scroll-mt-20" aria-label="Booking inquiry form">
        <SectionHeader
          index="03"
          title="BOOKING & INQUIRY BRIEF"
          className="mb-8"
        />

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
          {/* Left 4 cols: Booking Context & Direct Email */}
          <div className="space-y-6 lg:col-span-4">
            <div className="border border-line bg-surface p-6">
              <p className="text-mono-label mb-3 text-fg-subtle">
                HOW ENGAGEMENTS START
              </p>
              <p className="text-sm leading-relaxed text-fg-muted">
                Every inquiry generates a structured technical brief with a
                verified reference ID. Responses are typically sent within 24–48
                business hours (PHT / UTC+8).
              </p>

              <div className="mt-5 border-t border-line pt-4">
                <p className="text-mono-label mb-1.5 text-fg-subtle">
                  DIRECT EMAIL
                </p>
                <a
                  href={`mailto:${recipientEmail}`}
                  className="inline-flex items-center gap-1.5 font-mono text-xs text-fg underline decoration-line underline-offset-4 transition-colors hover:decoration-fg"
                >
                  <Mail size={13} aria-hidden="true" />
                  <span>{recipientEmail}</span>
                </a>
              </div>
            </div>

            {/* Thesis & Capstone Step 1 Callout */}
            {selectedTier === "thesis-capstone" && (
              <div className="border border-fg bg-surface p-6">
                <div className="mb-3 flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-fg">
                  <Coffee size={15} aria-hidden="true" />
                  <span>Step 1 — Support via Buy Me a Coffee</span>
                </div>
                <p className="text-sm leading-relaxed text-fg-muted">
                  Thesis &amp; Capstone 3-hour architecture reviews are reserved
                  for students after supporting the work via Buy Me a Coffee.
                  Enter your receipt code or sender name in the form to lock
                  your review slot.
                </p>

                <div className="mt-4 border-t border-line pt-4">
                  {coffeeConfig.url ? (
                    <a
                      href={coffeeConfig.url}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 bg-invert-bg px-4 py-2 font-mono text-xs uppercase tracking-wider text-invert-fg transition-opacity hover:opacity-90"
                    >
                      <Coffee size={13} aria-hidden="true" />
                      <span>{coffeeConfig.label}</span>
                      <ArrowUpRight size={13} aria-hidden="true" />
                    </a>
                  ) : (
                    <p className="font-mono text-xs leading-relaxed text-fg-subtle">
                      Buy Me a Coffee checkout link is awaiting direct link
                      publication. Coordinate support details with{" "}
                      <a
                        href={`mailto:${coffeeConfig.recipientEmail}`}
                        className="text-fg underline underline-offset-4"
                      >
                        {coffeeConfig.recipientEmail}
                      </a>{" "}
                      and enter your sender name or confirmation note in the
                      reference field.
                    </p>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Right 8 cols: Form or Receipt */}
          <div className="lg:col-span-8">
            {serverResult?.ok ? (
              <div className="border border-fg bg-surface p-6 sm:p-8">
                <div className="flex flex-wrap items-center justify-between gap-4 border-b border-line pb-4">
                  <div>
                    <p className="text-mono-label text-fg-subtle">
                      INQUIRY LOGGED //{" "}
                      {serverResult.deliveryMode === "resend"
                        ? "DISPATCHED"
                        : "STRUCTURED RECEIPT"}
                    </p>
                    <h3 className="text-h3 mt-1 text-fg">
                      Reference {serverResult.referenceId}
                    </h3>
                  </div>
                  <span className="inline-flex items-center gap-1.5 bg-invert-bg px-3 py-1 font-mono text-xs uppercase tracking-wider text-invert-fg">
                    <Check size={13} aria-hidden="true" />
                    <span>Validated</span>
                  </span>
                </div>

                {serverResult.statusNote && (
                  <p className="mt-4 text-sm leading-relaxed text-fg-muted">
                    {serverResult.statusNote}
                  </p>
                )}

                {serverResult.summaryText && (
                  <pre className="mt-5 overflow-x-auto border border-line bg-bg p-4 font-mono text-xs leading-relaxed text-fg whitespace-pre-wrap">
                    {serverResult.summaryText}
                  </pre>
                )}

                <div className="mt-6 flex flex-wrap items-center gap-3">
                  {serverResult.mailtoUrl && (
                    <a
                      href={serverResult.mailtoUrl}
                      className="inline-flex items-center gap-2 bg-invert-bg px-4 py-2.5 font-mono text-xs uppercase tracking-wider text-invert-fg transition-opacity hover:opacity-90"
                    >
                      <Mail size={14} aria-hidden="true" />
                      <span>Open Prefilled Email</span>
                      <ArrowUpRight size={13} aria-hidden="true" />
                    </a>
                  )}

                  <button
                    type="button"
                    onClick={handleCopySummary}
                    className="inline-flex items-center gap-2 border border-line bg-bg px-4 py-2.5 font-mono text-xs uppercase tracking-wider text-fg transition-colors hover:border-fg"
                  >
                    {copied ? (
                      <>
                        <Check size={14} aria-hidden="true" />
                        <span>Copied Summary</span>
                      </>
                    ) : (
                      <>
                        <Copy size={14} aria-hidden="true" />
                        <span>Copy Summary</span>
                      </>
                    )}
                  </button>

                  <button
                    type="button"
                    onClick={handleResetForm}
                    className="inline-flex items-center gap-2 border border-line bg-bg px-4 py-2.5 font-mono text-xs uppercase tracking-wider text-fg-muted transition-colors hover:text-fg"
                  >
                    <RotateCcw size={13} aria-hidden="true" />
                    <span>New Inquiry</span>
                  </button>
                </div>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit(onSubmit)}
                noValidate
                className="border border-line bg-bg p-6 sm:p-8"
              >
                {serverResult && !serverResult.ok && serverResult.error && (
                  <div
                    role="alert"
                    className="mb-6 border border-fg bg-surface px-4 py-3 text-sm text-fg"
                  >
                    {serverResult.error}
                  </div>
                )}

                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                  {/* Consultation Tier */}
                  <div>
                    <label
                      htmlFor="consultationTier"
                      className="text-mono-label mb-2 block text-fg-subtle"
                    >
                      Consultation Tier *
                    </label>
                    <select
                      id="consultationTier"
                      {...register("consultationTier")}
                      className="w-full border border-line bg-surface px-3.5 py-2.5 text-sm text-fg focus:border-fg focus:outline-none"
                    >
                      {consultations.map((tier) => (
                        <option key={tier.id} value={tier.id}>
                          {tier.title} ({tier.priceLabel})
                        </option>
                      ))}
                    </select>
                    {errors.consultationTier && (
                      <p className="mt-1.5 font-mono text-xs text-fg">
                        {errors.consultationTier.message}
                      </p>
                    )}
                  </div>

                  {/* Service Focus */}
                  <div>
                    <label
                      htmlFor="serviceFocus"
                      className="text-mono-label mb-2 block text-fg-subtle"
                    >
                      Service Focus *
                    </label>
                    <select
                      id="serviceFocus"
                      {...register("serviceFocus")}
                      className="w-full border border-line bg-surface px-3.5 py-2.5 text-sm text-fg focus:border-fg focus:outline-none"
                    >
                      {services.map((service) => (
                        <option key={service.id} value={service.id}>
                          {service.title}
                        </option>
                      ))}
                      <option value="general-advisory">
                        General Consultation / Speaking / Review
                      </option>
                    </select>
                    {errors.serviceFocus && (
                      <p className="mt-1.5 font-mono text-xs text-fg">
                        {errors.serviceFocus.message}
                      </p>
                    )}
                  </div>

                  {/* Full Name */}
                  <div>
                    <label
                      htmlFor="fullName"
                      className="text-mono-label mb-2 block text-fg-subtle"
                    >
                      Full Name *
                    </label>
                    <input
                      id="fullName"
                      type="text"
                      placeholder="Juan Dela Cruz"
                      {...register("fullName")}
                      className="w-full border border-line bg-surface px-3.5 py-2.5 text-sm text-fg placeholder:text-fg-subtle focus:border-fg focus:outline-none"
                    />
                    {errors.fullName && (
                      <p className="mt-1.5 font-mono text-xs text-fg">
                        {errors.fullName.message}
                      </p>
                    )}
                  </div>

                  {/* Email */}
                  <div>
                    <label
                      htmlFor="email"
                      className="text-mono-label mb-2 block text-fg-subtle"
                    >
                      Email Address *
                    </label>
                    <input
                      id="email"
                      type="email"
                      placeholder="you@company.com"
                      {...register("email")}
                      className="w-full border border-line bg-surface px-3.5 py-2.5 text-sm text-fg placeholder:text-fg-subtle focus:border-fg focus:outline-none"
                    />
                    {errors.email && (
                      <p className="mt-1.5 font-mono text-xs text-fg">
                        {errors.email.message}
                      </p>
                    )}
                  </div>

                  {/* Organization or School */}
                  <div>
                    <label
                      htmlFor="organizationOrSchool"
                      className="text-mono-label mb-2 block text-fg-subtle"
                    >
                      Company / Organization / University *
                    </label>
                    <input
                      id="organizationOrSchool"
                      type="text"
                      placeholder="Studio, Company, or Campus"
                      {...register("organizationOrSchool")}
                      className="w-full border border-line bg-surface px-3.5 py-2.5 text-sm text-fg placeholder:text-fg-subtle focus:border-fg focus:outline-none"
                    />
                    {errors.organizationOrSchool && (
                      <p className="mt-1.5 font-mono text-xs text-fg">
                        {errors.organizationOrSchool.message}
                      </p>
                    )}
                  </div>

                  {/* Preferred Schedule */}
                  <div>
                    <label
                      htmlFor="preferredSchedule"
                      className="text-mono-label mb-2 block text-fg-subtle"
                    >
                      Preferred Date &amp; Time Window *
                    </label>
                    <input
                      id="preferredSchedule"
                      type="text"
                      placeholder="e.g. Weekdays 2:00 PM – 5:00 PM PHT"
                      {...register("preferredSchedule")}
                      className="w-full border border-line bg-surface px-3.5 py-2.5 text-sm text-fg placeholder:text-fg-subtle focus:border-fg focus:outline-none"
                    />
                    {errors.preferredSchedule && (
                      <p className="mt-1.5 font-mono text-xs text-fg">
                        {errors.preferredSchedule.message}
                      </p>
                    )}
                  </div>

                  {/* Conditional Step 1 Coffee Support Reference */}
                  {selectedTier === "thesis-capstone" && (
                    <div className="sm:col-span-2 border border-line bg-surface p-4">
                      <label
                        htmlFor="coffeeSupportReference"
                        className="text-mono-label mb-2 block text-fg"
                      >
                        Buy Me a Coffee Support Reference / Sender Name *
                      </label>
                      <input
                        id="coffeeSupportReference"
                        type="text"
                        placeholder="BMC receipt ID, supporter handle, or sender confirmation"
                        {...register("coffeeSupportReference")}
                        className="w-full border border-line bg-bg px-3.5 py-2.5 text-sm text-fg placeholder:text-fg-subtle focus:border-fg focus:outline-none"
                      />
                      {errors.coffeeSupportReference && (
                        <p className="mt-1.5 font-mono text-xs text-fg">
                          {errors.coffeeSupportReference.message}
                        </p>
                      )}
                    </div>
                  )}

                  {/* Project / Review Summary */}
                  <div className="sm:col-span-2">
                    <label
                      htmlFor="projectSummary"
                      className="text-mono-label mb-2 block text-fg-subtle"
                    >
                      Project Context, Goals &amp; Questions *
                    </label>
                    <textarea
                      id="projectSummary"
                      rows={5}
                      placeholder="Describe the workflow bottleneck, product scope, event topic, or thesis architecture questions you want to cover..."
                      {...register("projectSummary")}
                      className="w-full border border-line bg-surface px-3.5 py-2.5 text-sm leading-relaxed text-fg placeholder:text-fg-subtle focus:border-fg focus:outline-none"
                    />
                    {errors.projectSummary && (
                      <p className="mt-1.5 font-mono text-xs text-fg">
                        {errors.projectSummary.message}
                      </p>
                    )}
                  </div>
                </div>

                <div className="mt-6 flex flex-wrap items-center justify-between gap-4 border-t border-line pt-6">
                  <p className="font-mono text-xs text-fg-subtle">
                    Zero spam. Structured inquiry handed directly to{" "}
                    {recipientEmail}.
                  </p>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="inline-flex items-center gap-2 bg-invert-bg px-6 py-3 font-mono text-xs uppercase tracking-wider text-invert-fg transition-opacity hover:opacity-90 disabled:opacity-50"
                  >
                    <span>
                      {isSubmitting
                        ? "Generating Brief..."
                        : "Submit Booking Inquiry"}
                    </span>
                    <ArrowUpRight size={14} aria-hidden="true" />
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
