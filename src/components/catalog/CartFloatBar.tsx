'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBag, Zap, ChevronRight } from 'lucide-react';
import Link from 'next/link';
import { useCart } from '@/context/CartContext';
import { formatCurrency } from '@/lib/utils';

export function CartFloatBar() {
  const { cart, total, count } = useCart();

  return (
    <AnimatePresence>
      {count > 0 && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          className="fixed bottom-20 md:bottom-8 left-1/2 -translate-x-1/2 z-40 w-[90%] max-w-lg"
        >
          <div className="bg-aco-grad border-chrome p-4 rounded-3xl shadow-[0_0_30px_rgba(0,0,0,0.5)] flex items-center gap-4 relative overflow-hidden group">
            {/* Background scanner sweep */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-neon-verde/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-[2000ms] pointer-events-none" />
            
            <div className="flex-1 min-w-0">
               <div className="flex items-center gap-2 mb-1">
                  <div className="w-2 h-2 rounded-full bg-neon-verde animate-pulse shadow-neon" />
                  <span className="text-[10px] font-black uppercase tracking-[0.3em] text-neon-verde/80">Radar Ativo</span>
               </div>
               <p className="text-lg font-display font-black italic text-white uppercase tracking-tighter truncate leading-none">
                 {count} {count === 1 ? 'Item' : 'Itens'} no Radar
               </p>
               <p className="text-[9px] font-black text-white/30 uppercase tracking-[0.2em]">Total Parcial: {formatCurrency(total)}</p>
            </div>

            <Link href="/checkout">
               <motion.button
                 whileHover={{ scale: 1.05 }}
                 whileTap={{ scale: 0.95 }}
                 className="flex items-center gap-3 bg-neon-verde text-black px-6 py-4 rounded-2xl font-display font-black uppercase italic text-xs tracking-[0.15em] shadow-neon hover:bg-white transition-all active:shadow-none"
               >
                 <ShoppingBag size={18} />
                 <span>Finalizar</span>
                 <ChevronRight size={16} />
               </motion.button>
            </Link>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
