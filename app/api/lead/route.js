export const runtime = "nodejs";
export const dynamic = "force-dynamic";

import { phraseRecap } from "../../../components/recapitulatif";
import { CONDITIONNELLES } from "../../../components/donnees";

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

  // Hors cible
  if (p.ca === "Moins de 150 000 €") {
    alertes.push("CA sous le seuil de 150 000 € : hors cible annoncée sur la page.");
    note -= 5;
  }

  // Capacité à récupérer
  if (["50 000 à 80 000 €", "80 000 à 120 000 €", "Plus de 120 000 €"].includes(p.remuneration)) note += 2;
  if (p.remuneration === "Moins de 30 000 €" && p.ca !== "Moins de 150 000 €") {
    note += 3;
    alertes.push("Plafond mental probable : se verse peu alors que la société tourne. Scène 01.");
  }
  if (["1 à 5 M€", "Plus de 5 M€", "500 000 € à 1 M€"].includes(p.ca)) note += 2;

  // Vacance du poste d'arbitrage
  if (p.suivi === "Personne") note += 3;
  if (p.suivi === "Un conseiller, mais je ne suis pas convaincu") note += 3;
  if (p.suivi === "Oui, et je cherche un deuxième avis") note += 2;

  // Urgence
  if (p.echeance && p.echeance !== "Rien de précis, mais ça traîne depuis trop longtemps") note += 3;

  // Conscience du coût
  if (p.cout === "Plus de 30 000 € par an") note += 3;
  if (p.cout === "Entre 10 000 et 30 000 € par an") note += 2;
  if (p.cout === "Rien du tout, je veux juste une vérification") note -= 1;

  // Historique
  if (p.tentative === "J'ai déjà été accompagné, et ça n'a rien donné") {
    alertes.push("Déjà déçu par un accompagnement : insister sur le livrable écrit et les verrous.");
  }
  if (p.tentative === "J'ai été démarché, mais on voulait me vendre un produit") {
    alertes.push("Méfiance produit : ouvrir sur les trois verrous, aucun produit maison.");
  }
  if (p.tentative === "J'en ai parlé à mon expert-comptable, sans suite concrète") {
    alertes.push("Objection reine probable : préparer la scène tripartite.");
  }

  if (p.composition === "Je ne sais pas exactement") {
    alertes.push("Ne sait pas comment sa rémunération se compose : forte valeur pédagogique.");
  }
  if (p.declencheurs.length >= 3) note += 1;

  // L'écart entre ce qu'il se verse et ce qu'il voudrait : le signal d'achat le plus fort.
  if (p.souhait === "Beaucoup plus, ma rémunération n'a rien à voir avec ce que produit la société") {
    note += 4;
    alertes.push("Écart perçu très fort entre production et rémunération : levier d'ouverture évident.");
  }
  if (p.souhait === "Nettement plus, de l'ordre de 1 000 à 2 000 € par mois") note += 3;
  if (p.souhait === "Un peu plus, quelques centaines d'euros par mois") note += 1;
  if (p.souhait === "Je ne cherche pas à me verser plus, je cherche à mieux protéger ce que j'ai") {
    alertes.push("Entrée par la protection, pas par le montant : ouvrir sur la prévoyance et la famille.");
  }

  const temperature = note >= 8 ? "CHAUD" : note >= 4 ? "TIÈDE" : note >= 0 ? "FROID" : "HORS CIBLE";
  return { note, temperature, alertes };
}


