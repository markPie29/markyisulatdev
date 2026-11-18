import Link from "next/link";
import {
  ArrowUpRight,
  Briefcase,
  Code2,
  GraduationCap,
  Mic,
  Palette,
  TrendingUp,
  type LucideIcon,
} from "lucide-react";
import type {
  ConsultationTier,
  ConsultationTierId,
  ServiceId,
  ServiceOffering,
} from "@/types/portfolio";
import { Reveal } from "@/components/motion/Reveal";
import { cn } from "@/lib/utils";

const SERVICE_ICONS: Record<ServiceId, LucideIcon> = {
  "software-development": Code2,
  "multimedia-design": Palette,
  "digital-marketing": TrendingUp,
};

const CONSULTATION_ICONS: Record<ConsultationTierId, LucideIcon> = {
  business: Briefcase,
  speaking: Mic,
  "thesis-capstone": GraduationCap,
};

const BADGE_ALIGN_CLASSES = {
  left: "justify-start",
  right: "justify-end",
  "responsive-left": "justify-end md:justify-start",
} as const;

interface GridCardItem {
  id: string;
  href: string;
  kicker: string;
  badge?: string;
  title: string;
  bullets: [string, string, string];
  ctaLabel: string;
  hoverHint: string;
  icon: LucideIcon;
  tone: "service" | "consultation";
}

export interface HomeServicesGridProps {
  services: ServiceOffering[];
  consultations: ConsultationTier[];
}

function CardBadgeMeta({
  card,
  invertedOnHover = false,
  align = "right",
}: {
  card: Pick<GridCardItem, "badge" | "kicker" | "tone">;
  invertedOnHover?: boolean;
  align?: keyof typeof BADGE_ALIGN_CLASSES;
}) {
  if (card.tone === "consultation" && card.badge) {
    return (
      <div
        className={cn(
          "flex flex-wrap items-center gap-1.5",
          BADGE_ALIGN_CLASSES[align],
        )}
      >
        <span
          className={cn(
            "border border-line bg-bg px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider text-fg transition-colors duration-300",
            invertedOnHover &&
              "md:group-hover:border-invert-fg/25 md:group-hover:bg-invert-fg/10 md:group-hover:text-invert-fg md:group-focus-visible:border-invert-fg/25 md:group-focus-visible:bg-invert-fg/10 md:group-focus-visible:text-invert-fg",
          )}
        >
          {card.badge}
        </span>
        <span
          className={cn(
            "font-mono text-[10px] uppercase tracking-wider text-fg-subtle transition-colors duration-300",
            invertedOnHover &&
              "md:group-hover:text-invert-fg/70 md:group-focus-visible:text-invert-fg/70",
          )}
        >
          {card.kicker}
        </span>
      </div>
    );
  }

  return (
    <span
      className={cn(
        "font-mono text-[11px] uppercase tracking-wider text-fg-subtle transition-colors duration-300",
        invertedOnHover &&
          "md:group-hover:text-invert-fg/70 md:group-focus-visible:text-invert-fg/70",
      )}
    >
      {card.kicker}
    </span>
  );
}

/**
 * Renders the Home page 3x2 Swiss hairline grid featuring giant faded icons and
 * bold titles at rest that invert on hover/focus to reveal 3 concise bullets and a CTA.
 */
