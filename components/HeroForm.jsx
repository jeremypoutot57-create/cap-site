"use client";
import { useState } from "react";
import { ev } from "./mesure";

// Mini-formulaire du hero : trois questions, et le vrai questionnaire reprend à l'étape 2
// avec ces réponses déjà remplies. Le prospect a l'impression d'avoir fait la moitié du chemin.
export default function HeroForm() {
  const [d, setD] = useState({ remuneration: "", statut: "", ca: "" });
  const [erreur, setErreur] = useState("");

  const maj = (c) => (e) => {
    setErreur("");
    setD((x) => ({ ...x, [c]: e.target.value }));
  };

  const lancer = () => {
    if (!d.remuneration || !d.statut || !d.ca) {
      setErreur("Trois réponses suffisent pour commencer.");
      return;
    }
    ev("hero_form", d);
    window.dispatchEvent(new CustomEvent("cap:prefill", { detail: d }));
    document.getElementById("dossier")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="hero-form">
      <div className="hf-titre">
        <b>Votre dossier passe-t-il chez nous ?</b>
        <span>3 réponses · 20 secondes · aucune coordonnée</span>
      </div>
      <div className="hf-champs">
        <label>
          <span>Vous vous versez, par an</span>
          <select value={d.remuneration} onChange={maj("remuneration")}>
            <option value="">Choisir</option>
            <option>Moins de 30 000 €</option>
            <option>30 000 à 50 000 €</option>
            <option>50 000 à 80 000 €</option>
            <option>80 000 à 120 000 €</option>
            <option>Plus de 120 000 €</option>
          </select>
        </label>
        <label>
          <span>Votre statut</span>
          <select value={d.statut} onChange={maj("statut")}>
            <option value="">Choisir</option>
            <option>Gérant de SARL ou EURL</option>
            <option>Président de SAS ou SASU</option>
            <option>Profession libérale</option>
            <option>Artisan, bâtiment</option>
            <option>Autre</option>
          </select>
        </label>
        <label>
          <span>Chiffre d&apos;affaires</span>
          <select value={d.ca} onChange={maj("ca")}>
            <option value="">Choisir</option>
            <option>Moins de 150 000 €</option>
            <option>150 000 à 500 000 €</option>
            <option>500 000 € à 1 M€</option>
            <option>1 à 5 M€</option>
            <option>Plus de 5 M€</option>
          </select>
        </label>
      </div>
      <div className="hf-actions">
        <button className="btn btn--primaire btn--large" type="button" onClick={lancer} data-ev="cta_hero_form">
          Voir si mon dossier passe <span className="fl">→</span>
        </button>
        {erreur ? <span className="hf-erreur">{erreur}</span> : null}
      </div>
      <p className="hf-note">
        Réponse d&apos;un humain sous 24 h ouvrées. Si vous n&apos;êtes pas dans notre cible, on vous le dit tout de suite.
      </p>
    </div>
  );
}
