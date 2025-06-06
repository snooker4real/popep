import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { Globe2, X } from 'lucide-react';

export default function MobileLanguageSwitcher() {
  const { t, i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const languages = [
    { code: 'fr', name: '🇫🇷 Français' },
    { code: 'en', name: '🇬🇧 English' },
    { code: 'es', name: '🇪🇸 Español' },
    { code: 'sw', name: '🇹🇿 Kiswahili' }
  ];

  useEffect(() => {
    const checkMobile = () => {
      setIsVisible(window.innerWidth <= 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  if (!isVisible) return null;

  return (
    <>
      <motion.button
        className="fixed bottom-4 right-4 z-50 bg-rouge-indien text-blanc rounded-full p-3 shadow-lg"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(true)}
        aria-label="Change Language"
      >
        <Globe2 className="w-6 h-6" />
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
              className="fixed bottom-0 left-0 right-0 bg-blanc dark:bg-gris-fonce rounded-t-3xl p-6 shadow-xl z-50"
            >
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-title text-gris-fonce dark:text-blanc">
                  {t('language.select')}
                </h3>
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-gris-fonce dark:text-blanc hover:text-rouge-indien"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
              <div className="grid grid-cols-2 gap-3">
                {languages.map((lang) => (
                  <motion.button
                    key={lang.code}
                    className={`p-3 rounded-lg text-left transition-colors ${
                      i18n.language === lang.code
                        ? 'bg-rouge-indien text-blanc'
                        : 'bg-rose-pale/20 text-gris-fonce dark:text-blanc hover:bg-rose-pale/30'
                    }`}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => {
                      i18n.changeLanguage(lang.code);
                      setIsOpen(false);
                    }}
                  >
                    {lang.name}
                  </motion.button>
                ))}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}