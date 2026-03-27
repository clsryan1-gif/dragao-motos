'use client';

import React from 'react';
import { ShoppingCart, CheckCircle2, Box, Cpu, Zap, ChevronRight, Hexagon } from 'lucide-react';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import Link from 'next/link';

type Produto = {
  id: string;
  categoria: string;
  nome: string;
  compatibilidade: string;
  preco: number;
  imagem: string | null;
  estoque: number;
};

interface ProdutoListRowProps {
  produto: Produto;
  isAdded: boolean;
  onAdicionar: (p: Produto) => void;
  BRL: (v: number) => string;
}

const rowVariants: Variants = {
  hidden: { opacity: 0, x: -20 },
  show: { opacity: 1, x: 0, transition: { duration: 0.4 } }
};

const ProdutoListRow = React.memo(({ produto, isAdded, onAdicionar, BRL }: ProdutoListRowProps) => {
  return (
    <motion.div 
      variants={rowVariants}
      className="bg-aco-grad border-chrome rounded-[1.5rem] overflow-hidden flex flex-col md:flex-row hover:border-neon-verde transition-all duration-500 group relative shadow-xl isolate mb-2"
    >
      {/* Laser Scanner Effect */}
      <div className="absolute inset-y-0 left-0 w-[2px] bg-neon-verde shadow-[0_0_15px_#00FF33] z-20 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity animate-pulse"></div>

      {/* Image Block - Reduced Size */}
      <div className="w-full md:w-32 h-32 md:h-auto bg-black/40 relative overflow-hidden group/img shrink-0 border-b md:border-b-0 md:border-r border-white/5">
        <Link href={`/produtos/${produto.id}`} className="block h-full w-full">
           {produto.imagem ? (
             <img 
               src={produto.imagem} 
               alt={produto.nome} 
               className="w-full h-full object-contain p-4 grayscale-[0.3] group-hover/img:grayscale-0 group-hover/img:scale-110 transition-all duration-700"
             />
           ) : (
             <div className="w-full h-full flex flex-col items-center justify-center text-white/5 gap-1">
                <Box size={24} />
             </div>
           )}
        </Link>
        <div className="absolute top-2 left-2">
           <div className={`w-2 h-2 rounded-full ${produto.estoque > 0 ? 'bg-neon-verde shadow-neon' : 'bg-red-500'}`} title={produto.estoque > 0 ? 'Em Estoque' : 'Esgotado'} />
        </div>
      </div>

      {/* Info Block - Denser Layout */}
      <div className="flex-1 p-3 md:px-8 md:py-2.5 flex flex-col md:flex-row gap-4 items-start md:items-center">
         <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
               <span className="text-[7px] font-black uppercase text-neon-verde/60 tracking-tighter bg-neon-verde/5 px-1.5 py-0.5 rounded border border-neon-verde/10">
                 {produto.categoria}
               </span>
               <span className="text-[8px] text-white/20 font-black tracking-widest uppercase truncate max-w-[100px]">
                 {produto.compatibilidade}
               </span>
            </div>
            
            <Link href={`/produtos/${produto.id}`}>
               <h3 className="text-sm md:text-xl font-display font-black uppercase italic tracking-tighter text-white group-hover:text-neon-verde transition-colors leading-tight truncate">
                 {produto.nome}
               </h3>
            </Link>
         </div>

         {/* Price & Action Block - Compact */}
         <div className="w-full md:w-auto flex items-center justify-between md:justify-end gap-6 pt-3 md:pt-0 border-t md:border-t-0 border-white/5">
            <div className="text-right">
               <p className="text-[8px] text-white/30 font-black uppercase tracking-widest hidden md:block">Valor Elite</p>
               <p className="text-lg md:text-2xl font-display font-black text-white italic tracking-tighter">
                 {BRL(produto.preco)}
               </p>
            </div>

            <motion.button
              whileHover={produto.estoque > 0 ? { scale: 1.05 } : {}}
              whileTap={produto.estoque > 0 ? { scale: 0.95 } : {}}
              onClick={() => produto.estoque > 0 && onAdicionar(produto)}
              disabled={produto.estoque <= 0}
              className={`flex items-center justify-center w-10 h-10 md:w-auto md:px-5 md:h-10 rounded-xl transition-all shadow-neon-hover border-2 ${
                isAdded ? 'bg-neon-verde border-white text-black' : 
                produto.estoque > 0 ? 'bg-black border-neon-verde text-neon-verde hover:bg-neon-verde hover:text-black shadow-neon' : 
                'bg-zinc-900 border-zinc-800 text-zinc-700 cursor-not-allowed'
              }`}
            >
              <AnimatePresence mode="wait">
                {isAdded ? (
                   <motion.div key="check" initial={{ scale: 0 }} animate={{ scale: 1 }}>
                     <CheckCircle2 size={18} />
                   </motion.div>
                ) : (
                   <motion.div key="cart" initial={{ scale: 0 }} animate={{ scale: 1 }}>
                     <Zap size={18} />
                   </motion.div>
                )}
              </AnimatePresence>
              <span className="hidden md:block ml-3 font-display font-black uppercase italic text-[10px] tracking-widest">Adicionar</span>
            </motion.button>
         </div>
      </div>

      {/* Decorative Chevron */}
      <div className="absolute right-4 top-1/2 -translate-y-1/2 text-white/5 group-hover:text-neon-verde/20 transition-all hidden md:block group-hover:translate-x-1 transition-transform">
         <ChevronRight size={32} strokeWidth={4} />
      </div>
    </motion.div>
  );
});

ProdutoListRow.displayName = 'ProdutoListRow';

export default ProdutoListRow;
