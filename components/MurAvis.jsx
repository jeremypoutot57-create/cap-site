import { AVIS, NOTE_GOOGLE } from "./donnees";

const ETOILES = "★★★★★";

function initiales(nom) {
  return nom
    .split(/[\s.]+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((m) => m[0])
    .join("")
    .toUpperCase();
}

function Google() {
  return (
    <svg className="u-avis-g" width="15" height="15" viewBox="0 0 48 48" role="img" aria-label="Google">
      <path fill="#4285F4" d="M45 24c0-1.6-.1-2.7-.4-4H24v8h12c-.2 2-1.5 5-4.4 7l6.7 5.2C42.2 36.6 45 30.9 45 24z" />
      <path fill="#34A853" d="M24 46c5.9 0 10.9-2 14.5-5.3l-6.9-5.4c-1.9 1.3-4.4 2.2-7.6 2.2-5.8 0-10.7-3.8-12.5-9.1l-7.1 5.5C8.1 41.1 15.5 46 24 46z" />
      <path fill="#FBBC05" d="M11.5 28.4c-.5-1.4-.7-2.9-.7-4.4s.3-3 .7-4.4l-7.1-5.5C2.9 17 2 20.4 2 24s.9 7 2.4 9.9l7.1-5.5z" />
      <path fill="#EA4335" d="M24 10.2c3.2 0 6.1 1.1 8.4 3.3l6.3-6.2C34.9 3.9 29.9 2 24 2 15.5 2 8.1 6.9 4.4 14.1l7.1 5.5c1.8-5.3 6.7-9.4 12.5-9.4z" />
    </svg>
  );
}

function Carte({ avis }) {
  const [nom, role, texte] = avis;
  return (
    <article className="u-avis">
      <div className="u-avis-tete">
        <span className="u-avis-av" aria-hidden="true">{initiales(nom)}</span>
        <span className="u-avis-qui">
          <span className="u-avis-nom">{nom}</span>
          <span className="u-avis-role">{role}</span>
        </span>
        <Google />
      </div>
      <span className="u-avis-et" aria-label="5 étoiles sur 5">{ETOILES}</span>
      <p>« {texte} »</p>
    </article>
  );
}

// Deux lignes qui défilent en sens inverse. Chaque ligne répète son lot jusqu'à remplir la largeur,
// puis le tout est dupliqué une fois : c'est ce qui rend la boucle invisible à -50 %.
function ligne(lot, inverse) {
  let suite = [];
  while (suite.length < 8) suite = suite.concat(lot);
  if (inverse) suite = suite.slice().reverse();
  return suite.concat(suite);
}

export default function MurAvis() {
  if (!AVIS.length) return null;
  const pair = AVIS.length < 4 ? AVIS : AVIS.filter((_, n) => n % 2 === 0);
  const impair = AVIS.length < 4 ? AVIS : AVIS.filter((_, n) => n % 2 === 1);

  return (
    <section id="temoignages">
      <div className="wrap">
        <div className="u-temo-tete">
          <div>
            <span className="eyebrow">Ils l&apos;ont vécu</span>
            <h2 className="u-h2">Des dirigeants comme vous</h2>
          </div>
          <a className="u-note" href={NOTE_GOOGLE.lien} target="_blank" rel="noopener noreferrer">
            <span className="u-note-n">{NOTE_GOOGLE.note}</span>
            <span className="u-note-d">
              <span className="u-note-et">{ETOILES}</span>
              <span className="u-note-src">{NOTE_GOOGLE.nombre} avis publics sur Google</span>
            </span>
            <span className="u-note-fl">→</span>
          </a>
        </div>
      </div>

      <div className="u-mur" aria-label="Avis publiés sur Google">
        <div className="u-mur-ligne">
          {ligne(pair, false).map((a, n) => (
            <Carte key={"a" + n} avis={a} />
          ))}
        </div>
        <div className="u-mur-ligne u-mur-ligne--inv">
          {ligne(impair, true).map((a, n) => (
            <Carte key={"b" + n} avis={a} />
          ))}
        </div>
      </div>

      <div className="wrap">
        <p className="u-mur-note">
          Avis publics reproduits tels quels, sans sélection ni retouche. Ils concernent l&apos;ensemble des missions
          d&apos;Arras Patrimoine, pas uniquement Cap.
        </p>
      </div>
    </section>
  );
}
