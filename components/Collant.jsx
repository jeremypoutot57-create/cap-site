"use client";
import { useEffect, useState } from "react";

// Rappel collant mobile : le même bouton, jamais une offre parallèle.
// Il suit le bouton du hero, pas la section : dès que ce bouton n'est plus à l'écran, le rappel
// prend le relais, y compris au tout premier affichage sur un petit téléphone où le hero
// dépasse la ligne de flottaison. Il n'y a donc jamais deux boutons visibles, et jamais zéro.
export default function Collant({ ouvrir }) {
  const [on, setOn] = useState(false);
  useEffect(() => {
    const cible = document.getElementById("cta-hero") || document.getElementById("hero");
    if (!cible || !("IntersectionObserver" in window)) return;
    const io = new IntersectionObserver((es) => es.forEach((e) => setOn(!e.isIntersecting)), { threshold: 0.6 });
    io.observe(cible);
    return () => io.disconnect();
  }, []);
  return (
    <div className={"collant" + (on ? " on" : "")}>
      <button className="btn btn--primaire k-bloc" type="button" onClick={() => ouvrir("collant")}>
        Faire examiner mon dossier <span className="fl">→</span>
      </button>
    </div>
  );
}
