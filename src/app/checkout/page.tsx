'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { ChevronLeft, Zap, ShoppingBag, CreditCard, Banknote, ShieldCheck, QrCode } from 'lucide-react';
import Link from 'next/link';
import { formatCurrency } from '@/lib/utils';
import { useCart, Produto } from '@/context/CartContext';

export default function CheckoutPage() {
  const { cart: cartItems, total, clearCart } = useCart();
  const [paymentMethod, setPaymentMethod] = useState<'PIX' | 'CARD' | 'CASH' | null>(null);
  const [loading, setLoading] = useState(false);
  
  const handleFinish = () => {
    if (!paymentMethod) return;
    setLoading(true);
    
    const itemsList = cartItems.map((item: Produto) => `- ${item.nome} (x${item.qtd})`).join('\n');
    const message = encodeURIComponent(
      `🏁 *NOVA ORDEM DE COMPRA - DRAGÃO MOTOS*\n\n` +
      `📦 *ITENS NO RADAR:*\n${itemsList}\n\n` +
      `💰 *TOTAL:* ${formatCurrency(total)}\n` +
      `💳 *FORMA DE PAGAMENTO:* ${paymentMethod}\n\n` +
      `Aguardando autorização técnica para prosseguir!`
    );
    
    setTimeout(() => {
      window.open(`https://wa.me/558387426823?text=${message}`, '_blank');
      clearCart();
      setLoading(false);
    }, 800);
  };

  return (
    <div className="min-h-screen bg-preto-profundo text-white font-sans selection:bg-neon-verde selection:text-black">
      <Navbar />
      
      <main className="relative z-10 pt-28 pb-32 px-6 max-w-5xl mx-auto">
        <header className="mb-12">
          <Link href="/produtos" className="inline-flex items-center gap-2 text-white/40 hover:text-neon-verde text-xs font-black uppercase tracking-[0.3em] mb-6 transition-all group">
            <ChevronLeft size={16} className="group-hover:-translate-x-1 transition-transform" /> Retornar ao Catálogo
          </Link>
          <h1 className="text-4xl md:text-7xl font-display font-black uppercase italic tracking-tighter leading-none">
            FINALIZAR <span className="text-neon-verde drop-shadow-[0_0_15px_#00FF33]">ORDEM</span>
          </h1>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Resumo da Ordem */}
          <div className="lg:col-span-7 space-y-8">
            <section className="bg-aco-grad border-chrome p-8 rounded-[2.5rem] shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-neon-verde/5 blur-3xl pointer-events-none" />
              <div className="flex items-center gap-3 mb-8">
                <ShoppingBag size={20} className="text-neon-verde" />
                <h2 className="text-lg font-display font-black uppercase italic tracking-widest">Resumo do Radar</h2>
              </div>
              
              <div className="space-y-6">
                {cartItems.map((item: Produto) => (
                  <div key={item.id} className="flex justify-between items-center group">
                    <div className="flex flex-col">
                      <span className="text-sm font-display font-black uppercase italic text-white group-hover:text-neon-verde transition-colors">{item.nome}</span>
                      <span className="text-[10px] text-white/30 font-black uppercase tracking-widest">QTD: {item.qtd}</span>
                    </div>
                    <span className="text-lg font-display font-black italic">{formatCurrency(item.preco)}</span>
                  </div>
                ))}
              </div>

              <div className="mt-10 pt-8 border-t border-white/5 flex justify-between items-end">
                <span className="text-[10px] text-white/30 font-black uppercase tracking-[0.4em]">Subtotal Operacional</span>
                <span className="text-4xl md:text-5xl font-display font-black text-neon-verde drop-shadow-[0_0_10px_#00FF33] italic">
                  {formatCurrency(total)}
                </span>
              </div>
            </section>

            <div className="flex items-center gap-4 px-4 py-3 bg-white/5 rounded-2xl border border-white/10">
               <ShieldCheck size={20} className="text-neon-verde" />
               <p className="text-[9px] text-white/40 font-black uppercase tracking-widest leading-relaxed">
                 Transação criptografada e monitorada pelo protocolo Dragão Motos. Seus dados estão seguros no QG.
               </p>
            </div>
          </div>

          {/* Formas de Pagamento */}
          <div className="lg:col-span-5 space-y-8">
            <section className="space-y-6">
              <h3 className="text-xs font-black uppercase tracking-[0.4em] text-white/40 px-2 text-center lg:text-left">Protocolo de Pagamento</h3>
              
              <div className="grid grid-cols-1 gap-4">
                {[
                  { id: 'PIX', label: 'PIX INSTANTÂNEO', icon: QrCode, desc: 'Aprovação imediata via Radar QR' },
                  { id: 'CARD', label: 'CARTÃO DE CRÉDITO', icon: CreditCard, desc: 'Parcelamento em até 12x (Elite)' },
                  { id: 'CASH', label: 'PAGAR NO QG', icon: Banknote, desc: 'Pagamento físico na oficina' }
                ].map(method => (
                  <button
                    key={method.id}
                    onClick={() => setPaymentMethod(method.id as any)}
                    className={`p-6 rounded-[2rem] border-2 transition-all flex items-center gap-5 text-left group relative ornament-border ${
                      paymentMethod === method.id 
                      ? 'bg-neon-verde border-white text-black shadow-neon' 
                      : 'bg-aco-grad border-chrome text-white hover:border-neon-verde/50'
                    }`}
                  >
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center transition-colors ${
                      paymentMethod === method.id ? 'bg-black text-neon-verde' : 'bg-white/5 text-neon-verde'
                    }`}>
                       <method.icon size={24} />
                    </div>
                    <div className="flex-1">
                      <p className="text-xs font-display font-black uppercase italic tracking-widest leading-none mb-1">{method.label}</p>
                      <p className={`text-[8px] font-black uppercase tracking-widest transition-colors ${
                        paymentMethod === method.id ? 'text-black/60' : 'text-white/20'
                      }`}>
                        {method.desc}
                      </p>
                    </div>
                    {paymentMethod === method.id && (
                      <div className="absolute top-4 right-4 animate-bounce">
                        <Zap size={14} className="fill-current" />
                      </div>
                    )}
                  </button>
                ))}
              </div>

              <button 
                onClick={handleFinish}
                disabled={!paymentMethod || loading}
                className={`w-full py-6 rounded-[2rem] font-display font-black uppercase italic text-sm tracking-[0.3em] transition-all flex items-center justify-center gap-4 ${
                  paymentMethod 
                  ? 'bg-neon-verde text-black shadow-neon hover:scale-[1.02] active:scale-95' 
                  : 'bg-white/5 border border-white/10 text-white/20 cursor-not-allowed'
                }`}
              >
                {loading ? <Zap size={24} className="animate-spin-slow" /> : <Zap size={24} />}
                {loading ? 'MODULANDO SINAL...' : 'CONFIRMAR NO WHATSAPP'}
              </button>
            </section>
          </div>
        </div>
      </main>

      <Footer />
      
      {/* Background Decor */}
      <div className="fixed top-0 right-0 w-[500px] h-[500px] bg-neon-verde/5 rounded-full blur-[120px] -z-10" />
      <div className="fixed bottom-0 left-0 w-[500px] h-[500px] bg-neon-verde/5 rounded-full blur-[120px] -z-10" />
    </div>
  );
}
