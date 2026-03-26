'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ChevronLeft, Save, Zap, Package, Image as ImageIcon, Cpu, Database } from 'lucide-react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useToast } from '@/context/ToastContext';

export default function NovoProdutoPage() {
  const router = useRouter();
  const { showToast } = useToast();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    nome: '',
    categoria: '',
    compatibilidade: '',
    preco: '',
    estoque: '',
    imagem: '',
    ativo: true
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch('/api/admin/produtos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          preco: parseFloat(formData.preco),
          estoque: parseInt(formData.estoque),
        }),
      });

      if (!res.ok) throw new Error('Erro ao cadastrar');

      showToast('Novo componente integrado ao sistema!', 'success');
      router.push('/admin/produtos');
      router.refresh();
    } catch (err) {
      showToast('Falha crítica no upload de dados.', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-[fadeIn_0.5s_ease-out] pb-20">
      
      {/* HEADER CADASTRO */}
      <header>
        <Link href="/admin/produtos" className="inline-flex items-center gap-2 text-neon-verde text-[10px] font-black uppercase tracking-[0.3em] mb-4 hover:translate-x-[-5px] transition-transform">
            <ChevronLeft size={14} /> Voltar pro Inventário
        </Link>
        <h1 className="text-3xl md:text-5xl font-display font-black uppercase italic tracking-tighter leading-none">
          INCORPORAR <span className="text-neon-verde drop-shadow-[0_0_15px_#00FF33]">NOVA PEÇA</span>
        </h1>
        <p className="text-white/30 text-[9px] font-black uppercase tracking-widest mt-2">
          Expanda o Catálogo Dragão com Equipamentos de Elite
        </p>
      </header>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-3 gap-8">
        
        {/* COLUNA PREVIEW (ESQUERDA) */}
        <div className="md:col-span-1 space-y-6">
           <div className="bg-aco-grad border-2 border-white/5 rounded-[2.5rem] p-6 aspect-square flex flex-col items-center justify-center relative overflow-hidden group">
              {formData.imagem ? (
                <img src={formData.imagem} alt="Preview" className="w-full h-full object-contain relative z-10 p-4" />
              ) : (
                <div className="flex flex-col items-center gap-4 text-white/10 group-hover:text-neon-verde/20 transition-colors">
                   <ImageIcon size={64} />
                   <p className="text-[10px] font-black uppercase tracking-widest">Aguardando Imagem</p>
                </div>
              )}
              
              {/* SCANNER LINE (SURPRESA) */}
              <div className="absolute inset-0 pointer-events-none z-20">
                 <div className="absolute top-0 left-0 w-full h-[1px] bg-neon-verde shadow-neon animate-[scan_3s_linear_infinite]"></div>
              </div>
           </div>

           <div className="bg-black/40 border border-white/5 p-6 rounded-3xl space-y-4">
              <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-white/40">
                 <Cpu size={14} className="text-neon-verde" /> Status do Sistema
              </div>
              <div className="flex items-center justify-between text-[9px] font-bold uppercase">
                 <span className="text-white/20 tracking-tighter">Conexão BD</span>
                 <span className="text-neon-verde">ONLINE</span>
              </div>
              <div className="flex items-center justify-between text-[9px] font-bold uppercase tracking-tighter">
                 <span className="text-white/20">Modo de Inserção</span>
                 <span className="text-white/60">MANUAL_OVERRIDE</span>
              </div>
           </div>
        </div>

        {/* COLUNA FORM (DIREITA) */}
        <div className="md:col-span-2 space-y-6 bg-aco-grad border border-white/5 p-8 rounded-[2.5rem] shadow-2xl">
           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="md:col-span-2">
                 <Input label="IDENTIFICAÇÃO DA PEÇA" placeholder="Ex: Filtro de Óleo K&N Performance" value={formData.nome} onChange={v => setFormData({...formData, nome: v})} required />
              </div>
              <Input label="SISTEMA / CATEGORIA" placeholder="Ex: Motor" value={formData.categoria} onChange={v => setFormData({...formData, categoria: v})} required />
              <Input label="COMPATIBILIDADE TÉCNICA" placeholder="Ex: CB 650R / CBR 650F" value={formData.compatibilidade} onChange={v => setFormData({...formData, compatibilidade: v})} required />
              <Input label="VALOR DE MERCADO (R$)" placeholder="0.00" type="number" step="0.01" value={formData.preco} onChange={v => setFormData({...formData, preco: v})} required />
              <Input label="ESTOQUE INICIAL (UN)" placeholder="10" type="number" value={formData.estoque} onChange={v => setFormData({...formData, estoque: v})} required />
              <div className="md:col-span-2">
                 <Input label="LINK DA IMAGEM (CDN/URL)" placeholder="https://exemplo.com/imagem.png" value={formData.imagem} onChange={v => setFormData({...formData, imagem: v})} />
              </div>
           </div>

           <div className="pt-8 flex gap-4">
              <button 
                type="submit"
                disabled={loading}
                className="flex-1 bg-neon-verde text-black py-5 rounded-2xl font-black uppercase tracking-[0.3em] text-[11px] shadow-neon hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-3 disabled:opacity-50"
              >
                {loading ? <Zap size={20} className="animate-pulse" /> : <Database size={18} />}
                {loading ? 'SINCRONIZANDO...' : 'EXECUTAR CADASTRO'}
              </button>
           </div>
        </div>

      </form>
    </div>
  );
}

function Input({ label, ...props }: any) {
  return (
    <div className="space-y-2">
       <label className="text-[10px] font-black uppercase tracking-[0.2em] text-white/40 ml-1 font-mono">{label}</label>
       <input 
         {...props}
         onChange={e => props.onChange(e.target.value)}
         className="w-full bg-black/60 border border-white/10 rounded-xl px-5 py-4 text-sm font-bold text-white focus:outline-none focus:border-neon-verde transition-all placeholder:text-white/5"
       />
    </div>
  );
}
