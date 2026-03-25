'use client';

import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

export function HeroDragon() {
  const [isMobile, setIsMobile] = React.useState(false);
  const [mounted, setMounted] = React.useState(false);
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 800], [0, -100]);
  const rotate = useTransform(scrollY, [0, 800], [0, 10]);

  React.useEffect(() => {
    setMounted(true);
    setIsMobile(window.innerWidth < 768);
  }, []);

  if (!mounted || isMobile) return null;

  return (
    <motion.div 
      style={{ y: y1, rotate }}
      className="absolute top-0 right-[-10%] w-full h-full pointer-events-none z-0 opacity-10 select-none overflow-hidden"
    >
      <svg 
        viewBox="0 0 1000 1000" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full drop-shadow-[0_0_20px_rgba(34,197,94,0.1)]"
      >
        {/* Dragon Sinuous Body Path - Baseado no rastro sinuoso da imagem */}
        <motion.path 
          d="M900 100 Q 800 500 600 400 T 300 600 T 500 800 T 800 900" 
          stroke="white" 
          strokeWidth="4" 
          strokeLinecap="round" 
          strokeDasharray="10 20"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ 
            pathLength: 1, 
            opacity: [0.1, 0.3, 0.1],
            y: [0, -15, 0]
          }}
          transition={{ 
            pathLength: { duration: 1.5, ease: "easeInOut" },
            opacity: { duration: 4, repeat: Infinity, ease: "linear" },
            y: { duration: 6, repeat: Infinity, ease: "easeInOut" }
          }}
        />
        
        {/* Stylized Silhouette - Inspired by the 3D oriental dragon provided */}
        <path 
          d="M850 150 C 750 200 700 350 720 450 C 740 550 600 600 500 550 C 400 500 300 600 320 750 C 340 900 500 950 650 900" 
          stroke="gray" 
          strokeWidth="2" 
          strokeLinecap="round" 
          opacity="0.5"
        />
        
        {/* Dragon Head Detail - Com olhos 'acesos' como inovação Cyber */}
        <g transform="translate(850, 150) rotate(-45)">
          <path d="M-40 -20 L 20 0 L -40 20 Z" fill="gray" opacity="0.4" />
          <circle cx="-10" cy="-5" r="3" fill="#22c55e" className="animate-pulse shadow-neon" />
          <circle cx="-10" cy="5" r="3" fill="#22c55e" className="animate-pulse shadow-neon" />
        </g>

        {/* Scales / Textura sutil along the body */}
        <path 
          d="M720 450 L 740 430 M500 550 L 520 530 M320 750 L 340 730" 
          stroke="gray" 
          strokeWidth="1" 
          opacity="0.3" 
        />
      </svg>
    </motion.div>
  );
}
