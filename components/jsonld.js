const SITE = process.env.NEXT_PUBLIC_SITE_URL || "https://cap.arras-patrimoine.fr";

export const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "ProfessionalService",
      "@id": SITE + "/#cabinet",
      name: "Cap. par Arras Patrimoine",
      url: SITE,
      description:
        "Mission d'ingénierie de rémunération du dirigeant : trois architectures de rémunération minimum, chiffrées sur le dossier réel, livrées sous trente jours.",
      areaServed: "FR",
      parentOrganization: { "@type": "Organization", name: "Arras Patrimoine", url: "https://www.arras-patrimoine.fr" },
      address: { "@type": "PostalAddress", streetAddress: "Boulevard de Strasbourg", postalCode: "62000", addressLocality: "Arras", addressCountry: "FR" },
      founder: { "@type": "Person", name: "Jérémy Poutot", jobTitle: "Ingénieur patrimonial et juriste du patrimoine" },
    },
  ],
};
