"use client";
import { useEffect, useState } from "react";

const SECTIONS = [
  ["dossier", "Ouvrir mon dossier"],
];

export function Progression() {
  const [p, setP] = useState(0);
  useEffect(() => {
    const maj = () => {
      const h = document.body.scrollHeight - innerHeight;
      setP(h > 0 ? Math.min((scrollY / h) * 100, 100) : 0);
    };
    maj();
    addEventListener("scroll", maj, { passive: true });
    addEventListener("resize", maj);
    return () => {
      removeEventListener("scroll", maj);
      removeEventListener("resize", maj);
    };
  }, []);
  return (
    <div className="progression" aria-hidden="true">
      <i style={{ width: p + "%" }} />
    </div>
  );
}

export function Sommaire({ entrees }) {
  const [actif, setActif] = useState("");
  useEffect(() => {
    const cibles = entrees.map(([id]) => document.getElementById(id)).filter(Boolean);
    const io = new IntersectionObserver(
      (es) => {
        const vu = es.filter((e) => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0];
        if (vu) setActif(vu.target.id);
      },
      { rootMargin: "-40% 0px -55% 0px" }
    );
    cibles.forEach((c) => io.observe(c));
    return () => io.disconnect();
  }, [entrees]);

  return (
    <nav className="sommaire" aria-label="Sommaire de la page">
      {entrees.map(([id, libelle]) => (
        <a key={id} href={"#" + id} className={actif === id ? "actif" : ""}>
          {libelle}
        </a>
      ))}
    </nav>
  );
}
