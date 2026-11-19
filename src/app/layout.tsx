import { Suspense } from "react";
import type { Metadata } from "next";
import localFont from "next/font/local";
import { JetBrains_Mono } from "next/font/google";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { ResumeModalProvider } from "@/components/layout/ResumeModal";
import { LoadingScreen } from "@/components/layout/LoadingScreen";
import { SidebarShell } from "@/components/layout/SidebarShell";
import { MobileTopBar } from "@/components/layout/MobileTopBar";
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
  declarations: [
    { prop: "ascent-override", value: "90%" },
    { prop: "descent-override", value: "25%" },
    { prop: "line-gap-override", value: "0%" },
  ],
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
    default: "Marky Isulat — Product-Oriented Full-Stack Developer",
    template: "%s — Marky Isulat",
  },
  description:
    "Mark Angelo A. Isulat (Marky) — Product-Oriented Full-Stack Developer building enterprise ERPs, automated booking platforms, and local AI systems that help actual users.",
  keywords: [
    "Marky Isulat",
    "Mark Angelo Isulat",
    "Product-Oriented Developer",
    "Full-Stack Developer",
    "Next.js",
    "React 19",
    "TypeScript",
    "UI/UX Engineer",
    "Philippines",
  ],
  authors: [{ name: "Mark Angelo A. Isulat", url: "https://markyisulat.dev" }],
  creator: "Mark Angelo A. Isulat",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://markyisulat.dev",
    siteName: "Marky Isulat",
    title: "Marky Isulat — Product-Oriented Full-Stack Developer",
    description:
      "I don't just build systems; I build systems that help actual users.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Marky Isulat — Product-Oriented Full-Stack Developer",
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
          <ResumeModalProvider>
            <LoadingScreen />
            <Suspense
              fallback={
                <aside
                  aria-hidden="true"
                  className="fixed inset-y-0 left-0 z-30 hidden w-[260px] border-r border-line bg-bg lg:block"
                />
              }
            >
              <SidebarShell />
            </Suspense>
            <Suspense
              fallback={
                <header
                  aria-hidden="true"
                  className="fixed inset-x-0 top-0 z-40 h-14 border-b border-line bg-bg lg:hidden"
                />
              }
            >
              <MobileTopBar />
            </Suspense>
            <main className="flex min-h-screen flex-col pt-14 lg:pt-0 lg:pl-[260px]">
              {children}
            </main>
          </ResumeModalProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
