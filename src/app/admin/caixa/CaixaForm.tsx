'use client';

import { useState } from 'react';
import { Plus, Zap } from "lucide-react";
import { addCaixaEntry } from '../actions';
import { useToast } from '@/context/ToastContext';

export default function CaixaForm() {
  const { showToast } = useToast();
  const [loading, setLoading] = useState(false);
  const [tipo, setTipo] = useState<'ENTRADA' | 'SAIDA'>('ENTRADA');

  async function clientAction(formData: FormData) {
    setLoading(true);
    formData.append('tipo', tipo);
    try {
      await addCaixaEntry(formData);
      showToast('LANÇAMENTO EXECUTADO COM SUCESSO!', 'success');
      (document.getElementById('caixa-form') as HTMLFormElement).reset();
    } catch (err: any) {
      showToast(err.message || 'ERRO AO EXECUTAR LANÇAMENTO', 'error');
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="bg-aco-grad border-chrome rounded-[2.5rem] p-8 shadow-2xl relative overflow-hidden group">
      <div className="absolute top-0 right-0 w-32 h-32 bg-neon-verde/5 blur-3xl group-hover:bg-neon-verde/10 transition-all"></div>
      
      <div className="flex items-center gap-3 mb-8">
        <div className="p-2 bg-neon-verde/10 rounded-lg">
          <Plus size={20} className="text-neon-verde" />
        </div>
        <h2 className="text-xs font-black uppercase tracking-widest leading-none">Novo Lançamento</h2>
      </div>

      <form id="caixa-form" action={clientAction} className="space-y-5">
        <div className="space-y-2">
          <label className="text-[9px] font-black uppercase tracking-widest text-white/30 ml-2">Título do Lançamento</label>
          <input name="descricao" required type="text" placeholder="EX: VENDA KIT RELAÇÃO" className="w-full bg-black/40 border border-white/10 rounded-xl py-3 px-4 text-[10px] font-bold uppercase tracking-widest focus:outline-none focus:border-neon-verde/50 transition-all" />
        </div>

        <div className="space-y-2">
          <label className="text-[9px] font-black uppercase tracking-widest text-white/30 ml-2">Tipo de Transação</label>
          <div className="grid grid-cols-2 gap-3">
            <button 
              type="button" 
              onClick={() => setTipo('ENTRADA')}
              className={`py-3 rounded-xl border transition-all text-[9px] font-black uppercase tracking-widest ${tipo === 'ENTRADA' ? 'border-green-500 bg-green-500/10 text-green-500 shadow-[0_0_15px_rgba(34,197,94,0.2)]' : 'border-white/5 bg-white/5 text-white/30 hover:text-white'}`}
            >
              Entrada
            </button>
            <button 
              type="button" 
              onClick={() => setTipo('SAIDA')}
              className={`py-3 rounded-xl border transition-all text-[9px] font-black uppercase tracking-widest ${tipo === 'SAIDA' ? 'border-red-500 bg-red-500/10 text-red-500 shadow-[0_0_15px_rgba(239,68,68,0.2)]' : 'border-white/5 bg-white/5 text-white/30 hover:text-white'}`}
            >
              Saída
            </button>
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-[9px] font-black uppercase tracking-widest text-white/30 ml-2">Valor Total</label>
          <div className="relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[9px] font-black text-white/20 tracking-widest">R$</span>
            <input name="valor" step="0.01" required type="number" className="w-full bg-black/40 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-[10px] font-bold uppercase tracking-widest focus:outline-none focus:border-neon-verde/50 transition-all" placeholder="0,00" />
          </div>
        </div>

        <button 
          type="submit" 
          disabled={loading}
          className="w-full bg-neon-verde py-4 rounded-xl text-black font-display font-black uppercase italic text-sm tracking-widest shadow-neon hover:scale-[1.02] transition-all mt-4 flex items-center justify-center gap-2 disabled:opacity-50"
        >
          {loading ? <Zap size={18} className="animate-pulse" /> : <Plus size={18} />}
          {loading ? 'PROCESSANDO...' : 'EFETUAR LANÇAMENTO'}
        </button>
      </form>
    </section>
  );
}
