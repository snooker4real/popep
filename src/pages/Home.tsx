import { Users, MapPin, Baby, Star, ShoppingCart } from 'lucide-react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Tile from '../components/PlayingCard';

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 }
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.2
    }
  }
};

const tileVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 }
};

export default function Home() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);

  const gameVersions = [
    {
      id: 'couple',
      icon: <img src="/logo.svg" alt="POPEP Logo" className="w-8 h-8" />,
      title: t('home.couple.title'),
      description: t('home.couple.description'),
      color: "rouge-indien",
      path: "/products/couple",
      price: "24,99 €"
    },
    {
      id: 'distance',
      icon: <MapPin className="w-8 h-8 text-vieux-rose" />,
      title: t('home.distance.title'),
      description: t('home.distance.description'),
      color: "vieux-rose",
      path: "/products/distance",
      price: "24,99 €"
    },
    {
      id: 'postpartum',
      icon: <Baby className="w-8 h-8 text-vert-cyan" />,
      title: t('home.postpartum.title'),
      description: t('home.postpartum.description'),
      color: "vert-cyan",
      path: "/products/postpartum",
      price: "24,99 €"
    },
    {
      id: 'friends',
      icon: <Users className="w-8 h-8 text-rouge-indien dark:text-rose-pale" />,
      title: t('home.friends.title'),
      description: t('home.friends.description'),
      color: "rouge-indien",
      path: "/products/friends",
      price: "24,99 €"
    }
  ];

  const handleProductClick = (path: string) => {
    navigate(path);
  };

  return (
    <div ref={containerRef} className="min-h-screen bg-gradient-to-b from-rose-pale to-vert-eau pt-20">
      {/* Hero Section */}
      <header className="relative py-12 md:py-20 px-4 text-center overflow-hidden">
        {/* Video Background */}
        <div className="absolute inset-0 w-full h-full overflow-hidden z-0">
          <div className="absolute inset-0 backdrop-blur-[2px] z-10" />
          <video
            autoPlay
            loop
            muted
            playsInline
            className="absolute w-full h-full object-cover object-center opacity-60"
          >
            <source
              src="https://videos.pexels.com/video-files/3704254/3704254-uhd_2732_1440_25fps.mp4"
              type="video/mp4"
            />
          </video>
        </div>
        <motion.div 
          className="max-w-6xl mx-auto relative z-10"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.div
            className="flex justify-center mb-6"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <img src="/logo.svg" alt="POPEP Logo" className="h-48 md:h-56 w-auto" />
            <span className="text-xs align-top">®</span>
          </motion.div>
          <motion.p 
            className="text-2xl md:text-3xl font-title tracking-wide mb-6 md:mb-8 text-gris-fonce dark:text-blanc"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            {t('hero.subtitle')}
          </motion.p>
          <motion.p 
            className="text-lg md:text-xl mb-8 md:mb-12 text-gris-fonce dark:text-blanc font-medium drop-shadow-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            {t('hero.description')}
          </motion.p>
        </motion.div>
      </header>

      {/* Game Versions Section */}
      <section className="relative py-12 md:py-16 px-4 bg-blanc dark:bg-gris-fonce overflow-hidden">
        <div className="max-w-6xl mx-auto">
          <motion.h2 
            className="text-3xl md:text-4xl font-title tracking-wider text-center mb-8 md:mb-12 text-gris-fonce dark:text-blanc"
            variants={tileVariants}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            {t('home.versions')}
          </motion.h2>
          <div className="grid lg:grid-cols-2 gap-8 items-start">
            <motion.div 
              className="grid sm:grid-cols-2 gap-6 md:gap-8"
              variants={staggerContainer}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
            >
              {gameVersions.map((version) => (
                <motion.div
                  key={version.id}
                  className="group cursor-pointer"
                  variants={tileVariants}
                  onClick={() => handleProductClick(version.path)}
                >
                  <div className="relative overflow-hidden">
                    <Tile
                      icon={version.icon}
                      title={version.title}
                      description={version.description}
                      color={version.color}
                    />
                    <motion.div 
                      className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-noir/80 to-transparent p-4 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                    >
                      <div className="flex justify-between items-center text-blanc mb-2">
                        <span className="font-title text-xl">{version.price}</span>
                        <motion.button
                          className={`bg-${version.color} px-4 py-2 rounded-full flex items-center gap-2 hover:opacity-90`}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <ShoppingCart className="w-4 h-4" />
                          <span className="font-subtitle">Acheter</span>
                        </motion.button>
                      </div>
                    </motion.div>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            <motion.div
              className="relative rounded-2xl overflow-hidden shadow-xl h-[600px] lg:sticky lg:top-24"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <img 
                src="https://images.unsplash.com/photo-1744972991249-6b2906f0118c"
                alt="Game Versions"
                className="w-full h-full object-cover object-center transition-all duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-noir/50 to-transparent" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="relative py-12 md:py-16 px-4 bg-vert-eau dark:bg-vert-eau/30 overflow-hidden">
        <div className="max-w-6xl mx-auto">
          <motion.h2 
            className="text-3xl md:text-4xl font-title tracking-wider text-center mb-8 md:mb-12 text-gris-fonce dark:text-blanc"
            variants={tileVariants}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            {t('home.testimonials.title')}
          </motion.h2>
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            <motion.div 
              className="grid sm:grid-cols-2 lg:grid-cols-1 gap-6 md:gap-8"
              variants={staggerContainer}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
            >
              <TestimonialTile
                text={t('home.testimonials.couple.text')}
                author={t('home.testimonials.couple.author')}
                rating={5}
              />
              <TestimonialTile
                text={t('home.testimonials.friends.text')}
                author={t('home.testimonials.friends.author')}
                rating={5}
              />
              <TestimonialTile
                text={t('home.testimonials.parents.text')}
                author={t('home.testimonials.parents.author')}
                rating={5}
              />
            </motion.div>
            <motion.div
              className="relative rounded-2xl overflow-hidden shadow-xl h-[600px]"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <img 
                src="https://images.unsplash.com/photo-1744972991871-cf0a4d045f6f"
                alt="Testimonials"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-noir/50 to-transparent" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gris-fonce text-blanc py-8 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <p className="mb-4 text-sm md:text-base">{t('footer.rights')}</p>
          <div className="flex flex-wrap justify-center gap-4 text-sm md:text-base">
            <a href="#newsletter" className="hover:text-rouge-indien">{t('footer.contact')}</a>
            <Link to="/legal" className="hover:text-rouge-indien">{t('footer.legal')}</Link>
            <Link to="/cgv" className="hover:text-rouge-indien">{t('footer.terms')}</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}

function TestimonialTile({ text, author, rating }: { 
  text: string; 
  author: string; 
  rating: number;
}) {
  return (
    <motion.div 
      className="bg-blanc dark:bg-gris-fonce p-6 md:p-8 rounded-lg shadow-md relative border-l-4 border-rouge-indien"
      variants={tileVariants}
      whileHover={{ scale: 1.02 }}
      transition={{ type: "spring", stiffness: 400, damping: 10 }}
    >
      <motion.div 
        className="flex mb-4 justify-center"
        whileHover={{ scale: 1.1 }}
      >
        {[...Array(rating)].map((_, i) => (
          <motion.div
            key={i}
            whileHover={{ scale: 1.2, rotate: 360 }}
            transition={{ type: "spring", stiffness: 260, damping: 20 }}
          >
            <Star className="w-4 md:w-5 h-4 md:h-5 text-rouge-indien fill-current" />
          </motion.div>
        ))}
      </motion.div>
      <p className="text-gris-fonce dark:text-blanc mb-4 italic text-sm md:text-base">"{text}"</p>
      <p className="text-vieux-rose font-semibold text-sm md:text-base">{author}</p>
    </motion.div>
  );
}