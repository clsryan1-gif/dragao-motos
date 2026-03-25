import React from 'react';
import { Button } from '@/components/ui/Button';
import { CONTACT_INFO } from '@/lib/constants';

export function Footer() {
  return (
    <footer id="contato" className="bg-preto-asfalto border-t border-grafite-claro pt-10 md:pt-20 pb-6 md:pb-10 px-6 md:px-12">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between gap-12 mb-8 md:mb-16">
        <div className="md:max-w-sm">
          <a href="#hero" className="inline-block hover:scale-105 transition-transform">
            <div className="text-neon-verde font-display text-5xl font-bold italic tracking-tighter mb-6">
              DRAGÃO<span className="text-white">MOTOS</span>
            </div>
          </a>
          <p className="font-sans text-white/60 mb-8 leading-relaxed">
            Mais que uma oficina, somos parceiros de quem vive e respira a estrada. 
            Compromisso com cada quilômetro que você percorre.
          </p>
          <div className="flex gap-4">
            {/* Ícones sociais - Áreas de clique aumentadas para UX mobile (mín 44x44px) */}
            <a 
              href={CONTACT_INFO.whatsapp} 
              target="_blank" 
              rel="noopener noreferrer"
              className="w-12 h-12 rounded-sm bg-grafite flex items-center justify-center text-white hover:text-neon-verde border border-grafite-claro transition-colors"
              aria-label="WhatsApp"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
            </a>
            <a 
              href={CONTACT_INFO.instagram} 
              target="_blank" 
              rel="noopener noreferrer"
              className="w-12 h-12 rounded-sm bg-grafite flex items-center justify-center text-white hover:text-neon-verde border border-grafite-claro transition-colors"
              aria-label="Instagram"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
            </a>
          </div>
        </div>

        <div>
          <h4 className="font-display text-2xl font-bold text-white mb-6 uppercase tracking-wider">Horário de Funcionamento</h4>
          <ul className="space-y-3 font-sans text-white/60">
            <li className="flex justify-between gap-8"><span>Segunda - Sexta:</span> <span className="text-white">{CONTACT_INFO.opening_hours.week}</span></li>
            <li className="flex justify-between gap-8"><span>Sábado:</span> <span className="text-white">{CONTACT_INFO.opening_hours.saturday}</span></li>
            <li className="flex justify-between gap-8 text-neon-verde"><span>Domingo:</span> <span>{CONTACT_INFO.opening_hours.sunday}</span></li>
          </ul>
        </div>

        <div>
          <h4 className="font-display text-2xl font-bold text-white mb-6 uppercase tracking-wider">Onde Estamos</h4>
          <p className="font-sans text-white/60 mb-4 leading-relaxed">
            {CONTACT_INFO.address}<br />
            CEP: {CONTACT_INFO.cep}
          </p>
          <a href="https://www.google.com/maps/search/oficina+de+motos" target="_blank" rel="noopener noreferrer">
            <Button variant="outline" size="sm" className="w-full h-11">Ver no Google Maps</Button>
          </a>
        </div>
      </div>

      <div className="max-w-7xl mx-auto border-t border-grafite pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-sans text-white/40 uppercase tracking-widest text-center md:text-left">
        <p>&copy; {new Date().getFullYear()} Dragão Motos. Todos os direitos reservados.</p>
        <p>Desenvolvido com Fogo por Richard G Studios</p>
      </div>

    </footer>
  );
}
