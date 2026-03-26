'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { FadeIn } from '@/components/ui/FadeIn';
import GalleryManager from '@/components/admin/GalleryManager';
import { Settings, X, Plus, Trash2, Zap, Image as ImageIcon } from 'lucide-react';
import { useToast } from '@/context/ToastContext';
import { supabase, supabaseUrl, supabaseKey } from '@/lib/supabase';
import { deleteGalleryImage, updateGalleryImage } from '@/app/admin/actions';
import { DiagnosticOverlay } from '@/components/ui/DiagnosticOverlay';
import { cn } from '@/lib/utils';

export function Fan2025Showcase({ dbImages, isAdmin }: { dbImages?: any[], isAdmin?: boolean }) {
  const [isEditing, setIsEditing] = useState(false);
  const { showToast } = useToast();
  const [updatingId, setUpdatingId] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleDeleteCard = async (id: string) => {
    if (!id || id.startsWith('static-')) {
      showToast('Esta imagem é padrão e não pode ser removida individualmente.', 'error');
      return;
    }
    if (!confirm('Deseja realmente remover esta mídia da galeria?')) return;
    
    try {
      await deleteGalleryImage(id);
      showToast('MÍDIA REMOVIDA DO SISTEMA', 'success');
      window.location.reload();
    } catch (err: any) {
      setErrorMsg(err.message || 'ERRO AO DELETAR MÍDIA');
    }
  };

  const handleReplaceImage = async (e: React.ChangeEvent<HTMLInputElement>, id: string) => {
    if (!e.target.files || !e.target.files[0]) return;
    if (!id || id.startsWith('static-')) {
      showToast('Apenas imagens reais do banco podem ser substituídas por este seletor.', 'error');
      return;
    }

    setUpdatingId(id);
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

      await updateGalleryImage(id, { url: publicUrlData.publicUrl });
      showToast('IMAGEM ATUALIZADA COM SUCESSO', 'success');
      window.location.reload();
    } catch (err: any) {
      setErrorMsg(err.message || 'FALHA NA SUBSTITUIÇÃO DA IMAGEM');
    } finally {
      setUpdatingId(null);
    }
  };

  const defaultImages = [
    {
      id: 'static-0',
      src: '/images/galeria/fan2025_01.png',
      title: 'Comandos de Precisão',
      aspect: 'Aspecto: Aço Escovado e Controles Inteiros'
    },
    {
      id: 'static-1',
      src: '/images/galeria/fan2025_02.png',
      title: 'Tanque & Cockpit',
      aspect: 'Aspecto: Brilho Metálico Intenso'
    },
    {
      id: 'static-2',
      src: '/images/galeria/fan2025_03.jpg',
      title: 'Engenharia em Equipe',
      aspect: 'Aspecto: Ajuste Técnico de Elite'
    },
    {
      id: 'static-3',
      src: '/images/galeria/fan2025_04.png',
      title: 'Estrutura Frontal',
      aspect: 'Aspecto: Geometria e Estabilidade'
    },
    {
      id: 'static-4',
      src: '/images/galeria/fan2025_05.png',
      title: 'Finalização & Limpeza',
      aspect: 'Aspecto: Cromo Polido e Fundo Industrial'
    }
  ];

  const dbMapped: any[] = dbImages && dbImages.length > 0 ? dbImages.map(img => ({
    id: img.id,
    src: img.url,
    title: img.title || 'Mítica Dragão',
    aspect: img.description || 'Alta Performance'
  })) : [];

  // Cria a lista final garantindo 5 posições (prioridade para o que vem do banco)
  const images = [...dbMapped];
  for (let i = images.length; i < 5; i++) {
    images.push(defaultImages[i]);
  }

  const AdminCardOverlay = ({ id }: { id: string }) => {
    const isStatic = id.startsWith('static-');
    const isUpdating = updatingId === id;

    if (!isAdmin || !isEditing) return null;

    return (
      <div className="absolute inset-0 z-30 bg-black/80 backdrop-blur-sm flex flex-col items-center justify-center gap-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <p className="text-[10px] font-black uppercase tracking-[0.2em] text-white/40 mb-2">Painel de Ajuste</p>
        
        <div className="flex items-center gap-3">
          <label className={cn(
            "p-3 bg-neon-verde text-black rounded-xl cursor-pointer hover:scale-110 active:scale-95 transition-all shadow-neon",
            (isUpdating || isStatic) && "opacity-50 cursor-not-allowed"
          )}>
            {isUpdating ? <Zap size={18} className="animate-pulse" /> : <ImageIcon size={18} />}
            <input 
              type="file" 
              className="hidden" 
              disabled={isUpdating || isStatic} 
              onChange={(e) => handleReplaceImage(e, id)}
              accept="image/*"
            />
          </label>

          <button 
            onClick={() => handleDeleteCard(id)}
            disabled={isStatic}
            className={cn(
              "p-3 bg-red-500/10 border border-red-500/20 text-red-500 rounded-xl hover:bg-red-500 hover:text-white transition-all shadow-lg",
              isStatic && "opacity-20 cursor-not-allowed"
            )}
          >
            <Trash2 size={18} />
          </button>
        </div>
        
        {isStatic && (
          <p className="text-[8px] text-white/20 uppercase font-black tracking-widest mt-2">Mídia do Sistema</p>
        )}
      </div>
    );
  };

  return (
    <section id="galeria" className="py-20 md:py-32 px-6 md:px-12 bg-aco-escovado relative overflow-hidden text-center">
      {errorMsg && <DiagnosticOverlay error={errorMsg} onClose={() => setErrorMsg(null)} />}
      
      {/* BOTÃO DE CONTROLE ADMIN INLINE */}
      {isAdmin && (
        <div className="fixed bottom-12 right-12 z-[100]">
          <button 
            onClick={() => setIsEditing(!isEditing)}
            className="flex items-center gap-3 bg-neon-verde text-black px-8 py-5 rounded-full font-display font-black uppercase italic tracking-widest shadow-neon hover:scale-110 active:scale-95 transition-all outline-none border-none ring-4 ring-black/20"
          >
            {isEditing ? <X size={20} /> : <Settings size={20} className="animate-spin-slow" />}
            {isEditing ? 'Fechar Gestão' : 'Gerenciar Galeria'}
          </button>
        </div>
      )}

      {/* MODAL DE GESTÃO NATIVA */}
      {isAdmin && isEditing && (
        <div className="fixed inset-0 bg-black/95 backdrop-blur-2xl z-[90] overflow-y-auto pt-32 pb-20 px-6">
           <div className="max-w-4xl mx-auto">
              <GalleryManager initialImages={dbImages || []} />
           </div>
        </div>
      )}
      {/* Luzes de Estúdio Metálicas */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-white/5 blur-[150px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-neon-verde/5 blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        <FadeIn>
          <h2 className="text-4xl md:text-9xl font-display font-black uppercase italic tracking-tighter mb-4 text-white">
            SHOWCASE <span className="text-metallic">FAN 2025</span>
          </h2>
          <p className="text-neon-verde font-display font-bold uppercase tracking-[0.3em] mb-16 glow-neon">A Elite da Performance Industrial</p>
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-6 gap-4 md:gap-6">
          {/* Main Hero Shot */}
          <FadeIn className="md:col-span-4 md:row-span-2">
            <div className="relative aspect-video md:aspect-square group overflow-hidden border-2 border-white/10 rounded-3xl shadow-2xl">
              <AdminCardOverlay id={images[2].id} />
              <Image 
                src={images[2].src} 
                alt={images[2].title}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110 contrast-[1.1] brightness-[1.1] grayscale-[0.2]"
              />
              {/* Marca d'água da Logo */}
              <div className="absolute top-6 right-6 w-16 h-16 opacity-40 group-hover:opacity-100 transition-opacity z-20 pointer-events-none">
                 <Image src="/images/logo/logo.png" alt="" fill className="object-contain" />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-8 text-left">
                <p className="text-neon-verde font-bold uppercase tracking-widest text-xs mb-2">{images[2].aspect}</p>
                <h3 className="text-white text-3xl font-display font-black uppercase italic tracking-tighter">{images[2].title}</h3>
              </div>
              {/* Shine Effect Overlay */}
              <div className="absolute inset-0 pointer-events-none border-2 border-white/5 rounded-3xl" />
            </div>
          </FadeIn>

          {/* Side Shots */}
          <FadeIn delay={100} className="md:col-span-2">
            <div className="relative aspect-video group overflow-hidden border-2 border-white/10 rounded-2xl shadow-xl">
              <AdminCardOverlay id={images[0].id} />
              <Image 
                src={images[0].src} 
                alt={images[0].title}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110 contrast-[1.2] brightness-[0.9] saturate-[0.8]"
              />
              {/* Marca d'água da Logo */}
              <div className="absolute top-4 right-4 w-10 h-10 opacity-30 group-hover:opacity-80 transition-opacity z-20 pointer-events-none">
                 <Image src="/images/logo/logo.png" alt="" fill className="object-contain" />
              </div>
              <div className="absolute inset-0 bg-black/40 group-hover:bg-transparent transition-colors duration-500" />
              <div className="absolute bottom-4 left-6 text-left">
                <h3 className="text-white text-xl font-display font-black uppercase italic tracking-tighter">{images[0].title}</h3>
              </div>
            </div>
          </FadeIn>

          <FadeIn delay={200} className="md:col-span-2">
            <div className="relative aspect-video group overflow-hidden border-2 border-white/10 rounded-2xl shadow-xl">
              <AdminCardOverlay id={images[1].id} />
              <Image 
                src={images[1].src} 
                alt={images[1].title}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110 contrast-[1.1] brightness-[1.1]"
              />
               {/* Marca d'água da Logo */}
               <div className="absolute top-4 right-4 w-10 h-10 opacity-30 group-hover:opacity-80 transition-opacity z-20 pointer-events-none">
                 <Image src="/images/logo/logo.png" alt="" fill className="object-contain" />
              </div>
              <div className="absolute inset-0 bg-black/40 group-hover:bg-transparent transition-colors duration-500" />
               <div className="absolute bottom-4 left-6 text-left">
                <h3 className="text-white text-xl font-display font-black uppercase italic tracking-tighter">{images[1].title}</h3>
              </div>
            </div>
          </FadeIn>

          {/* Bottom Row */}
          <FadeIn delay={300} className="md:col-span-3">
            <div className="relative aspect-video group overflow-hidden border-chrome rounded-2xl shadow-xl">
              <AdminCardOverlay id={images[3].id} />
              <Image 
                src={images[3].src} 
                alt={images[3].title}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110 contrast-[1.2] brightness-[0.8] grayscale-[0.3]"
              />
               {/* Marca d'água da Logo */}
               <div className="absolute top-4 right-4 w-10 h-10 opacity-30 group-hover:opacity-80 transition-opacity z-20 pointer-events-none">
                 <Image src="/images/logo/logo.png" alt="" fill className="object-contain" />
              </div>
               <div className="absolute inset-0 bg-black/50 group-hover:bg-transparent transition-colors duration-500" />
               <div className="absolute bottom-4 left-6 text-left">
                <h3 className="text-white text-2xl font-display font-black uppercase italic tracking-tighter">{images[3].title}</h3>
              </div>
            </div>
          </FadeIn>

          <FadeIn delay={400} className="md:col-span-3">
            <div className="relative aspect-video group overflow-hidden border-chrome rounded-2xl shadow-xl">
              <AdminCardOverlay id={images[4].id} />
              <Image 
                src={images[4].src} 
                alt={images[4].title}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110 contrast-125 brightness-110"
              />
               {/* Marca d'água da Logo */}
               <div className="absolute top-4 right-4 w-12 h-12 opacity-50 group-hover:opacity-100 transition-opacity z-20 pointer-events-none">
                  <Image src="/images/logo/logo.png" alt="" fill className="object-contain" />
               </div>
               <div className="absolute inset-0 bg-black/50 group-hover:bg-transparent transition-colors duration-500" />
               <div className="absolute bottom-4 left-6 text-left">
                <h3 className="text-white text-2xl font-display font-black uppercase italic tracking-tighter">{images[4].title}</h3>
              </div>
            </div>
          </FadeIn>
        </div>

        <FadeIn delay={500} className="mt-20">
           <p className="text-white/40 font-sans text-sm tracking-[0.2em] italic uppercase">Cada imagem é um reflexo do compromisso Dragão Motos com a perfeição mecânica.</p>
        </FadeIn>
      </div>
    </section>
  );
}
