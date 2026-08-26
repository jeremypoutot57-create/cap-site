// Construit la phrase renvoyée au dirigeant avant l'envoi, et le même texte pour le brief noCRM.

const STATUT_COURT = {
  "Gérant de SARL ou EURL": "une SARL",
  "Président de SAS ou SASU": "une SAS",
  "Profession libérale": "une activité libérale",
  "Artisan, bâtiment": "une entreprise du bâtiment",
  Autre: "votre société",
};

const CA_COURT = {
  "Moins de 150 000 €": "qui réalise moins de 150 000 € de chiffre d'affaires",
  "150 000 à 500 000 €": "qui réalise entre 150 000 et 500 000 € de chiffre d'affaires",
  "500 000 € à 1 M€": "qui réalise entre 500 000 € et 1 M€ de chiffre d'affaires",
  "1 à 5 M€": "qui réalise entre 1 et 5 M€ de chiffre d'affaires",
  "Plus de 5 M€": "qui réalise plus de 5 M€ de chiffre d'affaires",
};

const COMPO_COURT = {
  "Surtout du salaire": "essentiellement sous forme de salaire",
  "Surtout des dividendes": "essentiellement sous forme de dividendes",
  "Un mélange des deux": "en mélangeant salaire et dividendes",
  "Je ne sais pas exactement": "sans savoir précisément comment cela se compose",
};

const SUIVI_COURT = {
  Personne: "personne n'arbitre ce sujet chez vous",
  "Mon expert-comptable, quand j'y pense": "le sujet n'est traité que quand vous y pensez",
  "Un conseiller, mais je ne suis pas convaincu": "quelqu'un s'en occupe, sans vous convaincre",
  "Oui, et je cherche un deuxième avis": "vous cherchez un deuxième regard sur ce qui existe",
};

const COUT_COURT = {
  "Aucune idée, c'est exactement ce que je veux savoir": "vous ne savez pas ce que ça vous coûte",
  "Quelques milliers d'euros, sans plus": "vous estimez y perdre quelques milliers d'euros par an",
  "Entre 10 000 et 30 000 € par an": "vous estimez y perdre entre 10 000 et 30 000 € par an",
  "Plus de 30 000 € par an": "vous estimez y perdre plus de 30 000 € par an",
  "Rien du tout, je veux juste une vérification": "vous voulez surtout une vérification",
};

const SOUHAIT_COURT = {
  "À peu près ce que je me verse déjà, mais mieux construit": "sans forcément vous verser plus",
  "Un peu plus, quelques centaines d'euros par mois": "avec quelques centaines d'euros de plus par mois",
  "Nettement plus, de l'ordre de 1 000 à 2 000 € par mois": "avec 1 000 à 2 000 € de plus par mois",
  "Beaucoup plus, ma rémunération n'a rien à voir avec ce que produit la société":
    "avec un écart important entre ce que produit la société et ce que vous touchez",
  "Je ne cherche pas à me verser plus, je cherche à mieux protéger ce que j'ai":
    "en cherchant d'abord à protéger ce que vous avez",
};

export function phraseRecap(d) {
  const morceaux = [];
  if (d.statut) morceaux.push(`Vous dirigez ${STATUT_COURT[d.statut] || "votre société"}`);
  if (d.ca) morceaux.push(CA_COURT[d.ca] || `qui réalise ${d.ca}`);
  let p1 = morceaux.join(" ") + ".";

  const p2 = d.remuneration
    ? `Vous vous versez ${d.remuneration.toLowerCase()} par an${
        d.composition ? ", " + (COMPO_COURT[d.composition] || d.composition.toLowerCase()) : ""
      }.`
    : "";

  const p3 = d.suivi ? `Aujourd'hui, ${SUIVI_COURT[d.suivi] || d.suivi.toLowerCase()}.` : "";
  const p4 = d.cout ? `Et ${COUT_COURT[d.cout] || d.cout.toLowerCase()}.` : "";
  const p5 = d.souhait ? `Ce que vous cherchez : y voir clair ${SOUHAIT_COURT[d.souhait] || ""}.` : "";

  return [p1, p2, p3, p4, p5].filter(Boolean).join(" ");
}

export function lignesRecap(d) {
  return [
    ["Nom", [d.prenom, d.nom].filter(Boolean).join(" ")],
    ["Société", d.societe],
    ["Rémunération annuelle", d.remuneration],
    ["Composition", d.composition],
    ["Statut", d.statut],
    ["Chiffre d'affaires", d.ca],
    ["Qui s'en occupe", d.suivi],
    ["Coût estimé de l'inaction", d.cout],
    ["Ce que vous voudriez", d.souhait],
    ["Échéance", d.echeance],
    ["Déjà tenté", d.tentative],
  ].filter(([, v]) => v);
}
