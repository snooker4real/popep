import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, ShoppingBag, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import FloatingBlob from '../components/FloatingBlob';
import { getOrderHistory } from '../lib/stripe';

export default function CheckoutSuccess() {
  const [latestOrder, setLatestOrder] = useState<any>(null);

  useEffect(() => {
    // Clear the cart after successful checkout
    localStorage.setItem('cart', '[]');
    
    // Fetch the latest order
    const fetchLatestOrder = async () => {
      try {
        const orders = await getOrderHistory();
        if (orders && orders.length > 0) {
          setLatestOrder(orders[0]);
        }
      } catch (error) {
        console.error('Error fetching order:', error);
      }
    };

    fetchLatestOrder();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-rose-pale to-vert-eau pt-20">
      <FloatingBlob />
      <div className="max-w-4xl mx-auto px-4 py-16">
        <motion.div 
          className="bg-blanc/90 dark:bg-gris-fonce/90 rounded-lg p-8 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <motion.div
            className="mb-6 text-vert-cyan"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ 
              type: "spring",
              stiffness: 260,
              damping: 20,
              delay: 0.2
            }}
          >
            <CheckCircle className="w-16 h-16 mx-auto" />
          </motion.div>

          <motion.h1 
            className="text-3xl md:text-4xl font-title text-gris-fonce dark:text-blanc mb-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            Merci pour votre commande !
          </motion.h1>

          <motion.p 
            className="text-lg text-gris-fonce dark:text-blanc mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            Votre commande a été confirmée. Vous recevrez bientôt un email de confirmation.
          </motion.p>

          {latestOrder && (
            <motion.div
              className="mb-8 p-6 bg-rose-pale/10 rounded-lg"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <h2 className="text-xl font-subtitle mb-4">Détails de la commande</h2>
              <div className="flex justify-between items-center">
                <span>Numéro de commande:</span>
                <span className="font-mono">{latestOrder.order_id}</span>
              </div>
              <div className="flex justify-between items-center mt-2">
                <span>Total:</span>
                <span className="font-bold">{(latestOrder.amount_total / 100).toFixed(2)} €</span>
              </div>
            </motion.div>
          )}

          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            <Link to="/profile">
              <motion.button
                className="w-full sm:w-auto px-8 py-3 bg-vert-cyan text-blanc rounded-lg font-subtitle flex items-center justify-center gap-2"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <ShoppingBag className="w-5 h-5" />
                Voir mes commandes
              </motion.button>
            </Link>
            <Link to="/">
              <motion.button
                className="w-full sm:w-auto px-8 py-3 bg-rouge-indien text-blanc rounded-lg font-subtitle flex items-center justify-center gap-2"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <ArrowLeft className="w-5 h-5" />
                Retour à l'accueil
              </motion.button>
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}