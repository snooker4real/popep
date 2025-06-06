import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Mail, Lock } from 'lucide-react';
import { signIn, signUp } from '../lib/auth';
import toast from 'react-hot-toast';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  mode?: 'signin' | 'signup';
}

export default function AuthModal({ isOpen, onClose, mode = 'signin' }: AuthModalProps) {
  const [isSignIn, setIsSignIn] = useState(mode === 'signin');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      if (isSignIn) {
        await signIn(email, password);
        toast.success('Connexion réussie !');
      } else {
        await signUp(email, password);
        toast.success('Inscription réussie ! Vérifiez votre email.');
      }
      onClose();
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-noir z-40"
            onClick={onClose}
          />
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 100 }}
            className="fixed inset-x-4 bottom-4 md:inset-auto md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2 bg-blanc dark:bg-gris-fonce rounded-2xl p-6 shadow-xl z-50 max-w-md w-full"
          >
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-title text-gris-fonce dark:text-blanc">
                {isSignIn ? 'Connexion' : 'Inscription'}
              </h3>
              <button
                onClick={onClose}
                className="text-gris-fonce dark:text-blanc hover:text-rouge-indien"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gris-fonce dark:text-blanc mb-1">
                  Email
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gris-fonce dark:text-blanc" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 rounded-lg bg-rose-pale/10 border border-rose-pale/20 focus:outline-none focus:border-rouge-indien"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gris-fonce dark:text-blanc mb-1">
                  Mot de passe
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gris-fonce dark:text-blanc" />
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 rounded-lg bg-rose-pale/10 border border-rose-pale/20 focus:outline-none focus:border-rouge-indien"
                    required
                  />
                </div>
              </div>

              <motion.button
                type="submit"
                disabled={isLoading}
                className="w-full bg-rouge-indien text-blanc py-3 rounded-lg font-subtitle disabled:opacity-50"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {isLoading ? 'Chargement...' : isSignIn ? 'Se connecter' : "S'inscrire"}
              </motion.button>

              <p className="text-center text-sm text-gris-fonce dark:text-blanc">
                {isSignIn ? "Pas encore de compte ?" : "Déjà un compte ?"}{" "}
                <button
                  type="button"
                  onClick={() => setIsSignIn(!isSignIn)}
                  className="text-rouge-indien hover:underline"
                >
                  {isSignIn ? "S'inscrire" : "Se connecter"}
                </button>
              </p>
            </form>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}