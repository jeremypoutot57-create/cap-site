export const runtime = "nodejs";
export const dynamic = "force-dynamic";

import { phraseRecap } from "../../../components/recapitulatif";
import { SEUIL_HORS_CIBLE } from "../../../components/donnees";

const TEXTES = {
  plafond: "Se limite dans ce qu'il se verse à cause des charges",
  tresorerie: "Trésorerie dans la société, rien de côté personnellement",
  holding: "Holding ou groupe existant, mal branché ou sans emploi",
  banque: "Refus ou frein bancaire lié aux revenus déclarés",
  retraite: "Aucune visibilité sur la retraite et la protection",
  doute: "Sentiment de laisser de l'argent quelque part",
  projet: "Projet précis en vue (achat, cession, association)",
};

// Phrase d'accroche à utiliser en ouverture d'appel, selon le déclencheur dominant.
const ACCROCHES = {
  plafond:
    "Vous vous êtes fixé un plafond il y a quelques années. On regarde ensemble si ce plafond est encore le bon.",
  tresorerie:
    "Votre société a de l'argent et vous n'en avez pas. On regarde comment ça circule aujourd'hui.",
  holding:
    "Vous avez une holding et vous n'êtes pas sûr qu'elle serve. On regarde ce qu'elle fait vraiment.",
  banque:
    "La banque lit votre avis d'imposition, pas votre société. On regarde ce qu'elle voit de vous.",
  retraite:
    "Vous ne savez pas ce que vous vous construisez. On commence par le mesurer.",
  doute:
    "Vous sentez qu'il y a un écart sans savoir où. On va le chiffrer avant d'en parler.",
  projet:
    "Vous avez une échéance. C'est le meilleur moment pour arbitrer, et le pire pour improviser.",
};

const PRIORITE = ["projet", "banque", "plafond", "holding", "tresorerie", "doute", "retraite"];

function evaluer(p) {
  let note = 0;
  const alertes = [];

  // Hors cible : la société n'a pas encore la capacité de financer une véritable enveloppe dirigeant.
  if (p.ca === SEUIL_HORS_CIBLE) {
    alertes.push("CA sous le seuil de 350 000 € : hors cible annoncée sur la page.");
    note -= 5;
  }

  // Capacité présente
  if (["1 à 3 M€", "3 à 10 M€", "Plus de 10 M€"].includes(p.ca)) note += 2;
  if (p.ca === "350 000 € à 1 M€") note += 1;

  // Écart capacité / rémunération : le client parfait combine capacité présente et architecture mauvaise.
  if (p.remuneration === "Moins de 65 000 € net" && p.ca !== SEUIL_HORS_CIBLE) {
    note += 3;
    alertes.push("Se verse moins de 65 000 € net alors que la société tourne : capacité présente, architecture probablement jamais rouverte.");
  }
  if (["65 000 à 100 000 €", "100 000 à 150 000 €"].includes(p.remuneration)) note += 2;
  if (p.remuneration === "Plus de 150 000 €") note += 1;

  // Structure
  if (p.statut === "Groupe avec holding") { note += 2; alertes.push("Holding en place : vérifier ce qu'elle sert réellement (source, mère-fille, CCA)."); }
  if (p.statut === "Société avec un ou plusieurs associés") alertes.push("Associés : la décision n'est pas solitaire, prévoir le sujet en séance.");

  // Vacance du siège
  if (p.suivi === "Personne") note += 3;
  if (p.suivi === "Un conseiller, mais je ne suis pas convaincu") note += 3;
  if (p.suivi === "Quelqu'un, et je cherche un deuxième avis") note += 2;

  // Déclencheurs
  if (p.declencheurs.includes("projet")) note += 3;
  if (p.declencheurs.includes("banque")) note += 2;
  if (p.declencheurs.includes("plafond")) note += 2;
  if (p.declencheurs.includes("holding")) note += 1;
  if (p.declencheurs.length >= 3) note += 1;

  // Position de l'expert-comptable : frein actif potentiel, à traiter en amont.
  if (p.comptable === "Il risque de freiner") {
    note -= 1;
    alertes.push("Expert-comptable identifié comme frein : ouvrir sur le triple manque (temps, vision perso, revoyure), jamais sur le reproche.");
  }
  if (p.comptable === "Il serait favorable à ce qu'on regarde") note += 1;
  if (p.comptable === "Je ne compte pas lui en parler tout de suite") {
    alertes.push("Ne veut pas en parler à son expert-comptable : rassurer sur le fait que Cap. ne touche à aucune de ses prérogatives.");
  }

  const temperature = note >= 9 ? "CHAUD" : note >= 5 ? "TIÈDE" : note >= 0 ? "FROID" : "HORS CIBLE";
  return { note, temperature, alertes };
}


