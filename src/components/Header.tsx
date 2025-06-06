import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Menu, X, LogOut, LogIn, UserPlus } from 'lucide-react';
import { useState, useEffect } from 'react';
import LanguageSwitcher from './LanguageSwitcher';
import ThemeToggle from './ThemeToggle';
import { supabase } from '../lib/supabase';
import { signOut } from '../lib/auth';
import AuthModal from './AuthModal';

export default function Header() {
  const location = useLocation();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState<'signin' | 'signup'>('signin');
  
  useEffect(() => {
    // Check initial auth state
    supabase.auth.getUser().then(({ data: { user } }) => {
      setUser(user);
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleSignOut = async () => {
    try {
      await signOut();
      navigate('/');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };
  
  const handleNavigation = (path: string) => {
    setIsMenuOpen(false);
    navigate(path);
  };

  const openAuthModal = (mode: 'signin' | 'signup') => {
    setAuthMode(mode);
    setIsAuthModalOpen(true);
  };

  return (
    <motion.header 
      className="fixed top-0 left-0 right-0 bg-blanc/95 dark:bg-gris-fonce/95 backdrop-blur-sm shadow-sm z-50"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-6xl mx-auto px-4 py-4">
        <nav className="flex items-center justify-between">
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="relative"
          >
            <Link to="/" className="flex items-center gap-2 text-rouge-indien hover:text-vieux-rose transition-colors">
              <img src="/logo.svg" alt="POPEP Logo" className="h-12 w-auto" />
              <span className="absolute -top-1 -right-2 text-xs">®</span>
            </Link>
          </motion.div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center gap-2">
            <ThemeToggle />
            <motion.button 
              className="p-2 hover:bg-rose-pale/20 dark:hover:bg-rose-pale/10 rounded-lg transition-colors"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {isMenuOpen ? <X /> : <Menu />}
            </motion.button>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <motion.div 
              className="flex gap-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <NavLink to="/" current={location.pathname === '/'}>
                {t('nav.home')}
              </NavLink>
              <NavLink to="/concept" current={location.pathname === '/concept'}>
                {t('nav.concept')}
              </NavLink>
              <NavLink to="/about" current={location.pathname === '/about'}>
                {t('nav.about')}
              </NavLink>
              <NavLink to="/strengths" current={location.pathname === '/strengths'}>
                {t('nav.strengths')}
              </NavLink>
            </motion.div>
            <div className="flex items-center gap-4">
              <LanguageSwitcher />
              <ThemeToggle />
              {user ? (
                <motion.button
                  onClick={handleSignOut}
                  className="flex items-center gap-2 px-4 py-2 bg-rouge-indien text-blanc rounded-lg"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <LogOut className="w-4 h-4" />
                  <span>Déconnexion</span>
                </motion.button>
              ) : (
                <div className="flex gap-2">
                  <motion.button
                    onClick={() => openAuthModal('signin')}
                    className="flex items-center gap-2 px-4 py-2 bg-rouge-indien text-blanc rounded-lg"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <LogIn className="w-4 h-4" />
                    <span>Connexion</span>
                  </motion.button>
                  <motion.button
                    onClick={() => openAuthModal('signup')}
                    className="flex items-center gap-2 px-4 py-2 bg-vieux-rose text-blanc rounded-lg"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <UserPlus className="w-4 h-4" />
                    <span>Inscription</span>
                  </motion.button>
                </div>
              )}
            </div>
          </div>
        </nav>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <motion.div 
            className="md:hidden py-6 border-t border-rose-pale/20 dark:border-rose-pale/10 mt-4"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
          >
            <div className="flex flex-col gap-4">
              <button onClick={() => handleNavigation('/')} className={`text-left px-4 py-2 rounded-lg text-lg ${location.pathname === '/' ? 'bg-rose-pale/20 dark:bg-rose-pale/10 text-rouge-indien' : 'text-gris-fonce dark:text-blanc hover:bg-rose-pale/10 dark:hover:bg-rose-pale/5 hover:text-rouge-indien'} transition-colors`}>
                {t('nav.home')}
              </button>
              <button onClick={() => handleNavigation('/concept')} className={`text-left px-4 py-2 rounded-lg text-lg ${location.pathname === '/concept' ? 'bg-rose-pale/20 dark:bg-rose-pale/10 text-rouge-indien' : 'text-gris-fonce dark:text-blanc hover:bg-rose-pale/10 dark:hover:bg-rose-pale/5 hover:text-rouge-indien'} transition-colors`}>
                {t('nav.concept')}
              </button>
              <button onClick={() => handleNavigation('/about')} className={`text-left px-4 py-2 rounded-lg text-lg ${location.pathname === '/about' ? 'bg-rose-pale/20 dark:bg-rose-pale/10 text-rouge-indien' : 'text-gris-fonce dark:text-blanc hover:bg-rose-pale/10 dark:hover:bg-rose-pale/5 hover:text-rouge-indien'} transition-colors`}>
                {t('nav.about')}
              </button>
              <button onClick={() => handleNavigation('/strengths')} className={`text-left px-4 py-2 rounded-lg text-lg ${location.pathname === '/strengths' ? 'bg-rose-pale/20 dark:bg-rose-pale/10 text-rouge-indien' : 'text-gris-fonce dark:text-blanc hover:bg-rose-pale/10 dark:hover:bg-rose-pale/5 hover:text-rouge-indien'} transition-colors`}>
                {t('nav.strengths')}
              </button>
              {user ? (
                <button 
                  onClick={handleSignOut}
                  className="text-left px-4 py-2 rounded-lg text-lg bg-rouge-indien text-blanc hover:bg-vieux-rose transition-colors flex items-center gap-2"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Déconnexion</span>
                </button>
              ) : (
                <>
                  <button 
                    onClick={() => openAuthModal('signin')}
                    className="text-left px-4 py-2 rounded-lg text-lg bg-rouge-indien text-blanc hover:bg-vieux-rose transition-colors flex items-center gap-2"
                  >
                    <LogIn className="w-4 h-4" />
                    <span>Connexion</span>
                  </button>
                  <button 
                    onClick={() => openAuthModal('signup')}
                    className="text-left px-4 py-2 rounded-lg text-lg bg-vieux-rose text-blanc hover:bg-rouge-indien transition-colors flex items-center gap-2"
                  >
                    <UserPlus className="w-4 h-4" />
                    <span>Inscription</span>
                  </button>
                </>
              )}
            </div>
            <div className="mt-6 flex justify-center">
              <LanguageSwitcher />
            </div>
          </motion.div>
        )}
      </div>

      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        mode={authMode}
      />
    </motion.header>
  );
}

function NavLink({ to, children, current }: { to: string; children: React.ReactNode; current: boolean }) {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <Link 
        to={to} 
        className={`relative text-lg px-3 py-2 ${
          current 
            ? 'text-rouge-indien' 
            : 'text-gris-fonce dark:text-blanc hover:text-rouge-indien'
        } transition-colors`}
      >
        {children}
        {current && (
          <motion.div 
            className="absolute bottom-0 left-0 right-0 h-0.5 bg-rouge-indien"
            layoutId="underline"
          />
        )}
      </Link>
    </motion.div>
  );
}