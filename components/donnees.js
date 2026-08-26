export const SCENES = [
  {
    dit: "Je me limite à 30 000 € par an à cause des charges",
    rep: "C'est le dossier type et l'écart le plus spectaculaire. Vous vous êtes fixé un plafond mental il y a des années, sur la base d'un calcul fait une fois, jamais revu. La société accumule, vous vivez serré, et le jour où vous avez besoin d'argent personnellement, vous sortez tout d'un coup au pire moment. Il existe presque toujours un chemin où vous récupérez davantage sans que le coût explose, à condition de regarder le foyer et la société ensemble.",
  },
  {
    dit: "Mon comptable me dit qu'il n'y a rien à faire de plus",
    rep: "Il a raison dans son périmètre. Sur la société qu'il traite, avec les outils de la clôture, il a probablement déjà fait le maximum. Le reste ne se joue pas dans la société : il se joue entre la société, la holding, votre foyer et le temps. C'est un autre plan de travail, et il n'est pas dans son mandat.",
  },
  {
    dit: "J'ai une holding, mais je ne sais pas trop à quoi elle sert",
    rep: "Situation extrêmement fréquente. La holding a été créée pour une bonne raison, souvent une cession ou un rachat, puis elle est restée là sans emploi. Une holding qui dort coûte de l'argent et n'en rapporte aucun. Bien branchée, c'est l'outil le plus puissant dont vous disposez pour lisser ce que vous vous versez.",
  },
  {
    dit: "Ma société a de la trésorerie, moi je n'ai rien de côté",
    rep: "Vous êtes riche sur le papier et à l'étroit dans la vraie vie. Tout votre patrimoine est concentré sur un seul actif, votre société, qui est aussi votre outil de travail et votre revenu. Si elle tousse, tout tousse en même temps. La question n'est pas de sortir la trésorerie, c'est de décider comment et vers quoi.",
  },
  {
    dit: "La banque me dit que je ne gagne pas assez pour emprunter",
    rep: "Vous dirigez une société qui tourne et un conseiller de trente ans vous explique que vous n'êtes pas finançable, parce que ce qu'il lit sur votre avis d'imposition ne ressemble pas à ce que vous produisez réellement. Ce qui vous manque, ce n'est pas de l'argent, c'est une présentation cohérente de votre situation et une structure de revenus qui tient debout face à un comité de crédit.",
  },
];

export const LIVRABLES = [
  ["Pièce 01", "La cartographie de départ", "Toutes vos entités, tous vos flux, tous vos contrats sur une seule page. La plupart de nos clients la découvrent pour la première fois ici."],
  ["Pièce 02", "Le chiffrage de l'écart", "Ce que vous laissez sur la table aujourd'hui, poste par poste, sur douze mois et sur dix ans."],
  ["Pièce 03", "Les scénarios arbitrés", "Deux ou trois chemins possibles, chiffrés jusqu'à l'euro, avec ce que chacun coûte et ce qu'il ferme comme porte."],
  ["Pièce 04", "Le plan retenu", "Vos décisions, dans l'ordre, avec le calendrier de l'année et les fondements juridiques cités."],
  ["Pièce 05", "Les écritures à passer", "La note destinée à votre expert-comptable : ce qu'il doit acter, quand, et sous quelle forme."],
  ["Pièce 06", "Le point de contrôle", "Ce qu'il faudra vérifier dans douze mois, et les trois signaux qui devront vous faire rouvrir le dossier."],
];

/* Note agrégée Google : à tenir à jour de temps en temps. */
export const NOTE_GOOGLE = { note: "4,6", sur: "5", nombre: "35", lien: "https://www.google.com/search?q=Arras+Patrimoine+Avis" };

/* Avis : texte, signature. À compléter avec les avis Google les plus parlants pour un dirigeant. */
export const AVIS = [
  ["Conseil, expertise, professionnalisme. Une société orientée solution, où le mot problème devient challenge.", "Mathieu F. · Investisseur et professionnel libéral"],
  ["Conseils avisés, accompagnement hors pair à chaque étape du projet, réactivité. Je recommande à 1000 %.", "Angélique M. · Investisseuse et cadre"],
  ["Des conseils adaptés, un suivi exceptionnel : l'équipe sait trouver des solutions correspondant aux besoins de chacun.", "Sifi Z. · Cadre"],
];