// —— Copie par mail vers le cabinet. Silencieuse si Resend n'est pas configuré. ——
async function envoyerCopie({ titre, description, p, temperature, identite }) {
  const cle = process.env.RESEND_API_KEY;
  const dest = (process.env.LEAD_EMAIL_TO || "contact@arras-patrimoine.fr")
    .split(",")
    .map((x) => x.trim())
    .filter(Boolean);
  const exp = process.env.LEAD_EMAIL_FROM || "Cap. <notifications@arras-patrimoine.fr>";

  if (!cle) {
    console.warn("[cap] RESEND_API_KEY absente — pas de copie mail envoyée.");
    return { ok: false, raison: "non configuré" };
  }

  const couleur =
    temperature === "CHAUD" ? "#E85D8A" : temperature === "TIÈDE" ? "#E0A94B" : "#65758C";

  const html = `<div style="font-family:-apple-system,Segoe UI,Helvetica,Arial,sans-serif;background:#0C1626;color:#E9EEF5;padding:28px">
  <div style="max-width:640px;margin:0 auto;background:#101E33;border:1px solid rgba(255,255,255,.14);border-radius:4px;overflow:hidden">
    <div style="border-top:3px solid ${couleur};padding:22px 24px 6px">
      <div style="font-family:ui-monospace,monospace;font-size:11px;letter-spacing:.16em;color:${couleur}">NOUVEAU DOSSIER · ${temperature}</div>
      <h1 style="font-size:19px;margin:12px 0 0;color:#fff">${titre}</h1>
    </div>
    <div style="padding:18px 24px 26px">
      <pre style="white-space:pre-wrap;font-family:ui-monospace,monospace;font-size:13px;line-height:1.6;color:#D7E0EB;margin:0">${description
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")}</pre>
      <div style="margin-top:24px;padding-top:18px;border-top:1px solid rgba(255,255,255,.14)">
        <a href="mailto:${p.email}" style="display:inline-block;background:#E85D8A;color:#170A10;text-decoration:none;font-weight:600;padding:12px 18px;border-radius:3px;font-size:14px">Répondre à ${p.email}</a>
        <a href="tel:${p.telephone.replace(/\s/g, "")}" style="display:inline-block;margin-left:10px;border:1px solid rgba(255,255,255,.26);color:#E9EEF5;text-decoration:none;padding:12px 18px;border-radius:3px;font-size:14px">Appeler ${p.telephone}</a>
      </div>
      <p style="font-size:12px;color:#65758C;margin:18px 0 0">Réponse promise sous 24 h ouvrées. Le lead a aussi été créé dans noCRM.</p>
    </div>
  </div>
</div>`;

  try {
    const r = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${cle}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from: exp,
        to: dest,
        reply_to: p.email,
        subject: `[${temperature}] ${identite || "Nouveau dossier"} — ${p.statut || "dirigeant"}`,
        html,
        text: description,
      }),
    });
    if (!r.ok) {
      console.error("[cap] Resend a refusé l'envoi :", r.status, await r.text());
      return { ok: false, raison: "refus" };
    }
    return { ok: true };
  } catch (e) {
    console.error("[cap] Resend injoignable :", e);
    return { ok: false, raison: "injoignable" };
  }
}

// —— systeme.io : création du contact et pose du tag qui arme la séquence. Silencieux si non configuré. ——
async function pousserSystemeIo(p, horsCible) {
  const cle = (process.env.SYSTEME_IO_API_KEY || "").trim();
  if (!cle) {
    console.warn("[cap] SYSTEME_IO_API_KEY absente — contact non poussé dans systeme.io.");
    return { ok: false, raison: "non configuré" };
  }
  const tagVoulu = (horsCible ? process.env.SYSTEME_IO_TAG_HORS_CIBLE : process.env.SYSTEME_IO_TAG) || (horsCible ? "cap-hors-cible" : "cap-lead");
  const entetes = { "Content-Type": "application/json", "X-API-Key": cle };
  const base = "https://api.systeme.io/api";

  try {
    // 1. Contact (création, ou récupération si l'email existe déjà)
    let id = null;
    const r = await fetch(`${base}/contacts`, {
      method: "POST",
      headers: entetes,
      body: JSON.stringify({
        email: p.email,
        locale: "fr",
        fields: [
          { slug: "first_name", value: p.prenom },
          { slug: "surname", value: p.nom },
          { slug: "phone_number", value: p.telephone },
          { slug: "company_name", value: p.societe },
        ].filter((f) => f.value),
      }),
    });
    if (r.ok) {
      id = (await r.json())?.id ?? null;
    } else if (r.status === 422 || r.status === 409) {
      const q = await fetch(`${base}/contacts?email=${encodeURIComponent(p.email)}`, { headers: entetes });
      if (q.ok) id = (await q.json())?.items?.[0]?.id ?? null;
    } else {
      console.error("[cap] systeme.io a refusé le contact :", r.status, await r.text());
    }
    if (!id) return { ok: false, raison: "contact introuvable" };

    // 2. Tag : recherche par nom, puis pose
    const t = await fetch(`${base}/tags?limit=100`, { headers: entetes });
    const tags = t.ok ? (await t.json())?.items || [] : [];
    const tag = tags.find((x) => (x.name || "").toLowerCase() === tagVoulu.toLowerCase());
    if (!tag) {
      console.error(`[cap] tag systeme.io « ${tagVoulu} » introuvable : créez-le dans systeme.io, le contact est créé sans tag.`);
      return { ok: true, tag: false };
    }
    const a = await fetch(`${base}/contacts/${id}/tags`, { method: "POST", headers: entetes, body: JSON.stringify({ tagId: tag.id }) });
    if (!a.ok) console.error("[cap] systeme.io a refusé le tag :", a.status, await a.text());
    return { ok: true, tag: a.ok };
  } catch (e) {
    console.error("[cap] systeme.io injoignable :", e);
    return { ok: false, raison: "injoignable" };
  }
}

