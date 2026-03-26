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
      className="bg-aco-grad border-chrome rounded-[2rem] overflow-hidden flex flex-col md:flex-row hover:border-neon-verde transition-all duration-500 group relative shadow-2xl isolate mb-6"
    >
      {/* Laser Scanner Effect */}
      <div className="absolute inset-y-0 left-0 w-[2px] bg-neon-verde shadow-[0_0_15px_#00FF33] z-20 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity animate-pulse"></div>

      {/* Image Block */}
      <div className="w-full md:w-64 h-48 md:h-auto bg-black/40 relative overflow-hidden group/img shrink-0 border-b md:border-b-0 md:border-r border-white/5">
        <Link href={`/produtos/${produto.id}`} className="block h-full w-full">
           {produto.imagem ? (
             <img 
               src={produto.imagem} 
               alt={produto.nome} 
               className="w-full h-full object-contain p-6 grayscale-[0.3] group-hover/img:grayscale-0 group-hover/img:scale-110 transition-all duration-700"
             />
           ) : (
             <div className="w-full h-full flex flex-col items-center justify-center text-white/10 gap-2">
                <Box size={48} />
                <span className="text-[8px] font-black tracking-widest uppercase">Sem Mídia Visual</span>
             </div>
           )}
        </Link>
        <div className="absolute top-4 left-4 flex gap-2">
           <div className="px-3 py-1 bg-black/80 backdrop-blur-md border border-white/10 rounded-lg text-[8px] font-black uppercase tracking-widest flex items-center gap-2">
              <div className={`w-1.5 h-1.5 rounded-full ${produto.estoque > 0 ? 'bg-neon-verde animate-pulse shadow-neon' : 'bg-red-500'}`} />
              {produto.estoque > 0 ? 'Disponível' : 'Esgotado'}
           </div>
        </div>
      </div>

      {/* Info Block */}
      <div className="flex-1 p-6 md:p-8 flex flex-col md:flex-row gap-8 items-start md:items-center">
         <div className="flex-1 space-y-3">
            <div className="flex items-center gap-3">
               <span className="px-2 py-0.5 bg-neon-verde/10 border border-neon-verde/20 text-neon-verde text-[8px] font-black uppercase tracking-tighter rounded">
                 {produto.categoria}
               </span>
               <span className="text-[10px] text-white/20 font-black uppercase tracking-widest font-mono">
                 ID-{produto.id.split('-')[0]}
               </span>
            </div>
            
            <Link href={`/produtos/${produto.id}`}>
               <h3 className="text-xl md:text-3xl font-display font-black uppercase italic tracking-tighter text-white group-hover:text-neon-verde transition-colors leading-none truncate-2">
                 {produto.nome}
               </h3>
            </Link>

            <div className="flex flex-wrap items-center gap-4">
               <div className="flex items-center gap-2 text-white/40">
                  <Cpu size={14} className="text-neon-verde/40" />
                  <span className="text-[10px] font-bold uppercase tracking-widest">{produto.compatibilidade}</span>
               </div>
               <div className="w-[1px] h-3 bg-white/10 hidden md:block"></div>
               <div className="flex items-center gap-2 text-white/40">
                  <Hexagon size={14} />
                  <span className="text-[10px] font-bold uppercase tracking-widest">Sinc. Original</span>
               </div>
            </div>
         </div>

         {/* Price & Action Block */}
         <div className="w-full md:w-auto flex md:flex-col items-center md:items-end justify-between md:justify-center gap-4 pt-6 md:pt-0 border-t md:border-t-0 border-white/5">
            <div className="text-right">
               <p className="text-[9px] text-white/40 font-black uppercase tracking-widest mb-1">Câmbio Comercial</p>
               <p className="text-3xl md:text-4xl font-display font-black text-white italic tracking-tighter">
                 {BRL(produto.preco)}
               </p>
            </div>

            <motion.button
              whileHover={produto.estoque > 0 ? { scale: 1.05 } : {}}
              whileTap={produto.estoque > 0 ? { scale: 0.95 } : {}}
              onClick={() => produto.estoque > 0 && onAdicionar(produto)}
              disabled={produto.estoque <= 0}
              className={`flex items-center gap-3 px-8 py-4 rounded-xl font-display font-black uppercase italic text-[10px] tracking-[0.2em] transition-all shadow-neon-hover border-2 ${
                isAdded ? 'bg-neon-verde border-white text-black' : 
                produto.estoque > 0 ? 'bg-black border-neon-verde text-neon-verde hover:bg-neon-verde hover:text-black shadow-neon' : 
                'bg-zinc-900 border-zinc-800 text-zinc-700 cursor-not-allowed'
              }`}
            >
              <AnimatePresence mode="wait">
                {isAdded ? (
                   <motion.div key="check" initial={{ scale: 0 }} animate={{ scale: 1 }} className="flex items-center gap-2">
                     <CheckCircle2 size={16} /> ADICIONADO
                   </motion.div>
                ) : (
                   <motion.div key="cart" initial={{ scale: 0 }} animate={{ scale: 1 }} className="flex items-center gap-2">
                     <Zap size={16} /> ADICIONAR AO RADAR
                   </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
         </div>
      </div>

      {/* Decorative Chevron */}
      <div className="absolute right-4 top-1/2 -translate-y-1/2 text-white/5 group-hover:text-neon-verde/20 transition-all hidden md:block">
         <ChevronRight size={48} strokeWidth={4} />
      </div>
    </motion.div>
  );
});

ProdutoListRow.displayName = 'ProdutoListRow';

export default ProdutoListRow;
