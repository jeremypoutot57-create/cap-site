export default function Schema() {
  const boites = [
    ["Expert-comptable", "Tient les comptes, une société à la fois", "Ne voit pas votre foyer"],
    ["Banquier", "Lit vos revenus déclarés", "Ne voit pas la holding"],
    ["Assureur", "Place de la couverture", "Ne voit pas l'arbitrage"],
    ["Notaire", "Intervient le jour venu", "Ne voit pas le flux"],
  ];
  return (
    <div className="figure reveal">
      <div className="fig-titre">
        <b>Ce que chacun voit de votre rémunération</b>
        <span>Quatre spécialistes compétents, aucun mandat pour regarder l&apos;ensemble</span>
      </div>
      <div className="perimetres">
        {boites.map(([nom, fait, angle]) => (
          <div className="perim" key={nom}>
            <b>{nom}</b>
            <p>{fait}</p>
            <p className="angle">{angle}</p>
          </div>
        ))}
      </div>
      <div className="ligne-cap">
        <span>La ligne que Cap. occupe</span>
      </div>
      <div className="vous">Vous, qui voyez tout et n&apos;avez pas le temps</div>
    </div>
  );
}
