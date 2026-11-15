import type { Metadata } from "next";
import localFont from "next/font/local";
import { JetBrains_Mono } from "next/font/google";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import "./globals.css";

const helveticaNeue = localFont({
  src: [
    {
      path: "../../public/fonts/HelveticaNeueLight.otf",
      weight: "300",
      style: "normal",
    },
    {
      path: "../../public/fonts/HelveticaNeueLightItalic.otf",
      weight: "300",
      style: "italic",
    },
    {
      path: "../../public/fonts/HelveticaNeueRoman.otf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../public/fonts/HelveticaNeueItalic.ttf",
      weight: "400",
      style: "italic",
    },
    {
      path: "../../public/fonts/HelveticaNeueMedium.otf",
      weight: "500",
      style: "normal",
    },
    {
      path: "../../public/fonts/HelveticaNeueMediumItalic.otf",
      weight: "500",
      style: "italic",
    },
    {
      path: "../../public/fonts/HelveticaNeueBold.otf",
      weight: "700",
      style: "normal",
    },
    {
      path: "../../public/fonts/HelveticaNeueBoldItalic.otf",
      weight: "700",
      style: "italic",
    },
  ],
  variable: "--font-helvetica-neue",
  display: "swap",
  fallback: ["Helvetica Neue", "Helvetica", "Arial", "sans-serif"],
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-jetbrains-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://markyisulat.dev"),
  title: {
    default: "Marky Isulat — Design Engineer & Full-Stack Developer",
    template: "%s — Marky Isulat",
  },
  description:
    "Mark Angelo A. Isulat (Marky) — Design Engineer and Product-Minded Full-Stack Developer building enterprise ERPs, automated booking platforms, and local AI systems that help actual users.",
  keywords: [
    "Marky Isulat",
    "Mark Angelo Isulat",
    "Design Engineer",
    "Full-Stack Developer",
    "Next.js",
    "React 19",
    "TypeScript",
    "UI/UX Engineer",
    "Philippines",
  ],
  authors: [{ name: "Mark Angelo A. Isulat", url: "https://markyisulat.dev" }],
  creator: "Mark Angelo A. Isulat",
  icons: {
    icon: [
      { url: "/assets/personal/main-icon.svg", type: "image/svg+xml" },
      { url: "/favicon.ico", sizes: "any" },
    ],
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://markyisulat.dev",
    siteName: "Marky Isulat",
    title: "Marky Isulat — Design Engineer & Full-Stack Developer",
    description:
      "I don't just build systems; I build systems that help actual users.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Marky Isulat — Design Engineer & Full-Stack Developer",
    description:
      "I don't just build systems; I build systems that help actual users.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${helveticaNeue.variable} ${jetbrainsMono.variable}`}
      suppressHydrationWarning
    >
      <body className="min-h-screen bg-bg text-fg font-sans antialiased">
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
