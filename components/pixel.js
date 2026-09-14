// Point unique du pixel Meta. Aucun événement ne part si NEXT_PUBLIC_META_PIXEL_ID est absent :
// le site fonctionne normalement, il n'est simplement pas mesuré.
export const PIXEL_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID || "";

// Identifiant d'événement, pour la déduplication avec l'API de conversions côté serveur.
export function idEvenement() {
  if (typeof crypto !== "undefined" && crypto.randomUUID) return crypto.randomUUID();
  return "ev-" + Date.now() + "-" + Math.random().toString(16).slice(2);
}

// Événement standard Meta (Lead, Contact, InitiateCheckout, ViewContent…).
export function fb(nom, parametres, eventID) {
  if (typeof window === "undefined" || typeof window.fbq !== "function") return;
  window.fbq("track", nom, parametres || {}, eventID ? { eventID } : undefined);
}

// Événement personnalisé, pour ce que Meta ne nomme pas.
export function fbPerso(nom, parametres) {
  if (typeof window === "undefined" || typeof window.fbq !== "function") return;
  window.fbq("trackCustom", nom, parametres || {});
}
