import { Facebook, Instagram, Phone, Mail, MapPin } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useRef, useState } from 'react';
import { supabase } from '../lib/supabase';
import toast, { Toaster } from 'react-hot-toast';

export default function Footer() {
  const { t } = useTranslation();
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const newsletterRef = useRef<HTMLInputElement>(null);

  const socialLinks = [
    { 
      icon: <Facebook size={20} />, 
      href: "https://www.facebook.com/share/14e3thZNDH/", 
      label: "Facebook" 
    },
    { 
      icon: <Instagram size={20} />, 
      href: "https://www.instagram.com/popepjeutadore?igsh=cXZxZnpwejhwZGFp&utm_source=qr", 
      label: "Instagram" 
    },
    { 
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M19.589 6.686a4.793 4.793 0 0 1-3.77-4.245V2h-3.445v13.672a2.896 2.896 0 0 1-5.201 1.743l-.002-.001.002.001a2.895 2.895 0 0 1 3.183-4.51v-3.5a6.329 6.329 0 0 0-5.394 10.692 6.33 6.33 0 0 0 10.857-4.424V8.687a8.182 8.182 0 0 0 4.773 1.526V6.79a4.831 4.831 0 0 1-1.003-.104z" fill="currentColor"/>
        </svg>
      ), 
      href: "https://www.tiktok.com/@popep.jeu.tadore?_t=ZN-8wDnqUYg26A&_r=1", 
      label: "TikTok" 
    },
  ];

  const contactInfo = [
    { icon: <Mail size={20} />, text: "support@popep.fr", href: "mailto:support@popep.fr" },
    { icon: <Phone size={20} />, text: "07 59 65 41 88", href: "tel:+33759654188" },
    { icon: <MapPin size={20} />, text: "Paris, France", href: null },
  ];

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      toast.error(t('newsletter.error.email_required', 'Please enter your email'));
      return;
    }

    setIsSubmitting(true);
    try {
      const { error } = await supabase
        .from('newsletter_subscribers')
        .insert([{ email }]);

      if (error) {
        if (error.code === '23505') {
          toast.error(t('newsletter.error.already_subscribed', 'You are already subscribed!'));
        } else {
          throw error;
        }
      } else {
        toast.success(t('newsletter.success', 'Successfully subscribed to newsletter!'));
        setEmail('');
      }
    } catch (error) {
      console.error('Error subscribing to newsletter:', error);
      toast.error(t('newsletter.error.generic', 'Failed to subscribe. Please try again.'));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <footer className="bg-gris-fonce text-blanc">
      <Toaster position="bottom-center" />
      <div className="max-w-6xl mx-auto px-4">
        {/* Main Footer Content */}
        <div className="py-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="space-y-4">
            <motion.div
              className="flex items-center gap-2"
              whileHover={{ scale: 1.05 }}
            >
              <img src="/logo.svg" alt="POPEP Logo" className="h-8" />
              <span className="text-xs align-top">®</span>
            </motion.div>
            <p className="text-sm text-gray-300">
              {t('footer.tagline', 'Creating moments of joy and connection through play')}
            </p>
            <div className="flex gap-4">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  className="text-gray-300 hover:text-rouge-indien transition-colors"
                  whileHover={{ scale: 1.2, rotate: 360 }}
                  transition={{ type: "spring", stiffness: 260, damping: 20 }}
                  aria-label={social.label}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {social.icon}
                </motion.a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">{t('footer.quickLinks', 'Quick Links')}</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/about" className="text-gray-300 hover:text-rouge-indien transition-colors">
                  {t('nav.about')}
                </Link>
              </li>
              <li>
                <Link to="/concept" className="text-gray-300 hover:text-rouge-indien transition-colors">
                  {t('nav.concept')}
                </Link>
              </li>
              <li>
                <Link to="/objectives" className="text-gray-300 hover:text-rouge-indien transition-colors">
                  {t('nav.objectives')}
                </Link>
              </li>
              <li>
                <Link to="/strengths" className="text-gray-300 hover:text-rouge-indien transition-colors">
                  {t('nav.strengths')}
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Information */}
          <div>
            <h3 className="text-lg font-semibold mb-4">{t('footer.contact', 'Contact Us')}</h3>
            <ul className="space-y-3">
              {contactInfo.map((info, index) => (
                <li key={index} className="flex items-center gap-2 text-gray-300">
                  {info.icon}
                  {info.href ? (
                    <a 
                      href={info.href} 
                      className="hover:text-rouge-indien transition-colors"
                    >
                      {info.text}
                    </a>
                  ) : (
                    <span>{info.text}</span>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-lg font-semibold mb-4" id="newsletter">{t('footer.newsletter', 'Newsletter')}</h3>
            <p className="text-sm text-gray-300 mb-4">
              {t('footer.newsletterText', 'Stay updated with our latest news and special offers!')}
            </p>
            <form onSubmit={handleSubscribe} className="space-y-2">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={t('footer.emailPlaceholder', 'Enter your email')}
                ref={newsletterRef}
                className="w-full px-4 py-2 rounded bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-rouge-indien"
              />
              <motion.button
                type="submit"
                disabled={isSubmitting}
                className="w-full px-4 py-2 bg-rouge-indien text-white rounded hover:bg-vieux-rose transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {isSubmitting ? t('footer.subscribing', 'Subscribing...') : t('footer.subscribe', 'Subscribe')}
              </motion.button>
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="py-6 border-t border-gray-700 text-center md:flex md:justify-between text-sm text-gray-400">
          <p>{t('footer.rights')} © 2024 POPEP<sup>®</sup></p>
          <div className="flex flex-wrap justify-center md:justify-end gap-4 mt-4 md:mt-0">
            <Link to="/legal" className="hover:text-rouge-indien transition-colors">
              {t('footer.legal')}
            </Link>
            <Link to="/cgv" className="hover:text-rouge-indien transition-colors">
              {t('footer.terms')}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}