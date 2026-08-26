# Cap. — landing de la stratégie de rémunération du dirigeant

Site satellite d'Arras Patrimoine, destiné au sous-domaine `cap.arras-patrimoine.fr`.
Next.js 14 (App Router), aucun framework CSS, aucune dépendance superflue.

## Démarrer en local

```bash
npm install
cp .env.example .env.local   # puis renseigner les variables
npm run dev                  # http://localhost:3000
```

## Variables d'environnement

| Variable | Obligatoire | Rôle |
|---|---|---|
| `NOCRM_SUBDOMAIN` | oui | Sous-domaine noCRM, sans `.nocrm.io` |
| `NOCRM_API_KEY` | oui | Clé API noCRM. **À régénérer** : l'ancienne a transité par une discussion |
| `RESEND_API_KEY` | oui | Clé Resend pour la copie mail du lead |
| `LEAD_EMAIL_TO` | non | Destinataires, séparés par des virgules. Défaut : `contact@arras-patrimoine.fr` |
| `LEAD_EMAIL_FROM` | non | Expéditeur, sur un domaine vérifié dans Resend |
| `NEXT_PUBLIC_SITE_URL` | oui | `https://cap.arras-patrimoine.fr` |
| `NEXT_PUBLIC_CAL_URL` | non | Lien Cal, par défaut `.../decouverte-rem` |
| `NEXT_PUBLIC_BUNNY_LIBRARY` | non | Bibliothèque Bunny, par défaut `602292` |
| `NEXT_PUBLIC_BUNNY_VIDEO` | non | Identifiant de la vidéo |
| `NEXT_PUBLIC_MOIS_COURANT` | non | Bloc capacité : mois en cours de constitution |
| `NEXT_PUBLIC_PROCHAINE_OUVERTURE` | non | Bloc capacité : prochaine ouverture |
| `NEXT_PUBLIC_PLAUSIBLE_DOMAIN` | non | Active le script Plausible |
| `NEXT_PUBLIC_GA_ID` | non | Réservé si vous branchez GA4 via GTM |

### Deux canaux, aucun lead perdu

