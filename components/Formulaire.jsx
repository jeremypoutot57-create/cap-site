"use client";
import { useEffect, useRef, useState } from "react";
import { ev } from "./mesure";
import { estimer, fmt } from "./estimation";
import { DECLENCHEURS, ECHEANCES, COUTS, TENTATIVES, CONDITIONNELLES, SOUHAITS } from "./donnees";
import { phraseRecap, lignesRecap } from "./recapitulatif";

const CAL = process.env.NEXT_PUBLIC_CAL_URL || "https://cal.com/arras-patrimoine/decouverte-rem";

const VIDE = {
  remuneration: "",
  composition: "",
  statut: "",
  ca: "",
  suivi: "",
  declencheurs: [],
  souhait: "",
  conditionnelles: {},
  echeance: "",
  cout: "",
  tentative: "",
  reussite: "",
  prenom: "",
  nom: "",
  societe: "",
  email: "",
  telephone: "",
  precision: "",
};

export default function Formulaire() {
  const [d, setD] = useState(VIDE);
  const [etape, setEtape] = useState(1);
  const [etat, setEtat] = useState("saisie");
  const [manque, setManque] = useState("");
  const [echec, setEchec] = useState(false);
  const demarre = useRef(false);
  const bloc = useRef(null);

  // Les réponses survivent à un rechargement : personne ne recommence de zéro.
  useEffect(() => {
    try {
      const brut = sessionStorage.getItem("cap:fiche");
      if (brut) setD((x) => ({ ...x, ...JSON.parse(brut) }));
    } catch {}
  }, []);

  useEffect(() => {
    try {
      sessionStorage.setItem("cap:fiche", JSON.stringify(d));
    } catch {}
  }, [d]);

  useEffect(() => {
    const surPrefill = (e) => {
      setD((x) => ({ ...x, ...e.detail }));
      setEtape(2);
      ev("form_etape2", { origine: "hero" });
    };
    window.addEventListener("cap:prefill", surPrefill);
    return () => window.removeEventListener("cap:prefill", surPrefill);
  }, []);

  useEffect(() => {
    const surTranche = (e) => setD((x) => ({ ...x, remuneration: e.detail }));
    window.addEventListener("cap:tranche", surTranche);
    return () => window.removeEventListener("cap:tranche", surTranche);
  }, []);

  const marquerDemarrage = () => {
    if (!demarre.current) {
      demarre.current = true;
      ev("form_demarre");
    }
  };

  const maj = (champ) => (e) => {
    marquerDemarrage();
    setManque("");
    setD((x) => ({ ...x, [champ]: e.target.value }));
  };

  const basculer = (cle) => {
    marquerDemarrage();
    setManque("");
    setD((x) => ({
      ...x,
      declencheurs: x.declencheurs.includes(cle)
        ? x.declencheurs.filter((k) => k !== cle)
        : [...x.declencheurs, cle],
    }));
  };

  const majCond = (id) => (e) => {
    marquerDemarrage();
    setManque("");
    const v = e.target.value;
    setD((x) => ({ ...x, conditionnelles: { ...x.conditionnelles, [id]: v } }));
  };

  // Les questions conditionnelles suivent l'ordre des déclencheurs cochés, trois au maximum.
  const conditionnellesActives = () =>
    d.declencheurs.map((k) => CONDITIONNELLES[k]).filter(Boolean).slice(0, 3);

  const aller = (cible, requis) => {
    const absent = requis.find((c) => (Array.isArray(d[c]) ? d[c].length === 0 : !d[c]));
    if (absent) {
      setManque(absent);
      const el = document.getElementById("ch-" + absent);
      el?.scrollIntoView({ behavior: "smooth", block: "center" });
      setTimeout(() => el?.focus?.(), 400);
      return;
    }
    setEtape(cible);
    ev("form_etape" + cible);
    bloc.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const envoyer = async (e) => {
    e.preventDefault();
    setEtat("envoi");
    let transmis = false;
    try {
      const r = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(d),
      });
      transmis = r.ok;
      if (!r.ok) console.error("[cap] /api/lead a répondu", r.status, await r.text());
    } catch (err) {
      console.error("[cap] envoi impossible :", err);
    }
    // Le visiteur voit toujours l'écran de suite : on ne le laisse jamais dans le vide.
    setEchec(!transmis);
    setEtat("succes");
    ev(transmis ? "lead_envoye" : "lead_echec", {
      statut: d.statut,
      remuneration: d.remuneration,
      declencheurs: d.declencheurs.join(","),
      echeance: d.echeance,
    });
    bloc.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  if (etat === "succes") {
    const sujet = encodeURIComponent(
      "Dossier Cap. — " + [d.prenom, d.nom].filter(Boolean).join(" ") + (d.statut ? " · " + d.statut : "")
    );
    const corps = encodeURIComponent(
      [
        "Rémunération annuelle : " + d.remuneration,
        "Composition : " + d.composition,
        "Statut : " + d.statut,
        "Chiffre d'affaires : " + d.ca,
        "Qui s'en occupe : " + d.suivi,
        "Ce que je voudrais : " + d.souhait,
        "Échéance : " + d.echeance,
        "Téléphone : " + d.telephone,
        "",
        d.reussite,
      ].join("\n")
    );

    return (
      <div className="form reveal vu" ref={bloc}>
        <div className="succes on">
          <span className={"chip " + (echec ? "chip--rose" : "chip--vert")} style={{ marginBottom: "1.4em" }}>
            {echec ? "TRANSMISSION INTERROMPUE" : "DOSSIER REÇU"}
          </span>

          {echec ? (
            <>
              <h3>Votre connexion a coupé avant la fin de l&apos;envoi.</h3>
              <p>
                Rien n&apos;est perdu, mais nous n&apos;avons pas encore votre fiche. Le plus rapide
                est de poser directement un créneau de trente minutes : nous reprendrons tout avec
                vous en direct.
              </p>
              <p>
                Vous pouvez aussi nous écrire en un clic, vos réponses sont déjà mises en forme dans
                le message.
              </p>
            </>
          ) : (
            <>
              <h3>{d.prenom ? d.prenom + ", votre fiche est arrivée chez nous." : "Votre fiche est arrivée chez nous."}</h3>
              <p>
                Nous l&apos;avons lue en entier, ce n&apos;est pas un formulaire automatique. Jérémy
                ou Marie-Amélie vous répond sous 24 h ouvrées, personnellement, en reprenant
                ce que vous venez d&apos;écrire. Si votre dossier ne relève pas de Cap., vous le
                saurez dans le même délai, avec une indication de ce qu&apos;il faut regarder à la
                place.
              </p>
              <p>
                Une dernière chose, et c&apos;est la plus utile : posez votre créneau de trente
                minutes maintenant. C&apos;est autant de gagné, et cela nous permet d&apos;arriver à
                l&apos;échange avec votre situation déjà ouverte.
              </p>
            </>
          )}

          <div style={{ display: "flex", gap: "1em", flexWrap: "wrap", marginTop: "1.8em" }}>
            <a
              className="btn btn--primaire"
              href={CAL}
              target="_blank"
              rel="noopener noreferrer"
              data-ev="cta_cal_succes"
            >
              Choisir mon créneau de 30 minutes <span className="fl">→</span>
            </a>
            <a
              className="btn btn--fantome"
              href={"mailto:contact@arras-patrimoine.fr?subject=" + sujet + "&body=" + corps}
              data-ev="cta_mail_succes"
            >
              Nous écrire directement
            </a>
          </div>

          <div className="cal-embed">
            <iframe
              src={CAL + "?embed=true"}
              title="Réserver 30 minutes avec Arras Patrimoine"
              loading="lazy"
            />
          </div>
          <p style={{ fontSize: "13px", color: "var(--gris-bas)", margin: "1em 0 0" }}>
            Le calendrier ne s&apos;affiche pas ? Utilisez le bouton ci-dessus, il ouvre la même
            page dans un nouvel onglet.
          </p>
        </div>
      </div>
    );
  }

  const erreur = (c) => (manque === c ? { borderColor: "var(--rose)" } : undefined);

  return (
    <form className="form reveal vu" ref={bloc} onSubmit={envoyer}>
      <div className="entete">
        <div className="ligne">
          <span>
            {etape === 1
              ? "Étape 1 sur 4 · votre situation"
              : etape === 2
              ? "Étape 2 sur 4 · ce qui vous amène"
              : etape === 3
              ? "Étape 3 sur 4 · vos coordonnées"
              : "Étape 4 sur 4 · ce que nous avons compris"}
          </span>
          <span>Réponse sous 24 h ouvrées</span>
        </div>
        <div className="jauge">
          <i style={{ width: etape * 25 + "%" }} />
        </div>
        <div className="jalons">
          {["Situation", "Ce qui vous amène", "Coordonnées", "Vérification"].map((nom, i) => (
            <button
              key={nom}
              type="button"
              className={"jalon" + (etape === i + 1 ? " actif" : etape > i + 1 ? " fait" : "")}
              onClick={() => (i + 1 < etape ? setEtape(i + 1) : null)}
              disabled={i + 1 > etape}
            >
              {nom}
            </button>
          ))}
        </div>
      </div>

      <div className="corps">
        {/* ——— ÉTAPE 1 ——— */}
        <div className={"ecran" + (etape === 1 ? " on" : "")}>
          <p className="etape-titre">Les chiffres, en tranches</p>
          <div className="champ">
            <label htmlFor="ch-remuneration">
              Ce que vous vous versez par an, salaire et dividendes confondus
            </label>
            <span className="aide">
              Une tranche suffit, personne ne vous demandera de justificatif. C&apos;est le premier
              chiffre que nous regardons : c&apos;est lui qui dit si un levier existe chez vous.
            </span>
            <select
              id="ch-remuneration"
              value={d.remuneration}
              onChange={maj("remuneration")}
              style={erreur("remuneration")}
            >
              <option value="">Choisir</option>
              <option>Moins de 30 000 €</option>
              <option>30 000 à 50 000 €</option>
              <option>50 000 à 80 000 €</option>
              <option>80 000 à 120 000 €</option>
              <option>Plus de 120 000 €</option>
            </select>
          </div>

          <div className="duo">
            <div className="champ">
              <label htmlFor="ch-composition">Comment cela se compose</label>
              <span className="aide">
                Le mélange compte souvent plus que le montant. « Je ne sais pas exactement » est une
                réponse fréquente et parfaitement recevable.
              </span>
              <select
                id="ch-composition"
                value={d.composition}
                onChange={maj("composition")}
                style={erreur("composition")}
              >
                <option value="">Choisir</option>
                <option>Surtout du salaire</option>
                <option>Surtout des dividendes</option>
                <option>Un mélange des deux</option>
                <option>Je ne sais pas exactement</option>
              </select>
            </div>
            <div className="champ">
              <label htmlFor="ch-statut">Votre statut</label>
              <span className="aide">
                Gérant majoritaire ou président assimilé salarié : les règles ne sont pas les mêmes,
                et les leviers non plus.
              </span>
              <select id="ch-statut" value={d.statut} onChange={maj("statut")} style={erreur("statut")}>
                <option value="">Choisir</option>
                <option>Gérant de SARL ou EURL</option>
                <option>Président de SAS ou SASU</option>
                <option>Profession libérale</option>
                <option>Artisan, bâtiment</option>
                <option>Autre</option>
              </select>
            </div>
          </div>

          <div className="duo">
            <div className="champ">
              <label htmlFor="ch-ca">Chiffre d&apos;affaires annuel</label>
              <span className="aide">
                En dessous de 150 000 €, nous vous le dirons franchement : le levier n&apos;existe pas
                encore, et nous ne serions pas utiles.
              </span>
              <select id="ch-ca" value={d.ca} onChange={maj("ca")} style={erreur("ca")}>
                <option value="">Choisir</option>
                <option>Moins de 150 000 €</option>
                <option>150 000 à 500 000 €</option>
                <option>500 000 € à 1 M€</option>
                <option>1 à 5 M€</option>
                <option>Plus de 5 M€</option>
              </select>
            </div>
            <div className="champ">
              <label htmlFor="ch-suivi">
                Quelqu&apos;un s&apos;occupe-t-il de ce sujet aujourd&apos;hui
              </label>
              <span className="aide">
                Cette question ne cherche pas à savoir si votre expert-comptable est bon. Elle
                cherche à savoir si quelqu&apos;un a le mandat d&apos;arbitrer, ce qui est autre
                chose.
              </span>
              <select id="ch-suivi" value={d.suivi} onChange={maj("suivi")} style={erreur("suivi")}>
                <option value="">Choisir</option>
                <option>Personne</option>
                <option>Mon expert-comptable, quand j&apos;y pense</option>
                <option>Un conseiller, mais je ne suis pas convaincu</option>
                <option>Oui, et je cherche un deuxième avis</option>
              </select>
            </div>
          </div>

          <div style={{ display: "flex", gap: "1.2em", alignItems: "center", flexWrap: "wrap" }}>
            <button
              className="btn btn--primaire"
              type="button"
              onClick={() => aller(2, ["remuneration", "composition", "statut", "ca", "suivi"])}
            >
              Continuer <span className="fl">→</span>
            </button>
            <span className="micro" style={{ margin: 0 }}>
              Aucune coordonnée demandée avant la dernière étape.
            </span>
          </div>
        </div>

        {/* ——— ÉTAPE 2 ——— */}
        <div className={"ecran" + (etape === 2 ? " on" : "")}>
          {d.remuneration && d.statut && d.ca ? (
            <p className="deja">
              Vous nous avez dit : <b>{d.statut}</b>, <b>{d.ca}</b> de chiffre d&apos;affaires,{" "}
              <b>{d.remuneration.toLowerCase()}</b> par an.{" "}
              <button type="button" className="lien" onClick={() => setEtape(1)}>Corriger</button>
            </p>
          ) : null}
          <p className="etape-titre">Ce qui vous amène</p>

          <div className="champ" id="ch-declencheurs">
            <label>Qu&apos;est-ce qui vous a fait ouvrir cette page ?</label>
            <span className="aide">
              Cochez tout ce qui vous parle, même partiellement. C&apos;est la partie que nous lisons
              en premier : elle nous dit par où commencer votre dossier, et elle nous évite de vous
              faire répéter au téléphone.
            </span>
            <div className="cases">
              {DECLENCHEURS.map(([cle, texte]) => {
                const actif = d.declencheurs.includes(cle);
                return (
                  <label
                    className={"case" + (actif ? " on" : "")}
                    key={cle}
                    style={manque === "declencheurs" && !actif ? { borderColor: "var(--rose-30)" } : undefined}
                  >
                    <input type="checkbox" checked={actif} onChange={() => basculer(cle)} />
                    <span>{texte}</span>
                  </label>
                );
              })}
            </div>
          </div>

          <div className="champ">
            <label htmlFor="ch-cout">
              Si rien ne change, qu&apos;est-ce que ça vous coûte chaque année ?
            </label>
            <span className="aide">
              Personne ne le sait précisément, c&apos;est normal : c&apos;est justement ce que la
              mission chiffre. Répondez au feeling, votre intuition nous intéresse autant que le
              chiffre réel.
            </span>
            <select id="ch-cout" value={d.cout} onChange={maj("cout")} style={erreur("cout")}>
              <option value="">Choisir</option>
              {COUTS.map((c) => (
                <option key={c}>{c}</option>
              ))}
            </select>
          </div>

          {conditionnellesActives().map((q) => (
            <div className="champ conditionnelle" key={q.id}>
              <span className="repere">Parce que vous avez coché ci-dessus</span>
              <label htmlFor={"ch-" + q.id}>{q.label}</label>
              <span className="aide">{q.aide}</span>
              <select
                id={"ch-" + q.id}
                value={d.conditionnelles[q.id] || ""}
                onChange={majCond(q.id)}
              >
                <option value="">Choisir</option>
                {q.options.map((o) => (
                  <option key={o}>{o}</option>
                ))}
              </select>
            </div>
          ))}

          <div className="champ">
            <label htmlFor="ch-souhait">
              Et vous, vous voudriez vous verser combien ?
            </label>
            <span className="aide">
              L&apos;écart entre ce que vous vous versez et ce que vous voudriez vous verser, c&apos;est
              exactement le terrain de la mission. Répondez sans vous censurer : ce n&apos;est pas une
              demande, c&apos;est un point de départ.
            </span>
            <select
              id="ch-souhait"
              value={d.souhait}
              onChange={maj("souhait")}
              style={erreur("souhait")}
            >
              <option value="">Choisir</option>
              {SOUHAITS.map((o) => (
                <option key={o}>{o}</option>
              ))}
            </select>
          </div>

          <div className="duo">
            <div className="champ">
              <label htmlFor="ch-echeance">Y a-t-il une échéance qui vous pousse ?</label>
              <span className="aide">
                Une clôture, un emprunt, un associé qui bouge : l&apos;ordre des décisions change
                complètement selon le calendrier.
              </span>
              <select
                id="ch-echeance"
                value={d.echeance}
                onChange={maj("echeance")}
                style={erreur("echeance")}
              >
                <option value="">Choisir</option>
                {ECHEANCES.map((c) => (
                  <option key={c}>{c}</option>
                ))}
              </select>
            </div>
            <div className="champ">
              <label htmlFor="ch-tentative">Qu&apos;avez-vous déjà tenté sur ce sujet ?</label>
              <span className="aide">
                Savoir ce qui n&apos;a pas marché nous évite de vous le reproposer. Aucune réponse
                n&apos;est disqualifiante ici.
              </span>
              <select
                id="ch-tentative"
                value={d.tentative}
                onChange={maj("tentative")}
                style={erreur("tentative")}
              >
                <option value="">Choisir</option>
                {TENTATIVES.map((c) => (
                  <option key={c}>{c}</option>
                ))}
              </select>
            </div>
          </div>

          {(() => {
            const e = estimer(d);
            if (!e) return null;
            if (e.horsCible)
              return (
                <div className="estim estim--hors">
                  <p className="t">Ce que nous voyons déjà</p>
                  <p className="n">En dessous de 150 000 € de chiffre d&apos;affaires, le levier n&apos;existe pas encore.</p>
                  <p className="s">
                    Nous préférons vous le dire maintenant plutôt qu&apos;après vous avoir facturé.
                    Vous pouvez tout de même envoyer votre fiche : nous vous indiquerons par écrit
                    ce qu&apos;il faut regarder à la place, et à partir de quand nous reparler.
                  </p>
                </div>
              );
            return (
              <div className="estim">
                <p className="t">Première estimation, à partir de vos réponses</p>
                <p className="n">
                  Sur un dossier comme le vôtre, l&apos;écart annuel se situe généralement{" "}
                  <em>entre {fmt(e.bas)} et {fmt(e.haut)}</em>.
                </p>
                <div className="dix">
                  <span>Sur dix ans, sans rien faire de plus :</span>
                  <b>{fmt(e.dix[0])} à {fmt(e.dix[1])}</b>
                </div>
                <p className="s">
                  Fourchette indicative calculée sur trois de vos réponses, sans avoir vu vos
                  comptes. Elle ne vaut pas engagement : un dossier sur cinq se conclut par « ne
                  changez rien », et nous vous le dirons par écrit si c&apos;est le vôtre.
                </p>
              </div>
            );
          })()}

          <div style={{ display: "flex", gap: "1.2em", alignItems: "center", flexWrap: "wrap" }}>
            <button
              className="btn btn--primaire"
              type="button"
              onClick={() => aller(3, ["declencheurs", "cout", "souhait", "echeance", "tentative"])}
            >
              Continuer <span className="fl">→</span>
            </button>
            <button className="btn btn--texte" type="button" onClick={() => setEtape(1)}>
              Revenir en arrière
            </button>
          </div>
        </div>

        {/* ——— ÉTAPE 3 ——— */}
        <div className={"ecran" + (etape === 3 ? " on" : "")}>
          <p className="etape-titre">Pour vous répondre</p>

          <div className="champ">
            <label htmlFor="ch-reussite">
              Dans six mois, à quoi verrez-vous que c&apos;était la bonne décision ?
            </label>
            <span className="aide">
              Une phrase suffit, écrite comme vous la diriez. C&apos;est la question la plus utile de
              toute cette fiche : elle nous donne votre critère de réussite à vous, pas le nôtre, et
              c&apos;est sur celui-là que nous vous rendrons des comptes au trentième jour.
            </span>
            <textarea
              id="ch-reussite"
              placeholder="Par exemple : je me verse 1 500 € de plus par mois sans que ça coûte plus cher à la société."
              value={d.reussite}
              onChange={maj("reussite")}
            />
            <p className="compteur-mots">{d.reussite.trim() ? d.reussite.trim().split(/\s+/).length : 0} mots</p>
          </div>

          <div className="duo">
            <div className="champ">
              <label htmlFor="ch-prenom">Prénom</label>
              <input
                id="ch-prenom"
                type="text"
                autoComplete="given-name"
                required
                placeholder="Jean"
                value={d.prenom}
                onChange={maj("prenom")}
              />
            </div>
            <div className="champ">
              <label htmlFor="ch-nom">Nom</label>
              <input
                id="ch-nom"
                type="text"
                autoComplete="family-name"
                required
                placeholder="Dupont"
                value={d.nom}
                onChange={maj("nom")}
              />
            </div>
          </div>

          <div className="champ">
            <label htmlFor="ch-societe">Nom de votre société</label>
            <span className="aide">
              Celle qui vous verse votre rémunération. S&apos;il y en a plusieurs, indiquez la
              principale, nous verrons les autres ensemble.
            </span>
            <input
              id="ch-societe"
              type="text"
              autoComplete="organization"
              required
              placeholder="Dupont & Fils"
              value={d.societe}
              onChange={maj("societe")}
            />
          </div>

          <div className="duo">
            <div className="champ">
              <label htmlFor="ch-email">E-mail</label>
              <input
                id="ch-email"
                type="email"
                required
                placeholder="vous@societe.fr"
                value={d.email}
                onChange={maj("email")}
              />
            </div>
            <div className="champ">
              <label htmlFor="ch-telephone">Téléphone</label>
              <input
                id="ch-telephone"
                type="tel"
                required
                placeholder="06 00 00 00 00"
                value={d.telephone}
                onChange={maj("telephone")}
              />
            </div>
          </div>

          <div className="champ">
            <label htmlFor="ch-precision">Quelque chose que nous devrions savoir ?</label>
            <span className="aide">
              Facultatif. Un associé compliqué, un dossier en cours, une contrainte familiale, une
              mauvaise expérience : dites-le ici plutôt que de le découvrir en séance.
            </span>
            <textarea
              id="ch-precision"
              placeholder="Facultatif."
              value={d.precision}
              onChange={maj("precision")}
            />
          </div>

          <div style={{ display: "flex", gap: "1.2em", alignItems: "center", flexWrap: "wrap" }}>
            <button
              className="btn btn--primaire"
              type="button"
              onClick={() => aller(4, ["prenom", "nom", "societe", "email", "telephone"])}
            >
              Voir ce que nous avons compris <span className="fl">→</span>
            </button>
            <button className="btn btn--texte" type="button" onClick={() => setEtape(2)}>
              Revenir en arrière
            </button>
          </div>

        </div>

        {/* ——— ÉTAPE 4 · RÉCAPITULATIF ——— */}
        <div className={"ecran" + (etape === 4 ? " on" : "")}>
          <p className="etape-titre">Ce que nous avons compris</p>

          <div className="recap">
            <span className="entete-recap">
              {d.prenom ? d.prenom + ", votre situation telle que nous la lisons" : "Votre situation, telle que nous la lisons"}
            </span>
            <p className="phrase">{phraseRecap(d)}</p>
            <p className="lecture">
              Si cette phrase est juste, c&apos;est déjà un point de départ : la plupart des
              dirigeants ne l&apos;ont jamais vue écrite. Si elle est fausse quelque part, corrigez
              avant d&apos;envoyer, c&apos;est elle que nous lirons en premier.
            </p>
            {(() => {
              const e = estimer(d);
              if (!e || e.horsCible) return null;
              return (
                <p className="lecture" style={{ color: "#F2C4D5" }}>
                  Sur cette base, l&apos;écart annuel que nous irions chercher se situe entre{" "}
                  {fmt(e.bas)} et {fmt(e.haut)}. C&apos;est ce chiffre que la mission vérifie, poste
                  par poste, sur vos comptes réels.
                </p>
              );
            })()}
            <div className="lignes">
              {lignesRecap(d).map(([k, v]) => (
                <div className="l" key={k}>
                  <span>{k}</span>
                  <b>{v}</b>
                </div>
              ))}
            </div>
            <div className="modifier">
              <button className="btn btn--texte" type="button" onClick={() => setEtape(1)}>
                Corriger une réponse
              </button>
            </div>
          </div>

          <div style={{ display: "flex", gap: "1.2em", alignItems: "center", flexWrap: "wrap" }}>
            <button
              className="btn btn--primaire"
              type="submit"
              disabled={etat === "envoi"}
              data-ev="submit"
            >
              {etat === "envoi" ? "Envoi en cours…" : "C'est juste, faites examiner ma situation"}{" "}
              <span className="fl">→</span>
            </button>
            <button className="btn btn--texte" type="button" onClick={() => setEtape(3)}>
              Revenir en arrière
            </button>
          </div>

          {etat === "erreur" ? (
            <p style={{ color: "#E85D8A", fontSize: "14.5px", margin: 0 }}>
              L&apos;envoi n&apos;a pas abouti. Réessayez, ou écrivez directement à
              contact@arras-patrimoine.fr en indiquant votre statut et ce que vous vous versez.
            </p>
          ) : null}

          <div className="ensuite">
            <div>
              <span className="t">ENSUITE · 1</span>Nous lisons votre fiche en entier et nous
              vérifions si le levier existe chez vous.
            </div>
            <div>
              <span className="t">ENSUITE · 2</span>Jérémy ou Marie-Amélie vous répond sous deux
              heures ouvrées, en reprenant ce que vous avez écrit.
            </div>
            <div>
              <span className="t">ENSUITE · 3</span>Si le dossier tient, on cale trente minutes.
              Sinon, on vous dit quoi regarder à la place.
            </div>
          </div>

          <p style={{ fontSize: "13.5px", color: "var(--gris-bas)", margin: 0 }}>
            Vos informations servent uniquement à qualifier votre dossier. Aucune inscription à une
            liste de diffusion, aucun partage avec un tiers, aucune relance automatique.
          </p>
        </div>
      </div>
    </form>
  );
}
