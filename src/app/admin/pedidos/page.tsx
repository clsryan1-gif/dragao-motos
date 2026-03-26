import { prisma } from "@/lib/prisma";
import { ShoppingCart, Wallet, Clock, CheckCircle2, ChevronLeft, Package, User } from "lucide-react";
import Link from "next/link";
import OrderListAdmin from "@/components/catalog/OrderListAdmin";

export const dynamic = 'force-dynamic';

const BRL = (v: number) => v.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

export default async function AdminPedidos() {
  const pedidos = await prisma.order.findMany({
    where: { hidden: false },
    take: 100, // Prevenção contra estouro de memória (gargalo)
    orderBy: { createdAt: 'desc' },
    include: {
      user: { select: { name: true, phone: true } },
      items: { include: { product: { select: { nome: true } } } }
    }
  });

  const pagos = pedidos.filter((p: any) => p.status === 'PAGO');
  const totalFaturado = pagos.reduce((acc: number, p: any) => acc + p.total, 0);
  const pendentes = pedidos.filter((p: any) => p.status === 'PENDENTE');

  return (
    <div className="space-y-8 animate-[fadeIn_0.5s_ease-out] pb-20">
      
      {/* HEADER DE VENDAS */}
      <header className="flex flex-col md:flex-row items-start md:items-end justify-between gap-6">
        <div>
           <Link href="/admin" className="inline-flex items-center gap-2 text-neon-verde text-[10px] font-black uppercase tracking-[0.3em] mb-4 hover:translate-x-[-5px] transition-transform">
                <ChevronLeft size={14} /> Painel Tático
           </Link>
           <h1 className="text-3xl md:text-5xl font-display font-black uppercase italic tracking-tighter leading-none">
              VENDAS <span className="text-neon-verde drop-shadow-[0_0_15px_#00FF33]">LIVE</span>
           </h1>
           <p className="text-white/30 text-[9px] font-black uppercase tracking-widest mt-2">
              Monitoramento em Tempo Real de Transações e Entregas
           </p>
        </div>

        {/* MÉTRICAS DE VENDAS (STYLE COCKPIT) */}
        <div className="flex gap-4">
           <StatusMiniCard label="Faturado" value={BRL(totalFaturado)} color="neon" />
           <StatusMiniCard label="Pendentes" value={`${pendentes.length}`} color="white" />
        </div>
      </header>

      {/* LISTA DE PEDIDOS DINÂMICA */}
      <div className="min-h-[60vh]">
         <OrderListAdmin initialOrders={JSON.parse(JSON.stringify(pedidos))} />
      </div>

    </div>
  );
}

function StatusMiniCard({ label, value, color }: any) {
  return (
    <div className="bg-black/40 border border-white/5 px-6 py-3 rounded-2xl backdrop-blur-md">
       <span className="text-[7px] text-white/30 uppercase font-black tracking-widest block mb-1">{label}</span>
       <span className={cn(
         "font-display font-black italic text-xl",
         color === 'neon' ? "text-neon-verde" : "text-white"
       )}>{value}</span>
    </div>
  );
}

// Obs: cn missing here too, I'll need to add it or use a simpler pattern
import { cn } from "@/lib/utils";
