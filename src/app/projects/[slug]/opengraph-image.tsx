import { ImageResponse } from "next/og";
import { PROJECTS, getProjectBySlug } from "@/data/projects";

export const alt = "Marky Isulat — Case Study";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export function generateStaticParams() {
  return PROJECTS.map((project) => ({
    slug: project.slug,
  }));
}

function truncateText(value: string, maxLength: number): string {
  if (value.length <= maxLength) return value;
  return `${value.slice(0, maxLength - 1).trimEnd()}…`;
}

export default async function Image({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  const index = project?.index ?? "00";
  const categoryLabel = (project?.categoryLabel ?? "CASE STUDY").toUpperCase();
  const year = project?.year ?? "2026";
  const title = project?.title ?? "Selected Engineering Case Study";
  const classification = project?.classification ?? "System Architecture";
  const role = project?.role ?? "Design Engineer";
  const summary = truncateText(
    project?.summary ??
      "Production software, interface engineering, and visual brand systems built around real user workflows.",
    165,
  );
  const stackSlice = project?.techStack.slice(0, 4) ?? [];

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          backgroundColor: "#0A0A0A",
          color: "#FAFAFA",
          padding: "48px 56px",
          border: "1px solid #222222",
          fontFamily: "sans-serif",
        }}
      >
        {/* Top bar */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            paddingBottom: "22px",
            borderBottom: "1px solid #222222",
          }}
        >
          <span
            style={{
              fontSize: 15,
              letterSpacing: "0.14em",
              color: "#A3A3A3",
            }}
          >
            {`CASE STUDY ${index} // ${categoryLabel}`}
          </span>
          <span
            style={{
              fontSize: 15,
              letterSpacing: "0.14em",
              color: "#FAFAFA",
            }}
          >
            {year}
          </span>
        </div>

        {/* Main project details */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            flex: 1,
            paddingTop: "16px",
            paddingBottom: "16px",
          }}
        >
          <span
            style={{
              fontSize: 16,
              letterSpacing: "0.1em",
              color: "#A3A3A3",
              marginBottom: "16px",
            }}
          >
            {classification.toUpperCase()}
          </span>

          <div
            style={{
              display: "flex",
              fontSize: title.length > 44 ? 46 : 56,
              fontWeight: 700,
              lineHeight: 1.08,
              letterSpacing: "-0.03em",
              color: "#FAFAFA",
              marginBottom: "22px",
              maxWidth: "1060px",
            }}
          >
            {title}
          </div>

          <div
            style={{
              display: "flex",
              fontSize: 23,
              lineHeight: 1.4,
              color: "#B8B8B8",
              maxWidth: "980px",
              marginBottom: "26px",
            }}
          >
            {summary}
          </div>

          {stackSlice.length > 0 && (
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: "10px",
              }}
            >
              {stackSlice.map((tech) => (
                <span
                  key={tech}
                  style={{
                    border: "1px solid #333333",
                    backgroundColor: "#141414",
                    color: "#E5E5E5",
                    padding: "7px 14px",
                    fontSize: 14,
                    letterSpacing: "0.06em",
                  }}
                >
                  {tech}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Bottom footer */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            paddingTop: "22px",
            borderTop: "1px solid #222222",
          }}
        >
          <span
            style={{
              fontSize: 15,
              letterSpacing: "0.08em",
              color: "#A3A3A3",
            }}
          >
            ROLE: {truncateText(role.toUpperCase(), 48)}
          </span>
          <span
            style={{
              fontSize: 15,
              letterSpacing: "0.14em",
              color: "#FAFAFA",
            }}
          >
            MARKY ISULAT — DESIGN ENGINEER
          </span>
        </div>
      </div>
    ),
    {
      ...size,
    },
  );
}
