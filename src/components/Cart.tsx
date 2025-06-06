import { useState, useEffect } from 'react';
import { ShoppingCart, X, Minus, Plus } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { products, ProductId } from '../stripe-config';
import { createCheckoutSession } from '../lib/stripe';
import { supabase } from '../lib/supabase';
import AuthModal from './AuthModal';
import toast from 'react-hot-toast';

interface CartItem {
  id: ProductId;
  quantity: number;
}

export default function Cart() {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem('cart');
    return saved ? JSON.parse(saved) : [];
  });
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cartItems));
  }, [cartItems]);

  useEffect(() => {
    const handleAddToCart = (event: CustomEvent<{ productId: ProductId }>) => {
      const { productId } = event.detail;
      addToCart(productId);
      setIsOpen(true);
    };

    window.addEventListener('addToCart', handleAddToCart as EventListener);

    return () => {
      window.removeEventListener('addToCart', handleAddToCart as EventListener);
    };
  }, []);

  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cartItems.reduce((sum, item) => {
    const product = products[item.id];
    return sum + (product.price * item.quantity);
  }, 0);

  const addToCart = (productId: ProductId) => {
    setCartItems(prev => {
      const existing = prev.find(item => item.id === productId);
      if (existing) {
        return prev.map(item =>
          item.id === productId
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { id: productId, quantity: 1 }];
    });
  };

  const removeFromCart = (productId: ProductId) => {
    setCartItems(prev => {
      const existing = prev.find(item => item.id === productId);
      if (existing && existing.quantity > 1) {
        return prev.map(item =>
          item.id === productId
            ? { ...item, quantity: item.quantity - 1 }
            : item
        );
      }
      return prev.filter(item => item.id !== productId);
    });
  };

  const handleCheckout = async () => {
    try {
      setIsCheckingOut(true);

      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        setIsOpen(false);
        setIsAuthModalOpen(true);
        return;
      }
      
      const items = cartItems.map(item => ({
        priceId: products[item.id].priceId,
        quantity: item.quantity
      }));
      
      const successUrl = `${window.location.origin}/checkout/success`;
      const cancelUrl = `${window.location.origin}/cart`;

      const checkoutUrl = await createCheckoutSession(
        items,
        products[cartItems[0].id].mode,
        successUrl,
        cancelUrl
      );

      window.location.href = checkoutUrl;
    } catch (error: any) {
      console.error('Checkout error:', error);
      toast.error('Une erreur est survenue lors du paiement. Veuillez réessayer.');
    } finally {
      setIsCheckingOut(false);
    }
  };

  return (
    <>
      <motion.button
        className="fixed bottom-4 left-4 z-50 bg-rouge-indien text-blanc rounded-full p-3 shadow-lg"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(true)}
      >
        <div className="relative">
          <ShoppingCart className="w-6 h-6" />
          {totalItems > 0 && (
            <span className="absolute -top-2 -right-2 bg-vieux-rose text-blanc text-xs rounded-full w-5 h-5 flex items-center justify-center">
              {totalItems}
            </span>
          )}
        </div>
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-noir z-40"
              onClick={() => setIsOpen(false)}
            />
            <motion.div
              initial={{ opacity: 0, y: 100 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 100 }}
              className="fixed bottom-0 left-0 right-0 bg-blanc dark:bg-gris-fonce rounded-t-3xl p-6 shadow-xl z-50 max-h-[80vh] overflow-y-auto"
            >
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-title text-gris-fonce dark:text-blanc">
                  Panier
                </h3>
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-gris-fonce dark:text-blanc hover:text-rouge-indien"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {cartItems.length === 0 ? (
                <p className="text-center text-gris-fonce dark:text-blanc py-8">
                  Votre panier est vide
                </p>
              ) : (
                <>
                  <div className="space-y-4 mb-6">
                    {cartItems.map((item) => (
                      <div
                        key={item.id}
                        className="flex items-center justify-between p-4 bg-rose-pale/10 rounded-lg"
                      >
                        <div className="flex-1">
                          <h4 className="font-subtitle text-gris-fonce dark:text-blanc">
                            {item.id}
                          </h4>
                          <p className="text-sm text-vieux-rose">
                            {products[item.id].description}
                          </p>
                        </div>
                        <div className="flex items-center gap-3">
                          <button
                            onClick={() => removeFromCart(item.id)}
                            className="p-1 hover:bg-rose-pale/20 rounded"
                          >
                            <Minus className="w-4 h-4" />
                          </button>
                          <span className="w-8 text-center">{item.quantity}</span>
                          <button
                            onClick={() => addToCart(item.id)}
                            className="p-1 hover:bg-rose-pale/20 rounded"
                          >
                            <Plus className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="border-t border-rose-pale/20 pt-4 mb-6">
                    <div className="flex justify-between text-lg font-subtitle mb-2">
                      <span>Total</span>
                      <span>{totalPrice.toFixed(2)} €</span>
                    </div>
                  </div>

                  <motion.button
                    onClick={handleCheckout}
                    disabled={isCheckingOut}
                    className="w-full bg-rouge-indien text-blanc py-3 rounded-lg font-subtitle disabled:opacity-50"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {isCheckingOut ? 'Traitement...' : 'Payer'}
                  </motion.button>
                </>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        mode="signin"
      />
    </>
  );
}