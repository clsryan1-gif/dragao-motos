'use client';

import React, { useState, useMemo, useEffect, useCallback } from 'react';
import { Search, ChevronLeft, Zap, Box, Hexagon, Terminal, Gift, Sparkles } from 'lucide-react';
import Link from 'next/link';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import ProdutoListRow from '@/components/catalog/ProdutoListRow';
import { ProductListSkeleton, CategorySkeleton } from '@/components/catalog/ProductSkeleton';
import { Toast } from '@/components/ui/Toast';
import { useCart } from '@/context/CartContext';

// ===================================================
// Tipagem e Helpers
type Produto = {
  id: string;
  categoria: string;
  nome: string;
  compatibilidade: string;
  preco: number;
  imagem: string | null;
  estoque: number;
};

const BRL = (v: number) => v.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.05 }
  }
};

export default function ProdutosPage() {
  const [produtos, setProdutos] = useState<Produto[]>([]);
  const [busca, setBusca] = useState('');
  const [categoria, setCategoria] = useState('Todas');
  const [loading, setLoading] = useState(true);
  const [addedItem, setAddedItem] = useState<string | null>(null);
  const [showToast, setShowToast] = useState(false);
  const [toastMsg, setToastMsg] = useState('');

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch('/api/produtos');
        if (res.ok) {
          const data = await res.json();
          setProdutos(data);
        }
      } catch (e) {
        console.error("Erro ao carregar catálogo:", e);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  const categorias = useMemo(
    () => ['Todas', ...Array.from(new Set(produtos.map(p => p.categoria)))],
    [produtos]
  );

  const filtrados = useMemo(() => {
    const q = busca.toLowerCase();
    return produtos.filter(p => {
      const bateCategoria = categoria === 'Todas' || p.categoria === categoria;
      const bateBusca = p.nome.toLowerCase().includes(q) || p.compatibilidade.toLowerCase().includes(q);
      return bateCategoria && bateBusca;
    });
  }, [busca, categoria, produtos]);

  const { addToCart } = useCart();

  const onAdicionar = useCallback((p: Produto) => {
    addToCart(p);
    setAddedItem(p.id);
    setToastMsg(`${p.nome.toUpperCase()} INCORPORADO AO RADAR OPERACIONAL!`);
    setShowToast(true);
    setTimeout(() => setAddedItem(null), 1500);
  }, [addToCart]);

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

        {/* LISTA DE PRODUTOS INDUSTRIAL */}
        <AnimatePresence mode="wait">
           {loading ? (
             <motion.div 
               key="loading"
               variants={containerVariants} initial="hidden" animate="show"
               className="flex flex-col gap-2"
             >
                {[1,2,3,4,5].map(i => <ProductListSkeleton key={i} />)}
             </motion.div>
           ) : filtrados.length === 0 ? (
             <motion.div 
               key="empty"
               initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
               className="py-32 flex flex-col items-center justify-center border-2 border-dashed border-white/5 rounded-[4rem] bg-black/20"
             >
                <div className="relative mb-8">
                   <Hexagon size={80} className="text-white/5" />
                   <Terminal size={40} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-neon-verde opacity-30" />
                </div>
                <h3 className="text-2xl font-display font-black uppercase italic tracking-[0.2em] text-white/40 mb-3">Sinal de Radar Perdido</h3>
                <p className="text-white/20 text-[10px] font-black uppercase tracking-[0.3em] text-center max-w-sm">
                  Nenhum componente mecânico detectado com esses parâmetros. Redefina seus sensores de busca.
                </p>
                <button 
                  onClick={() => { setBusca(''); setCategoria('Todas'); }}
                  className="mt-10 bg-white/5 border border-white/10 hover:border-neon-verde/40 hover:bg-neon-verde/5 px-10 py-4 rounded-xl text-[10px] font-black uppercase tracking-[0.3em] text-neon-verde transition-all shadow-neon-hover"
                >
                  REINICIALIZAR SENSORES
                </button>
             </motion.div>
           ) : (
             <motion.div 
               key="list"
               variants={containerVariants} initial="hidden" animate="show"
               className="flex flex-col"
             >
                {filtrados.map(p => (
                  <ProdutoListRow 
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
