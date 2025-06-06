import { Sparkles, Heart, Gift, Palette, MessageCircleHeart, Users, Globe2, HandHeart } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import Tile from '../components/PlayingCard';
import FloatingBlob from '../components/FloatingBlob';

export default function About() {
  const { t } = useTranslation();

  const socialLinks = [
    { icon: <Heart className="w-8 h-8" />, text: t('values.kindness.title'), description: t('values.kindness.description'), image: "https://i.ibb.co/R4h9L4wS/6.png" },
    { icon: <Users className="w-8 h-8" />, text: t('values.inclusivity.title'), description: t('values.inclusivity.description'), image: "https://i.ibb.co/sv1F700c/8.png" },
    { icon: <HandHeart className="w-8 h-8" />, text: t('values.commitment.title'), description: t('values.commitment.description'), image: "https://i.ibb.co/nq82WvPp/17.png" },
    { icon: <Globe2 className="w-8 h-8" />, text: t('values.complicity.title'), description: t('values.complicity.description'), image: "https://i.ibb.co/0RdLY8dg/24.png" },
  ];

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
              src="https://videos.pexels.com/video-files/1409899/1409899-hd_1920_1080_25fps.mp4"
              type="video/mp4"
            />
          </video>
        </div>
        <div className="max-w-6xl mx-auto relative z-10">
          <motion.h2 
            className="text-5xl font-title tracking-wider text-center mb-12 text-gris-fonce dark:text-blanc"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {t('about.title')}
          </motion.h2>

          <div className="max-w-4xl mx-auto mb-16">
            <motion.div 
              className="prose prose-xl text-gris-fonce dark:text-blanc text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <p className="text-lg leading-relaxed">
                {t('about.description.text1')}
              </p>
              <p className="text-lg leading-relaxed">
                {t('about.description.text2')}
              </p>
            </motion.div>
          </div>

          <motion.div 
            className="grid md:grid-cols-2 gap-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <motion.div
              className="relative rounded-2xl overflow-hidden shadow-xl h-[600px]"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              <img 
                src="https://i.ibb.co/GQM9nqth/501376791-17876265336343743-3322128539129087100-n.jpg"
                alt="Famille Popep"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-noir/30 to-transparent" />
            </motion.div>

            <div className="grid grid-cols-2 gap-6 h-[600px] content-between">
              <Tile
                icon={<Sparkles className="w-8 h-8" />}
                title={t('about.story.title')}
                description={t('about.story.description')}
                color="rouge-indien"
              />
              <Tile
                icon={<Heart className="w-8 h-8" />}
                title={t('about.mission.title')}
                description={t('about.mission.description')}
                color="vieux-rose"
              />
              <Tile
                icon={<Gift className="w-8 h-8" />}
                title={t('about.vision.title')}
                description={t('about.vision.description')}
                color="vert-cyan"
              />
              <Tile
                icon={<Palette className="w-8 h-8" />}
                title={t('about.values.title')}
                description={t('about.values.description')}
                color="rouge-indien"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.h2 
            className="text-4xl font-title tracking-wider text-center mb-12 text-gris-fonce dark:text-blanc"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {t('values.title')}
          </motion.h2>
          <div className="grid md:grid-cols-2 gap-12">
            {socialLinks.map((link, index) => (
              <ValueTile
                key={index}
                icon={link.icon}
                title={link.text}
                description={link.description}
                image={link.image}
                color="rouge-indien"
              />
            ))}
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

function ValueTile({ 
  icon, 
  title, 
  description, 
  image,
  color
}: { 
  icon: React.ReactNode; 
  title: string; 
  description: string;
  image: string;
  color: string;
}) {
  return (
    <motion.div 
      className={`bg-blanc dark:bg-gris-fonce rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300`}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      whileHover={{ scale: 1.02 }}
    >
      <div className="h-48 overflow-hidden">
        <img 
          src={image} 
          alt={title} 
          className="w-full h-full object-cover"
        />
      </div>
      <div className={`p-6 border-l-4 border-${color}`}>
        <div className="flex items-center gap-4 mb-4">
          <motion.div
            className={`text-${color}`}
            whileHover={{ scale: 1.1 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            {icon}
          </motion.div>
          <h3 className={`text-xl font-title tracking-wide text-${color}`}>{title}</h3>
        </div>
        <p className="text-gris-fonce dark:text-blanc">{description}</p>
      </div>
    </motion.div>
  );
}