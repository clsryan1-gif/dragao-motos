import { prisma } from "@/lib/prisma";
import { Wallet, TrendingUp, TrendingDown, Clock, Receipt, DollarSign, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import CaixaForm from "./CaixaForm";

const BRL = (v: number) => v.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
export const dynamic = 'force-dynamic';

export default async function CaixaPage() {
  const transacoes = await prisma.financeiro.findMany({
    orderBy: { data: 'desc' },
    take: 50
  });

  const totais = await prisma.financeiro.aggregate({
    _sum: { valor: true },
    where: { tipo: "ENTRADA" }
  });

  const saidas = await prisma.financeiro.aggregate({
    _sum: { valor: true },
    where: { tipo: "SAIDA" }
  });

  const totalEntradas = totais._sum.valor || 0;
  const totalSaidas = saidas._sum.valor || 0;
  const saldo = totalEntradas - totalSaidas;

  return (
    <div className="space-y-8 pb-10 animate-[fadeIn_0.5s_ease-out]">
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h1 className="text-3xl md:text-5xl font-display font-black uppercase italic tracking-tighter leading-none mb-2">
            FLUXO DE <span className="text-neon-verde drop-shadow-[0_0_15px_#00FF33]">CAIXA</span>
          </h1>
          <p className="text-white/40 font-bold uppercase tracking-[0.3em] text-[8px] md:text-[10px] ml-1">
            CONTROLE FINANCEIRO E LANÇAMENTOS
          </p>
        </div>
        
        <Link href="/admin" className="bg-black/40 border border-white/5 px-6 py-3 rounded-2xl backdrop-blur-md flex items-center gap-4 hover:border-neon-verde/30 transition-all group">
          <ArrowLeft className="text-white/40 group-hover:text-neon-verde" size={20} />
          <span className="text-[10px] font-black text-white/40 group-hover:text-white uppercase tracking-widest leading-none">Voltar ao Cockpit</span>
        </Link>
      </header>

      {/* SUMÁRIO FINANCEIRO RÁPIDO */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-aco-grad border-chrome p-6 rounded-[2rem] shadow-xl relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-24 h-24 bg-neon-verde/5 blur-3xl"></div>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-neon-verde/10 border border-neon-verde/20 flex items-center justify-center text-neon-verde">
              <DollarSign size={20} />
            </div>
            <span className="text-[10px] font-black uppercase text-white/40 tracking-widest">Saldo Atual</span>
          </div>
          <p className="text-3xl font-display font-black italic text-neon-verde drop-shadow-[0_0_10px_rgba(0,255,51,0.2)]">{BRL(saldo)}</p>
        </div>

        <div className="bg-aco-grad border-chrome p-6 rounded-[2rem] shadow-xl relative overflow-hidden group">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-green-500/10 border border-green-500/20 flex items-center justify-center text-green-500">
              <TrendingUp size={20} />
            </div>
            <span className="text-[10px] font-black uppercase text-white/40 tracking-widest text-green-500/60">Total de Entradas</span>
          </div>
          <p className="text-3xl font-display font-black italic text-white/80">{BRL(totalEntradas)}</p>
        </div>

        <div className="bg-aco-grad border-chrome p-6 rounded-[2rem] shadow-xl relative overflow-hidden group">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-red-500/10 border border-red-500/20 flex items-center justify-center text-red-500">
              <TrendingDown size={20} />
            </div>
            <span className="text-[10px] font-black uppercase text-white/40 tracking-widest text-red-500/60">Total de Saídas</span>
          </div>
          <p className="text-3xl font-display font-black italic text-white/80">{BRL(totalSaidas)}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* LISTAGEM DE TRANSAÇÕES */}
        <div className="lg:col-span-2">
          <div className="bg-aco-grad border-chrome rounded-[2.5rem] overflow-hidden shadow-2xl">
            <div className="px-8 py-6 border-b border-white/5 bg-white/5 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Clock className="text-white/40" size={18} />
                <h2 className="text-xs font-black uppercase tracking-widest text-white">Últimos Lançamentos</h2>
              </div>
              <span className="px-3 py-1 bg-black/40 rounded-full text-[8px] font-black tracking-widest text-white/30 border border-white/5 uppercase italic">Resumo Live</span>
            </div>
            <div className="max-h-[500px] overflow-y-auto custom-scrollbar">
              <table className="w-full text-left border-collapse">
                <tbody className="divide-y divide-white/5">
                  {transacoes.map((t) => (
                    <tr key={t.id} className="hover:bg-white/[0.02] transition-colors group">
                      <td className="px-8 py-5">
                        <div className="flex items-center gap-4">
                          <div className={cn(
                            "w-1.5 h-10 rounded-full",
                            t.tipo === 'ENTRADA' ? "bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.3)]" : "bg-red-500 shadow-[0_0_10px_rgba(239,68,68,0.3)]"
                          )}></div>
                          <div>
                            <p className="text-sm font-bold text-white uppercase tracking-tight leading-none mb-1.5">{t.descricao.toUpperCase()}</p>
                            <p className="text-[9px] font-black text-white/20 uppercase tracking-widest italic">{t.categoria}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-8 py-5">
                        <div className="text-right flex flex-col items-end">
                          <p className={cn(
                            "text-sm font-display font-black italic leading-none mb-1.5",
                            t.tipo === 'ENTRADA' ? "text-green-500" : "text-red-500"
                          )}>
                            {t.tipo === 'ENTRADA' ? '+' : '-'} {BRL(t.valor)}
                          </p>
                          <p className="text-[9px] font-medium text-white/20 uppercase tracking-widest">
                            {new Date(t.data).toLocaleDateString('pt-BR')}
                          </p>
                        </div>
                      </td>
                    </tr>
                  ))}
                  {transacoes.length === 0 && (
                    <tr>
                      <td colSpan={2} className="px-8 py-20 text-center text-white/20 text-[10px] font-black uppercase tracking-widest">
                        Nenhum lançamento detectado no sistema
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* FORMULÁRIO DE LANÇAMENTO (BOTÃO COM VIDA!) */}
        <div className="space-y-6">
           <CaixaForm />

           <div className="bg-black/40 border border-white/5 p-6 rounded-[2rem] flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white/30">
                 <Receipt size={20} />
              </div>
              <p className="text-[8px] font-black text-white/30 uppercase tracking-[0.2em] leading-relaxed">
                 * Todos os lançamentos são auditados e gravados permanentemente no registro de atividades.
              </p>
           </div>
        </div>
      </div>
    </div>
  );
}

           <div className="bg-black/40 border border-white/5 p-6 rounded-[2rem] flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white/30">
                 <Receipt size={20} />
              </div>
              <p className="text-[8px] font-black text-white/30 uppercase tracking-[0.2em] leading-relaxed">
                 * Todos os lançamentos são auditados e gravados permanentemente no registro de atividades.
              </p>
           </div>
        </div>
      </div>
    </div>
  );
}
