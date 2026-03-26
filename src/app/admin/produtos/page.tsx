import { prisma } from "@/lib/prisma";
import InventoryList from "@/components/catalog/InventoryList";
import { Package, Plus, ChevronLeft } from "lucide-react";
import Link from "next/link";

export const dynamic = 'force-dynamic';

export default async function AdminProdutos() {
  const produtos = await prisma.product.findMany({
    take: 100, // Prevenção extrema (Limita os últimos 100 itens)
    orderBy: { createdAt: 'desc' }
  });

  return (
    <div className="space-y-8 animate-[fadeIn_0.5s_ease-out]">
      
      {/* HEADER DE GESTÃO */}
      <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-6">
        <div>
           <Link href="/admin" className="inline-flex items-center gap-2 text-neon-verde text-[10px] font-black uppercase tracking-[0.3em] mb-4 hover:translate-x-[-5px] transition-transform">
                <ChevronLeft size={14} /> Painel Tático
           </Link>
           <h1 className="text-3xl md:text-5xl font-display font-black uppercase italic tracking-tighter leading-none flex items-center gap-4">
              CONTROLE DE <span className="text-neon-verde drop-shadow-[0_0_15px_#00FF33]">ESTOQUE</span>
           </h1>
           <p className="text-white/30 text-[9px] font-black uppercase tracking-widest mt-2">
              Inventário em Tempo Real — {produtos.length} Unidades Registradas
           </p>
        </div>

        <Link href="/admin/produtos/novo">
           <button className="bg-neon-verde text-black px-8 py-4 rounded-xl flex items-center gap-3 font-black uppercase tracking-widest text-[11px] shadow-neon hover:scale-105 active:scale-95 transition-all">
              <Plus size={18} /> Adicionar Componente
           </button>
        </Link>
      </div>

      {/* LISTA DE ALTA PERFORMANCE */}
      <div className="min-h-[60vh]">
        <InventoryList produtos={produtos.map((p: any) => ({
          ...p,
          preco: Number(p.preco) // Garantindo Number para o client
        }))} />
      </div>

    </div>
  );
}
