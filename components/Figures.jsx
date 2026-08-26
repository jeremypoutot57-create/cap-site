/* Schémas de la page. Une idée par figure, pas plus. */

export function FigTrajet() {
  return (
    <div className="figure reveal">
      <div className="fig-titre">
        <b>Sur 100 € produits, ce qui arrive vraiment chez vous</b>
        <span>Illustration de principe, le vrai chiffre dépend de votre dossier</span>
      </div>
      <div className="trajet">
        <div className="etape-t"><b>100 €</b><span>produits par la société</span></div>
        <div className="fuite-t"><i /><small>charges sociales</small></div>
        <div className="etape-t"><b>≈ 62 €</b><span>après les charges</span></div>
        <div className="fuite-t"><i /><small>impôt du foyer</small></div>
        <div className="etape-t rose"><b>≈ 44 €</b><span>réellement chez vous</span></div>
      </div>
      <p className="fig-note">
        Cap. ne change pas ce que la société produit. Il change la forme, la source et le moment de
        ce que vous vous versez : c&apos;est là que se joue l&apos;écart entre 44 et davantage.
      </p>
    </div>
  );
}

export function FigCalendrier() {
  return (
    <div className="figure reveal">
      <div className="fig-titre">
        <b>Trente jours, trois temps</b>
        <span>Trois à quatre heures de votre côté, le reste chez nous</span>
      </div>
      <div className="calendrier">
        <div className="cal-t a"><b>Auditer</b><span>Collecte et mesure</span></div>
        <div className="cal-t b"><b>Arbitrer</b><span>Séance de décision avec vous</span></div>
        <div className="cal-t c"><b>Documenter</b><span>Rédaction et remise du plan</span></div>
      </div>
      <div className="cal-jours"><span>Jours 1 à 10</span><span>Jours 11 à 20</span><span>Jours 21 à 30</span></div>
    </div>
  );
}

// Remplace la courbe sur dix ans : deux barres, une lecture immédiate.
export function Repetition() {
  return (
    <div className="repetition reveal">
      <div className="rep-l">
        <span>Première année</span>
        <div className="rep-b"><i style={{ width: "10%" }} /></div>
        <b>30 000 €</b>
      </div>
      <div className="rep-l">
        <span>Sur dix ans, si rien ne change</span>
        <div className="rep-b"><i style={{ width: "100%" }} /></div>
        <b>300 000 €</b>
      </div>
      <p>
        Une correction de trajectoire ne rapporte pas une fois : elle se répète chaque année tant que
        la situation reste la même. C&apos;est pour ça qu&apos;un dossier vaut d&apos;être regardé
        maintenant plutôt que l&apos;an prochain.
      </p>
    </div>
  );
}
