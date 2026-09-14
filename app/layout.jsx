import "./globals.css";
import Pixel from "../components/Pixel";

const SITE = process.env.NEXT_PUBLIC_SITE_URL || "https://cap.arras-patrimoine.fr";

export const metadata = {
  metadataBase: new URL(SITE),
  title: "Cap. — Vous décidez de tout dans votre boîte. Sauf de ce que vous gagnez.",
  description:
    "Cap. chiffre ce que vous coûte réellement chaque euro que vous vous versez, projette au minimum trois architectures de rémunération sur votre dossier réel, et vous rend la décision. Trente jours. Dirigeants de PME à partir de 350 k€ de chiffre d'affaires.",
  alternates: { canonical: "/" },
  openGraph: {
    title: "Cap. — Ingénierie de rémunération du dirigeant",
    description:
      "Le plan qui chiffre ce que vous coûte chaque euro que vous vous versez. Trois scénarios minimum, trente jours, la décision vous revient.",
    url: SITE,
    siteName: "Cap. par Arras Patrimoine",
    locale: "fr_FR",
    type: "website",
    images: [{ url: "/equipe.jpg", width: 1400, height: 788, alt: "L'équipe Cap. par Arras Patrimoine" }],
  },
  robots: { index: true, follow: true },
};

export const viewport = { themeColor: "#0C1626", width: "device-width", initialScale: 1, viewportFit: "cover" };

export default function RootLayout({ children }) {
  return (
    <html lang="fr">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter+Tight:wght@400;500;600;700&family=Inter:wght@400;500;600;700&family=IBM+Plex+Mono:wght@400;500&display=swap"
          rel="stylesheet"
        />
        <link rel="preconnect" href="https://iframe.mediadelivery.net" />
        <link rel="preconnect" href="https://app.cal.com" />
        {process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN ? (
          <script defer data-domain={process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN} src="https://plausible.io/js/script.manual.js" />
        ) : null}
      </head>
      <body>
        <Pixel />
        {children}
      </body>
    </html>
  );
}
