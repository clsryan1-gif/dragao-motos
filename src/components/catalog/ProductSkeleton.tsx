'use client';

import React from 'react';
import { motion } from 'framer-motion';

export const ProductSkeleton = () => {
  return (
    <div className="bg-aco-grad border-chrome rounded-2xl overflow-hidden flex flex-col h-full animate-pulse lg:h-[400px]">
      {/* Imagem Placeholder */}
      <div className="bg-white/5 h-48 w-full relative overflow-hidden">
        <motion.div 
          className="absolute inset-0 bg-gradient-to-r from-transparent via-neon-verde/5 to-transparent"
          animate={{ x: ['-100%', '100%'] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
        />
      </div>

      {/* Conteúdo Placeholder */}
      <div className="p-4 flex flex-col flex-1 gap-3">
        <div className="h-3 w-16 bg-white/5 rounded"></div>
        <div className="h-4 w-full bg-white/5 rounded"></div>
        <div className="h-4 w-2/3 bg-white/5 rounded"></div>
        
        <div className="mt-auto flex items-end justify-between pt-4 border-t border-white/5">
          <div className="space-y-1">
             <div className="h-2 w-12 bg-white/5 rounded"></div>
             <div className="h-6 w-24 bg-white/5 rounded"></div>
          </div>
          <div className="h-12 w-12 bg-white/5 rounded-xl border-2 border-white/5"></div>
        </div>
      </div>
    </div>
  );
};

export const CategorySkeleton = () => {
  return (
    <div className="flex gap-3 overflow-x-hidden pb-4">
      {[1, 2, 3, 4, 5].map((i) => (
        <div key={i} className="h-10 w-32 bg-aco-grad border-chrome rounded-xl shrink-0 animate-pulse"></div>
      ))}
    </div>
  );
};
