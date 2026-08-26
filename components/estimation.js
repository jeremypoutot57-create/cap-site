/* Estimation indicative de l'écart annuel, calculée à partir des premières réponses.
   Volontairement large et prudente : c'est un ordre de grandeur, jamais une promesse. */

const SOCLE = {
  "Moins de 150 000 €": null,
  "150 000 à 500 000 €": [4000, 14000],
  "500 000 € à 1 M€": [7000, 22000],
  "1 à 5 M€": [11000, 32000],
  "Plus de 5 M€": [15000, 45000],
};

const REMU = {
  "Moins de 30 000 €": 1.3,
  "30 000 à 50 000 €": 1.15,
  "50 000 à 80 000 €": 1,
  "80 000 à 120 000 €": 1,
  "Plus de 120 000 €": 1.05,
};

const SUIVI = {
  Personne: 1.25,
  "Mon expert-comptable, quand j'y pense": 1.1,
  "Un conseiller, mais je ne suis pas convaincu": 1.1,
  "Oui, et je cherche un deuxième avis": 0.9,
};

const COMPO = { "Je ne sais pas exactement": 1.12 };

export function estimer(d) {
  const socle = SOCLE[d.ca];
  if (d.ca === "Moins de 150 000 €") return { horsCible: true };
  if (!socle || !d.remuneration) return null;

  let k = (REMU[d.remuneration] || 1) * (SUIVI[d.suivi] || 1) * (COMPO[d.composition] || 1);
  if ((d.declencheurs || []).includes("holding")) k *= 1.1;
  if ((d.declencheurs || []).includes("tresorerie")) k *= 1.05;

  const arrondi = (n) => Math.round((n * k) / 500) * 500;
  const bas = arrondi(socle[0]);
  const haut = arrondi(socle[1]);
  return { bas, haut, dix: [bas * 10, haut * 10] };
}

export const fmt = (n) => n.toLocaleString("fr-FR") + " €";
