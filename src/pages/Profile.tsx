import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { MapPin, Package } from 'lucide-react';
import { getCurrentUser, getProfile, updateProfile } from '../lib/auth';
import FloatingBlob from '../components/FloatingBlob';
import { getOrderHistory } from '../lib/stripe';

export default function Profile() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [profile, setProfile] = useState({
    full_name: '',
    shipping_address: {
      street: '',
      city: '',
      postal_code: '',
      country: '',
    },
  });
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    try {
      const user = await getCurrentUser();
      if (!user) {
        navigate('/');
        return;
      }

      const [profileData, orderHistory] = await Promise.all([
        getProfile(user.id),
        getOrderHistory()
      ]);

      if (profileData) {
        setProfile(profileData);
      }
      setOrders(orderHistory);
    } catch (error) {
      console.error('Error loading profile:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);

    try {
      const user = await getCurrentUser();
      if (!user) throw new Error('User not found');

      await updateProfile(user.id, profile);
    } catch (error) {
      console.error('Error updating profile:', error);
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-rose-pale to-vert-eau pt-20">
      <FloatingBlob />
      <div className="max-w-4xl mx-auto px-4 py-16">
        <motion.h1
          className="text-4xl font-title text-gris-fonce dark:text-blanc mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          Mon Profil
        </motion.h1>

        <div className="grid md:grid-cols-2 gap-8">
          <motion.div
            className="bg-blanc/90 dark:bg-gris-fonce/90 rounded-lg p-6"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium mb-1">Nom complet</label>
                <input
                  type="text"
                  value={profile.full_name}
                  onChange={(e) => setProfile({ ...profile, full_name: e.target.value })}
                  className="w-full px-4 py-2 rounded-lg bg-rose-pale/10 border border-rose-pale/20"
                />
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-2 text-rouge-indien">
                  <MapPin className="w-5 h-5" />
                  <h3 className="font-subtitle">Adresse de livraison</h3>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Rue</label>
                  <input
                    type="text"
                    value={profile.shipping_address.street}
                    onChange={(e) => setProfile({
                      ...profile,
                      shipping_address: { ...profile.shipping_address, street: e.target.value }
                    })}
                    className="w-full px-4 py-2 rounded-lg bg-rose-pale/10 border border-rose-pale/20"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Ville</label>
                  <input
                    type="text"
                    value={profile.shipping_address.city}
                    onChange={(e) => setProfile({
                      ...profile,
                      shipping_address: { ...profile.shipping_address, city: e.target.value }
                    })}
                    className="w-full px-4 py-2 rounded-lg bg-rose-pale/10 border border-rose-pale/20"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Code postal</label>
                  <input
                    type="text"
                    value={profile.shipping_address.postal_code}
                    onChange={(e) => setProfile({
                      ...profile,
                      shipping_address: { ...profile.shipping_address, postal_code: e.target.value }
                    })}
                    className="w-full px-4 py-2 rounded-lg bg-rose-pale/10 border border-rose-pale/20"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Pays</label>
                  <input
                    type="text"
                    value={profile.shipping_address.country}
                    onChange={(e) => setProfile({
                      ...profile,
                      shipping_address: { ...profile.shipping_address, country: e.target.value }
                    })}
                    className="w-full px-4 py-2 rounded-lg bg-rose-pale/10 border border-rose-pale/20"
                  />
                </div>
              </div>

              <motion.button
                type="submit"
                disabled={isSaving}
                className="w-full bg-rouge-indien text-blanc py-3 rounded-lg font-subtitle disabled:opacity-50"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {isSaving ? 'Enregistrement...' : 'Enregistrer'}
              </motion.button>
            </form>
          </motion.div>

          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <div className="bg-blanc/90 dark:bg-gris-fonce/90 rounded-lg p-6">
              <div className="flex items-center gap-2 text-rouge-indien mb-4">
                <Package className="w-5 h-5" />
                <h3 className="font-subtitle">Historique des commandes</h3>
              </div>

              {orders.length === 0 ? (
                <p className="text-center text-gris-fonce dark:text-blanc py-4">
                  Aucune commande pour le moment
                </p>
              ) : (
                <div className="space-y-4">
                  {orders.map((order: any) => (
                    <div
                      key={order.id}
                      className="p-4 bg-rose-pale/10 rounded-lg"
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="font-medium">Commande #{order.id}</p>
                          <p className="text-sm text-gris-fonce dark:text-blanc">
                            {new Date(order.created_at).toLocaleDateString()}
                          </p>
                        </div>
                        <p className="font-medium">
                          {(order.amount_total / 100).toFixed(2)} €
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}