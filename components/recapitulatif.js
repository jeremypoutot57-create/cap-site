// Phrase de situation reprise dans le brief noCRM et la copie mail, à partir des réponses du quiz v2.

const STRUCTURE_COURT = {
  "SARL ou EURL, seul": "une SARL ou EURL dont vous êtes le seul associé",
  "SAS ou SASU, seul": "une SAS ou SASU dont vous êtes le seul associé",
  "Groupe avec holding": "un groupe avec holding",
  "Société avec un ou plusieurs associés": "une société avec un ou plusieurs associés",
  Autre: "votre société",
};

const CA_COURT = {
  "Moins de 350 000 €": "qui réalise moins de 350 000 € de chiffre d'affaires",
  "350 000 € à 1 M€": "qui réalise entre 350 000 € et 1 M€ de chiffre d'affaires",
  "1 à 3 M€": "qui réalise entre 1 et 3 M€ de chiffre d'affaires",
  "3 à 10 M€": "qui réalise entre 3 et 10 M€ de chiffre d'affaires",
  "Plus de 10 M€": "qui réalise plus de 10 M€ de chiffre d'affaires",
};

const SUIVI_COURT = {
  Personne: "personne n'arbitre ce sujet chez vous",
  "Mon expert-comptable, au fil de l'eau": "votre expert-comptable le regarde au fil de l'eau",
  "Un conseiller, mais je ne suis pas convaincu": "quelqu'un s'en occupe, sans vous convaincre",
  "Quelqu'un, et je cherche un deuxième avis": "vous cherchez un deuxième regard sur ce qui existe",
};

export function phraseRecap(p) {
  const structure = STRUCTURE_COURT[p.statut] || "votre société";
  const ca = CA_COURT[p.ca] || "";
  const remu = p.remuneration ? `vous vous versez ${p.remuneration.toLowerCase()} par an` : "";
  const suivi = SUIVI_COURT[p.suivi] || "";
  return [
    `Vous dirigez ${structure}${ca ? " " + ca : ""}`,
    remu,
    suivi,
  ]
    .filter(Boolean)
    .join(", ") + ".";
}
