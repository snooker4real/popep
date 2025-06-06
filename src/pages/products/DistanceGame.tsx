import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { MapPin } from 'lucide-react';
import FloatingBlob from '../../components/FloatingBlob';
import ShopifyBuyButton from '../../components/ShopifyBuyButton';

export default function DistanceGame() {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen bg-gradient-to-b from-rose-pale to-vert-eau pt-20">
      <FloatingBlob />
      <div className="max-w-6xl mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 gap-12">
          <motion.div
            className="relative rounded-2xl overflow-hidden shadow-xl"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <img 
              src="https://images.unsplash.com/photo-1745671756390-971023ed5060?q=80&w=1887&auto=format&fit=crop"
              alt="POPEP Distance"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-noir/50 to-transparent" />
          </motion.div>

          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl font-title text-vieux-rose">
              {t('concept.versions.distance.title')}
            </h1>
            
            <p className="text-lg text-gris-fonce dark:text-blanc">
              {t('concept.versions.distance.description')}
            </p>

            <div className="bg-blanc/90 dark:bg-gris-fonce/90 rounded-lg p-6 space-y-4">
              <div className="flex items-center gap-3 text-vieux-rose">
                <MapPin className="w-6 h-6" />
                <h2 className="text-xl font-subtitle">Caractéristiques</h2>
              </div>
              <ul className="list-disc list-inside space-y-2 text-gris-fonce dark:text-blanc">
                <li>100 cartes adaptées à la distance</li>
                <li>Activités virtuelles créatives</li>
                <li>Questions pour maintenir la connexion</li>
                <li>Design élégant et moderne</li>
              </ul>
            </div>

            <div className="bg-blanc/90 dark:bg-gris-fonce/90 rounded-lg p-6 space-y-6">
              <div className="flex justify-between items-center">
                <span className="text-2xl font-title text-gris-fonce dark:text-blanc">Prix</span>
                <span className="text-3xl font-bold text-vieux-rose">24,99 €</span>
              </div>
              
              <ShopifyBuyButton 
                productId="10065995596114"
                nodeId="product-component-1747481130974"
              />
            </div>

            <div className="prose prose-lg text-gris-fonce dark:text-blanc">
              <p>{t('concept.versions.distance.longDescription')}</p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}