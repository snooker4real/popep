import { Target, Heart, Users, Baby } from 'lucide-react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useRef } from 'react';
import { Link } from 'react-router-dom';
import FloatingHearts from '../components/FloatingHearts';
import FloatingBlob from '../components/FloatingBlob';
import PlayingCard from '../components/PlayingCard';

export default function Objectives() {
  const { t } = useTranslation();
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);

  const objectives = [
    {
      icon: <Heart className="w-8 h-8 text-rouge-indien" />,
      text: t('objectives.quality_moments'),
      color: "rouge-indien"
    },
    {
      icon: <Users className="w-8 h-8 text-vieux-rose" />,
      text: t('objectives.challenges'),
      color: "vieux-rose"
    },
    {
      icon: <Target className="w-8 h-8 text-vert-cyan" />,
      text: t('objectives.distance'),
      color: "vert-cyan"
    },
    {
      icon: <Baby className="w-8 h-8 text-gris-fonce dark:text-rose-pale" />,
      text: t('objectives.parents'),
      color: "gris-fonce"
    }
  ];

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
              src="https://videos.pexels.com/video-files/6668765/6668765-hd_1920_1080_30fps.mp4"
              type="video/mp4"
            />
          </video>
        </div>
        <div className="max-w-6xl mx-auto relative z-10">
          <motion.h1
            className="text-4xl font-title tracking-wider text-center mb-12 text-gris-fonce dark:text-blanc"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {t('objectives.title')}
          </motion.h1>

          <div className="grid lg:grid-cols-2 gap-8 items-start">
            <motion.div
              className="grid gap-6"
              variants={{
                animate: {
                  transition: {
                    staggerChildren: 0.2
                  }
                }
              }}
              initial="initial"
              animate="animate"
            >
              {objectives.map((objective, index) => (
                <motion.div
                  key={index}
                  variants={{
                    initial: { opacity: 0, y: 20 },
                    animate: { opacity: 1, y: 0 }
                  }}
                >
                  <PlayingCard
                    icon={objective.icon}
                    title=""
                    description={objective.text}
                    color={objective.color}
                  />
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
                src="https://images.unsplash.com/photo-1744972991276-c5a660a69998?q=80&w=3387&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="POPEP Objectives"
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