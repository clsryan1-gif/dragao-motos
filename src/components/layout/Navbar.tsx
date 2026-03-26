'use client';

import React from 'react';
import { Button } from '@/components/ui/Button';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import Link from 'next/link';
import { LogOut } from 'lucide-react';
import { useRouter } from 'next/navigation';

export function Navbar() {
  const router = useRouter();
  const [isScrolled, setIsScrolled] = React.useState(false);
  const [user, setUser] = React.useState<{ name: string; role: string } | null>(null);

  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  React.useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch(`/api/auth/me?t=${Date.now()}`, { cache: 'no-store' });
        if (res.ok) {
          const data = await res.json();
          if (data.authenticated && data.user) {
            setUser(data.user);
          }
        }
      } catch (error) {
        console.error("Failed to fetch user:", error);
      }
    };
    fetchUser();
  }, []);

  const handleLogout = async () => {
    try {
      const res = await fetch('/api/auth/logout', { method: 'POST' });
      if (res.ok) {
        setUser(null);
        router.push('/login');
        router.refresh();
      }
    } catch (error) {
      console.error("Erro ao deslogar:", error);
    }
  };

  const navLinks = [
    { name: 'Início', href: '/' },
    { name: 'Peças', href: '/produtos' },
    { name: 'Serviços', href: '/servicos' },
    { name: 'Galeria', href: '/galeria' },
    { name: 'FAQ', href: '/#faq' },
  ];

  return (
    <nav
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-6 py-4 md:px-12',
        isScrolled ? 'bg-preto-profundo/95 backdrop-blur-md py-3 shadow-lg border-b border-grafite-claro' : 'bg-transparent'
      )}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-2">
          {/* Logo Oficial - Dragão DM */}
          <Link href="/" className="relative h-12 w-32 md:h-14 md:w-40 hover:scale-105 transition-transform block">
            <Image 
              src="/images/logo/logo.png" 
              alt="Dragão Motos" 
              fill
              className="object-contain"
              priority
              sizes="(max-width: 768px) 128px, 160px"
            />
          </Link>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8 text-sm font-sans font-bold uppercase tracking-widest text-white/70">
          {navLinks.map((link) => (
            <Link key={link.name} href={link.href} className="hover:text-neon-verde transition-colors">
              {link.name}
            </Link>
          ))}
        </div>

        <div className="hidden md:flex items-center gap-4">
            {user ? (
              <div className="flex items-center">
                <Link href={user.role === 'ADMIN' ? '/admin' : '/perfil'} className="text-sm font-bold uppercase tracking-widest text-white/40 hover:text-white transition-colors mr-4 group">
                  {user.role === 'ADMIN' ? (
                    <span className="text-neon-verde group-hover:glow-neon">QG ADMIN</span>
                  ) : (
                    <span>{user.name.split(' ')[0]}</span>
                  )}
                </Link>
                <button 
                  onClick={handleLogout}
                  className="p-2 text-white/40 hover:text-red-500 transition-colors group relative"
                  title="Sair do QG"
                >
                  <LogOut size={18} />
                  <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 bg-black/80 px-2 py-1 rounded text-[8px] opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap border border-white/10">SAIR DO QG</span>
                </button>
              </div>
            ) : (
              <Link href="/login" className="text-sm font-bold uppercase tracking-widest text-white/40 hover:text-white transition-colors mr-4">
                Entrar
              </Link>
            )}
            <Link href="/agendamento" className="hidden md:block">
              <Button variant="neon" size="sm">
                Agendar Agora
              </Button>
            </Link>
        </div>
        
        {/* No mobile, o BottomNav substitui o menu hambúrguer */}
        <div className="md:hidden flex items-center gap-4">
            {user ? (
              <div className="flex items-center gap-3">
                <Link href={user.role === 'ADMIN' ? '/admin' : '/perfil'} className="text-[10px] font-bold uppercase tracking-widest text-white/60 hover:text-white transition-colors group">
                  {user.role === 'ADMIN' ? (
                    <span className="text-neon-verde group-hover:glow-neon">ADMIN</span>
                  ) : (
                    <span>{user.name.split(' ')[0]}</span>
                  )}
                </Link>
                <button onClick={handleLogout} className="text-white/40 hover:text-red-500 transition-colors">
                  <LogOut size={16} />
                </button>
              </div>
            ) : (
              <Link href="/login" className="text-[10px] font-bold uppercase tracking-widest text-white/60 hover:text-white transition-colors">
                Entrar
              </Link>
            )}
          <Link href="/agendamento">
            <Button variant="neon" size="md" className="px-3 py-1.5 text-[10px]">
              AGENDAR
            </Button>
          </Link>
        </div>
      </div>

    </nav>
  );
}
