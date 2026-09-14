"use client";
import { useEffect } from "react";

// Compteurs des cotes et règle des 30 jours, déclenchés à l'entrée dans l'écran.
export default function Effets() {
  useEffect(() => {
    if (typeof window === "undefined" || !("IntersectionObserver" in window)) return;
    const reduit = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const cotes = document.getElementById("cotes");
    let ioC;
    if (cotes) {
      ioC = new IntersectionObserver((es, io) => {
        es.forEach((e) => {
          if (!e.isIntersecting) return;
          cotes.querySelectorAll("b[data-n]").forEach((b) => {
            const cible = parseInt(b.getAttribute("data-n"), 10);
            const suffixe = b.getAttribute("data-suffixe") || "";
            if (reduit) { b.textContent = cible + suffixe; return; }
            let t0 = null;
            const pas = (t) => {
              if (!t0) t0 = t;
              let k = Math.min(1, (t - t0) / 1100);
              k = 1 - Math.pow(1 - k, 3);
              b.textContent = Math.round(cible * k) + suffixe;
              if (k < 1) requestAnimationFrame(pas);
            };
            requestAnimationFrame(pas);
          });
          io.disconnect();
        });
      }, { threshold: 0.4 });
      ioC.observe(cotes);
    }

    const plan = document.getElementById("plan");
    let ioP;
    if (plan) {
      ioP = new IntersectionObserver((es, io) => {
        es.forEach((e) => { if (e.isIntersecting) { plan.classList.add("on"); io.disconnect(); } });
      }, { threshold: 0.25 });
      ioP.observe(plan);
    }
    return () => { ioC && ioC.disconnect(); ioP && ioP.disconnect(); };
  }, []);
  return null;
}
