"use client";
import { useEffect, useRef, useState } from "react";
import { ev } from "./mesure";
import { fb } from "./pixel";

const LIB = process.env.NEXT_PUBLIC_BUNNY_LIBRARY || "602292";
const VID_DEFAUT = process.env.NEXT_PUBLIC_BUNNY_VIDEO || "71dcc404-c0ee-4899-9cc6-53b72c7ff2d7";

// Lecteur Bunny. Démarre en silencieux dès qu'il entre dans l'écran (seule lecture automatique
// autorisée par les navigateurs), un bouton active le son. `video` permet d'afficher une autre
// vidéo que celle du hero (VSL longue, nurturing).
export default function Video({ video, titre = "Ce que coûte vraiment un euro sorti de votre société", auto = true, className = "" }) {
  const id = video || VID_DEFAUT;
  const [charge, setCharge] = useState(!auto);
  const [son, setSon] = useState(false);
  const zone = useRef(null);

  useEffect(() => {
    if (!auto || !zone.current || charge) return;
    const io = new IntersectionObserver(
      (es) => {
        es.forEach((e) => {
          if (e.isIntersecting) {
            setCharge(true);
            ev("video_auto", { video: id });
            fb("ViewContent", { content_name: titre, content_type: "video" });
            io.disconnect();
          }
        });
      },
      { threshold: 0.4 }
    );
    io.observe(zone.current);
    return () => io.disconnect();
  }, [auto, charge, id, titre]);

  const src = `https://iframe.mediadelivery.net/embed/${LIB}/${id}?autoplay=${auto ? "true" : "false"}&preload=true&muted=${auto && !son ? "true" : "false"}&loop=false`;

  return (
    <div className={"piece " + className} ref={zone}>
      {charge ? (
        <>
          <iframe
            key={son ? "son" : "muet"}
            src={src}
            title={titre}
            allow="accelerometer;gyroscope;autoplay;encrypted-media;picture-in-picture;fullscreen"
            allowFullScreen
          />
          {auto && !son ? (
            <button
              className="son"
              type="button"
              onClick={() => {
                setSon(true);
                ev("video_son_active", { video: id });
              }}
            >
              <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true">
                <path d="M2 6h3l4-3v10L5 10H2z" fill="currentColor" />
                <path d="M11 5.5a3.5 3.5 0 0 1 0 5M13 3.5a6 6 0 0 1 0 9" stroke="currentColor" strokeWidth="1.4" fill="none" strokeLinecap="round" />
              </svg>
              Activer le son
            </button>
          ) : null}
        </>
      ) : (
        <>
          <div className="voile" />
          <button className="play" type="button" onClick={() => { setCharge(true); ev("video_clic", { video: id }); }} aria-label="Lire la vidéo">
            <span className="rond">
              <svg width="20" height="22" viewBox="0 0 20 22">
                <path d="M19 11 0 22V0z" fill="#E85D8A" />
              </svg>
            </span>
            <span className="lbl">{titre}</span>
          </button>
        </>
      )}
    </div>
  );
}
