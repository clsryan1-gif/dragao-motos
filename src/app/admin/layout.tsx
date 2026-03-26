'use client';

import React from 'react';
import Link from 'next/link';
import { Package, ShoppingCart, LayoutDashboard, Database, ChevronLeft, Terminal, Shield, LayoutGrid } from "lucide-react";
import { cn } from "@/lib/utils";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = React.useState(true);
  const pathname = require('next/navigation').usePathname();
  const router = require('next/navigation').useRouter();

  const handleLogout = async (e: React.MouseEvent) => {
    e.preventDefault();
    await fetch('/api/auth/logout', { method: 'POST' });
    router.push('/');
  };

  return (
    <div className="min-h-screen bg-preto-profundo text-white flex flex-col md:flex-row relative">
      
      {/* Sidebar Cockpit */}
      <aside className={cn(
        "bg-black/80 backdrop-blur-xl border-r border-white/5 p-6 flex flex-col transition-all duration-500 z-50",
        isOpen ? "w-full md:w-72" : "w-20"
      )}>
        <div className="flex flex-col gap-8 h-full">
            <Link href="/" className="flex items-center gap-2 text-white/40 hover:text-neon-verde transition-all group">
                <ChevronLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
                <span className={cn("text-[10px] font-black uppercase tracking-widest", !isOpen && "hidden")}>Voltar para o Site</span>
            </Link>

            <div className="flex flex-col gap-2">
                <div className="flex items-center gap-3">
                   <div className="p-2 bg-neon-verde rounded-lg">
                      <Shield className="text-black" size={18} />
                   </div>
                   <div className={cn("flex flex-col", !isOpen && "hidden")}>
                      <h2 className="text-lg font-display font-black italic uppercase leading-none">ADMIN</h2>
                      <p className="text-[8px] text-white/40 uppercase tracking-[0.2em]">Cockpit de Operação</p>
                   </div>
                </div>
            </div>

            <nav className="flex flex-col gap-4 mt-8">
               <NavLink href="/admin" icon={LayoutDashboard} label="Resumo Tático" active={pathname === '/admin'} isOpen={isOpen} />
               <NavLink href="/admin/produtos" icon={Package} label="Estoque de Peças" active={pathname.startsWith('/admin/produtos')} isOpen={isOpen} />
               <NavLink href="/admin/pedidos" icon={ShoppingCart} label="Vendas Live" active={pathname.startsWith('/admin/pedidos')} isOpen={isOpen} />
               <NavLink href="/galeria" icon={LayoutGrid} label="Gestão de Galeria" active={pathname === '/galeria'} isOpen={isOpen} />
            </nav>

            <div className="mt-auto pt-8 border-t border-white/5">
                <div className={cn("flex flex-col gap-1", !isOpen && "hidden")}>
                    <p className="text-[8px] text-white/20 uppercase font-black">Sistema Dragão 1.0</p>
                    <div className="flex items-center gap-1.5">
                       <div className="w-1.5 h-1.5 bg-neon-verde rounded-full animate-pulse"></div>
                       <span className="text-[7px] text-neon-verde uppercase font-bold">Autenticado ✔</span>
                    </div>
                </div>

                <button 
                  onClick={handleLogout}
                  className="mt-4 flex items-center gap-3 p-3 w-full rounded-xl bg-red-500/10 border border-red-500/20 text-red-500 hover:bg-red-500 hover:text-white transition-all group"
                >
                  <Shield size={16} className="group-hover:rotate-12 transition-transform" />
                  {isOpen && <span className="text-[9px] font-black uppercase tracking-widest">Encerrar Sessão</span>}
                </button>
            </div>
        </div>
      </aside>

      {/* Conteúdo Principal */}
      <main className="flex-1 relative overflow-x-hidden p-6 md:p-12">
        {/* Radar Background Effects */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-neon-verde/5 rounded-full blur-[150px] -z-10 pointer-events-none"></div>
        {children}
      </main>
    </div>
  );
}

function NavLink({ href, icon: Icon, label, active, isOpen }: any) {
  return (
    <Link href={href} className={cn(
      "flex items-center gap-4 p-4 rounded-xl transition-all group relative overflow-hidden",
      active ? "bg-neon-verde/10 border border-neon-verde/20 text-neon-verde shadow-neon" : "hover:bg-white/5 text-white/50 hover:text-white"
    )}>
      {active && <div className="absolute left-0 top-0 w-1 h-full bg-neon-verde shadow-[0_0_10px_#00FF33]"></div>}
      <Icon size={20} className={cn("shrink-0 transition-transform group-hover:scale-110", active && "text-neon-verde")} />
      {isOpen && <span className="font-black uppercase tracking-widest text-[9px] md:text-[10px]">{label}</span>}
    </Link>
  );
}
