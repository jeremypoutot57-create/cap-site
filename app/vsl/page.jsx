import Video from "../../components/Video";
import VslVerrou from "../../components/VslVerrou";

export const metadata = {
  title: "Cap. — Ce que coûte réellement chaque euro que vous vous versez",
  description:
    "Vingt-six minutes. Jérémy Poutot et Marie-Amélie ouvrent un dossier réel et déroulent la méthode Cap., sans rien vendre. Le questionnaire s'ouvre après la vidéo.",
  alternates: { canonical: "/vsl" },
  robots: { index: false, follow: false },
};

const VSL = process.env.NEXT_PUBLIC_BUNNY_VSL || process.env.NEXT_PUBLIC_BUNNY_VIDEO;

export default function PageVsl() {
  return (
    <div className="page vsl-page">
      <div className="vsl-wrap">
        <span className="wordmark" style={{ fontSize: 21, display: "block", marginBottom: "1.6rem" }}>
          Cap<span className="pt">.</span>
        </span>

        <p className="vsl-mention">
          Cap. est une mission d&apos;ingénierie de rémunération. Aucune promesse de résultat, aucun produit financier à
          souscrire. Les situations évoquées dans cette vidéo sont des projections à droit constant sur dossiers réels,
          anonymisées et sans valeur d&apos;engagement. Arras Patrimoine, ORIAS n° 20006891.
        </p>

        <h1 className="vsl-h1">
          Ce que vous coûte <span className="surligne">réellement chaque euro</span> que vous vous versez
        </h1>
        <p className="vsl-sous">
          Jérémy Poutot et Marie-Amélie ouvrent un dossier réel et déroulent la méthode, sans rien vendre.
        </p>

        <div style={{ marginTop: "1.8rem" }}>
          <Video video={VSL} titre="Cap. — la vidéo" auto={false} />
        </div>

        <VslVerrou />
      </div>
    </div>
  );
}
