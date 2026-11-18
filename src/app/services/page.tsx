import type { Metadata } from "next";
import { PROFILE } from "@/data/profile";
import {
  BUY_ME_A_COFFEE_CONFIG,
  CONSULTATION_TIERS,
  CORE_SERVICES,
} from "@/data/services";
import { ServicesBookingClient } from "@/components/services/ServicesBookingClient";
import { MaskHeading } from "@/components/motion/MaskHeading";
import { Reveal } from "@/components/motion/Reveal";

export const metadata: Metadata = {
  title: "Services & Consultations",
  description:
    "Software architecture, multimedia brand design, digital marketing systems, free business consultations, speaking events, and 3-hour thesis reviews.",
};

export default function ServicesPage() {
  return (
    <div className="mx-auto w-full max-w-[1440px] px-5 py-8 sm:px-8 sm:py-12 lg:px-12 lg:py-14">
      <header className="mb-12 border-b border-line pb-8">
        <Reveal immediate>
          <p className="text-mono-label mb-3 text-fg-subtle">
            05 / SERVICES, ADVISORY &amp; BOOKING
          </p>
        </Reveal>
        <MaskHeading as="h1" immediate className="text-display text-fg">
          Services &amp; Consultations
        </MaskHeading>
        <Reveal immediate delay={0.1}>
          <p className="mt-4 max-w-[65ch] text-base leading-relaxed text-fg-muted">
            Partner directly with a Product-Oriented Full-Stack Developer across
            production software systems, visual identity architecture, and
            structured technical consultations.
          </p>
        </Reveal>
      </header>

      <ServicesBookingClient
        services={CORE_SERVICES}
        consultations={CONSULTATION_TIERS}
        coffeeConfig={BUY_ME_A_COFFEE_CONFIG}
        recipientEmail={PROFILE.email}
      />
    </div>
  );
}
