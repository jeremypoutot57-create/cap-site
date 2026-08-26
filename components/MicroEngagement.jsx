"use client";
import { ev } from "./mesure";

const TRANCHES = [
  ["Moins de 30 000 €", "Moins de 30 000 €"],
  ["30 000 à 50 000 €", "30 à 50 k€"],
  ["50 000 à 80 000 €", "50 à 80 k€"],
  ["80 000 à 120 000 €", "80 à 120 k€"],
  ["Plus de 120 000 €", "Plus de 120 k€"],
];

export default function MicroEngagement() {
  const choisir = (valeur) => {
    ev("micro_engagement", { tranche: valeur });
    window.dispatchEvent(new CustomEvent("cap:tranche", { detail: valeur }));
    document.getElementById("dossier")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="micro-eng reveal">
      <p className="q">Commencez par une seule question.</p>
      <p className="sq">
        Combien vous versez-vous par an, salaire et dividendes confondus ? Aucune coordonnée
        demandée à cette étape.
      </p>
      <div className="tranches">
        {TRANCHES.map(([valeur, libelle]) => (
          <button key={valeur} className="tranche" type="button" onClick={() => choisir(valeur)}>
            {libelle}
          </button>
        ))}
      </div>
    </div>
  );
}