Chaque envoi part vers **noCRM** (création du lead par l'API) **et** vers votre boîte mail (copie
complète du brief d'appel, avec un bouton répondre et un bouton appeler). Les deux sont
indépendants : si noCRM tombe, le mail part quand même, et inversement. En dernier recours, le lead
est journalisé dans les logs Vercel. Le visiteur voit toujours l'écran de succès.

Le champ `reply_to` du mail est l'adresse du dirigeant : vous répondez directement depuis votre
boîte, sans copier-coller.

**Mise en route de Resend.** Créer un compte sur resend.com, ajouter le domaine
`arras-patrimoine.fr`, copier les enregistrements DNS proposés (un TXT de vérification, un CNAME ou
TXT DKIM, éventuellement un TXT DMARC) dans la zone DNS Infomaniak, attendre la validation, puis
générer une clé API et la coller dans les variables Vercel. Tant que le domaine n'est pas vérifié,
Resend refuse les envois : c'est normal et c'est ce qui vous évite le dossier spam.

**La clé noCRM.** Celle qui a servi en août a transité par une discussion : la révoquer dans noCRM,
en générer une neuve, et la saisir uniquement dans les variables d'environnement Vercel. Jamais
dans le dépôt.

## Déploiement GitHub puis Vercel

```bash
git init && git add . && git commit -m "Cap. v2"
git remote add origin git@github.com:VOTRE-COMPTE/cap-arras-patrimoine.git
git push -u origin main
```

Sur Vercel : *Add New Project*, importer le dépôt, framework détecté automatiquement,
ajouter les variables d'environnement, déployer. Puis *Settings → Domains* et ajouter
`cap.arras-patrimoine.fr`. Chez Infomaniak, faire pointer l'enregistrement `cap` en `CNAME`
vers `cname.vercel-dns.com`.

## Ce qui reste à faire avant la mise en ligne

1. **La ventilation des 30 000 €.** Le tableau de la section preuve porte encore des `[LOCK]`.
   Les remplir dans `app/page.jsx` (constante `POSTES` dans `components/donnees.js` pour les
   libellés, valeurs dans le tableau). Renseigner aussi le secteur et la tranche de CA du dossier.
2. **Les deux photos.** Déposer `public/jeremy.jpg` et `public/marie-amelie.jpg`, puis remplacer
   les blocs `<div className="ph">[LOCK]</div>` par les `<img className="ph" />` commentés à côté.
3. **Le bloc capacité.** Renseigner `NEXT_PUBLIC_MOIS_COURANT` et `NEXT_PUBLIC_PROCHAINE_OUVERTURE`,
   ou supprimer le bloc `.capacite` si vous ne voulez pas le tenir à jour.
4. **La mesure.** Renseigner `NEXT_PUBLIC_PLAUSIBLE_DOMAIN`, ou poser GTM dans `app/layout.jsx`.
5. **Le maillage.** Ajouter depuis les Planches 02, 07, 08 et 18 du hub un lien vers ce sous-domaine.

## Le questionnaire et le brief d'appel

Le questionnaire tient en quatre écrans : la situation en tranches, ce qui l'amène, les
coordonnées, puis le récapitulatif. Chaque question porte une aide en clair qui explique pourquoi
elle est posée : c'est ce qui fait accepter des questions plus intimes que la moyenne.

**Questions conditionnelles.** Cocher un déclencheur à l'écran 2 ouvre une question de relance
propre à ce déclencheur (holding, banque, trésorerie, projet, protection), trois au maximum pour ne
pas alourdir. Elles vivent dans `CONDITIONNELLES` (`components/donnees.js`) : ajouter une entrée
suffit, l'affichage suit.

**Écart souhaité.** La question « vous voudriez vous verser combien » est le meilleur signal
d'achat de toute la fiche : l'écart entre ce qu'il se verse et ce qu'il voudrait est le terrain
exact de la mission. Elle pèse jusqu'à 4 points dans le score.

**Récapitulatif.** Avant l'envoi, le dirigeant lit sa propre situation reformulée en une phrase
(`components/recapitulatif.js`, partagé entre le front et la route API). Le voir écrit produit un
choc que le formulaire seul ne produit pas, et le brief noCRM porte la même phrase, déjà validée
par lui : vous ouvrez l'appel dessus.

La route `/api/lead` ne se contente pas de recopier les réponses. Elle calcule une température
(CHAUD, TIÈDE, FROID, HORS CIBLE) et compose un **brief d'appel** placé en tête de la fiche noCRM :
la phrase d'ouverture à utiliser selon le déclencheur dominant, le critère de réussite formulé par
le prospect lui-même, l'échéance, et les points d'attention (déjà déçu, méfiance produit, objection
reine attendue). Le barème vit dans `evaluer()` : ajustez-le après vos trente premiers appels,
c'est fait pour.

Les tags posés sur le lead : `CAP`, `landing`, la température, le statut, et le déclencheur
dominant sous la forme `declencheur:plafond`.

## Événements mesurés

`video_lecture`, `scroll_25` à `scroll_100`, `micro_engagement` (avec la tranche choisie),
`form_demarre`, `form_etape2`, `form_etape3`, `lead_envoye` (avec déclencheurs et échéance),
`faq_ouverte`, et `clic_*` pour chaque CTA
identifié par emplacement (`cta_header`, `cta_milieu`, `cta_apres_preuve`, `cta_flottant`,
`cta_cal_hero`, `cta_cal_milieu`, `cta_cal_preuve`, `sortie_planches`).

Tout passe par `window.dataLayer` et par Plausible si présent : voir `components/mesure.js`.

## Structure

```
app/
  layout.jsx        métadonnées, polices, script de mesure
  page.jsx          les 20 blocs de la landing (composant serveur)
  globals.css       tout le design system
  robots.js         indexation ouverte + sitemap
  sitemap.js
  api/lead/route.js création du lead noCRM
components/
  Fx.jsx            révélations, compteurs, mesure du scroll et des clics
  MicroEngagement   la question unique du hero
  Formulaire.jsx    le questionnaire en trois écrans + écran de succès avec Cal embarqué
  Video.jsx         Bunny en click-to-play
  BarreFlottante    CTA mobile
  Schema.jsx        FIG. 01, la ligne d'arbitrage
  donnees.js        contenu éditorial (scènes, livrables, avis, FAQ, critères)
  jsonld.js         balisage schema.org
public/llms.txt     fiche destinée aux moteurs génératifs
```

## Règles à ne pas casser

- Aucun label ne sort de sa boîte dans le SVG : mono 10 px maximum, 24 caractères par ligne.
- Le rose `#E85D8A` ne sert jamais de fond de section : trait, surligneur, point de marque, CTA.
- Le vocabulaire : ingénierie et stratégie de rémunération, jamais « optimisation fiscale »,
  jamais de pourcentage de gain. La validation juridique appartient à l'avocat partenaire.
- Sous chaque `h2`, le paragraphe `.reponse` répond avant de développer : c'est ce bloc que les
  moteurs génératifs découpent et citent.
