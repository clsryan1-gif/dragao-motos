'use client';

import React, { useState, useEffect } from 'react';
import { Phone, AlertTriangle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { CONTACT_INFO } from '@/lib/constants';

export function StickySOS() {
  const [show, setShow] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => {
      // Mostrar após o Hero (500px)
      if (window.scrollY > 500) {
        setShow(true);
      } else {
        setShow(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!mounted) return null;

  return (
    <AnimatePresence>
      {show && (
        <motion.div 
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0, opacity: 0 }}
          className="fixed bottom-6 right-6 z-[9999] md:hidden"
        >
          <a 
            href={`${CONTACT_INFO.whatsapp}?text=%F0%9F%86%98%20AJUDA%20URGENTE!%20Minha%20moto%20me%20deixou%20na%20m%C3%A3o%20e%20preciso%20do%20Resgate%20do%20Drag%C3%A3o%20agora!%20%E2%80%BC%EF%B8%8F`} 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center gap-3 bg-red-600 text-white p-4 rounded-full shadow-[0_0_30px_rgba(220,38,38,0.7)] border-2 border-white/20 animate-pulse active:scale-90 transition-all"
          >
            <span className="text-lg">‼️</span>
            <span className="font-display font-black uppercase text-xs tracking-[0.2em]">SOS RESGATE</span>
            <span className="text-lg animate-bounce">🆘</span>
          </a>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
