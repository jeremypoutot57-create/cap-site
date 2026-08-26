const SITE = process.env.NEXT_PUBLIC_SITE_URL || "https://cap.arras-patrimoine.fr";

export const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "ProfessionalService",
      "@id": SITE + "/#cabinet",
      name: "Cap. par Arras Patrimoine",
      url: SITE + "/",
      sameAs: ["https://www.arras-patrimoine.fr"],
      address: {
        "@type": "PostalAddress",
        streetAddress: "Boulevard de Strasbourg",
        addressLocality: "Arras",
        postalCode: "62000",
        addressCountry: "FR",
      },
      areaServed: "FR",
      email: "contact@arras-patrimoine.fr",
    },
    {
      "@type": "Service",
      name: "Stratégie de rémunération du dirigeant",
      serviceType: "Ingénierie et stratégie de rémunération",
      provider: { "@id": SITE + "/#cabinet" },
      areaServed: "FR",
      audience: { "@type": "BusinessAudience", audienceType: "Dirigeants de PME" },
      description:
        "Mission de 30 jours : audit de la rémunération existante, arbitrage chiffré entre salaire, dividendes, compte courant et prévoyance, puis plan écrit et documenté.",
    },
    {
      "@type": "FAQPage",
      mainEntity: [
        [
          "Faut-il savoir comment on se rémunère avant de contacter Cap. ?",
          "Non. La plupart des dirigeants ne savent pas exactement ce qu'ils se versent ni sous quelle forme, et c'est précisément le problème que la mission traite. Le dirigeant répond ce qu'il sait, le cabinet va chercher le reste dans les documents.",
        ],
        [
          "Est-ce que Cap. remplace mon expert-comptable ?",
          "Non. L'expert-comptable tient les comptes et sécurise les obligations. Cap. décide avec le dirigeant de la façon dont il se rémunère, ce qui n'est pas dans le mandat comptable. Le plan lui est remis avec les écritures à passer.",
        ],
        [
          "Est-ce que c'est de l'optimisation fiscale ?",
          "Non. Aucune structure n'est créée pour l'effet qu'elle produit et aucun dispositif dérogatoire n'est utilisé. La mission décide de la forme, de la source, du moment et du montant de ce que le dirigeant se verse, sur la base de règles ordinaires, chaque décision étant documentée.",
        ],
        [
          "Faut-il se déplacer à Arras ?",
          "Non, toute la mission se déroule en visio, séances d'arbitrage comprises, partout en France.",
        ],
        [
          "Combien de temps la mission prend-elle au dirigeant ?",
          "Trois à quatre heures au total réparties sur trente jours : une séance de cadrage, une séance d'arbitrage, une restitution, plus le rassemblement des documents.",
        ],
        [
          "Cap. travaille-t-il avec les auto-entrepreneurs ?",
          "Non. Cap. intervient à partir de 150 000 € de chiffre d'affaires. En dessous, le levier n'existe pas encore et le cabinet le dit au dirigeant plutôt que de prendre le dossier.",
        ],
      ].map(([name, text]) => ({
        "@type": "Question",
        name,
        acceptedAnswer: { "@type": "Answer", text },
      })),
    },
  ],
};
