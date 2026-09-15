"use client";
import { useEffect, useState, useCallback } from "react";
import Quiz from "./Quiz";
import { fbPerso } from "./pixel";
import { ev } from "./mesure";

// Le questionnaire n'apparaît qu'après un temps de visionnage. Réglable via NEXT_PUBLIC_VSL_SECONDES.
const SECONDES = parseInt(process.env.NEXT_PUBLIC_VSL_SECONDES || "600", 10);

export default function VslVerrou() {
  const [reste, setReste] = useState(SECONDES);
  const [ouvert, setOuvert] = useState(false);
  const [quiz, setQuiz] = useState(false);

  useEffect(() => {
    if (reste <= 0) {
      if (!ouvert) {
        setOuvert(true);
        fbPerso("SeuilVisionnage", { secondes: SECONDES });
        ev("vsl_seuil");
      }
      return;
    }
    const t = setTimeout(() => setReste((r) => r - 1), 1000);
    return () => clearTimeout(t);
  }, [reste, ouvert]);

  const mm = String(Math.floor(reste / 60)).padStart(2, "0");
  const ss = String(reste % 60).padStart(2, "0");
  const fermer = useCallback(() => setQuiz(false), []);

  return (
    <>
      {!ouvert ? (
        <div className="verrou">
          <span className="cadenas" aria-hidden="true">●</span>
          <p>Regardez la vidéo. Le questionnaire apparaît ici tout seul.</p>
          <span className="compte">{mm}:{ss}</span>
        </div>
      ) : (
        <div className="deverrou">
          <span className="k-sceau k-sceau--ok" style={{ marginBottom: "1em" }}>● QUESTIONNAIRE OUVERT</span>
          <h3 style={{ marginBottom: ".4em" }}>Vous êtes allé au bout. On peut parler.</h3>
          <p style={{ fontSize: 15, maxWidth: "54ch" }}>
            Trois minutes de questions pour savoir si votre dossier entre dans notre cible. On trie dès le départ ce
            qu&apos;on prend et ce qu&apos;on ne prend pas, et on vous le dit tout de suite.
          </p>
          <button className="btn btn--primaire btn--large" type="button" onClick={() => setQuiz(true)}>
            Faire examiner mon dossier <span className="fl">→</span>
          </button>
        </div>
      )}
      <Quiz ouvert={quiz} fermer={fermer} origine="vsl" />
    </>
  );
}
