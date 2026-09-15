const SITE = process.env.NEXT_PUBLIC_SITE_URL || "https://cap.arras-patrimoine.fr";
export default function robots() {
  return {
    rules: [{ userAgent: "*", allow: "/", disallow: ["/api/", "/confirmation", "/vsl"] }],
    sitemap: SITE + "/sitemap.xml",
  };
}
