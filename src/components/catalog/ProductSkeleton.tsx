'use client';

import React from 'react';
import { motion } from 'framer-motion';

export const ProductSkeleton = () => {
  return (
    <div className="bg-aco-grad border-chrome rounded-2xl overflow-hidden flex flex-col h-full animate-pulse lg:h-[400px]">
      <div className="bg-white/5 h-48 w-full relative overflow-hidden">
        <motion.div 
          className="absolute inset-0 bg-gradient-to-r from-transparent via-neon-verde/5 to-transparent"
          animate={{ x: ['-100%', '100%'] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
        />
      </div>
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

export const ProductListSkeleton = () => {
  return (
    <div className="bg-aco-grad border-chrome rounded-[2rem] overflow-hidden flex flex-col md:flex-row h-auto md:h-48 animate-pulse mb-6">
      <div className="w-full md:w-64 h-48 md:h-full bg-white/5 relative overflow-hidden">
         <motion.div 
          className="absolute inset-0 bg-gradient-to-r from-transparent via-neon-verde/5 to-transparent"
          animate={{ x: ['-100%', '100%'] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
        />
      </div>
      <div className="flex-1 p-6 md:p-8 flex flex-col md:flex-row gap-8 items-start md:items-center">
         <div className="flex-1 space-y-4 w-full">
            <div className="h-3 w-20 bg-white/5 rounded"></div>
            <div className="h-8 w-3/4 bg-white/5 rounded"></div>
            <div className="flex gap-4">
               <div className="h-3 w-24 bg-white/5 rounded"></div>
               <div className="h-3 w-24 bg-white/5 rounded"></div>
            </div>
         </div>
         <div className="w-full md:w-auto flex md:flex-col items-center md:items-end justify-between gap-4">
            <div className="space-y-2">
               <div className="h-2 w-16 bg-white/5 rounded ml-auto"></div>
               <div className="h-8 w-32 bg-white/5 rounded"></div>
            </div>
            <div className="h-12 w-48 bg-white/5 rounded-xl border-2 border-white/5"></div>
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
