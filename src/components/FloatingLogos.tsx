import { motion } from 'framer-motion';

export default function FloatingLogos() {
  const floatingElements = Array(12).fill(null);
  
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {floatingElements.map((_, i) => {
        const xPosition = Math.random() * 100;
        const yPosition = Math.random() * 100;
        const size = 15 + Math.random() * 20;
        const rotation = Math.random() * 360;
        const duration = 20 + Math.random() * 20;
        
        return (
          <motion.div
            key={i}
            className="absolute"
            initial={{ 
              x: `${xPosition}%`,
              y: `${yPosition}%`,
              scale: 0.3 + Math.random() * 0.3,
              opacity: 0.1 + Math.random() * 0.2,
              rotate: rotation
            }}
            animate={{
              x: [`${xPosition}%`, `${(xPosition + 20) % 100}%`, `${xPosition}%`],
              y: [`${yPosition}%`, `${(yPosition + 20) % 100}%`, `${yPosition}%`],
              rotate: [rotation, rotation + 360],
              scale: [0.3 + Math.random() * 0.3, 0.4 + Math.random() * 0.3, 0.3 + Math.random() * 0.3]
            }}
            transition={{
              duration: duration,
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
              className="w-auto h-auto opacity-20 dark:opacity-10"
              style={{ 
                height: size,
                filter: 'drop-shadow(0 0 2px rgba(212, 101, 89, 0.3))'
              }}
            />
          </motion.div>
        );
      })}
    </div>
  );
}