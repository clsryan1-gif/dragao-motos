import * as React from 'react';
import { cn } from '@/lib/utils';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'neon' | 'dark' | 'outline';
  size?: 'sm' | 'md' | 'lg';
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'neon', size = 'md', ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          'inline-flex items-center justify-center rounded-sm font-sans font-bold uppercase tracking-wider transition-all duration-300 outline-none focus-visible:ring-2 focus-visible:ring-neon-verde',
          // Size
          size === 'sm' && 'px-3 py-1.5 md:px-4 md:py-2 text-xs',
          size === 'md' && 'px-4 py-2 md:px-6 md:py-3 text-sm',
          size === 'lg' && 'px-6 py-3 md:px-10 md:py-4 text-sm md:text-base',
          // Variants
          variant === 'neon' && 'bg-neon-verde text-preto-profundo shadow-[var(--shadow-neon)] hover:shadow-[var(--shadow-neon-hover)] hover:scale-[1.02] active:scale-[0.98]',
          variant === 'dark' && 'bg-grafite text-white hover:bg-grafite-claro border border-grafite-claro shadow-lg active:scale-[0.98]',
          variant === 'outline' && 'border-2 border-neon-verde text-neon-verde hover:bg-neon-verde/10 active:scale-[0.98]',
          className
        )}
        {...props}
      />
    );
  }
);
Button.displayName = 'Button';

export { Button };
