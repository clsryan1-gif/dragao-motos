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

  const handleDelete = async (id: string) => {
    if (!confirm('Deseja realmente remover esta mídia?')) return;
    try {
      await deleteGalleryImage(id);
      setImages(images.filter(img => img.id !== id));
      showToast('MÍDIA REMOVIDA DO SISTEMA', 'success');
    } catch (err) {
      showToast('ERRO AO DELETAR', 'error');
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
    <div className="space-y-8">
      {/* Diagnóstico de Erro Tático */}
      {errorMsg && (
        <DiagnosticOverlay error={errorMsg} onClose={() => setErrorMsg(null)} />
      )}

      {/* Upload Section */}
      <div className="bg-aco-grad border-chrome p-8 rounded-[2.5rem] shadow-2xl relative overflow-hidden group">
        <div className="absolute top-0 right-0 w-32 h-32 bg-neon-verde/5 blur-3xl"></div>
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-neon-verde/10 flex items-center justify-center text-neon-verde">
              <Plus size={24} />
            </div>
            <div>
              <h3 className="text-sm font-black uppercase tracking-widest">Nova Mídia Tática</h3>
              <p className="text-[9px] text-white/40 uppercase tracking-wider">PNG, JPG ou WEBP (Max 5MB)</p>
            </div>
          </div>
          
          <label className={cn(
            "bg-neon-verde text-black px-8 py-4 rounded-xl font-display font-black uppercase italic text-xs tracking-widest cursor-pointer hover:scale-105 transition-all shadow-neon flex items-center gap-3",
            uploading && "opacity-50 cursor-wait"
          )}>
            {uploading ? <Zap className="animate-pulse" size={18} /> : <ImageIcon size={18} />}
            {uploading ? 'ENVIANDO...' : 'SUBIR IMAGEM'}
            <input type="file" className="hidden" onChange={handleUpload} disabled={uploading} accept="image/*" />
          </label>
        </div>
      </div>

      {/* Images List */}
      <div className="flex justify-between items-center mb-4">
         <h2 className="text-[10px] font-black uppercase tracking-[0.3em] text-white/30 ml-4">Disposição Estrutural (Arraste para Reordenar)</h2>
         <button 
           onClick={handleReorder}
           disabled={loading}
           className="bg-white/5 border border-white/10 hover:border-neon-verde/30 px-6 py-2 rounded-xl text-[9px] font-black uppercase tracking-widest flex items-center gap-2 transition-all"
         >
           {loading ? <Zap size={12} className="animate-pulse" /> : <Save size={12} />}
           Salvar Nova Ordem
         </button>
      </div>

      <Reorder.Group axis="y" values={images} onReorder={setImages} className="space-y-4">
        {images.map((img) => (
          <Reorder.Item 
            key={img.id} 
            value={img}
            className="bg-aco-grad border-chrome p-4 rounded-[2rem] flex items-center gap-6 cursor-grab active:cursor-grabbing group"
          >
            <div className="relative w-24 h-16 rounded-xl overflow-hidden border border-white/10 shrink-0">
               <Image src={img.url} alt="" fill className="object-cover" />
            </div>
            
            <div className="flex-1">
               <p className="text-[10px] font-black uppercase tracking-widest text-white leading-none mb-1">{img.title || 'Mídia Sem Nome'}</p>
               <p className="text-[8px] text-white/30 uppercase tracking-widest">{img.description || 'Sem descrição técnica'}</p>
            </div>

            <div className="flex items-center gap-3 px-4">
                <button 
                  onClick={() => handleDelete(img.id)}
                  className="p-3 bg-red-500/10 border border-red-500/20 text-red-500 rounded-xl hover:bg-red-500 hover:text-white transition-all shadow-lg shadow-red-500/10"
                >
                  <Trash2 size={16} />
                </button>
            </div>
          </Reorder.Item>
        ))}
      </Reorder.Group>

      {images.length === 0 && (
        <div className="py-20 text-center border-2 border-dashed border-white/5 rounded-[3rem]">
          <p className="text-[10px] font-black uppercase tracking-[0.3em] text-white/20">A Galeria está operando no modo vazio</p>
        </div>
      )}
    </div>
  );
}