// —— Copie par mail vers le cabinet. Silencieuse si Resend n'est pas configuré. ——
async function envoyerCopie({ titre, description, p, temperature }) {
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
        subject: `[${temperature}] ${identite} — ${p.statut || "dirigeant"}`,
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
    "Sa situation en une phrase (déjà validée par lui à l'écran de confirmation) :",
    "  " + phraseRecap(p),
    "",
    p.reussite ? `Son critère de réussite à lui : « ${p.reussite} »` : "Critère de réussite : non renseigné, à faire formuler en séance.",
    p.echeance ? `Échéance : ${p.echeance}` : "",
    alertes.length ? "" : null,
    ...(alertes.length ? ["Points d'attention :", ...alertes.map((a) => "  · " + a)] : []),
    "",
    "———— CE QUI L'AMÈNE ————",
    ...(p.declencheurs.length ? p.declencheurs.map((k) => "  · " + TEXTES[k]) : ["  · non renseigné"]),
    `Coût estimé par lui : ${p.cout || "non renseigné"}`,
    `Ce qu'il voudrait se verser : ${p.souhait || "non renseigné"}`,
    ...Object.entries(p.conditionnelles)
      .filter(([, v]) => v)
      .map(([id, v]) => {
        const q = Object.values(CONDITIONNELLES).find((c) => c.id === id);
        return "  · " + (q ? q.label : id) + " → " + v;
      }),
    `Déjà tenté : ${p.tentative || "non renseigné"}`,
    p.precision ? `À savoir : ${p.precision}` : "",
    "",
    "———— SA SITUATION ————",
    `Rémunération annuelle (salaire + dividendes) : ${p.remuneration}`,
    `Composition : ${p.composition}`,
    `Statut : ${p.statut}`,
    `Société : ${p.societe || "non renseignée"}`,
    `Chiffre d'affaires : ${p.ca}`,
    `Quelqu'un s'en occupe aujourd'hui : ${p.suivi}`,
    "",
    "———— CONTACT ————",
    `Nom : ${identite}`,
    `E-mail : ${p.email}`,
    `Téléphone : ${p.telephone}`,
    "",
    "Source : landing Cap. (cap.arras-patrimoine.fr)",
  ]
    .filter((l) => l !== "" && l !== null)
    .join("\n");

  const sousDomaine = (process.env.NOCRM_SUBDOMAIN || "")
    .trim()
    .replace(/^https?:\/\//, "")
    .replace(/\.nocrm\.io.*$/, "")
    .replace(/\/$/, "");
  const cle = (process.env.NOCRM_API_KEY || "").trim();

  // La copie mail part toujours, que noCRM réponde ou non.
  const copie = envoyerCopie({ titre, description, p, temperature });

  if (!sousDomaine || !cle) {
    console.warn("[cap] noCRM non configuré — lead journalisé :", titre);
    console.warn(description);
    await copie;
    return Response.json({ ok: true, mode: "journal" });
  }

  try {
    const r = await fetch(`https://${sousDomaine}.nocrm.io/api/v2/leads`, {
      method: "POST",
      headers: { "Content-Type": "application/json", "X-API-KEY": cle },
      body: JSON.stringify({
        title: titre,
        description,
        tags: ["CAP", "landing", temperature, p.statut, dominant ? "declencheur:" + dominant : null].filter(Boolean),
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
      const m = await copie;
      return Response.json({ ok: true, mode: "journal", mail: m.ok });
    }
    const m = await copie;
    return Response.json({ ok: true, mode: "nocrm", mail: m.ok });
  } catch (e) {
    console.error("[cap] noCRM injoignable :", e);
    console.error(description);
    const m = await copie;
    return Response.json({ ok: true, mode: "journal", mail: m.ok });
  }
}

// —— Diagnostic : ouvrir https://cap.arras-patrimoine.fr/api/lead dans le navigateur. ——
// Ne révèle aucune valeur, seulement la présence des variables.
export async function GET(request) {
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
    version: "v5",
    variables: {
      NOCRM_API_KEY: process.env.NOCRM_API_KEY ? "présente" : "MANQUANTE",
      NOCRM_SUBDOMAIN: process.env.NOCRM_SUBDOMAIN || "MANQUANTE",
      RESEND_API_KEY: process.env.RESEND_API_KEY ? "présente" : "manquante (copie mail désactivée)",
      LEAD_EMAIL_TO: process.env.LEAD_EMAIL_TO || "défaut : contact@arras-patrimoine.fr",
    },
  });
}
