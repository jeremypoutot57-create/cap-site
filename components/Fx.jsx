"use client";
import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { ev } from "./mesure";

export default function Fx() {
  const pathname = usePathname();

  useEffect(() => {
    document.body.classList.add("fx");

    const io = new IntersectionObserver(
      (entrees) => {
        entrees.forEach((e) => {
          if (!e.isIntersecting) return;
          e.target.classList.add("vu");
          io.unobserve(e.target);
          e.target.querySelectorAll("[data-cible]").forEach((n) => {
            if (n.dataset.fait === "1") return;
            n.dataset.fait = "1";
            const cible = +n.dataset.cible;
            const suf = n.dataset.suffixe || "";
            const t0 = performance.now();
            const duree = 1500;
            const tick = (t) => {
              const p = Math.min((t - t0) / duree, 1);
              const e2 = 1 - Math.pow(1 - p, 3);
              n.textContent = Math.round(cible * e2).toLocaleString("fr-FR") + suf;
              if (p < 1) requestAnimationFrame(tick);
            };
            requestAnimationFrame(tick);
          });
        });
      },
      { threshold: 0.18 }
    );
    document.querySelectorAll(".reveal").forEach((el) => io.observe(el));

    const vus = new Set();
    const onScroll = () => {
      const p = Math.round(((scrollY + innerHeight) / document.body.scrollHeight) * 100);
      [25, 50, 75, 100].forEach((x) => {
        if (p >= x && !vus.has(x)) {
          vus.add(x);
          ev("scroll_" + x);
        }
      });
    };
    addEventListener("scroll", onScroll, { passive: true });

    const surClic = (e) => {
      const el = e.target.closest("[data-ev]");
      if (el) ev("clic_" + el.dataset.ev);
    };
    document.addEventListener("click", surClic);

    const faq = [...document.querySelectorAll(".faq details")];
    const surToggle = (d) => () => {
      if (d.open) ev("faq_ouverte", { q: d.querySelector("summary").textContent.trim() });
    };
    const handlers = faq.map((d) => {
      const h = surToggle(d);
      d.addEventListener("toggle", h);
      return [d, h];
    });

    // Filet de sécurité : rien ne doit rester invisible à cause de l'observateur.
    const filet = setInterval(() => {
      document.querySelectorAll(".reveal:not(.vu)").forEach((el) => {
        const r = el.getBoundingClientRect();
        if (r.top < innerHeight && r.bottom > 0) el.classList.add("vu");
      });
    }, 1200);

    return () => {
      clearInterval(filet);
      io.disconnect();
      removeEventListener("scroll", onScroll);
      document.removeEventListener("click", surClic);
      handlers.forEach(([d, h]) => d.removeEventListener("toggle", h));
    };
  }, [pathname]);

  return null;
}
