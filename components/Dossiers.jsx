import { DOSSIERS, DOSSIERS_GRILLE } from "./donnees";

// Trois typologies lues à la même grille : mêmes intitulés, même ordre, même unité.
// Sur grand écran les cartes partagent leurs rangées (subgrid), donc les lignes s'alignent
// d'une carte à l'autre et l'œil compare sans effort.
export default function Dossiers() {
  return (
    <div className="u-dossiers">
      {DOSSIERS.map((d) => (
        <article className="u-dossier" key={d.type}>
          <header className="u-dossier-tete">
            <span className="u-dossier-type">{d.type}</span>
            <span className="u-dossier-profil">{d.profil}</span>
          </header>

          <p className="u-dossier-avant">{d.depart}</p>

          <div className="u-dossier-grille">
            {DOSSIERS_GRILLE.map((intitule, n) => (
              <div className="u-dossier-l" key={intitule}>
                <span>{intitule}</span>
                {d.valeurs[n] ? <b>{d.valeurs[n]}</b> : <b className="u-dossier-vide">à chiffrer</b>}
              </div>
            ))}
          </div>

          <p className="u-dossier-detail">{d.detail}</p>
          <p className="u-dossier-chute">{d.chute}</p>
        </article>
      ))}
    </div>
  );
}
