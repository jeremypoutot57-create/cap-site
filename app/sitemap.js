const SITE = process.env.NEXT_PUBLIC_SITE_URL || "https://cap.arras-patrimoine.fr";

export default function sitemap() {
  return [
    { url: SITE + "/", lastModified: new Date(), changeFrequency: "monthly", priority: 1 },
  ];
}
