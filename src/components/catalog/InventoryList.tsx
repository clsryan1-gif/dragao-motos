'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Pencil, Trash2, X, Save, Zap, Package, AlertTriangle, Eye, EyeOff, Plus } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useToast } from '@/context/ToastContext';
import { cn } from '@/lib/utils';

type Produto = {
  id: string;
  nome: string;
  categoria: string;
  compatibilidade: string;
  preco: number;
  imagem: string | null;
  estoque: number;
  ativo: boolean;
};

const BRL = (v: number) => v.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

export default function InventoryList({ produtos: initialProdutos }: { produtos: Produto[] }) {
  const router = useRouter();
  const { showToast } = useToast();
  const [produtos, setProdutos] = useState<Produto[]>(initialProdutos);
  const [editId, setEditId] = useState<string | null>(null);
  const [editData, setEditData] = useState<Partial<Produto>>({});
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  React.useEffect(() => {
    setProdutos(initialProdutos);
  }, [initialProdutos]);

  const startEdit = (p: Produto) => {
    setEditId(p.id);
    setEditData({ ...p });
  };

  const cancelEdit = () => {
    setEditId(null);
    setEditData({});
  };

  const saveEdit = async () => {
    if (!editId) return;
    setLoading(true);
    try {
      const res = await fetch(`/api/admin/produtos/${editId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editData),
      });
      
      if (!res.ok) throw new Error('Falha na sincronização');

      showToast('Parâmetros da peça atualizados!', 'success');
      router.refresh();
      setEditId(null);
    } catch (err: any) {
      showToast('Erro crítico ao salvar dados.', 'error');
    } finally {
      setLoading(false);
    }
  };

  const deleteProduto = async (id: string) => {
    if (!window.confirm("Você tem certeza que quer deletar esta peça definitivamente?")) return;
    setLoading(true);
    try {
      const res = await fetch(`/api/admin/produtos/${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Falha ao deletar');
      
      setProdutos(prev => prev.filter(p => p.id !== id));
      showToast('Item removido do banco central.', 'success');
      setDeletingId(null);
    } catch (err: any) {
      showToast('Erro ao deletar registro no banco.', 'error');
    } finally {
      setLoading(false);
    }
  };

  const toggleAtivo = async (id: string, currentStatus: boolean) => {
    setLoading(true);
    try {
      const res = await fetch(`/api/admin/produtos/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ativo: !currentStatus }),
      });
      if (!res.ok) throw new Error('Falha ao alterar status');

      setProdutos(prev => prev.map(p => p.id === id ? { ...p, ativo: !currentStatus } : p));
      showToast(currentStatus ? 'Peça ocultada do radar.' : 'Peça visível no catálogo.', 'info');
    } catch (err: any) {
      showToast('Erro de sincronia ao alterar visibilidade.', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      
      {/* MODAL DE EDIÇÃO CYBER */}
      <AnimatePresence>
        {editId && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/90 backdrop-blur-md z-[1000] flex items-center justify-center p-4"
            onClick={cancelEdit}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9, y: 20 }}
              className="bg-aco-grad border-2 border-neon-verde/30 rounded-3xl p-8 max-w-lg w-full shadow-neon relative isolate"
              onClick={e => e.stopPropagation()}
            >
              <div className="absolute top-0 left-0 w-full h-[2px] bg-neon-verde shadow-neon"></div>
              
              <button onClick={cancelEdit} className="absolute top-4 right-4 text-white/40 hover:text-neon-verde transition-colors">
                <X size={20} />
              </button>

              <h3 className="text-2xl font-display font-black italic uppercase text-white mb-8 flex items-center gap-3">
                <Pencil className="text-neon-verde" size={24} /> Calibrar Peça
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                 <div className="md:col-span-2">
                    <Field label="Nome do Equipamento" value={editData.nome} onChange={(v: string) => setEditData({...editData, nome: v})} />
                 </div>
                 <Field label="Categoria" value={editData.categoria} onChange={(v: string) => setEditData({...editData, categoria: v})} />
                 <Field label="Compatibilidade" value={editData.compatibilidade} onChange={(v: string) => setEditData({...editData, compatibilidade: v})} />
                 <Field label="Preço (R$)" value={editData.preco} type="number" onChange={(v: string) => setEditData({...editData, preco: parseFloat(v)})} />
                 <Field label="Estoque (Un)" value={editData.estoque} type="number" onChange={(v: string) => setEditData({...editData, estoque: parseInt(v)})} />
              </div>

              <div className="flex gap-4 mt-10">
                 <button onClick={cancelEdit} className="flex-1 py-4 rounded-xl border border-white/10 text-white/40 font-black uppercase tracking-widest text-[10px] hover:bg-white/5 transition-all">Cancelar</button>
                 <button 
                   onClick={saveEdit}
                   disabled={loading}
                   className="flex-1 py-4 rounded-xl bg-neon-verde text-black font-black uppercase tracking-widest text-[10px] shadow-neon hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-2"
                 >
                   {loading ? <Zap size={16} className="animate-pulse" /> : <Save size={16} />}
                   {loading ? 'Sincronizando...' : 'Confirmar'}
                 </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* LISTA DE INVENTÁRIO TÁTICO */}
      <div className="bg-black/40 border border-white/5 rounded-[2rem] overflow-hidden">
         <div className="px-8 py-6 border-b border-white/5 bg-white/5 flex items-center justify-between">
            <div className="flex items-center gap-3">
               <Package className="text-neon-verde" size={20} />
               <h2 className="text-xs font-black uppercase tracking-[0.2em]">Manutenção de Inventário</h2>
            </div>
            <Link href="/admin/produtos/novo">
               <button className="flex items-center gap-2 bg-neon-verde text-black px-4 py-2 rounded-lg text-[9px] font-black uppercase tracking-widest hover:shadow-neon transition-all">
                  <Plus size={14} /> Cadastrar
               </button>
            </Link>
         </div>

         <div className="p-4 space-y-2">
            {produtos.length === 0 ? (
              <div className="py-20 text-center text-white/10 flex flex-col items-center gap-4">
                 <Package size={48} className="opacity-10" />
                 <p className="text-xs font-black uppercase tracking-widest">Nenhum item detectado no banco.</p>
              </div>
            ) : (
              produtos.map(p => (
                <motion.div 
                  key={p.id}
                  layout
                  className={cn(
                    "bg-aco-grad border border-white/5 p-4 rounded-2xl flex flex-col md:flex-row items-center gap-4 group hover:border-neon-verde/30 transition-all",
                    !p.ativo && "opacity-40 grayscale"
                  )}
                >
                   {/* Mini Imagem Cyber */}
                   <div className="w-16 h-16 bg-black rounded-xl border border-white/10 flex items-center justify-center p-2 shrink-0">
                      {p.imagem ? (
                        <img src={p.imagem} alt={p.nome} className="w-full h-full object-contain" />
                      ) : (
                        <Package size={24} className="text-white/10" />
                      )}
                   </div>

                   {/* Info Peça */}
                   <div className="flex-1 min-w-0 space-y-1 text-center md:text-left">
                      <div className="flex flex-wrap justify-center md:justify-start items-center gap-2">
                         <span className="text-[8px] font-black uppercase bg-neon-verde/10 text-neon-verde px-2 py-0.5 rounded-md border border-neon-verde/20">
                           {p.categoria}
                         </span>
                         <h3 className="text-sm font-display font-black italic uppercase text-white truncate max-w-xs">{p.nome}</h3>
                      </div>
                      <p className="text-[10px] text-white/30 uppercase tracking-tighter">Compatível: {p.compatibilidade}</p>
                   </div>

                   {/* Estoque e Status */}
                   <div className="flex items-center gap-6 px-6 border-l border-white/5 h-10">
                      <div className="flex flex-col items-center md:items-end">
                         <span className="text-[7px] text-white/20 uppercase font-bold">Saldo Atual</span>
                         <span className={cn(
                           "text-lg font-display font-black italic",
                           p.estoque <= 5 ? "text-red-500" : "text-white"
                         )}>{p.estoque} UN</span>
                      </div>
                      <div className="flex flex-col items-center md:items-end">
                         <span className="text-[7px] text-white/20 uppercase font-bold">Valor Elite</span>
                         <span className="text-lg font-display font-black italic text-neon-verde">{BRL(p.preco)}</span>
                      </div>
                   </div>

                   {/* Ações Cockpit */}
                   <div className="flex gap-2 pl-6 border-l border-white/5">
                      <ActionBtn onClick={() => toggleAtivo(p.id, p.ativo)} icon={p.ativo ? Eye : EyeOff} active={p.ativo} />
                      <ActionBtn onClick={() => startEdit(p)} icon={Pencil} />
                      <ActionBtn onClick={() => deleteProduto(p.id)} icon={Trash2} danger />
                   </div>
                </motion.div>
              ))
            )}
         </div>
      </div>
    </div>
  );
}

function Field({ label, value, onChange, type = "text" }: { label: string, value: any, onChange: (v: string) => void, type?: string }) {
  return (
    <div className="space-y-1.5">
       <label className="text-[9px] font-black uppercase tracking-[0.2em] text-white/40 ml-1">{label}</label>
       <input 
         type={type}
         value={value ?? ''}
         onChange={e => onChange(e.target.value)}
         className="w-full bg-black border border-white/10 rounded-xl px-4 py-3 text-sm font-bold text-white focus:outline-none focus:border-neon-verde transition-all"
       />
    </div>
  );
}

function ActionBtn({ icon: Icon, onClick, active, danger }: { icon: any, onClick: () => void, active?: boolean, danger?: boolean }) {
  return (
    <button 
      onClick={onClick}
      className={cn(
        "p-2.5 rounded-xl border transition-all active:scale-90",
        danger ? "bg-red-500/10 border-red-500/20 text-red-500 hover:bg-red-500 hover:text-white" : 
        active ? "bg-neon-verde/10 border-neon-verde/20 text-neon-verde hover:bg-neon-verde hover:text-black" :
        "bg-white/5 border-white/10 text-white/40 hover:text-white hover:bg-white/10"
      )}
    >
      <Icon size={16} />
    </button>
  );
}
