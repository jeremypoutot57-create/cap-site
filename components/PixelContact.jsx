"use client";
import { useEffect } from "react";
import { fb, idEvenement } from "./pixel";
import { ev } from "./mesure";

// Événement Contact : un rendez-vous a été pris. Déclenché une seule fois par chargement de la page.
export default function PixelContact() {
  useEffect(() => {
    const email = new URLSearchParams(window.location.search).get("email") || undefined;
    fb("Contact", { content_name: "Cap. rendez-vous confirmé" }, idEvenement());
    ev("rdv_confirme", email ? { email } : {});
  }, []);
  return null;
}
