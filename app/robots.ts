import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  // Ensure the base URL does not end with a trailing slash to prevent double-slash bugs
  const BASE_URL =
    process.env.NEXT_PUBLIC_APP_URL ||
    "https://subratachowdhuryportfolio.vercel.app";

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        // Explicitly block search engines from crawling your backend API routes.
        // This saves your server bandwidth and prevents API endpoints from showing up in Google.
        disallow: ["/api/"],
      },
      // Optional: A comprehensive blocklist for AI training bots.
      // Uncomment this if you want to prevent your portfolio content/code from being used to train LLMs.
      // {
      //   userAgent: ["GPTBot", "CCBot", "Google-Extended", "Anthropic-ai", "ClaudeBot"],
      //   disallow: "/",
      // },
    ],
    sitemap: `${BASE_URL}/sitemap.xml`,
    host: BASE_URL,
  };
}
