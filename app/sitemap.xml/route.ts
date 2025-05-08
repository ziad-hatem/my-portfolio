import type { MetadataRoute } from "next";
import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl =
    process.env.NEXT_PUBLIC_APP_URL || "https://your-portfolio-domain.com";

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    // Add additional routes if you expand your portfolio with more pages
  ];
}

export async function GET() {
  try {
    const sitemapPath = path.join(process.cwd(), "public", "sitemap.xml");
    const sitemapContent = fs.readFileSync(sitemapPath, "utf8");

    return new NextResponse(sitemapContent, {
      headers: {
        "Content-Type": "application/xml",
        "Cache-Control": "public, max-age=3600, s-maxage=3600",
      },
    });
  } catch (error) {
    console.error("Error reading sitemap:", error);
    return new NextResponse("Error generating sitemap", { status: 500 });
  }
}
