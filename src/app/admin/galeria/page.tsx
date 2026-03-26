import { prisma } from "@/lib/prisma";
import { Image as ImageIcon, Plus, Trash2, ArrowUp, ArrowDown, Database, LayoutGrid } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import GalleryManager from "./GalleryManager";

export const dynamic = 'force-dynamic';

export default async function AdminGaleria() {
  const images = await prisma.gallery.findMany({
    orderBy: { order: 'asc' }
  });

  return (
    <div className="space-y-8 pb-20 animate-[fadeIn_0.5s_ease-out]">
      <header className="flex flex-col md:flex-row items-start md:items-end justify-between gap-6">
        <div>
          <h1 className="text-3xl md:text-5xl font-display font-black uppercase italic tracking-tighter leading-none mb-2">
            GESTÃO DE <span className="text-neon-verde drop-shadow-[0_0_15px_#00FF33]">GALERIA</span>
          </h1>
          <p className="text-white/40 font-bold uppercase tracking-[0.3em] text-[8px] md:text-[10px] ml-1">
            CONTROLE TOTAL DE MÍDIA E PERFORMANCE
          </p>
        </div>
        
        <div className="bg-black/40 border border-white/5 px-6 py-3 rounded-2xl backdrop-blur-md flex items-center gap-4">
          <div className="flex flex-col">
            <span className="text-[10px] font-black text-white uppercase tracking-widest leading-none">{images.length} IMAGENS</span>
            <span className="text-[8px] text-white/30 uppercase tracking-widest mt-1">CAPACIDADE DRAGÃO-S3</span>
          </div>
          <div className="w-10 h-10 rounded-xl bg-neon-verde/10 border border-neon-verde/20 flex items-center justify-center text-neon-verde">
            <LayoutGrid size={20} />
          </div>
        </div>
      </header>

      <GalleryManager initialImages={JSON.parse(JSON.stringify(images))} />
    </div>
  );
}
