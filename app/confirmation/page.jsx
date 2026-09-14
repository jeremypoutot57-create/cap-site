import Video from "../../components/Video";
import PixelContact from "../../components/PixelContact";

export const metadata = {
  title: "Rendez-vous confirmé — Cap. par Arras Patrimoine",
  description: "Votre rendez-vous est confirmé. Ce qui va se passer, ce qu'il faut préparer, et les réponses aux questions qu'on nous pose à chaque premier appel.",
  alternates: { canonical: "/confirmation" },
  robots: { index: false, follow: false },
};

const NURTURING = process.env.NEXT_PUBLIC_BUNNY_NURTURING || process.env.NEXT_PUBLIC_BUNNY_VIDEO;

const FAQ = [
  ["Pourquoi mon expert-comptable ne le fait pas ?", "Parce que ce n'est pas dans son métier, et ce n'est pas un reproche. Il lui manque trois choses : le temps, la vision de votre foyer, et la revoyure. Il fait très bien les comptes, la paie et le déclaratif. Mesurer votre enveloppe dirigeant sur votre capacité réelle, pro et perso, et la revoir chaque année, ce n'est pas dedans."],
  ["Et si j'ai un contrôle, vous êtes là ?", "Deux étages. Le fond : on travaille sur la réglementation en vigueur, du droit positif, chaque décision est écrite avec sa référence, jamais un « je pense que ». La ceinture : la stratégie peut être approuvée par un avocat partenaire avant que vous signiez quoi que ce soit. Et une question en retour : votre situation actuelle, elle, a été validée par qui ?"],
  ["Combien de temps ça me prend, à moi ?", "Comptez trois à quatre heures au total, réparties sur le mois : une séance de cadrage, une séance d'arbitrage, une restitution, et le temps de rassembler vos documents. Le reste du travail est chez nous."],
  ["Mes chiffres sont-ils confidentiels ?", "Oui. Les documents transitent par un espace dédié, ils ne sont partagés avec aucun tiers sans votre accord écrit, et l'avocat partenaire n'intervient que si vous choisissez l'option d'approbation. Les dossiers publiés sont anonymisés en typologies et le seront toujours."],
  ["Faut-il venir à Arras ?", "Non. Toute la mission se déroule en visio, séances d'arbitrage comprises, et nous travaillons avec des dirigeants partout en France. Si vous êtes dans les Hauts-de-France et que vous préférez venir au cabinet, boulevard de Strasbourg, c'est possible."],
  ["Et si vous ne trouvez rien ?", "Ça arrive, et on le dit. Vous repartez quand même avec la cartographie complète de votre enveloppe, chiffrée, et la confirmation écrite que votre situation actuelle est la bonne."],
];

export default function PageConfirmation() {
  return (
    <div className="page">
      <PixelContact />
      <header className="entete">
        <div className="in">
          <span className="wordmark">Cap<span className="pt">.</span></span>
        </div>
      </header>

      <section className="hero">
        <div className="wrap wrap--etroit">
          <div className="pour-qui"><i>✓</i> Rendez-vous confirmé</div>
          <h1>C&apos;est calé. Voilà ce qui va se passer.</h1>
          <p className="promesse">
            Vous recevez le lien de visio par mail dans les prochaines minutes. Avant l&apos;échange, prenez quelques
            minutes pour regarder la vidéo ci-dessous : elle vous fera gagner la moitié du rendez-vous.
          </p>

          <div className="recu">
            <div className="l"><span>Avec</span><b>Jérémy Poutot</b></div>
            <div className="l"><span>Durée</span><b>25 minutes, en visio</b></div>
            <div className="l"><span>Quand</span><b>La date et l&apos;heure sont dans votre mail de confirmation</b></div>
          </div>

          <div style={{ marginTop: "1.8rem" }}>
            <Video video={NURTURING} titre="Ce qu'on va regarder ensemble" auto={false} />
          </div>

          <div className="prep">
            <div><b>À PRÉPARER</b><p>Ce que vous vous êtes versé l&apos;an dernier, salaire et dividendes confondus, même approximativement. Aucun document à préparer.</p></div>
            <div><b>À SAVOIR</b><p>Ce n&apos;est pas un rendez-vous commercial. On regarde votre situation, et on vous dit si Cap. a sa place ou non.</p></div>
            <div><b>SI EMPÊCHEMENT</b><p>Un lien de report est dans le mail de confirmation. Prévenez-nous, le créneau repart à quelqu&apos;un d&apos;autre.</p></div>
          </div>
        </div>
      </section>

      <section className="sombre">
        <div className="wrap wrap--etroit">
          <span className="eyebrow">Avant qu&apos;on s&apos;appelle</span>
          <h2>Les questions qu&apos;on nous pose à chaque premier appel</h2>
          <div className="faq">
            {FAQ.map(([q, r]) => (
              <details key={q}>
                <summary>{q}</summary>
                <div className="rep"><p>{r}</p></div>
              </details>
            ))}
          </div>
        </div>
      </section>

      <footer className="pied">
        <div className="in">
          <span className="wordmark" style={{ fontSize: 19 }}>Cap<span className="pt">.</span></span>
          <a href="https://www.arras-patrimoine.fr">Arras Patrimoine</a>
          <span>contact@arras-patrimoine.fr</span>
        </div>
      </footer>
    </div>
  );
}
