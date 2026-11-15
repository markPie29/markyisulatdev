import type { MetadataRoute } from "next";
import { PROFILE } from "@/data/profile";

export default function robots(): MetadataRoute.Robots {
  const baseUrl = PROFILE.website.replace(/\/$/, "");

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
    host: baseUrl,
  };
}