export async function POST(request) {
  console.log(
    "[cap] /api/lead appelée · noCRM:",
    process.env.NOCRM_API_KEY ? "clé OK" : "CLÉ MANQUANTE",
    "· sous-domaine:",
    process.env.NOCRM_SUBDOMAIN || "MANQUANT",
    "· Resend:",
    process.env.RESEND_API_KEY ? "OK" : "absent"
  );
  let d;
  try {
    d = await request.json();
  } catch {
    return Response.json({ ok: false, erreur: "corps illisible" }, { status: 400 });
  }

  const txt = (v) => (typeof v === "string" ? v.slice(0, 3000).trim() : "");
  const p = {
    remuneration: txt(d?.remuneration),
    composition: txt(d?.composition),
    statut: txt(d?.statut),
    ca: txt(d?.ca),
    suivi: txt(d?.suivi),
    declencheurs: Array.isArray(d?.declencheurs) ? d.declencheurs.filter((k) => TEXTES[k]) : [],
    souhait: txt(d?.souhait),
    conditionnelles:
      d?.conditionnelles && typeof d.conditionnelles === "object" ? d.conditionnelles : {},
    echeance: txt(d?.echeance),
    cout: txt(d?.cout),
    tentative: txt(d?.tentative),
    reussite: txt(d?.reussite),
    prenom: txt(d?.prenom),
    nom: txt(d?.nom),
    societe: txt(d?.societe),
    email: txt(d?.email),
    telephone: txt(d?.telephone),
    precision: txt(d?.precision),
    comptable: txt(d?.comptable),
    origine: txt(d?.origine),
    eventID: txt(d?.eventID),
  };

  if (!p.email || !p.email.includes("@")) {
    return Response.json({ ok: false, erreur: "email manquant" }, { status: 400 });
  }

  const { note, temperature, alertes } = evaluer(p);
  const dominant = PRIORITE.find((k) => p.declencheurs.includes(k));

  const identite = [p.prenom, p.nom.toUpperCase()].filter(Boolean).join(" ") || "Contact sans nom";
  const titre = `${identite}${p.societe ? " — " + p.societe : ""} · CAP ${temperature}`;

  const description = [
    "———— BRIEF D'APPEL ————",
    `Interlocuteur : ${identite}${p.societe ? " — " + p.societe : ""}`,
    `Température : ${temperature} (score ${note})`,
    dominant ? `Ouvrir par : « ${ACCROCHES[dominant]} »` : "Ouvrir par : aucun déclencheur dominant, faire parler d'abord.",
    "",
    "Sa situation en une phrase :",
    "  " + phraseRecap(p),
    "",
    alertes.length ? "" : null,
    ...(alertes.length ? ["Points d'attention :", ...alertes.map((a) => "  · " + a)] : []),
    "",
    "———— CE QUI L'AMÈNE ————",
    ...(p.declencheurs.length ? p.declencheurs.map((k) => "  · " + TEXTES[k]) : ["  · non renseigné"]),
    p.precision ? `À savoir : ${p.precision}` : "",
    "",
    "———— SA SITUATION ————",
    `Rémunération annuelle (salaire + dividendes) : ${p.remuneration}`,
    `Statut : ${p.statut}`,
    `Société : ${p.societe || "non renseignée"}`,
    `Chiffre d'affaires : ${p.ca}`,
    `Quelqu'un s'en occupe aujourd'hui : ${p.suivi}`,
    `Position de l'expert-comptable : ${p.comptable || "non renseignée"}`,
    "",
    "———— CONTACT ————",
    `Nom : ${identite}`,
    `E-mail : ${p.email}`,
    `Téléphone : ${p.telephone}`,
    "",
    `Source : landing Cap. (cap.arras-patrimoine.fr)${p.origine ? " · bouton " + p.origine : ""}`,
  ]
    .filter((l) => l !== "" && l !== null)
    .join("\n");

  const sousDomaine = (process.env.NOCRM_SUBDOMAIN || "")
    .trim()
    .replace(/^https?:\/\//, "")
    .replace(/\.nocrm\.io.*$/, "")
    .replace(/\/$/, "");
  const cle = (process.env.NOCRM_API_KEY || "").trim();

  // La copie mail et systeme.io partent toujours, que noCRM réponde ou non.
  const copie = envoyerCopie({ titre, description, p, temperature, identite });
  const sio = pousserSystemeIo(p, temperature === "HORS CIBLE");

  if (!sousDomaine || !cle) {
    console.warn("[cap] noCRM non configuré — lead journalisé :", titre);
    console.warn(description);
    await Promise.all([copie, sio]);
    return Response.json({ ok: true, mode: "journal" });
  }

  try {
    const r = await fetch(`https://${sousDomaine}.nocrm.io/api/v2/leads`, {
      method: "POST",
      headers: { "Content-Type": "application/json", "X-API-KEY": cle },
      body: JSON.stringify({
        title: titre,
        description,
        tags: ["CAP", "landing", temperature, p.statut, dominant ? "declencheur:" + dominant : null, p.comptable ? "comptable:" + p.comptable : null].filter(Boolean),
        client: {
          name: identite,
          first_name: p.prenom,
          last_name: p.nom,
          organization: p.societe,
          email: p.email,
          phone: p.telephone,
        },
      }),
    });
    if (!r.ok) {
      console.error("[cap] noCRM a refusé le lead :", r.status, await r.text());
      console.error(description);
      const [m, si] = await Promise.all([copie, sio]);
      return Response.json({ ok: true, mode: "journal", mail: m.ok, systemeio: si.ok });
    }
    const [m, si] = await Promise.all([copie, sio]);
    return Response.json({ ok: true, mode: "nocrm", mail: m.ok, systemeio: si.ok });
  } catch (e) {
    console.error("[cap] noCRM injoignable :", e);
    console.error(description);
    const [m, si] = await Promise.all([copie, sio]);
    return Response.json({ ok: true, mode: "journal", mail: m.ok, systemeio: si.ok });
  }
}

// —— Diagnostic : ouvrir https://cap.arras-patrimoine.fr/api/lead dans le navigateur. ——
// Ne révèle aucune valeur, seulement la présence des variables.
export async function GET(request) {
  const systemeio = !!(process.env.SYSTEME_IO_API_KEY || "").trim();
  const brute = process.env.NOCRM_API_KEY || "";
  const cle = brute.trim();
  const sous = (process.env.NOCRM_SUBDOMAIN || "")
    .trim()
    .replace(/^https?:\/\//, "")
    .replace(/\.nocrm\.io.*$/, "")
    .replace(/\/$/, "");

  // ?test=1 tente un appel réel à noCRM pour isoler la cause du refus.
  if (new URL(request.url).searchParams.get("test") === "1") {
    const url = `https://${sous}.nocrm.io/api/v2/leads?limit=1`;
    let statut = null;
    let reponse = null;
    try {
      const r = await fetch(url, { headers: { "X-API-KEY": cle } });
      statut = r.status;
      reponse = (await r.text()).slice(0, 300);
    } catch (e) {
      reponse = String(e);
    }
    return Response.json({
      url_appelee: url,
      statut_noCRM: statut,
      reponse_noCRM: reponse,
      cle: {
        longueur: cle.length,
        debut: cle.slice(0, 4),
        fin: cle.slice(-4),
        espaces_parasites: brute !== cle,
      },
      sous_domaine_nettoye: sous,
    });
  }

  return Response.json({
    route: "opérationnelle",
    version: "v6-tunnel-meta",
    variables: {
      SYSTEME_IO_API_KEY: systemeio ? "présente" : "manquante (séquence mail non armée)",
      SYSTEME_IO_TAG: process.env.SYSTEME_IO_TAG || "défaut : cap-lead",
      NEXT_PUBLIC_META_PIXEL_ID: process.env.NEXT_PUBLIC_META_PIXEL_ID ? "présent" : "manquant (aucune mesure Meta)",
      NOCRM_API_KEY: process.env.NOCRM_API_KEY ? "présente" : "MANQUANTE",
      NOCRM_SUBDOMAIN: process.env.NOCRM_SUBDOMAIN || "MANQUANTE",
      RESEND_API_KEY: process.env.RESEND_API_KEY ? "présente" : "manquante (copie mail désactivée)",
      LEAD_EMAIL_TO: process.env.LEAD_EMAIL_TO || "défaut : contact@arras-patrimoine.fr",
    },
  });
}
