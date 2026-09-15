"use client";
import { useCallback, useState } from "react";
import Video from "../components/Video";
import Quiz from "../components/Quiz";
import Effets from "../components/Effets";
import Collant from "../components/Collant";
import MurAvis from "../components/MurAvis";
import Dossiers from "../components/Dossiers";

export default function Page() {
  const [quiz, setQuiz] = useState(false);
  const [origine, setOrigine] = useState("");
  const ouvrir = useCallback((o) => { setOrigine(o); setQuiz(true); }, []);
  const fermer = useCallback(() => setQuiz(false), []);

  return (
    <>
      <Effets />
      <div className="fond" aria-hidden="true" />
      <div className="page">
      <header className="entete">
          <div className="in">
            <span className="wordmark">Cap<span className="pt">.</span></span>
            <nav className="u-nav">
              <a href="#fondateur">L'équipe</a>
              <a href="#methode">Méthode</a>
              <a href="#leviers">Ce qu'on rouvre</a>
              <a href="#dossiers">Dossiers</a>
              <a href="#faq">FAQ</a>
            </nav>
            <button className="btn btn--primaire" onClick={() => ouvrir("entete")}><span className="u-long">Faire examiner mon dossier</span><span className="u-court">Mon dossier</span></button>
          </div>
        </header>

        {/* ①  HERO */}
        <section className="hero" id="hero">
          <div className="wrap">
            <div className="hero-grid">
              <div className="hero-txt">
                <div className="pour-qui"><i>✓</i> <span className="u-long">Dirigeants de PME · à partir de 350 k€ de chiffre d'affaires</span><span className="u-court">Dirigeants de PME · dès 350 k€ de CA</span></div>
                <h1>Vous décidez de tout dans votre boîte.<br /><span className="surligne">Sauf de ce que vous gagnez.</span></h1>
                <p className="promesse">Cap. chiffre ce que vous coûte réellement chaque euro que vous vous versez, projette au minimum trois architectures de rémunération sur votre dossier réel, et vous rend la décision. Trente jours.</p>
              </div>

              <div className="u-lecteur">
                <Video />
              </div>

              <div className="cta-zone hero-cta" id="cta-hero" style={{ marginTop: "0" }}>
                <button className="btn btn--primaire btn--large" onClick={() => ouvrir("hero")}>Faire examiner mon dossier <span className="fl">→</span></button>
                <p className="micro"><span className="u-long">100 % gratuit · sans engagement · réponse sous 24 h ouvrées</span><span className="u-court">Gratuit · sans engagement · réponse sous 24 h</span></p>
              </div>
            </div>
          </div>

          <div className="u-bande" aria-label="Ce qu'on entend au premier appel">
            <div className="u-defile">
              <span>« Je facture 80 k par mois et je me paie 2 500 balles »</span><span>« Si je me paie plus, je vais me faire allumer par l'URSSAF »</span><span>« J'voulais regarder si c'était fiable »</span><span>« Personne me l'avait jamais montré comme ça »</span><span>« J'aurais dû faire ça il y a cinq ans »</span><span>« Je facture 80 k par mois et je me paie 2 500 balles »</span><span>« Si je me paie plus, je vais me faire allumer par l'URSSAF »</span><span>« J'voulais regarder si c'était fiable »</span><span>« Personne me l'avait jamais montré comme ça »</span><span>« J'aurais dû faire ça il y a cinq ans »</span>
            </div>
          </div>
        </section>

        {/* ②  LE SIÈGE VIDE */}
        <section className="sombre" id="siege">
          <div className="wrap">
            <span className="eyebrow">Le constat</span>
            <h2 className="u-h2">Personne ne fait mal son travail autour de vous.<br />Personne n'a pour métier votre rémunération.</h2>
            <p className="lead">Votre expert-comptable tient les comptes, la paie, le déclaratif. Il constate votre rémunération, il ne la conçoit pas. Votre banquier tient le crédit. Votre assureur tient les contrats. Chacun tient sa brique, et vos experts ne se sont jamais parlé. Entre eux, un siège reste vide : celui de la vision d'ensemble, pro et perso. Vous payez ce malentendu depuis des années.</p>

            <div className="u-siege">
              <div className="u-brique"><b>L'expert-comptable</b><span>Constate et déclare. Regarde la société, jamais le foyer.</span></div>
              <div className="u-brique"><b>Le banquier</b><span>Lit votre avis d'imposition, pas votre capacité réelle.</span></div>
              <div className="u-brique u-brique--vide"><b>Le siège vide</b><span>Qui décide de la forme, de la source, du moment et du montant de ce que vous vous versez ? Personne.</span></div>
              <div className="u-brique"><b>L'assureur</b><span>Distribue ses contrats. Ne relit jamais votre prévoyance.</span></div>
              <div className="u-brique"><b>Le conseiller</b><span>Commence quand l'argent est déjà sorti.</span></div>
            </div>
          </div>
        </section>

        {/* ③  L'ÉQUIPE */}
        <section id="fondateur">
          <div className="wrap">
            <span className="eyebrow">Qui occupe le siège</span>
            <h2 className="u-h2">Un ingénieur patrimonial et juriste.<br />Qui parle en dirigeant.</h2>

            <figure className="u-equipe">
              <img src="/equipe.jpg" alt="Jérémy Poutot, entouré de Manon et Marie-Amélie, à la table de séance du cabinet" loading="lazy" />
              <figcaption>
                <span className="u-eq-nom">Jérémy Poutot</span>
                <span className="u-eq-role">Fondateur · ingénieur patrimonial et juriste du patrimoine</span>
                <span className="u-eq-avec">Entouré de Manon, protection du dirigeant, et de Marie-Amélie, ingénierie et scénarios.</span>
              </figcaption>
            </figure>

            <div className="u-fondateur">
              <div className="u-fondateur-txt">
                <h3 className="u-h3">Jérémy n'enseigne pas une méthode.<br />Il l'a construite dossier après dossier.</h3>
                <p className="u-citation">« J'ai appris à regarder un dossier par ce qui peut casser, avant de regarder ce qu'il peut rapporter. Une architecture qui ne tient pas le jour d'un contrôle, d'un divorce ou d'un accident n'est pas une architecture. »</p>
                <p>Deux masters en stratégies sociétaires et ingénierie patrimoniale, douze ans de pratique, plus de huit sociétés opérées en propre. Il lit à la fois vos statuts, votre bilan, votre prévoyance et votre régime matrimonial, et il vous parle comme un dirigeant parle à un dirigeant, pas comme un conseiller d'en haut. Sept ans de missions de stratégie de rémunération, plus de cent clients, sans une ligne de publicité.</p>
              </div>
              <div className="u-trio">
                <div className="u-trio-item">
                  <span className="u-trio-num">01</span>
                  <b>Jérémy mène l'arbitrage</b>
                  <p>C'est lui qui déroule les scénarios en séance, qui tranche ce qui est défendable de ce qui ne l'est pas, et qui signe le livrable.</p>
                </div>
                <div className="u-trio-item">
                  <span className="u-trio-num">02</span>
                  <b>Marie-Amélie bâtit les scénarios</b>
                  <p>Elle ouvre les liasses, chiffre chaque architecture jusqu'à l'euro et reste votre interlocutrice pendant les trente jours. C'est elle qui trouve la ligne qui manque.</p>
                </div>
                <div className="u-trio-item">
                  <span className="u-trio-num">03</span>
                  <b>Manon tient la protection</b>
                  <p>Prévoyance, retraite, couverture du conjoint. Ce que l'architecture doit sécuriser avant de parler de ce qu'elle peut rapporter.</p>
                </div>
              </div>
            </div>

            <div className="u-cotes" id="cotes">
              <div className="u-cote"><b data-n="12">0</b><span>ans de pratique<br />auprès de dirigeants</span></div>
              <div className="u-cote"><b data-n="100" data-suffixe="+">0</b><span>clients en stratégie<br />de rémunération</span></div>
              <div className="u-cote"><b data-n="8">0</b><span>experts salariés<br />au cabinet</span></div>
              <div className="u-cote"><b data-n="15">0</b><span>experts externes<br />mobilisables</span></div>
              <div className="u-cote"><b data-n="3">0</b><span>scénarios chiffrés<br />au minimum</span></div>
            </div>
          </div>
        </section>

        {/* ④  MÉTHODE */}
        <section className="sombre" id="methode">
          <div className="wrap">
            <span className="eyebrow">La méthode</span>
            <h2 className="u-h2">Trois temps. Zéro théorie.</h2>
            <p className="lead">Trente jours à compter de la réception de vos pièces. Trois à quatre heures de votre temps. Tout en visio, où que vous soyez. Et à la fin, ce n'est pas nous qui choisissons : là où d'autres vendent une solution, Cap. vous rend la capacité de choisir.</p>

            <div className="u-plan" id="plan">
              <div className="u-plan-regle" aria-hidden="true">
                <span className="u-plan-trait"><i /></span>
                <span className="u-plan-j" style={{ left: "0%" }}>J 1</span>
                <span className="u-plan-j" style={{ left: "33.3%" }}>J 10</span>
                <span className="u-plan-j" style={{ left: "66.6%" }}>J 20</span>
                <span className="u-plan-j" style={{ left: "100%" }}>J 30</span>
              </div>

              <div className="u-plan-temps">
                <article className="u-temps">
                  <span className="u-temps-num">01</span>
                  <span className="u-temps-role">Le pré-audit · jours 1 à 10</span>
                  <h3>Votre situation, éclairée</h3>
                  <p>Une heure avec Jérémy pour comprendre comment vous fonctionnez, pro et perso. Puis vos pièces, et sous 96 heures un call de confirmation : ce que vous avez dit, ce que montrent vos documents, et ce dont vous avez besoin, mis en concordance.</p>
                  <span className="u-temps-sortie">Vous recevez <b>la cartographie de votre enveloppe</b></span>
                </article>
                <article className="u-temps">
                  <span className="u-temps-num">02</span>
                  <span className="u-temps-role">Les projections · jours 11 à 20</span>
                  <h3>Trois architectures, chiffrées</h3>
                  <p>Au minimum trois scénarios d'architecture de rémunération, projetés sur votre dossier réel. Pour chacun, ce que ça coûte, ce que ça protège, ce que ça permet côté foyer et côté société. Du droit positif, des dispositifs existants, rien qui ne s'assume devant l'administration.</p>
                  <span className="u-temps-sortie">Vous recevez <b>les scénarios et leurs conséquences</b></span>
                </article>
                <article className="u-temps u-temps--fin">
                  <span className="u-temps-num">03</span>
                  <span className="u-temps-role">La décision · jours 21 à 30</span>
                  <h3>Vous choisissez. Vos conseils appliquent.</h3>
                  <p>Un call de validation pour conforter le scénario que vous retenez et projeter la suite. Le livrable cite ses références légales, et il est remis à votre expert-comptable avec de quoi exécuter. Vous devez pouvoir défendre chaque ligne vous-même.</p>
                  <span className="u-temps-sortie u-temps-sortie--fin">Vous recevez <b>votre stratégie, écrite et référencée</b></span>
                </article>
              </div>
            </div>

            <div className="u-engagements">
              <b>Ce qui est écrit dans la lettre de mission</b>
              <div>
                <p>Au minimum trois scénarios d'architecture chiffrés sur votre dossier réel.</p>
                <p>Livrés sous trente jours à compter du dossier complet.</p>
                <p>Un périmètre défini noir sur blanc, une responsabilité civile professionnelle derrière.</p>
              </div>
              <small>Pas de miracle remboursable. Des engagements écrits sur ce que vous recevez, comme toute profession sérieuse.</small>
            </div>

            <div className="cta-zone">
              <button className="btn btn--primaire" onClick={() => ouvrir("methode")}>Faire examiner mon dossier <span className="fl">→</span></button>
              <p className="micro">100 % gratuit · sans engagement</p>
            </div>
          </div>
        </section>

        {/* ⑤  LES QUATRE DÉCISIONS */}
        <section id="leviers">
          <div className="wrap">
            <span className="eyebrow">Ce qu'on rouvre</span>
            <h2 className="u-h2">Quatre décisions.<br />Que personne ne prend à votre place.</h2>
            <p className="lead">Pas une formation. Pas de la théorie. Quatre décisions qui fixent à elles seules le coût de chaque euro que vous vous versez, et qu'aucun de vos conseils n'a pour métier de regarder ensemble.</p>

            <div className="u-poles">
              <div className="u-pole">
                <div className="u-pole-visuel u-pole-visuel--forme" aria-hidden="true">
                  <span className="u-porte"></span><span className="u-porte"></span><span className="u-porte u-porte--on"></span><span className="u-porte"></span><span className="u-porte"></span>
                </div>
                <div className="u-pole-txt">
                  <span className="u-num">01</span>
                  <h3>La forme</h3>
                  <p>Salaire, dividende, compte courant, frais, avantage en nature. Le même montant ne coûte pas la même chose selon la porte qu'il emprunte. Vous n'avez probablement jamais vu les cinq côte à côte.</p>
                </div>
              </div>
              <div className="u-pole">
                <div className="u-pole-visuel u-pole-visuel--source" aria-hidden="true">
                  <span className="u-etage">SCI</span><span className="u-etage u-etage--on">Holding</span><span className="u-etage">Exploitation</span>
                </div>
                <div className="u-pole-txt">
                  <span className="u-num">02</span>
                  <h3>La source</h3>
                  <p>Exploitation, holding, SCI. Selon l'étage d'où part l'argent, il est taxé une fois, deux fois, ou pas au passage. La plupart des holdings ne servent pas ce qu'elles pourraient.</p>
                </div>
              </div>
              <div className="u-pole">
                <div className="u-pole-visuel u-pole-visuel--moment" aria-hidden="true">
                  <span className="u-mois">DÉC</span><span className="u-mois u-mois--on">MARS</span><span className="u-mois">JUIN</span>
                </div>
                <div className="u-pole-txt">
                  <span className="u-num">03</span>
                  <h3>Le moment</h3>
                  <p>Un dividende voté en décembre et le même voté en mars ne font pas le même effet sur votre foyer. Le calendrier est le levier le moins cher et le moins utilisé.</p>
                </div>
              </div>
              <div className="u-pole">
                <div className="u-pole-visuel u-pole-visuel--montant" aria-hidden="true">
                  <span className="u-barre" style={{ height: "30%" }}></span><span className="u-barre" style={{ height: "52%" }}></span><span className="u-barre u-barre--on" style={{ height: "74%" }}></span><span className="u-barre u-barre--rouge" style={{ height: "96%" }}></span>
                </div>
                <div className="u-pole-txt">
                  <span className="u-num">04</span>
                  <h3>Le montant</h3>
                  <p>Combien vous pouvez sortir sans mettre la société en risque, et ce que coûtent réellement 1 000 € nets de plus dans votre architecture actuelle. La question que tout le monde se pose et que personne ne chiffre.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ⑥  DOSSIERS */}
        <section className="sombre" id="dossiers">
          <div className="wrap">
            <span className="eyebrow">Mesuré sur nos dossiers</span>
            <h2 className="u-h2">Des décisions. Pas des promesses.</h2>
            <p className="lead">Trois dossiers livrés, anonymisés en typologies. Ce sont des projections à droit constant, sur dossiers réels, sans valeur d'engagement. Aucun nom, aucune ville, aucun montant qui identifie.</p>

            <Dossiers />

            <div className="u-fourchette">
              <b>Sur nos dossiers livrés</b>
              <p>L'écart mesuré entre l'architecture en place et le scénario retenu va de 14 000 € à plus de 40 000 € par an, de l'ordre de 25 000 € par an en moyenne. Réutilisables au choix du dirigeant : en croissance de la société, en capitalisation patrimoniale, ou en revenu.</p>
            </div>

            <div className="cta-zone">
              <button className="btn btn--primaire" onClick={() => ouvrir("dossiers")}>Faire examiner mon dossier <span className="fl">→</span></button>
              <p className="micro">100 % gratuit · sans engagement</p>
            </div>
          </div>
        </section>

        {/* ⑦  DIAGNOSTIC */}
        <section className="u-diag">
          <div className="wrap wrap--etroit" style={{ textAlign: "center" }}>
            <span className="eyebrow" style={{ justifyContent: "center" }}>Le diagnostic</span>
            <h2 className="u-h2">Votre dossier passe-t-il chez nous ?</h2>
            <p className="lead" style={{ marginInline: "auto" }}>3 questions. 60 secondes. Une réponse franche sur votre situation, et sur ce qui bloque.</p>
            <button className="btn btn--primaire btn--large" onClick={() => ouvrir("diag")} style={{ marginTop: ".6em" }}>Commencer le diagnostic <span className="fl">→</span></button>
            <p className="micro" style={{ marginTop: "1em" }}>100 % gratuit · sans engagement</p>
          </div>
        </section>

        {/* ⑧  LE TRI */}
        <section className="sombre" id="cabinet">
          <div className="wrap">
            <span className="eyebrow">Le cabinet</span>
            <h2 className="u-h2">On trie dès le départ.<br />Ce qu'on prend, ce qu'on ne prend pas.</h2>
            <p className="lead">Un dossier ne se perd pas dans un service. Il est lu, accepté ou refusé avant la première heure de travail, puis il passe entre trois personnes identifiées, dans un ordre qui ne change jamais.</p>

            <div className="u-flux">
              <div className="u-flux-etape">
                <span className="u-flux-quand">Sous 24 h ouvrées</span>
                <b>Votre fiche est lue, puis triée</b>
                <p>Par un humain. Elle nous dit si le sujet existe chez vous et par où on commencerait. Si le dossier ne relève pas de nous, on vous le dit tout de suite, avec ce qu'il faudrait regarder à la place.</p>
              </div>
              <div className="u-flux-etape">
                <span className="u-flux-quand">25 minutes</span>
                <b>Un premier échange, pas une démo</b>
                <p>Vous dites comment vous vous rémunérez aujourd'hui. On vous dit ce qu'on voit. Si la réponse est non, vous l'entendrez pendant l'appel, pas après avoir signé.</p>
              </div>
              <div className="u-flux-etape">
                <span className="u-flux-quand">96 h après vos pièces</span>
                <b>Le pré-audit confirmé</b>
                <p>On vérifie que ce que vous nous avez dit, ce que disent vos documents et ce dont vous avez besoin sont bien la même chose. C'est là que les trente jours commencent.</p>
              </div>
              <div className="u-flux-etape u-flux-etape--fin">
                <span className="u-flux-quand">Jour 30</span>
                <b>Votre stratégie, et un dernier appel</b>
                <p>Vous recevez le livrable. On le relit ensemble, ligne à ligne, pour que vous puissiez le défendre seul devant qui que ce soit. Et on ne vous lâche pas dans la nature : la mise en place se poursuit avec vos conseils, ou avec nous si vous le souhaitez.</p>
              </div>
            </div>

            <div className="u-tri">
              <div className="u-tri-col u-tri--oui">
                <b>On prend</b>
                <p>Une société qui tourne, au-delà de 350 000 € de chiffre d'affaires, et qui a la capacité de financer une véritable enveloppe dirigeant.</p>
                <p>Un dirigeant qui se verse déjà quelque chose, même beaucoup trop peu par rapport à ce que sa boîte permet.</p>
                <p>Un groupe, une holding, une SCI, ou le projet d'en construire un.</p>
                <p>Quelqu'un qui veut comprendre ses scénarios et arbitrer lui-même.</p>
              </div>
              <div className="u-tri-col u-tri--non">
                <b>On ne prend pas</b>
                <p>Une société sans capacité, en survie de trésorerie. Le sujet est le redressement, pas la rémunération.</p>
                <p>Un dirigeant qui veut qu'on décide à sa place. Cap. rend l'arbitrage, il ne le confisque pas.</p>
                <p>Celui qui veut zéro charges comme fin en soi, sans projet derrière.</p>
                <p>Toute demande d'artifice plutôt que d'architecture assumable devant l'administration.</p>
              </div>
            </div>
          </div>
        </section>

        <MurAvis />

      {/* ⑩  CTA FINAL */}
        <section className="sombre u-final">
          <div className="wrap wrap--etroit" style={{ textAlign: "center" }}>
            <h2 className="u-h2">Vous savez où vous en êtes.<br />Maintenant, décidez comment vous vous payez.</h2>
            <button className="btn btn--primaire btn--large" onClick={() => ouvrir("final")} style={{ marginTop: ".8em" }}>Faire examiner mon dossier <span className="fl">→</span></button>
            <p className="micro" style={{ marginTop: "1em" }}>100 % gratuit · sans engagement · on vous dit non si ce n'est pas pour vous</p>
          </div>
        </section>

        {/* ⑪  FAQ */}
        <section id="faq">
          <div className="wrap wrap--etroit">
            <span className="eyebrow">Questions fréquentes</span>
            <h2 className="u-h2">Avant qu'on s'appelle</h2>
            <div className="faq" style={{ marginTop: "1.6rem" }}>
              <details><summary>Pourquoi mon expert-comptable ne le fait pas ?</summary><div className="rep"><p>Parce que ce n'est pas dans son métier, et ce n'est pas un reproche. Il lui manque trois choses : le temps, la vision de votre foyer, et la revoyure. Il fait très bien les comptes, la paie et le déclaratif. Mesurer votre enveloppe dirigeant sur votre capacité réelle, pro et perso, et la revoir chaque année, ce n'est pas dedans. Le livrable lui est remis avec de quoi exécuter, et il reste l'exécutant naturel du scénario que vous choisissez.</p></div></details>
              <details><summary>C'est un budget. Comment je sais si ça vaut le coup ?</summary><div className="rep"><p>On ne défend pas le prix, on le calcule sur votre cas. Le quiz collecte votre forme sociale et votre fourchette de rémunération, et on arrive au premier appel avec l'ordre de grandeur déjà posé. Sur un dossier livré, une société seule en profession libérale, l'écart de première année a été de 14 200 € pour 8 900 € HT d'honoraires. Ce ne sera pas forcément votre chiffre, mais vous l'aurez avant de décider.</p></div></details>
              <details><summary>Et si j'ai un contrôle, vous êtes là ?</summary><div className="rep"><p>Deux étages. Le fond : on travaille sur la réglementation en vigueur, du droit positif, chaque décision est écrite avec sa référence, jamais un « je pense que ». La ceinture : la stratégie peut être approuvée par un avocat partenaire avant que vous signiez quoi que ce soit. Et une question en retour : votre situation actuelle, elle, a été validée par qui ?</p></div></details>
              <details><summary>Est-ce que c'est une formation ?</summary><div className="rep"><p>Non. Vous ne repartez pas avec un cours, vous repartez avec votre stratégie, chiffrée sur votre propre dossier, au minimum trois scénarios, et de quoi les faire exécuter. Vous n'avez rien à apprendre avant de venir.</p></div></details>
              <details><summary>Qui réalise l'audit et les scénarios ?</summary><div className="rep"><p>Jérémy Poutot mène le pré-audit, la séance d'arbitrage et signe le livrable. Marie-Amélie bâtit la cartographie et les scénarios et reste votre interlocutrice pendant les trente jours. Manon couvre la protection du dirigeant. Huit experts salariés et quinze experts externes sont mobilisables selon le dossier.</p></div></details>
              <details><summary>Comment se passe le premier échange ?</summary><div className="rep"><p>Vingt-cinq minutes en visio. Vous dites comment vous vous rémunérez aujourd'hui et ce qui vous a fait ouvrir le sujet. On vous dit ce qu'on voit et si Cap. a quelque chose à apporter chez vous. Aucun document à préparer, aucune présentation commerciale.</p></div></details>
              <details><summary>Et si vous ne trouvez rien ?</summary><div className="rep"><p>Ça arrive, et on le dit. Vous repartez quand même avec la cartographie complète de votre enveloppe, chiffrée, et la confirmation écrite que votre situation actuelle est la bonne. Savoir qu'on est au bon endroit a une valeur, surtout quand on en doutait.</p></div></details>
              <details><summary>Mes chiffres sont-ils confidentiels ?</summary><div className="rep"><p>Oui. Les documents transitent par un espace dédié, ils ne sont partagés avec aucun tiers sans votre accord écrit, et l'avocat partenaire n'intervient que si vous choisissez l'option d'approbation. Les dossiers publiés sont anonymisés en typologies et le seront toujours.</p></div></details>
            </div>
          </div>
        </section>

        <footer className="pied">
          <div className="in">
            <span className="wordmark" style={{ fontSize: "19px" }}>Cap<span className="pt">.</span></span>
            <span className="u-tag">Cap. est la mission d'ingénierie de rémunération du dirigeant d'Arras Patrimoine, pour les PME à partir de 350 k€ de chiffre d'affaires.</span>
            <a href="https://www.arras-patrimoine.fr">Arras Patrimoine</a>
            <a href="https://www.arras-patrimoine.fr/planches">Les Planches</a>
            <a href="https://www.arras-patrimoine.fr/mentions-legales">Mentions légales</a>
            <span>contact@arras-patrimoine.fr</span>
            <span className="u-orias">Arras Patrimoine, SARL · SIREN 884 625 450 · ORIAS n° 20006891 · courtier en assurance et COBSP, contrôle ACPR · responsabilité civile professionnelle. Aucune promesse de résultat. Les dossiers présentés sont des projections à droit constant sur dossiers réels, anonymisés en typologies, sans valeur d'engagement.</span>
          </div>
        </footer>
      </div>
      <Collant ouvrir={ouvrir} />
      <Quiz ouvert={quiz} fermer={fermer} origine={origine} />
    </>
  );
}
