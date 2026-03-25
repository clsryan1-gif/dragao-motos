import React from 'react';

export function Diferenciais() {
  const diferenciais = [
    {
      title: "Peças Originais",
      description: "Garantia de qualidade e durabilidade com componentes certificados.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10"/></svg>
      )
    },
    {
      title: "Entrega no Prazo",
      description: "Sua moto pronta quando prometemos. Sem atrasos, sem desculpas.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
      )
    },
    {
      title: "Transparência",
      description: "Acompanhe o que está sendo feito com fotos e vídeos do processo.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/></svg>
      )
    },
    {
      title: "Experiência",
      description: "Mecânicos certificados com anos de pista e oficina.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/></svg>
      )
    }
  ];

  return (
    <section id="diferenciais" className="py-6 md:py-24 px-6 md:px-12 bg-preto-asfalto">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8">
        {diferenciais.map((item, index) => (
          <div key={index} className="p-6 md:p-8 bg-grafite border border-grafite-claro rounded-sm hover:border-neon-verde/30 transition-colors group">
            <div className="text-neon-verde mb-4 group-hover:scale-110 transition-transform">
              {item.icon}
            </div>
            <h3 className="font-display text-xl md:text-2xl font-bold text-white mb-2 uppercase italic">{item.title}</h3>
            <p className="font-sans text-sm text-white/60">{item.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
