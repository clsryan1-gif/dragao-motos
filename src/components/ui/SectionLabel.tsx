import React from 'react';
import { cn } from '@/lib/utils';

export function SectionLabel({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={cn('inline-flex items-center gap-2 mb-2 md:mb-4', className)}>
      <div className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-neon-verde shadow-[var(--shadow-neon)] animate-pulse" />
      <span className="font-display tracking-[0.2em] text-neon-verde uppercase text-sm md:text-lg">
        {children}
      </span>
    </div>
  );
}
