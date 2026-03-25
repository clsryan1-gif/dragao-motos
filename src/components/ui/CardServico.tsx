import React from 'react';
import Image from 'next/image';
import { LucideIcon } from 'lucide-react';

interface CardProps {
  title: string;
  description: string;
  imageSrc?: string;
  icon?: LucideIcon;
  iconColor?: string;
}

export function CardServico({ title, description, imageSrc, icon: Icon, iconColor }: CardProps) {
  return (
    <div className="group relative overflow-hidden bg-grafite/40 border border-grafite-claro/30 p-6 md:p-8 transition-all duration-500 hover:border-neon-verde/50 hover:bg-grafite/60 h-full backdrop-blur-sm">
      {/* Ícone ou Imagem */}
      <div className="mb-6">
        {Icon ? (
          <div className={`transition-colors duration-500 ${iconColor || 'text-white/40 group-hover:text-white'}`}>
            <Icon size={32} strokeWidth={1.5} />
          </div>
        ) : imageSrc ? (
          <div className="relative h-[200px] w-full overflow-hidden mb-4">
            <Image 
              src={imageSrc} 
              alt={title} 
              fill 
              className="object-cover transition-transform duration-700 group-hover:scale-110 grayscale group-hover:grayscale-0"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
            />
          </div>
        ) : null}
      </div>
      
      <div className="relative z-10 w-full transform transition-transform duration-500 group-hover:-translate-y-1">
        <h3 className="font-display text-xl md:text-2xl font-bold text-white mb-3 uppercase tracking-wider">{title}</h3>
        <p className="font-sans text-white/60 text-sm leading-relaxed max-w-[90%] group-hover:text-white/80 transition-colors">
          {description}
        </p>
      </div>

      {/* Linha Fina de Luz inferior que surge no Hover */}
      <div className="absolute bottom-0 left-0 h-[2px] w-0 bg-neon-verde transition-all duration-500 group-hover:w-full" />
    </div>
  );
}
