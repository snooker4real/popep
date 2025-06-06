import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

export default function FloatingBlob() {
  const [path, setPath] = useState('');
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!isClient) return;

    const generateBlobPath = () => {
      const numPoints = 12;
      const angleStep = (Math.PI * 2) / numPoints;
      const points: [number, number][] = [];
      
      for (let i = 0; i < numPoints; i++) {
        const angle = i * angleStep;
        const radius = 100 + Math.random() * 50;
        const x = Math.cos(angle) * radius;
        const y = Math.sin(angle) * radius;
        points.push([x, y]);
      }

      return `M ${points[0][0]},${points[0][1]} 
        ${points.map((point, i) => {
          const nextPoint = points[(i + 1) % points.length];
          const controlPoint1 = [
            point[0] + (nextPoint[0] - point[0]) / 3,
            point[1] + (nextPoint[1] - point[1]) / 3
          ];
          const controlPoint2 = [
            point[0] + 2 * (nextPoint[0] - point[0]) / 3,
            point[1] + 2 * (nextPoint[1] - point[1]) / 3
          ];
          return `C ${controlPoint1[0]},${controlPoint1[1]} ${controlPoint2[0]},${controlPoint2[1]} ${nextPoint[0]},${nextPoint[1]}`;
        }).join(' ')} Z`;
    };

    const updatePath = () => {
      setPath(generateBlobPath());
    };

    updatePath();
    const interval = setInterval(updatePath, 5000);

    return () => clearInterval(interval);
  }, [isClient]);

  if (!isClient || !path) return null;

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      <div className="absolute inset-0 flex items-center justify-center">
        <motion.svg
          width="800"
          height="800"
          viewBox="-150 -150 300 300"
          className="w-full h-full max-w-[800px] max-h-[800px]"
        >
          <defs>
            <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="rgba(212, 101, 89, 0.05)" />
              <stop offset="100%" stopColor="rgba(148, 104, 99, 0.05)" />
            </linearGradient>
            <linearGradient id="gradient2" x1="100%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="rgba(95, 127, 110, 0.05)" />
              <stop offset="100%" stopColor="rgba(216, 230, 219, 0.05)" />
            </linearGradient>
            <filter id="glow">
              <feGaussianBlur stdDeviation="4" result="coloredBlur" />
              <feMerge>
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>
          <motion.path
            d={path}
            fill="url(#gradient1)"
            filter="url(#glow)"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{
              scale: [0.8, 1, 0.8],
              opacity: [0.3, 0.5, 0.3],
              rotate: [0, 360],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          <motion.path
            d={path}
            fill="url(#gradient2)"
            filter="url(#glow)"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{
              scale: [1, 0.8, 1],
              opacity: [0.5, 0.3, 0.5],
              rotate: [360, 0],
            }}
            transition={{
              duration: 15,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </motion.svg>
      </div>
    </div>
  );
}