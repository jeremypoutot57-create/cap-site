"use client";
import { useEffect, useRef, useState } from "react";
import { ev } from "./mesure";

const LIB = process.env.NEXT_PUBLIC_BUNNY_LIBRARY || "602292";
const VID = process.env.NEXT_PUBLIC_BUNNY_VIDEO || "71dcc404-c0ee-4899-9cc6-53b72c7ff2d7";

export default function Video() {
  const [charge, setCharge] = useState(false); // l'iframe est en place
  const [son, setSon] = useState(false); // le son a été activé
  const zone = useRef(null);

  // Démarrage automatique dès que la vidéo entre dans l'écran, en silencieux :
  // c'est la seule lecture automatique que les navigateurs autorisent.
  useEffect(() => {
    if (!zone.current) return;
    const io = new IntersectionObserver(
      (es) => {
        es.forEach((e) => {
          if (e.isIntersecting && !charge) {
            setCharge(true);
            ev("video_auto");
            io.disconnect();
          }
        });
      },
      { threshold: 0.4 }
    );
    io.observe(zone.current);
    return () => io.disconnect();
  }, [charge]);

  const src = `https://iframe.mediadelivery.net/embed/${LIB}/${VID}?autoplay=true&preload=true&muted=${son ? "false" : "true"}&loop=false`;

  return (
    <div className="piece reveal vu" ref={zone}>
      {charge ? (
        <>
          <iframe
            key={son ? "son" : "muet"}
            src={src}
            title="Cap. — ce que nous regardons dans un dossier"
            allow="accelerometer;gyroscope;autoplay;encrypted-media;picture-in-picture;fullscreen"
            allowFullScreen
          />
          {!son ? (
            <button
              className="son"
              type="button"
              onClick={() => {
                setSon(true);
                ev("video_son_active");
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
          <div className="play" aria-hidden="true">
            <span className="rond">
              <svg width="20" height="22" viewBox="0 0 20 22">
                <path d="M19 11 0 22V0z" fill="#E85D8A" />
              </svg>
            </span>
            <span className="lbl">Ce que nous regardons dans un dossier</span>
          </div>
        </>
      )}
    </div>
  );
}
