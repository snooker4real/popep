import { motion } from 'framer-motion';

export default function FloatingHearts() {
  const floatingElements = Array(24).fill(null);
  
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {floatingElements.map((_, i) => {
        const xPosition = i % 3 === 0 
          ? Math.random() * 30 
          : i % 3 === 1 
            ? 30 + Math.random() * 40 
            : 70 + Math.random() * 30;
            
        const yPosition = Math.random() > 0.5 ? '100%' : '-20%';
        const size = 20 + Math.random() * 40;
        const rotation = Math.random() * 360;
        
        return (
          <motion.div
            key={i}
            className="absolute"
            initial={{ 
              x: `${xPosition}%`,
              y: yPosition,
              scale: 0.5 + Math.random() * 0.5,
              opacity: 0.3 + Math.random() * 0.3,
              rotate: rotation
            }}
            animate={{
              y: yPosition === '100%' ? '-20%' : '100%',
              rotate: [rotation, rotation + 360],
              scale: [0.5 + Math.random() * 0.5, 0.8 + Math.random() * 0.5, 0.5 + Math.random() * 0.5]
            }}
            transition={{
              duration: 15 + Math.random() * 10,
              repeat: Infinity,
              ease: 'linear',
              scale: {
                duration: 3,
                repeat: Infinity,
                ease: 'easeInOut'
              }
            }}
          >
            <img 
              src="/logo.svg" 
              alt="POPEP Logo" 
              className="w-auto h-auto opacity-30 hover:opacity-50 transition-opacity duration-300"
              style={{ 
                height: size,
                filter: 'drop-shadow(0 0 5px rgba(212, 101, 89, 0.8))'
              }}
            />
          </motion.div>
        );
      })}
    </div>
  );
}