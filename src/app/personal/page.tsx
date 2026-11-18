import type { Metadata } from "next";
import { PROFILE } from "@/data/profile";
import { PersonalArchiveSection } from "@/components/personal/PersonalArchiveSection";
import { MaskHeading } from "@/components/motion/MaskHeading";
import { Reveal } from "@/components/motion/Reveal";

export const metadata: Metadata = {
  title: "Personal Life",
  description:
    "Life outside software and client work — live DJ sets, varsity volleyball, creator channels, and off-duty routines.",
};

export default function PersonalPage() {
  const { personalArchive } = PROFILE;

  return (
    <div className="mx-auto w-full max-w-[1440px] px-5 py-8 sm:px-8 sm:py-12 lg:px-12 lg:py-14">
      <header className="mb-10 border-b border-line pb-8">
        <Reveal immediate>
          <p className="text-mono-label mb-3 text-fg-subtle">
            {personalArchive.pageEyebrow}
          </p>
        </Reveal>
        <MaskHeading as="h1" immediate className="text-display text-fg">
          {personalArchive.heading}
        </MaskHeading>
        <Reveal immediate delay={0.1}>
          <p className="mt-4 max-w-[65ch] text-base leading-relaxed text-fg-muted">
            {personalArchive.subheading}
          </p>
        </Reveal>
      </header>

      <PersonalArchiveSection data={personalArchive} />
    </div>
  );
}
