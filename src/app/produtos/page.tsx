'use client';

import React, { useState, useMemo, useEffect, useCallback } from 'react';
import { Search, ChevronLeft, Zap, Box, Hexagon, Terminal, Gift, Sparkles } from 'lucide-react';
import Link from 'next/link';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import ProdutoCard from '@/components/catalog/ProdutoCard';
import { ProductSkeleton, CategorySkeleton } from '@/components/catalog/ProductSkeleton';
import { Toast } from '@/components/ui/Toast';

// ... (tipagem e variants permanecem iguais)

export default function ProdutosPage() {
  const [produtos, setProdutos] = useState<Produto[]>([]);
  const [busca, setBusca] = useState('');
  const [categoria, setCategoria] = useState('Todas');
  const [loading, setLoading] = useState(true);
  const [addedItem, setAddedItem] = useState<string | null>(null);
  const [showToast, setShowToast] = useState(false);
  const [toastMsg, setToastMsg] = useState('');

  // ... (useEffect permanece igual)

  const onAdicionar = useCallback((p: Produto) => {
    setAddedItem(p.id);
    setToastMsg(`${p.nome.toUpperCase()} ADICIONADO AO RADAR DE COMPRAS!`);
    setShowToast(true);
    setTimeout(() => setAddedItem(null), 1500);
  }, []);

  return (
    <div className="min-h-screen bg-preto-profundo text-white font-sans overflow-x-hidden relative">
      <Navbar />

      <Toast 
        isVisible={showToast} 
        message={toastMsg} 
        onClose={() => setShowToast(false)} 
      />

      {/* BACKGROUND SURPRISE: RADAR RADIAL PULSE */}
      <div className="fixed inset-0 pointer-events-none z-0">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-neon-verde/5 rounded-full blur-[120px] animate-pulse"></div>
          <div className="absolute inset-0 bg-[url('/images/grid-bg.png')] opacity-10 bg-repeat bg-[length:50px_50px]"></div>
      </div>

      <main className="relative z-10 pt-24 md:pt-32 pb-20 px-6 md:px-12 max-w-7xl mx-auto">
        
        {/* HEADER DO CATÁLOGO */}
        <header className="mb-8">
            <Link href="/" className="inline-flex items-center gap-2 text-neon-verde text-xs font-black uppercase tracking-[0.3em] mb-6 hover:translate-x-[-5px] transition-transform">
                <ChevronLeft size={16} /> Voltar pro QG
            </Link>
            
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
                <div>
                   <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
                      <h1 className="text-5xl md:text-8xl font-display font-black uppercase italic tracking-tighter leading-none mb-4">
                        PEÇAS <span className="text-neon-verde drop-shadow-[0_0_20px_#00FF33]">ORIGINAIS</span>
                      </h1>
                      <div className="flex items-center gap-3">
                         <div className="h-[2px] w-12 bg-neon-verde"></div>
                         <p className="text-white/40 font-bold uppercase tracking-widest text-[10px] md:text-xs">
                           Sistema de busca de alta performance • {filtrados.length} Itens em estoque
                         </p>
                      </div>
                   </motion.div>
                </div>

                {/* BUSCA COM SCANNER */}
                <div className="w-full md:w-96 relative group">
                   <div className="absolute -inset-[1px] bg-neon-verde/20 rounded-xl blur-sm opacity-0 group-focus-within:opacity-100 transition-opacity"></div>
                   <div className="relative">
                      <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40 group-focus-within:text-neon-verde transition-colors" size={18} />
                      <input 
                        type="text" 
                        value={busca}
                        onChange={(e) => setBusca(e.target.value)}
                        placeholder="BUSCAR PEÇA OU MODELO..."
                        className="w-full bg-black/60 border border-white/10 rounded-xl pl-12 pr-4 py-4 text-sm font-black tracking-widest uppercase focus:outline-none focus:border-neon-verde transition-all placeholder:text-white/10"
                      />
                   </div>
                </div>
            </div>
        </header>

        {/* BANNER PERSUASIVO DE PRIMEIRA COMPRA */}
        <motion.section 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-12 relative group"
        >
          <div className="absolute -inset-1 bg-gradient-to-r from-neon-verde/20 to-transparent rounded-3xl blur-md opacity-50 group-hover:opacity-100 transition-opacity"></div>
          <div className="relative bg-aco-grad border-chrome p-6 md:p-8 rounded-3xl flex flex-col md:flex-row items-center justify-between gap-6 overflow-hidden">
             {/* Decorative element */}
             <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none">
                <Gift size={120} />
             </div>
             
             <div className="flex items-center gap-6">
                <div className="w-16 h-16 rounded-2xl bg-neon-verde/10 border border-neon-verde/30 flex items-center justify-center shadow-neon">
                   <Sparkles className="text-neon-verde" size={32} />
                </div>
                <div>
                   <h2 className="text-2xl md:text-3xl font-display font-black uppercase italic tracking-tighter text-white">
                      BEM-VINDO AO <span className="text-neon-verde">ARSENAL DRAGÃO</span>
                   </h2>
                   <p className="text-white/40 text-[10px] md:text-xs font-bold uppercase tracking-widest">
                      PRIMEIRA VEZ NO QG? USE O CUPOM <span className="text-neon-verde bg-neon-verde/10 px-2 py-0.5 rounded border border-neon-verde/20">DRAGAO10</span> PARA 10% OFF!
                   </p>
                </div>
             </div>

             <Link href="/registro" className="w-full md:w-auto px-10 py-4 bg-neon-verde text-black font-display font-black uppercase italic text-lg tracking-widest rounded-xl shadow-neon hover:shadow-neon-hover hover:scale-105 active:scale-95 transition-all text-center">
                RESGATAR MEU CUPOM
             </Link>
          </div>
        </motion.section>

        {/* FILTROS POR CATEGORIA */}
        <section className="mb-8">
           {loading ? (
             <CategorySkeleton />
           ) : (
             <div className="flex gap-3 overflow-x-auto pb-4 scrollbar-hide no-scrollbar">
                {categorias.map(cat => {
                   const isActive = categoria === cat;
                   return (
                     <button
                       key={cat}
                       onClick={() => setCategoria(cat)}
                       className={`px-8 py-3 rounded-xl text-[10px] font-black uppercase tracking-[0.2em] border-2 transition-all whitespace-nowrap ${
                         isActive 
                         ? 'bg-neon-verde border-neon-verde text-black shadow-neon' 
                         : 'bg-aco-grad border-chrome text-white/50 hover:border-neon-verde/50 hover:text-white'
                       }`}
                     >
                       {cat}
                     </button>
                   );
                })}
             </div>
           )}
        </section>

        {/* GRID DE PRODUTOS */}
        <AnimatePresence mode="wait">
           {loading ? (
             <motion.div 
               key="loading"
               variants={containerVariants} initial="hidden" animate="show"
               className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-6"
             >
                {[1,2,3,4,5,6,7,8].map(i => <ProductSkeleton key={i} />)}
             </motion.div>
           ) : filtrados.length === 0 ? (
             <motion.div 
               key="empty"
               initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
               className="py-32 flex flex-col items-center justify-center border-2 border-dashed border-white/5 rounded-[3rem]"
             >
                <div className="relative mb-6">
                   <Hexagon size={64} className="text-white/10" />
                   <Terminal size={32} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-neon-verde opacity-20" />
                </div>
                <h3 className="text-xl font-display font-black uppercase italic tracking-widest text-white/50 mb-2">Sem Resultados no Radar</h3>
                <p className="text-white/20 text-xs font-black uppercase tracking-widest text-center max-w-xs">
                  A peça que você busca não foi encontrada. Tente usar outros termos ou limpe o filtro.
                </p>
                <button 
                  onClick={() => { setBusca(''); setCategoria('Todas'); }}
                  className="mt-8 text-neon-verde font-black uppercase tracking-[0.3em] text-[10px] hover:glow-neon transition-all"
                >
                  Reinicializar Sensores
                </button>
             </motion.div>
           ) : (
             <motion.div 
               key="grid"
               variants={containerVariants} initial="hidden" animate="show"
               className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-6"
             >
                {filtrados.map(p => (
                  <ProdutoCard 
                    key={p.id} 
                    produto={p} 
                    isAdded={addedItem === p.id}
                    onAdicionar={onAdicionar}
                    BRL={BRL}
                  />
                ))}
             </motion.div>
           )}
        </AnimatePresence>

      </main>

      <Footer />
    </div>
  );
}
