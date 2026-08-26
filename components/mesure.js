// Point unique de mesure. Pousse dans dataLayer (GA4 / GTM) et dans Plausible si présent.
export function ev(nom, detail) {
  if (typeof window === "undefined") return;
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push(Object.assign({ event: nom }, detail || {}));
  if (typeof window.plausible === "function") window.plausible(nom, { props: detail || {} });
}
