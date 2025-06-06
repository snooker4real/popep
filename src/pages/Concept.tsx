import { Users, MapPin, Baby, Star } from 'lucide-react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import FloatingHearts from '../components/FloatingHearts';
import FloatingBlob from '../components/FloatingBlob';
import PlayingCard from '../components/PlayingCard';

export default function Concept() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const containerRef = useRef(null);
  const [selectedVersion, setSelectedVersion] = useState<string | null>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);

  const gameVersions = [
    {
      id: 'couple',
      icon: <img src="/logo.svg\" alt="POPEP Logo\" className="w-8 h-8" />,
      title: t('concept.versions.couple.title'),
      description: t('concept.versions.couple.description'),
      color: "rouge-indien",
      image: "https://images.unsplash.com/photo-1745671762109-cdd5ca111765?q=80&w=1887&auto=format&fit=crop",
      longDescription: t('concept.versions.couple.longDescription'),
      path: "/products/couple"
    },
    {
      id: 'distance',
      icon: <MapPin className="w-8 h-8 text-vieux-rose" />,
      title: t('concept.versions.distance.title'),
      description: t('concept.versions.distance.description'),
      color: "vieux-rose",
      image: "https://images.unsplash.com/photo-1745671756390-971023ed5060?q=80&w=1887&auto=format&fit=crop",
      longDescription: t('concept.versions.distance.longDescription'),
      path: "/products/distance"
    },
    {
      id: 'postpartum',
      icon: <Baby className="w-8 h-8 text-vert-cyan" />,
      title: t('concept.versions.postpartum.title'),
      description: t('concept.versions.postpartum.description'),
      color: "vert-cyan",
      image: "https://images.unsplash.com/photo-1745671785278-d2f5a2fdc597?q=80&w=1887&auto=format&fit=crop",
      longDescription: t('concept.versions.postpartum.longDescription'),
      path: "/products/postpartum"
    },
    {
      id: 'friends',
      icon: <Users className="w-8 h-8 text-gris-fonce dark:text-rose-pale" />,
      title: t('concept.versions.friends.title'),
      description: t('concept.versions.friends.description'),
      color: "gris-fonce",
      image: "https://images.unsplash.com/photo-1745671792141-6a4ca9d03d36?q=80&w=1887&auto=format&fit=crop",
      longDescription: t('concept.versions.friends.longDescription'),
      path: "/products/friends"
    }
  ];

  const handleProductClick = (path: string) => {
    navigate(path);
  };

  return (
    <div ref={containerRef} className="min-h-screen bg-gradient-to-b from-rose-pale to-vert-eau pt-20">
      <FloatingBlob />
      <section className="relative py-16 px-4">
        <FloatingHearts />
        {/* Video Background */}
        <div className="absolute inset-0 w-full h-full overflow-hidden z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-rose-pale/60 to-vert-eau/60 backdrop-blur-[2px] z-10" />
          <video
            autoPlay
            loop
            muted
            playsInline
            className="absolute w-full h-full object-cover object-center opacity-60"
          >
            <source
              src="https://videos.pexels.com/video-files/3189051/3189051-hd_1920_1080_25fps.mp4"
              type="video/mp4"
            />
          </video>
        </div>
        <div className="max-w-6xl mx-auto relative z-10">
          <motion.h1 
            className="text-5xl font-title tracking-wider text-center mb-6 text-gris-fonce dark:text-blanc"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Concept
          </motion.h1>
          <motion.div 
            className="bg-blanc/90 dark:bg-gris-fonce/90 rounded-lg p-8 mb-12 max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <p className="text-lg text-vieux-rose dark:text-rose-pale mb-6 leading-relaxed text-center">
              {t('concept.intro.text1')}
            </p>
            <p className="text-lg text-vieux-rose dark:text-rose-pale leading-relaxed text-center">
              {t('concept.intro.text2')}
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <motion.div 
              className="grid sm:grid-cols-2 gap-8"
              initial="hidden"
              animate="visible"
              variants={{
                visible: {
                  transition: {
                    staggerChildren: 0.2
                  }
                }
              }}
            >
              {gameVersions.map((version) => (
                <motion.div
                  key={version.id}
                  className="relative cursor-pointer"
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    visible: { opacity: 1, y: 0 }
                  }}
                  onHoverStart={() => setSelectedVersion(version.id)}
                  onHoverEnd={() => setSelectedVersion(null)}
                  onClick={() => handleProductClick(version.path)}
                >
                  <PlayingCard
                    icon={version.icon}
                    title={version.title}
                    description={version.description}
                    color={version.color}
                  />
                  {(selectedVersion === version.id) && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="absolute top-full left-0 right-0 mt-2 p-4 bg-blanc dark:bg-gris-fonce rounded-lg shadow-xl z-20"
                    >
                      <div className="h-48 overflow-hidden rounded-lg">
                        <img
                          src={version.image}
                          alt={version.title}
                          className="w-full h-full object-cover object-center"
                        />
                      </div>
                      <p className="text-gris-fonce dark:text-blanc text-sm mt-4">
                        {version.longDescription}
                      </p>
                    </motion.div>
                  )}
                </motion.div>
              ))}
            </motion.div>

            <motion.div
              className="relative rounded-2xl overflow-hidden shadow-xl h-[800px] lg:sticky lg:top-24"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <img 
                src="https://i.ibb.co/4wL0D5v7/Whats-App-Image-2025-05-17-at-14-13-37.jpg"
                alt="POPEP Concept"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-noir/50 to-transparent" />
            </motion.div>
          </div>
        </div>
      </section>

      <footer className="bg-gris-fonce text-blanc py-8 px-4 mt-auto">
        <div className="max-w-6xl mx-auto text-center">
          <p className="mb-4">{t('footer.rights')}</p>
          <div className="flex justify-center gap-4">
            <a href="#" className="hover:text-rouge-indien">{t('footer.contact')}</a>
            <Link to="/legal" className="hover:text-rouge-indien transition-colors">
              {t('footer.legal')}
            </Link>
            <a href="#" className="hover:text-rouge-indien">{t('footer.terms')}</a>
          </div>
        </div>
      </footer>
    </div>
  );
}