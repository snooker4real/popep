import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import FloatingBlob from '../components/FloatingBlob';

export default function Legal() {
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
            Mentions Légales
          </motion.h1>

          <div className="space-y-8 text-gris-fonce dark:text-blanc">
            <section>
              <h2 className="text-2xl font-title mb-4 text-rouge-indien">IDENTIFICATION DE L'OPÉRATEUR DU SITE</h2>
              <ul className="space-y-2">
                <li><strong>Nom de l'Entreprise:</strong> Twambaze Marie-Ange EI</li>
                <li><strong>Adresse du Siège Social:</strong> Epinay-Sur-Seine (à compléter)</li>
                <li><strong>Numéro d'identification:</strong> 927 823 146 R.C.S. Bobigny</li>
                <li><strong>Numéro de TVA:</strong> FR33927823146</li>
                <li><strong>Contact:</strong> support@popep.fr - 07 59 65 41 88</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-title mb-4 text-rouge-indien">HÉBERGEMENT DU SITE</h2>
              <p className="leading-relaxed">
                Le site www.popep.fr est hébergé par Netlify, Inc., situé au 44 Montgomery Street, Suite 300, San Francisco, California 94104.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-title mb-4 text-rouge-indien">PROPRIÉTÉ INTELLECTUELLE</h2>
              <p className="leading-relaxed">
                L'ensemble du contenu de ce site (textes, images, vidéos, etc.) est protégé par les lois sur la propriété intellectuelle. 
                Toute reproduction ou utilisation sans autorisation préalable est strictement interdite.
              </p>
              <p className="leading-relaxed mt-4">
                La marque POPEP® est une marque déposée. Toute utilisation non autorisée de cette marque constitue une contrefaçon.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-title mb-4 text-rouge-indien">PROTECTION DES DONNÉES PERSONNELLES</h2>
              <p className="leading-relaxed">
                Conformément au Règlement Général sur la Protection des Données (RGPD), vous disposez d'un droit d'accès, 
                de rectification, d'effacement et de portabilité de vos données personnelles.
              </p>
              <p className="leading-relaxed mt-4">
                Pour exercer ces droits ou pour toute question sur le traitement de vos données, 
                vous pouvez nous contacter à l'adresse : support@popep.fr
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-title mb-4 text-rouge-indien">COOKIES</h2>
              <p className="leading-relaxed">
                Notre site utilise des cookies pour améliorer votre expérience de navigation. 
                Vous pouvez configurer votre navigateur pour refuser les cookies non essentiels.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-title mb-4 text-rouge-indien">LIENS EXTERNES</h2>
              <p className="leading-relaxed">
                Le site peut contenir des liens vers des sites externes. 
                Nous ne sommes pas responsables du contenu ou des pratiques de ces sites.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-title mb-4 text-rouge-indien">CRÉDITS</h2>
              <p className="leading-relaxed">
                Design et développement : Cindano Jonathan @snooker4real<br />
                Design graphique : Création FARANI DESIGN<br />
                Photos : Unsplash, Pexels<br />
                Icônes : Lucide Icons
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-title mb-4 text-rouge-indien">CONTACT</h2>
              <p className="leading-relaxed">
                Pour toute question concernant le site ou nos services :<br />
                Email : support@popep.fr<br />
                Téléphone : 07 59 65 41 88<br />
                Adresse : Epinay-Sur-Seine (à compléter)
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}