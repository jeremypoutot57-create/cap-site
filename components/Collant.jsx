"use client";
import { useEffect, useState } from "react";

// Rappel collant mobile : le même bouton, jamais une offre parallèle. Apparaît dès qu'on quitte le hero.
export default function Collant({ ouvrir }) {
  const [on, setOn] = useState(false);
  useEffect(() => {
    const h = document.getElementById("hero");
    if (!h || !("IntersectionObserver" in window)) return;
    const io = new IntersectionObserver((es) => es.forEach((e) => setOn(!e.isIntersecting)), { threshold: 0 });
    io.observe(h);
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
