import "./globals.css";

const SITE = process.env.NEXT_PUBLIC_SITE_URL || "https://cap.arras-patrimoine.fr";

export const metadata = {
  metadataBase: new URL(SITE),
  title: "Cap. — Stratégie de rémunération du dirigeant | Arras Patrimoine",
  description:
    "Cap. construit la stratégie de rémunération des dirigeants de PME en 30 jours : audit, arbitrage chiffré, plan écrit et documenté. Huit dossiers par mois, sélectionnés.",
  alternates: { canonical: "/" },
  openGraph: {
    title: "Cap. — Stratégie de rémunération du dirigeant",
    description:
      "Ce que votre société produit et ce qui arrive chez vous : entre les deux, personne n'arbitre. Cap. trace la ligne, en 30 jours.",
    url: SITE,
    siteName: "Cap. par Arras Patrimoine",
    locale: "fr_FR",
    type: "website",
  },
  robots: { index: true, follow: true },
};

export const viewport = { themeColor: "#0C1626" };

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
        {process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN ? (
          <script
            defer
            data-domain={process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN}
            src="https://plausible.io/js/script.manual.js"
          />
        ) : null}
      </head>
      <body>{children}</body>
    </html>
  );
}
