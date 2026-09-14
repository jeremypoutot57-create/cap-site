"use client";
import { useEffect } from "react";

// Calendrier Cal affiché directement dans le panneau du quiz, sans changement de page.
// La redirection de fin de réservation vers /confirmation se règle DANS Cal,
// dans les paramètres avancés de l'événement (« Redirect on booking » + transmission des paramètres).
const LIEN = (process.env.NEXT_PUBLIC_CAL_LINK || "arras-patrimoine/post-reservation").replace(
  /^https?:\/\/(app\.)?cal\.com\//,
  ""
);
const NS = LIEN.split("/").pop();

export default function CalInline({ prenom, nom, email }) {
  useEffect(() => {
    (function (C, A, L) {
      let p = function (a, ar) {
        a.q.push(ar);
      };
      let d = C.document;
      C.Cal =
        C.Cal ||
        function () {
          let cal = C.Cal;
          let ar = arguments;
          if (!cal.loaded) {
            cal.ns = {};
            cal.q = cal.q || [];
            d.head.appendChild(d.createElement("script")).src = A;
            cal.loaded = true;
          }
          if (ar[0] === L) {
            const api = function () {
              p(api, arguments);
            };
            const namespace = ar[1];
            api.q = api.q || [];
            if (typeof namespace === "string") {
              cal.ns[namespace] = cal.ns[namespace] || api;
              p(cal.ns[namespace], ar);
              p(cal, ["initNamespace", namespace]);
            } else p(cal, ar);
            return;
          }
          p(cal, ar);
        };
    })(window, "https://app.cal.com/embed/embed.js", "init");

    window.Cal("init", NS, { origin: "https://app.cal.com" });
    window.Cal.ns[NS]("inline", {
      elementOrSelector: "#cal-cap",
      config: {
        layout: "month_view",
        theme: "dark",
        name: [prenom, nom].filter(Boolean).join(" "),
        email: email || "",
      },
      calLink: LIEN,
    });
    window.Cal.ns[NS]("ui", {
      hideEventTypeDetails: false,
      layout: "month_view",
      cssVarsPerTheme: { dark: { "cal-brand": "#E85D8A" } },
    });
  }, [prenom, nom, email]);

  return <div id="cal-cap" className="k-cal" />;
}
