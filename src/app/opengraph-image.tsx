import { ImageResponse } from "next/og";

export const alt = "Marky Isulat — Design Engineer & Full-Stack Developer";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default function Image() {
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
          padding: "52px 60px",
          border: "1px solid #222222",
          fontFamily: "sans-serif",
        }}
      >
        {/* Top editorial rule bar */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            paddingBottom: "24px",
            borderBottom: "1px solid #222222",
          }}
        >
          <span
            style={{
              fontSize: 16,
              letterSpacing: "0.14em",
              color: "#A3A3A3",
            }}
          >
            01 // SWISS EDITORIAL PORTFOLIO
          </span>
          <span
            style={{
              fontSize: 16,
              letterSpacing: "0.14em",
              color: "#FAFAFA",
            }}
          >
            MARKYISULAT.DEV
          </span>
        </div>

        {/* Main title and thesis */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            flex: 1,
          }}
        >
          <span
            style={{
              fontSize: 19,
              letterSpacing: "0.14em",
              color: "#A3A3A3",
              marginBottom: "18px",
            }}
          >
            MARKY ISULAT — DESIGN ENGINEER
          </span>
          <div
            style={{
              display: "flex",
              fontSize: 84,
              fontWeight: 700,
              lineHeight: 1.0,
              letterSpacing: "-0.04em",
              color: "#FAFAFA",
              marginBottom: "28px",
            }}
          >
            Marky Isulat
          </div>
          <div
            style={{
              display: "flex",
              borderLeft: "2px solid #FAFAFA",
              paddingLeft: "24px",
              maxWidth: "960px",
            }}
          >
            <span
              style={{
                fontSize: 28,
                lineHeight: 1.35,
                color: "#D4D4D4",
              }}
            >
              I don&apos;t just build systems; I build systems that help actual
              users.
            </span>
          </div>
        </div>

        {/* Bottom ledger bar */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            paddingTop: "24px",
            borderTop: "1px solid #222222",
          }}
        >
          <span
            style={{
              fontSize: 15,
              letterSpacing: "0.12em",
              color: "#A3A3A3",
            }}
          >
            4YRS+ SHIPPING · 20+ CLIENTS · 17 ARCHIVED BUILDS
          </span>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              backgroundColor: "#FAFAFA",
              color: "#0A0A0A",
              padding: "9px 18px",
              fontSize: 14,
              fontWeight: 700,
              letterSpacing: "0.12em",
            }}
          >
            DESIGN ENGINEER
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    },
  );
}
