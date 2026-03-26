'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Plus, Trash2, ArrowUp, ArrowDown, Zap, Image as ImageIcon, Database, Save } from "lucide-react";
import { addGalleryImage, deleteGalleryImage, updateGalleryOrder } from '@/app/admin/actions';
import { useToast } from '@/context/ToastContext';
import { supabase, supabaseUrl, supabaseKey } from '@/lib/supabase';
import { motion, Reorder } from 'framer-motion';
import { cn } from '@/lib/utils';
import { DiagnosticOverlay } from '@/components/ui/DiagnosticOverlay';

export default function GalleryManager({ initialImages }: { initialImages: any[] }) {
  const { showToast } = useToast();
  const [images, setImages] = useState(initialImages);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [uploadPreview, setUploadPreview] = useState<string | null>(null);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || !e.target.files[0]) return;
    
    // Check Supabase Config
    const isSupabaseConfigured = !supabaseUrl.includes('placeholder') && 
                                !supabaseKey.includes('placeholder') && 
                                !supabaseKey.includes('COLE_O');

    if (!isSupabaseConfigured) {
      showToast('ERRO: CONFIGURE AS CHAVES NO .ENV!', 'error');
      return;
    }

    setUploading(true);
    const file = e.target.files[0];
    const fileExt = file.name.split('.').pop();
    const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`;
    const filePath = `galeria/${fileName}`;

    try {
      const { error: uploadError } = await supabase.storage
        .from('dragaomotos')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data: publicUrlData } = supabase.storage
        .from('dragaomotos')
        .getPublicUrl(filePath);

      await addGalleryImage(publicUrlData.publicUrl, 'Nova Imagem', 'Aspecto Industrial');
      showToast('IMAGEM INCORPORADA COM SUCESSO!', 'success');
      window.location.reload(); // Refresh to get the new order
    } catch (err: any) {
      const msg = err.message || 'FALHA DE COMUNICAÇÃO NO UPLOAD';
      showToast(msg, 'error');
      setErrorMsg(msg);
    } finally {
      setUploading(false);
    }
  };


  const handleReorder = async () => {
    setLoading(true);
    try {
      const orderData = images.map((img, index) => ({ id: img.id, order: index }));
      await updateGalleryOrder(orderData);
      showToast('ORDEM OPERACIONAL SINCRONIZADA', 'success');
    } catch (err) {
      showToast('ERRO AO SINCRONIZAR ORDEM', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="space-y-12 pb-20">
        {/* Diagnóstico de Erro Tático */}
        {errorMsg && <DiagnosticOverlay error={errorMsg} onClose={() => setErrorMsg(null)} />}

        {/* Estação de Upload - Novo Design Premium */}
        <div className="bg-aco-grad border-chrome p-8 rounded-[2.5rem] shadow-2xl relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-48 h-48 bg-neon-verde/5 blur-[80px] pointer-events-none group-hover:bg-neon-verde/10 transition-all"></div>
          <div className="flex flex-col md:flex-row items-center justify-between gap-8 relative z-10">
            <div className="flex items-center gap-6">
              <div className="relative w-28 h-28 rounded-3xl bg-black/60 border-2 border-white/5 flex items-center justify-center overflow-hidden shrink-0 group/preview shadow-inner">
                 {uploadPreview ? (
                   <Image src={uploadPreview} alt="Preview" fill className="object-cover opacity-80" />
                 ) : (
                   <div className="flex flex-col items-center gap-2 text-white/20">
                      <ImageIcon size={32} />
                      <span className="text-[8px] font-black uppercase tracking-widest">Aguardando...</span>
                   </div>
                 )}
                 {uploading && (
                   <div className="absolute inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center">
                     <Zap size={32} className="text-neon-verde animate-pulse shadow-neon" />
                   </div>
                 )}
              </div>
              <div>
                <h3 className="text-2xl font-display font-black uppercase italic tracking-tighter text-white">Estação de Inserção</h3>
                <p className="text-[10px] text-neon-verde/60 uppercase font-black tracking-[0.3em] mt-1 glow-neon">Protocolo de Ingestão Visual Ativado</p>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <label className={cn(
                "bg-neon-verde text-black px-10 py-5 rounded-2xl font-display font-black uppercase italic text-xs tracking-[0.2em] cursor-pointer hover:scale-105 active:scale-95 transition-all shadow-neon flex items-center gap-3 border-none",
                uploading && "opacity-50 cursor-not-allowed pointer-events-none"
              )}>
                {uploading ? <Zap className="animate-spin-slow" size={20} /> : <Plus size={20} />}
                {uploading ? 'SINCRONIZANDO...' : 'CARREGAR NOVA MÍDIA'}
                <input 
                  type="file" 
                  className="hidden" 
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      setUploadPreview(URL.createObjectURL(file));
                      handleUpload(e);
                    }
                  }} 
                  disabled={uploading} 
                  accept="image/*" 
                />
              </label>
            </div>
          </div>
        </div>

        {/* Grid de Disposição Hierárquica */}
        <div className="space-y-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6 px-4">
             <div className="text-center md:text-left">
                <h2 className="text-3xl font-display font-black uppercase italic tracking-tighter text-white mb-1">Mapa de Disposição</h2>
                <p className="text-[10px] text-white/30 font-black uppercase tracking-[0.5em]">Arraste para calibrar a hierarquia do Showcase</p>
             </div>
             
             <button 
               onClick={handleReorder}
               disabled={loading}
               className="bg-white/5 border border-white/10 hover:border-neon-verde/40 hover:bg-neon-verde/5 px-10 py-4 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] flex items-center gap-3 transition-all group/save shadow-2xl backdrop-blur-md"
             >
               {loading ? <Zap size={18} className="animate-pulse text-neon-verde" /> : <Save size={18} className="group-hover:rotate-12 transition-transform" />}
               SINCRONIZAR ORDEM OPERACIONAL
             </button>
          </div>

          <Reorder.Group 
            axis="y" 
            values={images} 
            onReorder={setImages} 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-2"
          >
            {images.map((img, index) => (
              <Reorder.Item 
                key={img.id} 
                value={img}
                className={cn(
                  "bg-aco-grad border-chrome rounded-[2.5rem] overflow-hidden cursor-grab active:cursor-grabbing group relative aspect-video shadow-2xl transition-all duration-300",
                  index === 2 ? "ring-2 ring-neon-verde/50 shadow-neon-small" : "border-white/5 hover:border-white/20"
                )}
              >
                <Image src={img.url} alt="" fill className="object-cover brightness-[0.4] group-hover:brightness-75 transition-all duration-700 saturate-[0.8]" />
                
                {/* Badge de Posição Mecânica */}
                <div className="absolute top-6 left-6 w-12 h-12 rounded-2xl bg-black/80 backdrop-blur-xl border border-white/10 flex flex-col items-center justify-center shadow-2xl">
                   <span className="text-[10px] font-black uppercase text-white/40 tracking-tighter leading-none mb-1">SLOT</span>
                   <span className="text-lg font-display font-black italic leading-none text-neon-verde">{index + 1}</span>
                </div>

                {/* Status Info Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/20 to-transparent flex flex-col justify-end p-8">
                   <p className="text-[10px] font-black uppercase tracking-[0.3em] text-neon-verde mb-2 glow-neon flex items-center gap-2">
                     <div className={cn("w-2 h-2 rounded-full", index === 2 ? "bg-neon-verde animate-pulse" : "bg-white/20")} />
                     {index === 2 ? 'Foco Principal (Hero)' : index < 2 ? 'Lado Superior' : 'Grade Base'}
                   </p>
                   <h4 className="text-sm font-display font-black uppercase italic tracking-[0.1em] truncate text-white/90">
                     {img.title || 'Mídia Operacional'}
                   </h4>
                </div>

                {/* Scanline & Grain Effects */}
                <div className="absolute inset-0 pointer-events-none bg-scanline opacity-[0.03]" />
                <div className="absolute inset-0 pointer-events-none border border-white/5 rounded-[2.5rem]" />
              </Reorder.Item>
            ))}
          </Reorder.Group>

          {images.length === 0 && (
            <div className="py-32 text-center border-2 border-dashed border-white/5 rounded-[4rem] bg-black/20 backdrop-blur-sm">
              <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-6">
                 <Database size={32} className="text-white/10" />
              </div>
              <p className="text-xs font-black uppercase tracking-[0.4em] text-white/20">Bunker Visual Limpo - Aguardando Protocolos de Dados</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