export const FAQ = [
  ["Je ne sais pas exactement comment je me rémunère, est-ce un problème ?", "Non, c'est le cas de la plupart des dirigeants qui nous contactent, et c'est justement ce que la mission éclaircit. Vous répondez ce que vous savez, nous allons chercher le reste dans vos documents. Personne ne vous demandera de maîtriser le sujet avant de venir en parler."],
  ["Est-ce que ça remplace mon expert-comptable ?", "Non, et ce serait une mauvaise idée. Votre expert-comptable tient vos comptes, produit vos liasses et sécurise vos obligations. Nous décidons avec vous de la façon dont vous vous rémunérez, ce qui n'est pas dans son mandat. Le plan lui est remis avec les écritures à passer, et il est le bienvenu au rendez-vous de restitution."],
  ["Est-ce que c'est de l'optimisation fiscale ?", "Non. Nous ne créons aucune structure pour l'effet qu'elle produit et nous n'utilisons aucun dispositif dérogatoire. Nous décidons de la forme, de la source, du moment et du montant de ce que vous vous versez, en utilisant des règles ordinaires que chaque dirigeant a le droit d'appliquer. Chaque décision est écrite avec son fondement, et vous devez pouvoir l'expliquer vous-même."],
  ["Faut-il venir à Arras ?", "Non. Toute la mission se déroule en visio, séances d'arbitrage comprises, et nous travaillons avec des dirigeants partout en France. Si vous êtes dans les Hauts-de-France et que vous préférez venir au cabinet, boulevard de Strasbourg à Arras, c'est possible."],
  ["Combien de temps ça me prend, à moi ?", "Comptez trois à quatre heures au total, réparties sur le mois : une séance de cadrage, une séance d'arbitrage, une restitution, et le temps de rassembler vos documents. Le reste du travail est chez nous. Nous savons que votre temps est la ressource la plus contrainte du dossier."],
  ["Mes chiffres sont-ils confidentiels ?", "Oui. Les documents transitent par un espace dédié, ils ne sont partagés avec aucun tiers sans votre accord écrit, et l'avocat partenaire n'intervient que si vous choisissez l'option de validation. Les cas publiés sur cette page sont anonymisés et le seront toujours."],
  ["Que se passe-t-il si ma situation change dans un an ?", "Le plan inclut un point de contrôle à douze mois et trois signaux d'alerte qui doivent vous faire rouvrir le dossier : une variation forte du résultat, un projet d'acquisition ou de cession, un changement dans votre situation familiale. Une révision annuelle est possible, elle est beaucoup plus légère que la mission initiale."],
];

export const PRENONS = [
  "Une société qui tourne, au-delà de 150 000 € de chiffre d'affaires",
  "Un dirigeant qui se verse déjà quelque chose, même beaucoup trop peu",
  "Un groupe, une holding, une SCI, ou le projet d'en construire un",
  "Une profession libérale ou un artisan qui a dépassé le stade de la survie",
  "Quelqu'un qui veut comprendre son plan avant de le signer",
];

export const REFUSONS = [
  "Moins de 150 000 € de chiffre d'affaires : le levier n'existe pas encore, et nous vous le dirons franchement",
  "Auto-entrepreneur : votre sujet est réel mais ce n'est pas celui-ci",
  "Une recherche de montage plutôt qu'un plan documenté",
  "Une attente de produit financier à souscrire",
  "Un dirigeant qui veut déléguer la décision plutôt que la prendre",
];

/* Cas réel anonymisé — dirigeant d'un groupe à quatre entités.
   Aucun nom, aucun montant par poste : la ventilation chiffrée se remet en séance. */
export const CAS = {
  intitule: "Dirigeant d'un groupe de quatre entités",
  postes: [
    [
      "Forme de la holding et statut du dirigeant",
      "Société par actions, dirigeant assimilé salarié",
      "Holding transformée, gérance travailleur non salarié",
      "Le coût de chaque euro versé change de barème",
    ],
    [
      "Remontée des résultats des filiales",
      "Résultats bloqués dans chaque société",
      "Régime mère-fille activé sur les deux exploitations",
      "Les résultats circulent sans être taxés deux fois",
    ],
    [
      "Compte courant d'associé",
      "Argent laissé dans la société, sans convention",
      "Compte courant rémunéré, convention écrite",
      "Une somme déjà prêtée produit enfin un revenu",
    ],
    [
      "Distribution et calibrage",
      "Dividendes votés en fin d'exercice, au jugé",
      "Distribution pilotée, tenue sous le seuil des 10 %",
      "Le même montant sort à un coût différent",
    ],
  ],
  intacts: [
    "Aucune société créée pour l'occasion",
    "Aucun produit financier souscrit",
    "Activité, contrats et salariés inchangés",
    "Validé par l'expert-comptable du groupe",
  ],
};

/* ——— Questionnaire : matière de closing ——————————————————————————— */

