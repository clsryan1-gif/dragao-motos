'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ChevronLeft, Save, Zap, Package, Image as ImageIcon, Cpu, Database } from 'lucide-react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useToast } from '@/context/ToastContext';
import { supabase, supabaseUrl, supabaseKey } from '@/lib/supabase';

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
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>('');
  const [debugError, setDebugError] = useState<any>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      setFile(selectedFile);
      setPreviewUrl(URL.createObjectURL(selectedFile));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const isSupabaseConfigured = !supabaseUrl.includes('placeholder') && 
                                !supabaseKey.includes('placeholder') && 
                                !supabaseKey.includes('COLE_O');

    if (file && !isSupabaseConfigured) {
      showToast('ERRO: CONFIGURE AS CHAVES NO ARQUIVO .ENV PARA UPLOAD!', 'error');
      return;
    }

    setLoading(true);

    try {
      let imageUrl = formData.imagem;

      if (file) {
        const fileExt = file.name.split('.').pop();
        const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`;
        const filePath = `pecas/${fileName}`;

        const { error: uploadError } = await supabase.storage
          .from('dragaomotos')
          .upload(filePath, file);

        if (uploadError) {
          console.error('Upload Error:', uploadError);
          setDebugError(uploadError);
          throw new Error(`FALHA NO UPLOAD: ${uploadError.message}`);
        }

        const { data: publicUrlData } = supabase.storage
          .from('dragaomotos')
          .getPublicUrl(filePath);

        imageUrl = publicUrlData.publicUrl;
      }

      const res = await fetch('/api/admin/produtos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          imagem: imageUrl,
          preco: parseFloat(formData.preco.replace(',', '.')),
          estoque: parseInt(formData.estoque),
        }),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.message || 'Erro ao cadastrar');

      showToast('NOVO COMPONENTE INTEGRADO AO SISTEMA!', 'success');
      router.push('/admin/produtos');
      router.refresh();
    } catch (err: any) {
      console.error('Cadastro Error:', err);
      showToast(err.message || 'FALHA CRÍTICA NO UPLOAD DE DADOS.', 'error');
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
              {previewUrl || (formData.imagem && formData.imagem.startsWith('http')) ? (
                <img src={previewUrl || formData.imagem} alt="Preview" className="w-full h-full object-contain relative z-10 p-4" />
              ) : (
                <div className="flex flex-col items-center gap-4 text-white/10 group-hover:text-neon-verde/20 transition-colors">
                   <ImageIcon size={64} />
                   <div className="text-center">
                     <p className="text-[10px] font-black uppercase tracking-widest mt-2 font-display italic">Aguardando Imagem</p>
                     <p className="text-[8px] font-bold uppercase tracking-tighter text-white/20">Click para Upload</p>
                   </div>
                </div>
              )}
              
              {/* FILE INPUT INVISIVEL PARA COBRIR O CARD */}
              <input 
                 type="file" 
                 accept="image/*"
                 onChange={handleFileChange}
                 className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-30" 
              />
              
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
                 <Input label="IDENTIFICAÇÃO DA PEÇA" placeholder="Ex: Filtro de Óleo K&N Performance" value={formData.nome} onChange={(v: string) => setFormData({...formData, nome: v})} required />
              </div>
              <Input label="SISTEMA / CATEGORIA" placeholder="Ex: Motor" value={formData.categoria} onChange={(v: string) => setFormData({...formData, categoria: v})} required />
              <Input label="COMPATIBILIDADE TÉCNICA" placeholder="Ex: CB 650R / CBR 650F" value={formData.compatibilidade} onChange={(v: string) => setFormData({...formData, compatibilidade: v})} required />
              <Input label="VALOR DE MERCADO (R$)" placeholder="0.00" type="number" step="0.01" value={formData.preco} onChange={(v: string) => setFormData({...formData, preco: v})} required />
              <Input label="ESTOQUE INICIAL (UN)" placeholder="10" type="number" value={formData.estoque} onChange={(v: string) => setFormData({...formData, estoque: v})} required />
              <div className="md:col-span-2">
                 <Input label="LINK DA IMAGEM (CDN/URL) *Opcional se fez upload*" placeholder="https://exemplo.com/imagem.png" value={formData.imagem} onChange={(v: string) => setFormData({...formData, imagem: v})} />
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

      {/* JANELA DE DIAGNÓSTICO FLUTUANTE */}
      {debugError && (
        <motion.div 
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="fixed bottom-6 right-6 left-6 md:left-auto md:w-96 bg-black/90 border border-red-500/50 p-6 rounded-3xl backdrop-blur-xl z-50 shadow-[0_0_50px_rgba(239,68,68,0.2)]"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2 text-red-500">
              <Database size={16} />
              <span className="text-[10px] font-black uppercase tracking-widest">Diagnóstico Supabase</span>
            </div>
            <button onClick={() => setDebugError(null)} className="text-white/20 hover:text-white transition-colors">
              <Zap size={14} />
            </button>
          </div>
          <div className="space-y-3 font-mono">
            <div className="bg-red-500/5 p-3 rounded-xl border border-red-500/10">
              <p className="text-[10px] text-red-400 font-bold uppercase mb-1">Error Message:</p>
              <p className="text-[11px] text-white/80 break-words">{debugError.message || 'Erro desconhecido'}</p>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div className="bg-white/5 p-3 rounded-xl border border-white/10">
                <p className="text-[8px] text-white/30 font-bold uppercase mb-1">Status Code:</p>
                <p className="text-[11px] text-white font-black">{debugError.status || 'N/A'}</p>
              </div>
              <div className="bg-white/5 p-3 rounded-xl border border-white/10">
                <p className="text-[11px] text-white font-black">{debugError.error || 'N/A'}</p>
              </div>
            </div>
            <p className="text-[8px] text-white/20 uppercase tracking-widest text-center pt-2">
              * Verifique se o bucket 'dragaomotos' existe e tem acesso público.
            </p>
          </div>
        </motion.div>
      )}
    </div>
  );
}

function Input({ label, onChange, ...props }: any) {
  return (
    <div className="space-y-2">
       <label className="text-[10px] font-black uppercase tracking-[0.2em] text-white/40 ml-1 font-mono">{label}</label>
       <input 
         {...props}
         onChange={(e: React.ChangeEvent<HTMLInputElement>) => onChange(e.target.value)}
         className="w-full bg-black/60 border border-white/10 rounded-xl px-5 py-4 text-sm font-bold text-white focus:outline-none focus:border-neon-verde transition-all placeholder:text-white/5"
       />
    </div>
  );
}
