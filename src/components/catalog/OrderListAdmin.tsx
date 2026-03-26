'use client';

import React, { useState } from 'react';
import { ShoppingCart, User, Clock, CheckCircle2, Package, ArrowRight, Trash2, Info, MessageSquare, ExternalLink, MoreVertical, Terminal } from "lucide-react";
import { motion, AnimatePresence } from 'framer-motion';
import { useToast } from '@/context/ToastContext';
import { cn } from '@/lib/utils';

type Order = {
  id: string;
  total: number;
  status: string;
  createdAt: string;
  user?: { name: string; phone: string | null };
  items: Array<{ product: { nome: string }; quantidade: number; preco: number }>;
};

const BRL = (v: number) => v.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

export default function OrderListAdmin({ initialOrders }: { initialOrders: Order[] }) {
  const { showToast } = useToast();
  const [orders, setOrders] = useState<Order[]>(initialOrders);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [loadingId, setLoadingId] = useState<string | null>(null);

  const toggleStatus = async (id: string, current: string) => {
    setLoadingId(id);
    const next = current === 'PENDENTE' ? 'PAGO' : current === 'PAGO' ? 'ENTREGUE' : 'PENDENTE';
    
    try {
      const res = await fetch(`/api/admin/pedidos/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: next }),
      });

      if (!res.ok) throw new Error('Falha tática');

      setOrders(prev => prev.map(o => o.id === id ? { ...o, status: next } : o));
      showToast(`Status da venda alterado para ${next}!`, 'success');
    } catch (err) {
      showToast('Erro ao sincronizar status.', 'error');
    } finally {
      setLoadingId(null);
    }
  };

  return (
    <div className="space-y-4">
      {orders.length === 0 ? (
        <div className="py-32 flex flex-col items-center justify-center border-2 border-dashed border-white/5 rounded-[3rem] text-white/10">
           <ShoppingCart size={48} className="opacity-10 mb-4" />
           <p className="text-xs font-black uppercase tracking-widest">Nenhuma venda detectada no radar.</p>
        </div>
      ) : (
        orders.map(order => (
          <motion.div 
            key={order.id}
            layout
            className={cn(
               "bg-aco-grad border border-white/5 rounded-[2rem] overflow-hidden transition-all duration-500",
               expandedId === order.id ? "ring-2 ring-neon-verde shadow-neon" : "hover:border-neon-verde/30 shadow-2xl"
            )}
          >
             {/* HEADER DO PEDIDO */}
             <div 
               className="p-6 md:p-8 flex flex-col md:flex-row items-center gap-6 cursor-pointer"
               onClick={() => setExpandedId(expandedId === order.id ? null : order.id)}
             >
                {/* Status Icon */}
                <div className={cn(
                  "w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 border",
                  order.status === 'PAGO' ? "bg-neon-verde/10 border-neon-verde/20 text-neon-verde" :
                  order.status === 'ENTREGUE' ? "bg-blue-500/10 border-blue-500/20 text-blue-500" :
                  "bg-yellow-500/10 border-yellow-500/20 text-yellow-500"
                )}>
                   {order.status === 'PENDENTE' ? <Clock size={20} /> : <CheckCircle2 size={20} />}
                </div>

                {/* Cliente & Data */}
                <div className="flex-1 min-w-0 text-center md:text-left">
                   <h3 className="text-sm font-display font-black italic uppercase text-white truncate">{order.user?.name || 'Comprador Anônimo'}</h3>
                   <div className="flex flex-wrap justify-center md:justify-start items-center gap-2 mt-1">
                      <span className="text-[10px] text-white/30 uppercase font-black">{new Date(order.createdAt).toLocaleDateString('pt-BR')}</span>
                      <span className="w-1 h-1 bg-white/10 rounded-full"></span>
                      <span className="text-[10px] text-white/30 font-mono">ID: {order.id.substring(0, 8)}</span>
                   </div>
                </div>

                {/* Valor & Ações */}
                <div className="flex items-center gap-8">
                   <div className="text-right">
                      <span className="text-[8px] text-white/30 uppercase font-black tracking-widest block mb-0.5">Total Gear</span>
                      <span className="text-xl md:text-2xl font-display font-black italic text-neon-verde">{BRL(order.total)}</span>
                   </div>
                   <button 
                     disabled={loadingId === order.id}
                     onClick={(e) => { e.stopPropagation(); toggleStatus(order.id, order.status); }}
                     className={cn(
                       "relative px-4 py-3 rounded-xl text-[9px] font-black uppercase tracking-widest border transition-all active:scale-90",
                       order.status === 'PAGO' ? "bg-neon-verde text-black border-neon-verde shadow-neon" :
                       order.status === 'ENTREGUE' ? "bg-blue-500/20 text-blue-500 border-blue-500" :
                       "bg-black border-yellow-500/50 text-yellow-500 hover:bg-yellow-500/10"
                     )}
                   >
                     {loadingId === order.id ? '...' : order.status}
                   </button>
                </div>
             </div>

             {/* DETALHES EXPANSÍVEIS TÁTICOS */}
             <AnimatePresence>
                {expandedId === order.id && (
                  <motion.div 
                    initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden border-t border-white/5 bg-black/60 backdrop-blur-3xl"
                  >
                     <div className="p-8 space-y-8">
                        {/* TERMINAL SEQUENCE (SURPRESA!) */}
                        <div className="space-y-4">
                           <div className="flex items-center gap-2">
                             <Terminal size={12} className="text-neon-verde/40" />
                             <span className="text-[9px] font-black uppercase tracking-widest text-white/20 italic">Dados de Logística</span>
                           </div>
                           <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                              {/* Lista de Peças */}
                              <div className="bg-black/40 border border-white/5 p-6 rounded-2xl space-y-4">
                                 <h4 className="text-[10px] font-black uppercase tracking-widest text-white/30 flex items-center gap-2">
                                    <Package size={14} /> Equips Carregados
                                 </h4>
                                  <div className="space-y-3">
                                    {order.items.map((item: any, idx) => (
                                      <div key={idx} className="flex justify-between items-center text-[11px] font-bold">
                                         <span className="text-white/80">{item.quantity}x {item.product.nome}</span>
                                         <span className="text-neon-verde/50">{BRL(item.price * item.quantity)}</span>
                                      </div>
                                    ))}
                                  </div>
                              </div>
                              {/* Perfil Piloto */}
                              <div className="bg-black/40 border border-white/5 p-6 rounded-2xl space-y-4">
                                 <h4 className="text-[10px] font-black uppercase tracking-widest text-white/30 flex items-center gap-2">
                                    <User size={14} /> Contato Piloto
                                 </h4>
                                 <div className="space-y-3">
                                    <div className="flex items-center justify-between text-[11px] font-bold">
                                       <span className="text-white/40">CELULAR:</span>
                                       <span className="text-white">{order.user?.phone || 'NÃO INFORMADO'}</span>
                                    </div>
                                    <button className="w-full bg-white/5 border border-white/10 p-3 rounded-xl text-[9px] font-black uppercase hover:bg-neon-verde hover:text-black transition-all flex items-center justify-center gap-2">
                                       <MessageSquare size={14} /> Chamar no Signal
                                    </button>
                                 </div>
                              </div>
                           </div>
                        </div>
                     </div>
                  </motion.div>
                )}
             </AnimatePresence>
          </motion.div>
        ))
      )}
    </div>
  );
}
