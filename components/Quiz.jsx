"use client";
import { useEffect, useRef, useState } from "react";
import { ev } from "./mesure";
import { fb, fbPerso, idEvenement } from "./pixel";
import CalInline from "./CalInline";
import { REMUNERATIONS, STRUCTURES, CHIFFRES, SUIVIS, DECLENCHEURS_QUIZ, COMPTABLE, SEUIL_HORS_CIBLE } from "./donnees";

// Le quiz ne vit que dans cette superposition. Il n'est jamais visible sur la page :
// c'est le clic sur un bouton qui l'ouvre, et c'est lui seul qui déclenche l'événement Lead.
export default function Quiz({ ouvert, fermer, origine }) {
  const [etape, setEtape] = useState(1);
  const [d, setD] = useState({
    remuneration: "",
    statut: "",
    ca: "",
    suivi: "",
    declencheurs: [],
    comptable: "",
    prenom: "",
    nom: "",
    societe: "",
    email: "",
    telephone: "",
  });
  const [erreur, setErreur] = useState("");
  const [envoi, setEnvoi] = useState(false);
  const panneau = useRef(null);

  useEffect(() => {
    if (!ouvert) return;
    setEtape(1);
    setErreur("");
    document.body.style.overflow = "hidden";
    fbPerso("QuizOuvert", { origine });
    ev("quiz_ouvert", { origine });
    return () => {
      document.body.style.overflow = "";
    };
  }, [ouvert, origine]);

  // C'est le voile qui défile, pas le panneau : chaque nouvelle étape doit repartir du haut,
  // sinon on arrive au milieu de l'écran suivant après avoir fait défiler le précédent.
  useEffect(() => {
    const v = panneau.current && panneau.current.parentElement;
    if (v) v.scrollTop = 0;
    if (panneau.current) panneau.current.scrollTop = 0;
  }, [etape]);

  useEffect(() => {
    const esc = (e) => {
      if (e.key === "Escape" && ouvert) fermer();
    };
    document.addEventListener("keydown", esc);
    return () => document.removeEventListener("keydown", esc);
  }, [ouvert, fermer]);

  if (!ouvert) return null;

  const maj = (c) => (e) => {
    setErreur("");
    setD((x) => ({ ...x, [c]: e.target.value }));
  };
  const choisir = (c, v) => {
    setErreur("");
    setD((x) => ({ ...x, [c]: v }));
  };
  const basculer = (cle) => {
    setErreur("");
    setD((x) => ({
      ...x,
      declencheurs: x.declencheurs.includes(cle)
        ? x.declencheurs.filter((k) => k !== cle)
        : [...x.declencheurs, cle],
    }));
  };

  const etape2 = () => {
    if (!d.remuneration || !d.statut || !d.ca) {
      setErreur("Les trois réponses sont nécessaires pour continuer.");
      return;
    }
    ev("quiz_etape_1", { ca: d.ca, statut: d.statut });
    setEtape(2);
  };

  const etape3 = () => {
    if (!d.suivi || !d.declencheurs.length || !d.comptable) {
      setErreur("Choisissez une réponse à chaque question.");
      return;
    }
    ev("quiz_etape_2", { suivi: d.suivi });
    setEtape(3);
  };

  const envoyer = async () => {
    if (!d.prenom.trim() || !d.nom.trim() || !d.email.includes("@") || d.telephone.replace(/\D/g, "").length < 9) {
      setErreur("Il manque une information pour examiner votre dossier.");
      return;
    }
    setErreur("");
    setEnvoi(true);

    const eventID = idEvenement();
    const horsCible = d.ca === SEUIL_HORS_CIBLE;

    // L'événement Lead part tout de suite : il ne dépend pas de la réponse du serveur.
    fb("Lead", { content_name: "Cap. examen de dossier", content_category: horsCible ? "hors-cible" : "cible" }, eventID);
    ev("lead", { hors_cible: horsCible });

    try {
      await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...d, origine, eventID }),
      });
    } catch (e) {
      // Le lead est perdu côté CRM mais pas côté prospect : on ne bloque jamais l'écran suivant.
      console.error("[cap] envoi du lead impossible", e);
    }

    setEnvoi(false);
    setEtape(horsCible ? "non" : "ok");
  };

  const pas = typeof etape === "number" ? etape : 3;

  return (
    <div className="k-voile" role="dialog" aria-modal="true" aria-label="Votre dossier passe-t-il chez nous ?">
      <div className="k-panneau" ref={panneau}>
        <div className="k-tete">
          <span className="k-pas">{typeof etape === "number" ? `ÉTAPE ${etape} / 3` : "RÉPONSE"}</span>
          <div className="k-jauge">
            <i style={{ width: (typeof etape === "number" ? pas * 33.4 : 100) + "%" }} />
          </div>
          <button className="k-fermer" onClick={fermer} aria-label="Fermer">
            ×
          </button>
        </div>

        <div className="k-corps">
          {etape === 1 ? (
            <div className="k-ecran">
              <h3>Votre dossier passe-t-il chez nous ?</h3>
              <p className="k-sous">Trois questions pour situer votre société. Aucune coordonnée à cette étape.</p>

              <label className="k-champ">
                <span>Vous vous versez, par an, salaire et dividendes confondus</span>
                <select id="q-remu" value={d.remuneration} onChange={maj("remuneration")}>
                  <option value="">Choisir</option>
                  {REMUNERATIONS.map((o) => (
                    <option key={o}>{o}</option>
                  ))}
                </select>
              </label>

              <label className="k-champ">
                <span>Votre structure</span>
                <select id="q-statut" value={d.statut} onChange={maj("statut")}>
                  <option value="">Choisir</option>
                  {STRUCTURES.map((o) => (
                    <option key={o}>{o}</option>
                  ))}
                </select>
              </label>

              <label className="k-champ">
                <span>Chiffre d&apos;affaires du dernier exercice</span>
                <select id="q-ca" value={d.ca} onChange={maj("ca")}>
                  <option value="">Choisir</option>
                  {CHIFFRES.map((o) => (
                    <option key={o}>{o}</option>
                  ))}
                </select>
              </label>

              {erreur ? <p className="k-erreur">{erreur}</p> : null}
              <button className="btn btn--primaire k-bloc" type="button" onClick={etape2}>
                Continuer <span className="fl">→</span>
              </button>
            </div>
          ) : null}

          {etape === 2 ? (
            <div className="k-ecran">
              <h3>Ce qui vous amène</h3>
              <p className="k-sous">Trois questions, et nous savons si nous pouvons vous être utiles.</p>

              <div className="k-champ">
                <span>Qui arbitre aujourd&apos;hui la façon dont vous vous rémunérez ?</span>
                <div className="k-choix">
                  {SUIVIS.map((o) => (
                    <button
                      key={o}
                      type="button"
                      aria-pressed={d.suivi === o}
                      onClick={() => choisir("suivi", o)}
                    >
                      {o}
                    </button>
                  ))}
                </div>
              </div>

              <div className="k-champ">
                <span>Qu&apos;est-ce qui vous fait ouvrir le sujet maintenant ? Plusieurs réponses possibles.</span>
                <div className="k-choix">
                  {DECLENCHEURS_QUIZ.map(([cle, libelle]) => (
                    <button
                      key={cle}
                      type="button"
                      aria-pressed={d.declencheurs.includes(cle)}
                      onClick={() => basculer(cle)}
                    >
                      {libelle}
                    </button>
                  ))}
                </div>
              </div>

              <div className="k-champ">
                <span>Votre expert-comptable, s&apos;il apprenait que vous regardez ce sujet ?</span>
                <div className="k-choix">
                  {COMPTABLE.map((o) => (
                    <button
                      key={o}
                      type="button"
                      aria-pressed={d.comptable === o}
                      onClick={() => choisir("comptable", o)}
                    >
                      {o}
                    </button>
                  ))}
                </div>
              </div>

              {erreur ? <p className="k-erreur">{erreur}</p> : null}
              <button className="btn btn--primaire k-bloc" type="button" onClick={etape3}>
                Continuer <span className="fl">→</span>
              </button>
              <div className="k-pied">
                <button className="k-retour" type="button" onClick={() => setEtape(1)}>
                  Revenir
                </button>
              </div>
            </div>
          ) : null}

          {etape === 3 ? (
            <div className="k-ecran">
              <h3>Pour vous répondre</h3>
              <p className="k-sous">Un humain lit votre dossier et vous répond sous 24 h ouvrées.</p>

              <div className="k-paire">
                <label className="k-champ">
                  <span>Prénom</span>
                  <input id="q-prenom" type="text" autoComplete="given-name" value={d.prenom} onChange={maj("prenom")} />
                </label>
                <label className="k-champ">
                  <span>Nom</span>
                  <input id="q-nom" type="text" autoComplete="family-name" value={d.nom} onChange={maj("nom")} />
                </label>
              </div>
              <label className="k-champ">
                <span>Société</span>
                <input id="q-societe" type="text" autoComplete="organization" value={d.societe} onChange={maj("societe")} />
              </label>
              <label className="k-champ">
                <span>E-mail professionnel</span>
                <input id="q-email" type="email" inputMode="email" autoComplete="email" value={d.email} onChange={maj("email")} />
              </label>
              <label className="k-champ">
                <span>Téléphone</span>
                <input id="q-tel" type="tel" inputMode="tel" autoComplete="tel" value={d.telephone} onChange={maj("telephone")} />
              </label>

              {erreur ? <p className="k-erreur">{erreur}</p> : null}
              <button className="btn btn--primaire k-bloc" type="button" onClick={envoyer} disabled={envoi}>
                {envoi ? "Envoi en cours…" : "Faire examiner mon dossier"} <span className="fl">→</span>
              </button>
              <p className="k-rassure">
                <i>✓</i> Vos réponses partent chez nous, nulle part ailleurs. Aucun appel non sollicité, aucune revente de
                fichier.
              </p>
              <div className="k-pied">
                <button className="k-retour" type="button" onClick={() => setEtape(2)}>
                  Revenir
                </button>
              </div>
            </div>
          ) : null}

          {etape === "ok" ? (
            <div className="k-ecran k-verdict">
              <span className="k-sceau k-sceau--ok">● DOSSIER RECEVABLE</span>
              <h3>Votre dossier entre dans notre cible.</h3>
              <p>
                Choisissez votre créneau maintenant, c&apos;est la partie la plus rapide. Vingt-cinq minutes en visio, sans
                engagement, aucun document à préparer.
              </p>
              <CalInline prenom={d.prenom} nom={d.nom} email={d.email} />
            </div>
          ) : null}

          {etape === "non" ? (
            <div className="k-ecran k-verdict">
              <span className="k-sceau k-sceau--non">● PAS MAINTENANT</span>
              <h3>Nous n&apos;allons pas vous prendre votre argent.</h3>
              <p>
                Sous 350 000 € de chiffre d&apos;affaires, votre société n&apos;a pas encore l&apos;enveloppe qui rend
                l&apos;arbitrage intéressant. Une mission Cap. vous coûterait plus qu&apos;elle ne vous apporterait, et nous
                préférons vous le dire tout de suite plutôt que de vous le facturer.
              </p>
              <p>
                Votre dossier est enregistré. Nous vous envoyons Les Planches, nos fiches gratuites sur la rémunération du
                dirigeant, et nous revenons vers vous quand votre société aura passé le seuil.
              </p>
              <a
                className="btn btn--fantome k-bloc"
                href="https://www.arras-patrimoine.fr/planches"
                target="_blank"
                rel="noopener noreferrer"
              >
                Aller aux Planches <span className="fl">→</span>
              </a>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}
