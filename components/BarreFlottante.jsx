"use client";
import { useEffect, useState } from "react";

export default function BarreFlottante() {
  const [cache, setCache] = useState(false);

  useEffect(() => {
    const cible = document.getElementById("dossier");
    if (!cible) return;
    const io = new IntersectionObserver(
      (es) => es.forEach((e) => setCache(e.isIntersecting)),
      { threshold: 0.05 }
    );
    io.observe(cible);
    return () => io.disconnect();
  }, []);

  return (
    <div className={"flottant" + (cache ? " cache" : "")}>
      <span className="rappel">Estimation chiffrée en 2 minutes, sans coordonnées</span>
      <a className="btn btn--primaire" href="#dossier" data-ev="cta_flottant">
        Estimer ce que je laisse passer <span className="fl">→</span>
      </a>
    </div>
  );
}
