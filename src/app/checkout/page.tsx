'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { ChevronLeft, Zap, ShoppingBag, CreditCard, Banknote, ShieldCheck, QrCode, Minus, Plus, Trash2 } from 'lucide-react';
import Link from 'next/link';
import { formatCurrency } from '@/lib/utils';
import { useCart, Produto } from '@/context/CartContext';

export default function CheckoutPage() {
  const { cart: cartItems, total, clearCart, updateQuantity, removeFromCart } = useCart();
  const [paymentMethod, setPaymentMethod] = useState<'PIX' | 'CARD' | 'CASH' | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  // Redireciona se o radar estiver vazio
  useEffect(() => {
    if (cartItems.length === 0 && !loading) {
      router.push('/produtos');
    }
  }, [cartItems, router, loading]);
  
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
    
    // REDIRECIONAMENTO IMEDIATO: Browsers bloqueiam window.open se estiver dentro de setTimeout/Async não-direto
    window.open(`https://wa.me/558387426823?text=${message}`, '_blank');
    clearCart();
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-preto-profundo text-white font-sans selection:bg-neon-verde selection:text-black">
      <Navbar />
      
      <main className="relative z-10 pt-16 pb-20 px-6 max-w-5xl mx-auto">
        <header className="mb-6">
          <Link href="/produtos" className="inline-flex items-center gap-2 text-white/40 hover:text-neon-verde text-[10px] font-black uppercase tracking-[0.3em] mb-2 transition-all group">
            <ChevronLeft size={16} className="group-hover:-translate-x-1 transition-transform" /> Retornar ao Catálogo
          </Link>
          <h1 className="text-3xl md:text-5xl font-display font-black uppercase italic tracking-tighter leading-none">
            FINALIZAR <span className="text-neon-verde drop-shadow-[0_0_15px_#00FF33]">ORDEM</span>
          </h1>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Resumo da Ordem */}
          <div className="lg:col-span-7 space-y-4">
            <section className="bg-aco-grad border-chrome p-6 rounded-[2.5rem] shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-neon-verde/5 blur-3xl pointer-events-none" />
              <div className="flex items-center gap-3 mb-6">
                <ShoppingBag size={20} className="text-neon-verde" />
                <h2 className="text-base font-display font-black uppercase italic tracking-widest">Resumo do Radar</h2>
              </div>
              
              <div className="space-y-3">
                {cartItems.map((item: Produto) => (
                  <div key={item.id} className="flex justify-between items-center group bg-white/[0.02] p-3 rounded-2xl border border-white/5 hover:border-neon-verde/30 transition-all">
                    <div className="flex flex-col gap-1">
                      <span className="text-sm font-display font-black uppercase italic text-white group-hover:text-neon-verde transition-colors line-clamp-1">{item.nome}</span>
                      <div className="flex items-center gap-3">
                        <div className="flex items-center bg-black/40 rounded-lg border border-white/10 p-1">
                          <button 
                            onClick={() => updateQuantity(item.id, item.qtd - 1)}
                            className="w-6 h-6 flex items-center justify-center text-white/40 hover:text-neon-verde hover:bg-white/5 rounded transition-all"
                          >
                            <Minus size={12} />
                          </button>
                          <span className="w-8 text-center text-[10px] font-black text-neon-verde">{item.qtd}</span>
                          <button 
                            onClick={() => updateQuantity(item.id, item.qtd + 1)}
                            className="w-6 h-6 flex items-center justify-center text-white/40 hover:text-neon-verde hover:bg-white/5 rounded transition-all"
                          >
                            <Plus size={12} />
                          </button>
                        </div>
                        <button 
                          onClick={() => removeFromCart(item.id)}
                          className="text-white/10 hover:text-red-500 transition-colors p-1"
                          title="Remover item"
                        >
                          <Trash2 size={12} />
                        </button>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="text-lg font-display font-black italic block leading-none">{formatCurrency(item.preco * item.qtd)}</span>
                      {item.qtd > 1 && (
                        <span className="text-[9px] text-white/20 font-black uppercase tracking-widest">{formatCurrency(item.preco)} un.</span>
                      )}
                    </div>
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
                    className={`p-4 rounded-[2rem] border-2 transition-all flex items-center gap-4 text-left group relative ornament-border ${
                      paymentMethod === method.id 
                      ? 'bg-neon-verde border-white text-black shadow-neon' 
                      : 'bg-aco-grad border-chrome text-white hover:border-neon-verde/50'
                    }`}
                  >
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-colors ${
                      paymentMethod === method.id ? 'bg-black text-neon-verde' : 'bg-white/5 text-neon-verde'
                    }`}>
                       <method.icon size={20} />
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
                className={`w-full py-4 rounded-[2rem] font-display font-black uppercase italic text-sm tracking-[0.3em] transition-all flex items-center justify-center gap-4 ${
                  paymentMethod 
                  ? 'bg-neon-verde text-black shadow-neon hover:scale-[1.02] active:scale-95' 
                  : 'bg-white/5 border border-white/10 text-white/20 cursor-not-allowed'
                }`}
              >
                {loading ? <Zap size={20} className="animate-spin-slow" /> : <Zap size={20} />}
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
