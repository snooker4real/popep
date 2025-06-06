import { motion } from 'framer-motion';
import { ShoppingCart } from 'lucide-react';
import { ProductId } from '../stripe-config';

interface TileProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  color: string;
  number?: string;
  suit?: string;
  value?: string;
  productId?: ProductId;
  onAddToCart?: (productId: ProductId) => void;
}

export default function Tile({ 
  icon, 
  title, 
  description, 
  color,
  number,
  suit,
  value,
  productId,
  onAddToCart
}: TileProps) {
  return (
    <motion.div 
      className="group relative bg-blanc/80 dark:bg-gris-fonce/80 rounded-xl overflow-hidden backdrop-blur-sm hover:backdrop-blur-lg transition-all duration-700"
      style={{
        boxShadow: '0 0 20px rgba(0, 0, 0, 0.1), inset 0 0 20px rgba(255, 255, 255, 0.1)'
      }}
      whileHover={{ 
        scale: 1.02,
        rotateY: 5,
        rotateX: 5,
      }}
      whileTap={{ scale: 0.98 }}
      transition={{ 
        type: "spring",
        stiffness: 200,
        damping: 20,
        mass: 1
      }}
    >
      {/* Decorative background pattern */}
      <motion.div 
        className="absolute inset-0 opacity-5 dark:opacity-10 pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.1 }}
        transition={{ duration: 1 }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-current to-transparent" />
        <div className="w-full h-full bg-[radial-gradient(circle_at_center,currentColor_1px,transparent_1px)] bg-[length:24px_24px]" />
      </motion.div>

      {/* Number badge (optional) */}
      {number && (
        <motion.div 
          className="absolute top-2 sm:top-4 right-2 sm:right-4 w-8 sm:w-12 h-8 sm:h-12"
          whileHover={{ scale: 1.1, rotate: -12 }}
          transition={{ type: "spring", stiffness: 400, damping: 17 }}
        >
          <div className="absolute inset-0 bg-blanc dark:bg-gris-fonce rounded-full shadow-inner transform -rotate-12" />
          <div className={`absolute inset-0 flex items-center justify-center text-base sm:text-xl font-title text-${color}`}>
            {number}
          </div>
        </motion.div>
      )}

      {/* Playing card elements */}
      {(suit || value) && (
        <>
          <motion.div 
            className={`absolute top-2 left-2 text-${color} text-lg sm:text-2xl font-title`}
            whileHover={{ scale: 1.1 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
          >
            {value}
          </motion.div>
          <motion.div 
            className={`absolute top-6 left-2 text-${color} text-lg sm:text-2xl`}
            whileHover={{ scale: 1.1 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
          >
            {suit}
          </motion.div>
          <motion.div 
            className={`absolute bottom-2 right-2 text-${color} text-lg sm:text-2xl font-title rotate-180`}
            whileHover={{ scale: 1.1 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
          >
            {value}
          </motion.div>
          <motion.div 
            className={`absolute bottom-6 right-2 text-${color} text-lg sm:text-2xl rotate-180`}
            whileHover={{ scale: 1.1 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
          >
            {suit}
          </motion.div>
        </>
      )}
      
      <div className={`relative p-4 sm:p-6 md:p-8 border-l-4 border-${color} h-full flex flex-col bg-gradient-to-br from-blanc/40 dark:from-gris-fonce/40 to-blanc/20 dark:to-gris-fonce/20 backdrop-blur-sm transition-all duration-700`}>
        <motion.div 
          className={`mb-4 sm:mb-6 ${number ? 'mt-4 sm:mt-6' : ''} text-${color}`}
          whileHover={{ scale: 1.1, rotate: [0, 5, -5, 0] }}
          transition={{ 
            duration: 0.8,
            type: "spring",
            stiffness: 200,
            damping: 10
          }}
        >
          {icon}
        </motion.div>
        
        {title && (
          <motion.h3 
            className={`text-xl sm:text-2xl font-title tracking-wide mb-3 sm:mb-4 text-${color} relative`}
            whileHover={{ x: 10 }}
            transition={{ type: "spring", stiffness: 200, damping: 10 }}
          >
            {title}
            <motion.div 
              className="absolute -bottom-1 left-0 w-0 group-hover:w-full h-0.5 bg-current transition-all duration-700 ease-in-out"
              initial={{ width: 0 }}
              whileHover={{ width: "100%" }}
            />
          </motion.h3>
        )}
        
        <motion.p 
          className="text-gris-fonce dark:text-rose-pale text-sm sm:text-base flex-grow leading-relaxed"
          initial={{ opacity: 0.8 }}
          whileHover={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          {description}
        </motion.p>

        {productId && onAddToCart && (
          <motion.button
            onClick={() => onAddToCart(productId)}
            className={`mt-4 flex items-center justify-center gap-2 w-full py-2 px-4 bg-${color} text-blanc rounded-lg`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <ShoppingCart className="w-4 h-4" />
            <span>Ajouter au panier</span>
          </motion.button>
        )}

        {/* Decorative elements */}
        <motion.div 
          className={`absolute bottom-0 right-0 w-16 sm:w-24 h-16 sm:h-24 opacity-5 dark:opacity-10 transform rotate-45 translate-x-8 sm:translate-x-12 translate-y-8 sm:translate-y-12 bg-${color}`}
          animate={{
            scale: [1, 1.1, 1],
            rotate: [45, 60, 45],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>
    </motion.div>
  );
}