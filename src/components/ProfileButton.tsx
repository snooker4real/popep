import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { User, LogOut, Settings } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { signOut } from '../lib/auth';
import AuthModal from './AuthModal';
import { supabase } from '../lib/supabase';

export default function ProfileButton() {
  const navigate = useNavigate();
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [user, setUser] = useState(supabase.auth.getUser());

  supabase.auth.onAuthStateChange((event, session) => {
    if (event === 'SIGNED_IN') {
      setUser(session?.user || null);
    } else if (event === 'SIGNED_OUT') {
      setUser(null);
    }
  });

  const handleSignOut = async () => {
    try {
      await signOut();
      setIsMenuOpen(false);
      navigate('/');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <>
      <motion.div className="relative">
        <motion.button
          onClick={() => user ? setIsMenuOpen(!isMenuOpen) : setIsAuthModalOpen(true)}
          className="p-2 rounded-lg bg-rose-pale/10 hover:bg-rose-pale/20 transition-colors"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <User className="w-5 h-5 text-rouge-indien" />
        </motion.button>

        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              className="absolute right-0 mt-2 w-48 bg-blanc dark:bg-gris-fonce rounded-lg shadow-lg py-2 z-50"
            >
              <button
                onClick={() => {
                  setIsMenuOpen(false);
                  navigate('/profile');
                }}
                className="w-full px-4 py-2 text-left flex items-center gap-2 hover:bg-rose-pale/10"
              >
                <Settings className="w-4 h-4" />
                <span>Profil</span>
              </button>
              <button
                onClick={handleSignOut}
                className="w-full px-4 py-2 text-left flex items-center gap-2 hover:bg-rose-pale/10 text-rouge-indien"
              >
                <LogOut className="w-4 h-4" />
                <span>Déconnexion</span>
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
      />
    </>
  );
}