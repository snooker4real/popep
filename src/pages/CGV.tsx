import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import FloatingBlob from '../components/FloatingBlob';

export default function CGV() {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen bg-gradient-to-b from-rose-pale to-vert-eau pt-20">
      <FloatingBlob />
      <div className="py-16 px-4">
        <div className="max-w-4xl mx-auto bg-blanc/90 dark:bg-gris-fonce/90 rounded-lg shadow-lg p-8">
          <motion.h1 
            className="text-4xl font-title tracking-wider text-center mb-12 text-gris-fonce dark:text-blanc"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Conditions Générales de Vente
          </motion.h1>

          <div className="space-y-8 text-gris-fonce dark:text-blanc">
            <section className="bg-rose-pale/10 p-6 rounded-lg border-l-4 border-rouge-indien">
              <h2 className="text-2xl font-title mb-4 text-rouge-indien">1. IDENTITÉ DE L'ENTREPRISE</h2>
              <ul className="space-y-2 list-disc pl-4">
                <li><strong>Nom:</strong> Twambaze Marie-Ange EI</li>
                <li><strong>Adresse:</strong> Epinay-Sur-Seine (à compléter)</li>
                <li><strong>Contact:</strong> support@popep.fr - 07 59 65 41 88</li>
                <li><strong>Design et développement:</strong> Cindano Jonathan @snooker4real</li>
                <li><strong>Design graphique:</strong> Création FARANI DESIGN</li>
              </ul>
            </section>

            <section className="bg-rose-pale/10 p-6 rounded-lg border-l-4 border-rouge-indien">
              <h2 className="text-2xl font-title mb-4 text-rouge-indien">2. CHAMP D'APPLICATION</h2>
              <p className="leading-relaxed">
                Les présentes conditions générales de vente régissent toutes les ventes effectuées via www.popep.fr.
              </p>
            </section>

            <section className="bg-rose-pale/10 p-6 rounded-lg border-l-4 border-rouge-indien">
              <h2 className="text-2xl font-title mb-4 text-rouge-indien">3. PRODUITS</h2>
              <p className="leading-relaxed">
                Nous proposons des jeux de cartes destinés aux couples, aux couples en relation à distance, aux couples en situation de post-partum et aux amis, avec différentes thématiques.
              </p>
            </section>

            <section className="bg-rose-pale/10 p-6 rounded-lg border-l-4 border-rouge-indien">
              <h2 className="text-2xl font-title mb-4 text-rouge-indien">4. PRIX</h2>
              <p className="leading-relaxed">
                Les prix des produits sont indiqués en euros et incluent la TVA. Les frais de livraison seront ajoutés au moment de la commande.
              </p>
            </section>

            <section className="bg-rose-pale/10 p-6 rounded-lg border-l-4 border-rouge-indien">
              <h2 className="text-2xl font-title mb-4 text-rouge-indien">5. COMMANDES</h2>
              <p className="leading-relaxed">
                Les commandes se font en ligne. La confirmation de commande sera envoyée par email une fois le paiement reçu.
              </p>
            </section>

            <section className="bg-rose-pale/10 p-6 rounded-lg border-l-4 border-rouge-indien">
              <h2 className="text-2xl font-title mb-4 text-rouge-indien">6. MODALITÉS DE PAIEMENT</h2>
              <p className="leading-relaxed">
                Nous acceptons les paiements par carte bancaire et autres méthodes indiquées sur le site d'Amazon.
              </p>
            </section>

            <section className="bg-rose-pale/10 p-6 rounded-lg border-l-4 border-rouge-indien">
              <h2 className="text-2xl font-title mb-4 text-rouge-indien">7. LIVRAISON</h2>
              <p className="leading-relaxed">
                Les produits sont expédiés dans un délai moyen de 3 jours ouvrables, suivant la zone de livraison. Les frais de livraison s'appliquent et varieront selon la zone de livraison.
              </p>
            </section>

            <section className="bg-rose-pale/10 p-6 rounded-lg border-l-4 border-rouge-indien">
              <h2 className="text-2xl font-title mb-4 text-rouge-indien">8. DROIT DE RÉTRACTATION</h2>
              <p className="leading-relaxed">
                Conformément à la loi, vous disposez d'un délai de 14 jours pour exercer votre droit de rétractation. Les produits doivent être retournés dans leur état d'origine et complets. Les frais de retour sont à la charge du client.
              </p>
            </section>

            <section className="bg-rose-pale/10 p-6 rounded-lg border-l-4 border-rouge-indien">
              <h2 className="text-2xl font-title mb-4 text-rouge-indien">9. GARANTIE ET SERVICE APRÈS-VENTE</h2>
              <p className="leading-relaxed">
                Nos produits sont garantis contre tout défaut de fabrication. Pour toute question ou réclamation, veuillez nous contacter à support@popep.fr.
              </p>
            </section>

            <section className="bg-rose-pale/10 p-6 rounded-lg border-l-4 border-rouge-indien">
              <h2 className="text-2xl font-title mb-4 text-rouge-indien">10. PROTECTION DES DONNÉES</h2>
              <p className="leading-relaxed">
                Nous nous engageons à protéger vos données personnelles. Elles ne seront pas partagées avec des tiers sans votre consentement. Vous avez le droit de demander l'accès à vos données, leur rectification ou leur suppression.
              </p>
            </section>

            <section className="bg-rose-pale/10 p-6 rounded-lg border-l-4 border-rouge-indien">
              <h2 className="text-2xl font-title mb-4 text-rouge-indien">11. MODIFICATION DES CGV</h2>
              <p className="leading-relaxed">
                Nous nous réservons le droit de modifier les présentes conditions. Les clients seront informés par email de toute modification.
              </p>
            </section>

            <section className="bg-rose-pale/10 p-6 rounded-lg border-l-4 border-rouge-indien">
              <h2 className="text-2xl font-title mb-4 text-rouge-indien">12. LOIS APPLICABLES</h2>
              <p className="leading-relaxed">
                Les présentes CGV sont soumises au droit français. En cas de litige, les tribunaux de votre localité seront compétents.
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}