export const DECLENCHEURS = [
  ["plafond", "Je me limite dans ce que je me verse, à cause des charges"],
  ["tresorerie", "La société a de la trésorerie, moi je n'ai rien de côté"],
  ["holding", "J'ai une holding ou un groupe et je ne sais pas si c'est bien branché"],
  ["banque", "La banque trouve que je ne gagne pas assez pour emprunter"],
  ["retraite", "Je ne sais pas ce que je me construis comme retraite ni comme protection"],
  ["doute", "J'ai le sentiment de laisser de l'argent quelque part sans savoir où"],
  ["projet", "J'ai un projet précis (achat, cession, association) et je veux être prêt"],
];

export const ECHEANCES = [
  "Rien de précis, mais ça traîne depuis trop longtemps",
  "La prochaine clôture d'exercice",
  "Un projet d'emprunt ou d'achat dans l'année",
  "Une entrée ou une sortie d'associé",
  "Une cession envisagée à moyen terme",
];

export const COUTS = [
  "Aucune idée, c'est exactement ce que je veux savoir",
  "Quelques milliers d'euros, sans plus",
  "Entre 10 000 et 30 000 € par an",
  "Plus de 30 000 € par an",
  "Rien du tout, je veux juste une vérification",
];

export const TENTATIVES = [
  "Rien, je n'ai jamais posé la question à quelqu'un",
  "J'en ai parlé à mon expert-comptable, sans suite concrète",
  "J'ai lu et cherché tout seul",
  "J'ai déjà été accompagné, et ça n'a rien donné",
  "J'ai été démarché, mais on voulait me vendre un produit",
];

/* ——— Questions conditionnelles : ne s'affichent que si le déclencheur est coché ——— */

export const CONDITIONNELLES = {
  holding: {
    id: "q_holding",
    label: "Votre holding, aujourd'hui, elle fait quoi concrètement ?",
    aide:
      "Beaucoup de holdings ont été créées pour une opération précise, puis sont restées là sans emploi. Savoir laquelle est la vôtre change complètement le premier arbitrage.",
    options: [
      "Elle détient mes parts et c'est tout",
      "Elle remonte des dividendes, sans plan derrière",
      "Elle porte un crédit ou de l'immobilier",
      "Elle est en sommeil depuis une opération passée",
      "Je ne sais pas vraiment ce qu'elle fait",
    ],
  },
  banque: {
    id: "q_banque",
    label: "Le financement que vous visez, c'est pour quoi ?",
    aide:
      "L'ordre des décisions n'est pas le même selon qu'il faut présenter des revenus dans trois mois ou dans deux ans.",
    options: [
      "Ma résidence principale",
      "De l'immobilier locatif ou les murs de la société",
      "Un rachat ou une croissance externe",
      "Du matériel ou du besoin en fonds de roulement",
      "Rien de précis, mais je veux redevenir finançable",
    ],
  },
  tresorerie: {
    id: "q_tresorerie",
    label: "Cette trésorerie qui dort, vous la voyez servir à quoi ?",
    aide:
      "Sortir, investir ou garder en réserve : ce sont trois plans différents. Autant partir de votre intention.",
    options: [
      "La sortir progressivement vers mon patrimoine",
      "Investir depuis la société ou la holding",
      "La garder en sécurité pour l'entreprise",
      "Financer un projet personnel identifié",
      "Je ne sais pas, c'est la question",
    ],
  },
  projet: {
    id: "q_projet",
    label: "Votre projet, il se situe quand ?",
    aide:
      "Certaines décisions doivent être prises douze à vingt-quatre mois avant l'opération. Après, la porte est fermée.",
    options: [
      "Dans les trois mois",
      "Dans l'année",
      "Dans un à deux ans",
      "Au-delà de deux ans",
      "Ça dépendra de ce que vous me direz",
    ],
  },
  retraite: {
    id: "q_retraite",
    label: "Votre protection aujourd'hui, vous en savez quoi ?",
    aide:
      "C'est le poste le plus souvent signé une fois puis oublié. Aucune honte à ne pas savoir, c'est même le cas général.",
    options: [
      "J'ai des contrats mais je ne sais pas ce qu'ils couvrent",
      "Je crois que je suis mal couvert",
      "Je n'ai rien en dehors du régime obligatoire",
      "J'ai été conseillé et je pense que c'est correct",
    ],
  },
};

export const SOUHAITS = [
  "À peu près ce que je me verse déjà, mais mieux construit",
  "Un peu plus, quelques centaines d'euros par mois",
  "Nettement plus, de l'ordre de 1 000 à 2 000 € par mois",
  "Beaucoup plus, ma rémunération n'a rien à voir avec ce que produit la société",
  "Je ne cherche pas à me verser plus, je cherche à mieux protéger ce que j'ai",
];
