'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Bike, Calendar, MessageSquare } from 'lucide-react';
import { cn } from '@/lib/utils';

const navItems = [
  { name: 'Início', href: '/', icon: Home },
  { name: 'Galeria', href: '/#galeria', icon: Bike },
  { name: 'Agendar', href: '/agendamento', icon: Calendar },
  { name: 'SOS', href: '/#sos', icon: MessageSquare, color: 'text-neon-verde' },
];

export function BottomNav() {
  const pathname = usePathname();

  return (
    <nav 
      className="fixed bottom-0 left-0 right-0 z-50 md:hidden bg-preto-profundo/90 backdrop-blur-lg border-t border-grafite-claro"
      style={{ paddingBottom: 'calc(4px + env(safe-area-inset-bottom))' }}
    >
      <div className="flex justify-around items-center h-16 px-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href || (item.href.startsWith('/#') && pathname === '/');
          
          return (
            <Link 
              key={item.name} 
              href={item.href}
              className="flex flex-col items-center justify-center gap-1 w-full h-full group active:scale-95 transition-transform"
            >
              <div className={cn(
                "p-1 rounded-lg transition-all duration-300",
                isActive ? "bg-neon-verde/10 text-neon-verde" : "text-white/40 group-hover:text-white/60"
              )}>
                <Icon size={24} strokeWidth={isActive ? 2.5 : 2} />
              </div>
              <span className={cn(
                "text-[10px] font-bold uppercase tracking-widest transition-colors",
                isActive ? "text-neon-verde" : "text-white/40 group-hover:text-white/60"
              )}>
                {item.name}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
