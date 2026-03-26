'use client';

import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, AlertCircle, X, Zap } from 'lucide-react';

interface ToastProps {
  message: string;
  type?: 'success' | 'error' | 'info';
  isVisible: boolean;
  onClose: () => void;
}

export function Toast({ message, type = 'success', isVisible, onClose }: ToastProps) {
  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        onClose();
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [isVisible, onClose]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: -50, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -20, scale: 0.9, transition: { duration: 0.2 } }}
          className="fixed top-6 md:top-10 left-1/2 -translate-x-1/2 z-[100] w-full max-w-xs md:max-w-sm px-4"
        >
          <div className={`
            relative p-4 rounded-2xl border-2 backdrop-blur-md flex items-center gap-4
            ${type === 'success' ? 'bg-black/80 border-neon-verde shadow-neon' : 'bg-black/80 border-red-500 shadow-[0_0_20px_rgba(239,68,68,0.2)]'}
          `}>
            {/* Decoration line */}
            <div className={`absolute top-0 left-0 w-full h-1 rounded-t-xl ${type === 'success' ? 'bg-neon-verde animate-pulse' : 'bg-red-500'}`}></div>

            <div className={`flex-shrink-0 p-2 rounded-lg ${type === 'success' ? 'bg-neon-verde/20' : 'bg-red-500/20'}`}>
              {type === 'success' ? <CheckCircle className="text-neon-verde" size={20} /> : <AlertCircle className="text-red-500" size={20} />}
            </div>

            <div className="flex-1">
              <p className="text-[10px] font-black uppercase tracking-[0.2em] text-white/40 mb-1">
                {type === 'success' ? 'Status: Sucesso' : 'Status: Erro de Sistema'}
              </p>
              <p className="text-xs font-bold text-white uppercase tracking-wider leading-relaxed">
                {message}
              </p>
            </div>

            <button 
              onClick={onClose}
              className="p-1 hover:bg-white/10 rounded-lg transition-colors text-white/40 hover:text-white"
            >
              <X size={16} />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
