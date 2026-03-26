import { prisma } from "@/lib/prisma";
import { Package, ShoppingCart, Users, Wallet, AlertTriangle, ArrowRight, PlusCircle, UserPlus, Receipt, Terminal, Activity } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

const BRL = (v: number) => v.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
export const dynamic = 'force-dynamic';

export default async function AdminDashboard() {
  // Coleta de dados com tratamento de erro resiliente
  let usersCount = 0, productsCount = 0, ordersCount = 0, lowStock: { id: string, nome: string, estoque: number }[] = [], recentOrders: { id: string, total: number, status: string, user: { name: string } | null }[] = [];
  let entradasAgg = { _sum: { valor: 0 as number | null } };
  let saidasAgg = { _sum: { valor: 0 as number | null } };

  try {
    const [uCount, pCount, oCount, lStock, rOrders, entAgg, saiAgg] = await Promise.all([
      prisma.user.count(),
      prisma.product.count(),
      prisma.order.count({ where: { hidden: false } }),
      prisma.product.findMany({ where: { estoque: { lte: 5 } }, take: 3, orderBy: { estoque: 'asc' } }),
      prisma.order.findMany({ where: { hidden: false }, take: 4, orderBy: { createdAt: 'desc' }, include: { user: { select: { name: true } } } }),
      prisma.financeiro.aggregate({ _sum: { valor: true }, where: { tipo: "ENTRADA" } }),
      prisma.financeiro.aggregate({ _sum: { valor: true }, where: { tipo: "SAIDA" } }),
    ]);

    usersCount = uCount;
    productsCount = pCount;
    ordersCount = oCount;
    lowStock = lStock;
    recentOrders = rOrders;
    entradasAgg = entAgg;
    saidasAgg = saiAgg;
  } catch (error) {
    console.error("Erro no Cockpit:", error);
  }
  
  const saldo = (entradasAgg._sum.valor || 0) - (saidasAgg._sum.valor || 0);

  return (
    <div className="space-y-8 pb-10 animate-[fadeIn_0.5s_ease-out]">
      
      {/* HEADER ESTATÍSTICO */}
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h1 className="text-3xl md:text-5xl font-display font-black uppercase italic tracking-tighter leading-none mb-2">
            COCKPIT <span className="text-neon-verde drop-shadow-[0_0_15px_#00FF33]">DRAGÃO</span>
          </h1>
          <div className="flex items-center gap-3">
             <div className="w-2 h-2 bg-neon-verde rounded-full animate-pulse shadow-[0_0_8px_#00FF33]"></div>
             <p className="text-white/40 font-bold uppercase tracking-[0.3em] text-[8px] md:text-[10px]">
                SISTEMA OPERACIONAL ESTÁVEL • MONITORAMENTO LIVE
             </p>
          </div>
        </div>

        <div className="flex items-center gap-4 bg-black/40 border border-white/5 px-6 py-3 rounded-2xl backdrop-blur-md">
           <div className="flex flex-col items-end">
              <span className="text-[7px] text-white/30 uppercase font-black tracking-widest">Latência do Banco</span>
              <span className="text-neon-verde font-mono text-[10px]">14ms <span className="text-[8px] opacity-50">FAST</span></span>
           </div>
           <div className="w-px h-8 bg-white/10"></div>
           <Activity size={20} className="text-neon-verde opacity-50" />
        </div>
      </header>

      {/* GRID DE MÉTRICAS FLASH */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        <MetricCard label="Fluxo de Caixa" value={BRL(saldo)} icon={Wallet} color="neon" />
        <MetricCard label="Pilotos Ativos" value={`${usersCount} Contas`} icon={Users} color="white" />
        <MetricCard label="Estoque Peças" value={`${productsCount} Itens`} icon={Package} color="white" />
        <MetricCard label="Vendas Totais" value={`${ordersCount} Pedidos`} icon={ShoppingCart} color="neon" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
         
         {/* COLUNA 1: GESTÃO TÁTICA */}
         <div className="lg:col-span-2 space-y-8">
            
            {/* TERMINAL DE COMANDOS CYBER (SURPRESA!) */}
            <section className="bg-black border-2 border-neon-verde/20 rounded-3xl p-1 overflow-hidden shadow-2xl">
               <div className="bg-neon-verde/5 px-6 py-2 border-b border-neon-verde/20 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                     <Terminal size={14} className="text-neon-verde" />
                     <span className="text-[9px] font-black uppercase tracking-widest text-neon-verde">Dragão Terminal v1.0.4</span>
                  </div>
                  <div className="flex gap-1.5">
                     <div className="w-2 h-2 rounded-full bg-red-500/30"></div>
                     <div className="w-2 h-2 rounded-full bg-yellow-500/30"></div>
                     <div className="w-2 h-2 rounded-full bg-neon-verde"></div>
                  </div>
               </div>
               <div className="p-6 font-mono text-[10px] md:text-[11px] space-y-2 max-h-[250px] overflow-y-auto custom-scrollbar">
                  <div className="text-neon-verde/40">[SYSTEM] Booting DragaoOS... OK</div>
                  <div className="text-neon-verde/40">[SQL] Connecting to Database... CONNECTED</div>
                  <div className="text-white/80"><span className="text-neon-verde font-bold">DRAGAO@OFICINA:~$</span> scanning_inventory --status-critical</div>
                  <div className="text-yellow-500 animate-pulse">[WARN] {lowStock.length} itens detectados abaixo do limite de segurança.</div>
                  {lowStock.map(p => (
                    <div key={p.id} className="text-white/60 ml-4">• {p.nome.toUpperCase()} - RESTANTE: {p.estoque} UN</div>
                  ))}
                  <div className="text-white/80 mt-4"><span className="text-neon-verde font-bold">DRAGAO@OFICINA:~$</span> show_latest_sales --limit 4</div>
                  {recentOrders.map(o => (
                    <div key={o.id} className="text-green-500/70 ml-4">
                      + R$ {o.total.toFixed(2)} | CLIENTE: {o.user?.name?.toUpperCase() || 'ANON'} | STATUS: {o.status}
                    </div>
                  ))}
                  <div className="flex gap-1 animate-pulse">
                     <span className="text-neon-verde font-bold">DRAGAO@OFICINA:~$</span>
                     <div className="w-2 h-4 bg-neon-verde"></div>
                  </div>
               </div>
            </section>

            {/* ATALHOS RÁPIDOS */}
            <section>
               <h2 className="text-[10px] font-black uppercase tracking-[0.3em] text-white/30 mb-4 flex items-center gap-2">
                  <ArrowRight size={14} className="text-neon-verde" /> Comandos Rápidos
               </h2>
               <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <Link href="/admin/produtos/novo" className="bg-aco-grad border-chrome p-4 rounded-2xl flex flex-col items-center gap-3 hover:bg-neon-verde hover:text-black transition-all group">
                     <PlusCircle className="group-hover:scale-110 transition-transform" />
                     <span className="text-[9px] font-black uppercase text-center">Nova Peça</span>
                  </Link>
                  <Link href="/admin/caixa" className="bg-aco-grad border-chrome p-4 rounded-2xl flex flex-col items-center gap-3 hover:bg-neon-verde hover:text-black transition-all group">
                     <Receipt className="group-hover:scale-110 transition-transform" />
                     <span className="text-[9px] font-black uppercase text-center">Lançar Caixa</span>
                  </Link>
                  <Link href="/admin/usuarios" className="bg-aco-grad border-chrome p-4 rounded-2xl flex flex-col items-center gap-3 hover:bg-neon-verde hover:text-black transition-all group">
                     <UserPlus className="group-hover:scale-110 transition-transform" />
                     <span className="text-[9px] font-black uppercase text-center">Gestão Pilotos</span>
                  </Link>
                  <Link href="/admin/pedidos" className="bg-aco-grad border-chrome p-4 rounded-2xl flex flex-col items-center gap-3 hover:bg-neon-verde hover:text-black transition-all group">
                     <ShoppingCart className="group-hover:scale-110 transition-transform" />
                     <span className="text-[9px] font-black uppercase text-center">Ver Vendas</span>
                  </Link>
               </div>
            </section>
         </div>

         {/* COLUNA 2: ALERTA DE REPOSIÇÃO (GAUGE) */}
         <div className="space-y-8">
            <section className="bg-aco-grad border-chrome rounded-[2.5rem] p-8 shadow-2xl relative overflow-hidden group">
               <div className="absolute top-0 right-0 w-32 h-32 bg-neon-verde/5 blur-3xl group-hover:bg-neon-verde/10 transition-all"></div>
               
               <div className="flex items-center gap-3 mb-8">
                  <div className="p-2 bg-red-500/10 rounded-lg">
                    <AlertTriangle size={20} className="text-red-500" />
                  </div>
                  <h2 className="text-xs font-black uppercase tracking-widest leading-none">Reposição Crítica</h2>
               </div>

               <div className="space-y-6">
                  {lowStock.map(p => (
                    <div key={p.id} className="space-y-2">
                       <div className="flex justify-between items-center text-[10px] font-black uppercase">
                          <span className="text-white/60 truncate max-w-[140px]">{p.nome}</span>
                          <span className="text-red-500">{p.estoque} UN</span>
                       </div>
                       <div className="h-1.5 bg-white/5 rounded-full overflow-hidden border border-white/5">
                          <div 
                            className="h-full bg-gradient-to-r from-red-600 to-orange-500 rounded-full" 
                            style={{ width: `${(p.estoque / 10) * 100}%` }}
                          />
                       </div>
                    </div>
                  ))}

                  <div className="pt-6 border-t border-white/5">
                     <p className="text-[9px] text-white/30 font-bold uppercase leading-relaxed italic tracking-tighter">
                        * Mantenha o estoque acima de 5 unidades para garantir a performance do catálogo ⚡
                     </p>
                  </div>
               </div>
            </section>

            {/* STATUS DO BANCO */}
            <div className="bg-black/40 border border-white/5 p-6 rounded-[2rem] flex flex-col gap-4">
                <div className="flex items-center justify-between">
                   <span className="text-[8px] font-black text-white/40 uppercase tracking-widest">Database Health</span>
                   <span className="text-[8px] font-black text-neon-verde uppercase">100% ONLINE</span>
                </div>
                <div className="grid grid-cols-4 gap-1">
                   {[...Array(12)].map((_, i) => (
                     <div key={i} className="h-3 bg-neon-verde/20 rounded-sm animate-pulse" style={{ animationDelay: `${i * 100}ms` }}></div>
                   ))}
                </div>
            </div>
         </div>

      </div>

    </div>
  );
}

function MetricCard({ label, value, icon: Icon, color }: { label: string, value: string, icon: any, color: 'neon' | 'white' }) {
  return (
    <div className="bg-aco-grad border-chrome rounded-[2rem] p-6 relative overflow-hidden group shadow-2xl hover:translate-y-[-2px] transition-all h-[160px] flex flex-col justify-between">
      {/* Background Glow */}
      <div className={cn(
        "absolute -top-10 -right-10 w-32 h-32 blur-[60px] rounded-full opacity-5 group-hover:opacity-10 transition-all",
        color === 'neon' ? 'bg-neon-verde' : 'bg-white'
      )}></div>
      
      {/* Icon Container */}
      <div className={cn(
        "w-12 h-12 rounded-2xl flex items-center justify-center border backdrop-blur-sm transition-all shadow-lg",
        color === 'neon' 
          ? 'bg-neon-verde/10 border-neon-verde/30 text-neon-verde shadow-neon/10' 
          : 'bg-white/5 border-white/10 text-white/60'
      )}>
        <Icon size={24} strokeWidth={1.5} />
      </div>

      <div className="space-y-1">
        <p className="text-white/30 font-black uppercase tracking-[0.2em] text-[8px] md:text-[9px] ml-1">{label}</p>
        <div className="text-2xl md:text-3xl font-display font-black uppercase italic tracking-tighter text-white drop-shadow-sm">
          {value}
        </div>
      </div>

      {/* Subtle Scanline Effect */}
      <div className="absolute inset-0 bg-scanline pointer-events-none opacity-[0.02]"></div>
    </div>
  );
}
