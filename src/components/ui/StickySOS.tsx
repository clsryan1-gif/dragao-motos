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
            href={`${CONTACT_INFO.whatsapp}?text=SOS%20DRAGÃO!%20Minha%20moto%20parou%20e%20preciso%20de%20ajuda%20urgente.`} 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center gap-3 bg-red-600 text-white p-4 rounded-full shadow-[0_0_20px_rgba(220,38,38,0.5)] border border-red-500 animate-pulse"
          >
            <AlertTriangle className="w-5 h-5" />
            <span className="font-display font-bold uppercase text-xs tracking-widest">SOS OFICINA</span>
          </a>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
