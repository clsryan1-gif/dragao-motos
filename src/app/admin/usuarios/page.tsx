import { prisma } from "@/lib/prisma";
import { Users, User as UserIcon, Calendar, Phone, Mail, Shield, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import UserActions from "./UserActions";

export const dynamic = 'force-dynamic';

export default async function UsuariosPage() {
  const users = await prisma.user.findMany({
    orderBy: { createdAt: 'desc' },
    include: { _count: { select: { orders: true } } }
  });

  return (
    <div className="space-y-8 pb-10 animate-[fadeIn_0.5s_ease-out]">
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h1 className="text-3xl md:text-5xl font-display font-black uppercase italic tracking-tighter leading-none mb-2">
            GESTÃO DE <span className="text-neon-verde drop-shadow-[0_0_15px_#00FF33]">PILOTOS</span>
          </h1>
          <p className="text-white/40 font-bold uppercase tracking-[0.3em] text-[8px] md:text-[10px] ml-1">
            CONTROLE TOTAL DE ACESSO AO QG
          </p>
        </div>
        
        <Link href="/admin" className="bg-black/40 border border-white/5 px-6 py-3 rounded-2xl backdrop-blur-md flex items-center gap-4 hover:border-neon-verde/30 transition-all group">
          <ArrowLeft className="text-white/40 group-hover:text-neon-verde" size={20} />
          <div className="flex flex-col">
            <span className="text-[10px] font-black text-white uppercase tracking-widest">{users.length} PILOTOS</span>
            <span className="text-[8px] text-white/30 uppercase tracking-widest">VOLTAR AO COCKPIT</span>
          </div>
        </Link>
      </header>

      <div className="bg-aco-grad border-chrome rounded-[2.5rem] overflow-hidden shadow-2xl overflow-x-auto">
        <table className="w-full text-left border-collapse min-w-[800px]">
          <thead>
            <tr className="border-b border-white/5 bg-white/5">
              <th className="px-6 py-5 text-[10px] font-black uppercase tracking-[0.2em] text-white/40">Piloto</th>
              <th className="px-6 py-5 text-[10px] font-black uppercase tracking-[0.2em] text-white/40">Identificador</th>
              <th className="px-6 py-5 text-[10px] font-black uppercase tracking-[0.2em] text-white/40">Cargo</th>
              <th className="px-6 py-5 text-[10px] font-black uppercase tracking-[0.2em] text-white/40">Pedidos</th>
              <th className="px-6 py-5 text-[10px] font-black uppercase tracking-[0.2em] text-white/40">Ingresso</th>
              <th className="px-6 py-5 text-[10px] font-black uppercase tracking-[0.2em] text-white/40 text-right">Ações</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {users.map((user) => (
              <tr key={user.id} className="hover:bg-white/[0.02] transition-colors group">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white/20 group-hover:border-neon-verde/30 group-hover:text-neon-verde transition-all">
                      <UserIcon size={20} />
                    </div>
                    <div>
                      <p className="text-sm font-bold uppercase tracking-wider text-white">{user.name}</p>
                      <p className="text-[9px] font-medium text-white/20 uppercase tracking-widest leading-none mt-1">{user.id.slice(0, 8)}</p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 text-white/40">
                      <Phone size={12} className="text-neon-verde/40" />
                      <span className="text-[10px] font-bold tracking-widest">{user.phone || '---'}</span>
                    </div>
                    <div className="flex items-center gap-2 text-white/40">
                      <Mail size={12} className="text-neon-verde/40" />
                      <span className="text-[10px] font-bold lowercase tracking-wider">{user.email}</span>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className={cn(
                    "px-3 py-1 rounded-full text-[8px] font-black uppercase tracking-widest border",
                    user.role === 'ADMIN' 
                      ? "bg-neon-verde/10 border-neon-verde/30 text-neon-verde shadow-[0_0_10px_rgba(0,255,51,0.1)]" 
                      : "bg-white/5 border-white/10 text-white/40"
                  )}>
                    {user.role}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="text-sm font-mono text-white/60">
                    {user._count.orders.toString().padStart(2, '0')}
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2 text-white/40">
                    <Calendar size={12} />
                    <span className="text-[10px] font-medium">{new Date(user.createdAt).toLocaleDateString('pt-BR')}</span>
                  </div>
                </td>
                <td className="px-6 py-4">
                   <UserActions userId={user.id} currentRole={user.role} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-8 p-6 bg-black/40 border border-white/5 rounded-[2rem] flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-4">
           <div className="w-12 h-12 rounded-2xl bg-neon-verde/10 flex items-center justify-center text-neon-verde">
              <Shield size={24} />
           </div>
           <div>
              <h3 className="text-xs font-black uppercase tracking-widest text-white">Segurança de Dados</h3>
              <p className="text-[10px] text-white/30 uppercase tracking-wider font-medium">Todas as credenciais são criptografadas via Dragão-Protocol</p>
           </div>
        </div>
        <Link href="/admin" className="px-6 py-3 bg-white/5 border border-white/10 rounded-xl text-white text-[10px] font-black uppercase tracking-[0.2em] hover:bg-white/10 transition-all">
          Voltar ao Cockpit
        </Link>
      </div>
    </div>
  );
}
