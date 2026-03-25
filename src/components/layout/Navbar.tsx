'use client';

import React from 'react';
import { Button } from '@/components/ui/Button';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import Link from 'next/link';

export function Navbar() {
  const [isScrolled, setIsScrolled] = React.useState(false);

  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Início', href: '/#hero' },
    { name: 'Galeria', href: '/#galeria' },
    { name: 'FAQ', href: '/#faq' },
    { name: 'Agendamento', href: '/agendamento' },
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
            <Link href="/agendamento" className="hidden md:block">
              <Button variant="neon" size="sm">
                Agendar Agora
              </Button>
            </Link>
        </div>
        
        {/* No mobile, o BottomNav substitui o menu hambúrguer */}
        <div className="md:hidden">
          <Link href="/agendamento">
            <Button variant="neon" size="md" className="px-4 py-2 text-[12px]">
              AGENDAR
            </Button>
          </Link>
        </div>
      </div>

    </nav>
  );
}
