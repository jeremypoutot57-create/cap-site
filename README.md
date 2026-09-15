# Cap. — landing page du tunnel Meta

Site Next.js 14 (App Router) déployé sur Vercel. Trois routes et une API.

| Route | Rôle |
|---|---|
| `/` | Landing page, approche Ultra, alignée sur le Product Marketing Context du 14/09/2026. Bouton unique « Faire examiner mon dossier » qui ouvre le quiz en superposition. |
| `/vsl` | Page VSL pure pour le trafic chaud (lien en bio, retargeting, séquence mail). Le questionnaire n'apparaît qu'après `NEXT_PUBLIC_VSL_SECONDES` de visionnage. Non indexée. |
| `/confirmation` | Page d'atterrissage après réservation Cal. Vidéo de nurturing, préparation de l'appel, FAQ. Déclenche l'événement Meta **Contact**. Non indexée. |
| `/api/lead` | Reçoit le quiz, calcule la température, crée le lead noCRM, pousse le contact dans systeme.io avec le tag, envoie la copie Resend. `GET /api/lead` affiche la présence des variables. |

## Le tunnel

1. Clic sur n'importe quel bouton → quiz en superposition, trois écrans (situation, ce qui vous amène, coordonnées). Événement custom `QuizOuvert`.
2. Validation des coordonnées → événement **Lead** (avec `eventID` pour une future déduplication API de conversions) → `POST /api/lead` → noCRM + systeme.io (`cap-lead`) + copie mail.
3. Dossier recevable (CA ≥ 350 k€) → calendrier Cal affiché **dans le panneau**, nom et e-mail pré-remplis. Dossier hors cible → message de refus, tag `cap-hors-cible`, lien vers Les Planches.
4. Réservation Cal → redirection vers `/confirmation` (réglage côté Cal) → événement **Contact**.

## Déploiement

```bash
npm install
cp .env.example .env.local   # puis remplir
npm run dev                  # http://localhost:3000
npm run build                # vérification avant push
```

Sur GitHub → Vercel : importer le dépôt, framework Next.js détecté automatiquement, renseigner les variables de `.env.example` dans *Settings → Environment Variables* (Production + Preview), déployer. Domaine `cap.arras-patrimoine.fr` à pointer sur Vercel (CNAME `cname.vercel-dns.com`).

## Réglages hors code, à faire une fois

**Cal**, événement `post-reservation` (25 min) → paramètres avancés : redirection après réservation vers `https://cap.arras-patrimoine.fr/confirmation`, transmission des paramètres activée.

**systeme.io** : créer les tags `cap-lead` et `cap-hors-cible`, la campagne « Cap. examen de dossier » (7 mails du kit nurturing) déclenchée par le tag `cap-lead`, et la règle « tag `cap-rdv-pris` → sortie de campagne ». Le tag `cap-rdv-pris` se pose via un webhook Cal → systeme.io (ou manuellement le temps de le brancher).

**Meta** : le pixel `1532209741677590` est déjà câblé (repli dans `components/pixel.js`, surchargeable par `NEXT_PUBLIC_META_PIXEL_ID`). Rien à faire pour qu'il parte. Une fois en ligne, vérifier dans le Gestionnaire d'événements que `PageView`, `Lead` et `Contact` remontent (outil de test d'événements, en collant l'URL de la page). Objectif de conversion des campagnes : **Lead**. `QuizOuvert` est un événement personnalisé, utile en audience de reciblage (a ouvert le questionnaire sans le finir).

## Contenu

Toute la copy vit dans `app/page.jsx` (landing), `app/vsl/page.jsx`, `app/confirmation/page.jsx`. Les listes du quiz et le seuil hors cible sont dans `components/donnees.js`. Le barème de température est dans `app/api/lead/route.js` (`evaluer`). Aucun mot banni du PMC dans le texte client : pas d'« optimisation fiscale », de « montage » seul, de « coaching », d'« accompagnement » pour décrire Cap., de « placement ».

Photo d'équipe : `public/equipe.jpg` (1400 px, 16:9).

## Événements de mesure

`components/pixel.js` centralise le pixel Meta ; `components/mesure.js` pousse en parallèle dans `dataLayer` (GA4/GTM) et Plausible si présent. Événements : `quiz_ouvert`, `quiz_etape_1`, `quiz_etape_2`, `lead`, `video_auto`, `video_son_active`, `vsl_seuil`, `rdv_confirme`.
