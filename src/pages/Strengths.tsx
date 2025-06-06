import { Briefcase, Heart, Users } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import PlayingCard from '../components/PlayingCard';
import FloatingBlob from '../components/FloatingBlob';

export default function Strengths() {
  const { t } = useTranslation();

  const cardVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-rose-pale to-vert-eau pt-20">
      <FloatingBlob />
      <section className="relative py-16 px-4">
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
              src="https://videos.pexels.com/video-files/3444516/3444516-hd_1920_1080_30fps.mp4"
              type="video/mp4"
            />
          </video>
        </div>
        <div className="max-w-6xl mx-auto relative z-10">
          <motion.h1 
            className="text-4xl font-title tracking-wider text-center mb-6 text-gris-fonce"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {t('strengths.title')}
          </motion.h1>
          <motion.p 
            className="text-xl text-center mb-12 text-vieux-rose"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {t('strengths.subtitle')}
          </motion.p>

          <div className="grid lg:grid-cols-2 gap-8 items-center">
            <motion.div 
              className="grid gap-8"
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
              <motion.div variants={cardVariants}>
                <PlayingCard
                  icon={<Briefcase className="w-12 h-12 text-rouge-indien" />}
                  title={t('strengths.expertise.title')}
                  description={t('strengths.expertise.description')}
                  color="rouge-indien"
                  number="01"
                />
              </motion.div>
              <motion.div variants={cardVariants}>
                <PlayingCard
                  icon={<Heart className="w-12 h-12 text-vieux-rose" />}
                  title={t('strengths.passion.title')}
                  description={t('strengths.passion.description')}
                  color="vieux-rose"
                  number="02"
                />
              </motion.div>
              <motion.div variants={cardVariants}>
                <PlayingCard
                  icon={<Users className="w-12 h-12 text-rouge-indien dark:text-rose-pale" />}
                  title={t('strengths.accessibility.title')}
                  description="Un jeu invitant le joueur à s'amuser, sans exclusion. Chacun trouve sa place, son rythme et partage des moments de complicité"
                  color="rouge-indien"
                  number="03"
                />
              </motion.div>
            </motion.div>

            <motion.div
              className="relative rounded-2xl overflow-hidden shadow-xl"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <img 
                src="https://images.unsplash.com/photo-1744972991276-60dc65d9f79a?q=80&w=3387&auto=format&fit=crop"
                alt="Pierre et Kamilo"
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
            <a href="#" className="hover:text-rouge-indien">{t('footer.legal')}</a>
            <a href="#" className="hover:text-rouge-indien">{t('footer.terms')}</a>
          </div>
        </div>
      </footer>
    </div>
  );
}