export function HomeServicesGrid({
  services,
  consultations,
}: HomeServicesGridProps) {
  const cards: GridCardItem[] = [
    ...services.map((service) => ({
      id: service.id,
      href: `/services#${service.id}`,
      kicker: `SERVICE ${service.index}`,
      title: service.title,
      bullets: service.homeBullets,
      ctaLabel: "Explore scope",
      hoverHint: "Hover for scope",
      icon: SERVICE_ICONS[service.id],
      tone: "service" as const,
    })),
    ...consultations.map((tier) => ({
      id: tier.id,
      href: `/services#${tier.id}`,
      kicker: tier.shortDurationLabel,
      badge: tier.priceLabel,
      title: tier.title,
      bullets: tier.homeBullets,
      ctaLabel: "Select & book",
      hoverHint: "Hover to select",
      icon: CONSULTATION_ICONS[tier.id],
      tone: "consultation" as const,
    })),
  ];

  return (
    <div className="grid grid-cols-1 gap-px border border-line bg-line md:grid-cols-3">
      {cards.map((card, idx) => {
        const Icon = card.icon;
        const isConsultation = card.tone === "consultation";

        return (
          <Reveal key={card.id} delay={idx * 0.04} className="h-full bg-bg">
            <Link
              href={card.href}
              className={cn(
                "group relative flex h-full flex-col justify-between overflow-hidden p-5 transition-colors duration-300 ease-out focus-visible:outline focus-visible:outline-1 focus-visible:outline-fg md:h-[304px] lg:h-[312px] xl:p-6",
                isConsultation ? "bg-surface/45" : "bg-bg",
                "md:hover:bg-invert-bg md:hover:text-invert-fg md:focus-visible:bg-invert-bg md:focus-visible:text-invert-fg",
              )}
            >
              {/* Desktop Resting Face: Giant Faded Icon + Ambient Sheen + Top-Left Meta + Huge Title */}
              <div
                aria-hidden="true"
                className="pointer-events-none hidden md:absolute md:inset-0 md:flex md:flex-col md:justify-between md:p-5 md:transition-all md:duration-300 md:ease-out xl:p-6 md:group-hover:-translate-y-2 md:group-hover:opacity-0 md:group-focus-visible:-translate-y-2 md:group-focus-visible:opacity-0"
              >
                <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_78%_28%,color-mix(in_srgb,var(--fg)_7%,transparent),transparent_65%)]" />

                <div className="pointer-events-none absolute right-3 top-4 text-fg/35 [mask-image:linear-gradient(150deg,black_18%,rgba(0,0,0,0.32)_58%,transparent_94%)] lg:right-4 lg:top-4">
                  <Icon
                    className="h-[156px] w-[156px] lg:h-[168px] lg:w-[168px] xl:h-[184px] xl:w-[184px]"
                    strokeWidth={0.85}
                  />
                </div>

                <div className="relative z-10 max-w-[72%]">
                  <CardBadgeMeta card={card} align="left" />
                </div>

                <div className="relative z-10 space-y-2">
                  <p className="text-[clamp(1.5rem,2.2vw,2.15rem)] font-medium leading-[1.06] tracking-tight text-fg">
                    {card.title}
                  </p>
                  <p className="inline-flex items-center gap-1 font-mono text-[10px] uppercase tracking-wider text-fg-subtle">
                    <span>{card.hoverHint}</span>
                    <ArrowUpRight size={11} />
                  </p>
                </div>
              </div>

              {/* Semantic Details Layer: Always Visible on Mobile; Inverted Hover/Focus Reveal on Desktop */}
              <div className="flex h-full flex-col justify-between transition-all duration-300 ease-out md:translate-y-2 md:opacity-0 md:group-hover:translate-y-0 md:group-hover:opacity-100 md:group-focus-visible:translate-y-0 md:group-focus-visible:opacity-100">
                <div>
                  <div className="flex items-start justify-between gap-3 md:block">
                    <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center border border-line bg-surface text-fg md:hidden">
                      <Icon size={17} strokeWidth={1.5} aria-hidden="true" />
                    </span>

                    <div className="flex justify-end md:justify-start">
                      <CardBadgeMeta
                        card={card}
                        invertedOnHover
                        align="responsive-left"
                      />
                    </div>
                  </div>

                  <h3 className="mt-4 text-xl font-medium leading-tight tracking-tight text-fg transition-colors duration-300 md:mt-3 md:text-lg md:group-hover:text-invert-fg md:group-focus-visible:text-invert-fg">
                    {card.title}
                  </h3>

                  <ul className="mt-4 space-y-2 border-t border-line pt-3.5 transition-colors duration-300 md:mt-3 md:pt-3 md:group-hover:border-invert-fg/20 md:group-focus-visible:border-invert-fg/20">
                    {card.bullets.map((bullet) => (
                      <li
                        key={bullet}
                        className="flex items-start gap-2.5 text-sm leading-snug text-fg-muted transition-colors duration-300 md:text-[13px] xl:text-sm md:group-hover:text-invert-fg/85 md:group-focus-visible:text-invert-fg/85"
                      >
                        <span
                          aria-hidden="true"
                          className="mt-[0.42rem] h-1 w-1 shrink-0 bg-fg-subtle transition-colors duration-300 md:group-hover:bg-invert-fg/65 md:group-focus-visible:bg-invert-fg/65"
                        />
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-5 flex items-center justify-between border-t border-line pt-3 font-mono text-[11px] uppercase tracking-wider text-fg-muted transition-colors duration-300 md:mt-4 md:group-hover:border-invert-fg/20 md:group-hover:text-invert-fg md:group-focus-visible:border-invert-fg/20 md:group-focus-visible:text-invert-fg">
                  <span>{card.ctaLabel}</span>
                  <ArrowUpRight
                    size={13}
                    aria-hidden="true"
                    className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  />
                </div>
              </div>
            </Link>
          </Reveal>
        );
      })}
    </div>
  );
}
