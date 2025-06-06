import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';

export default function LanguageSwitcher() {
  const { i18n } = useTranslation();

  const languages = [
    { code: 'fr', name: '🇫🇷' },
    { code: 'en', name: '🇬🇧' },
    { code: 'es', name: '🇪🇸' },
    { code: 'sw', name: '🇹🇿' }
  ];

  return (
    <div className="flex gap-2 flex-wrap justify-center">
      {languages.map((lang) => (
        <motion.button
          key={lang.code}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className={`px-2 py-1 rounded ${
            i18n.language === lang.code
              ? 'bg-rouge-indien text-blanc'
              : 'bg-transparent hover:bg-rose-pale'
          }`}
          onClick={() => i18n.changeLanguage(lang.code)}
        >
          {lang.name}
        </motion.button>
      ))}
    </div>
  );
}