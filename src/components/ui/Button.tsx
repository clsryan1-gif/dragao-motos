import * as React from 'react';
import { cn } from '@/lib/utils';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'neon' | 'dark' | 'outline' | 'sos' | 'cyber';
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'neon', size = 'md', ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          'relative inline-flex items-center justify-center font-display font-black uppercase tracking-[0.2em] transition-all duration-500 outline-none isolate group overflow-hidden',
          // Shape & Skew
          'skew-x-[-15deg] active:skew-x-[-5deg]',
          
          // Size
          size === 'sm' && 'px-4 py-2 text-[10px]',
          size === 'md' && 'px-6 py-3 text-xs',
          size === 'lg' && 'px-10 py-5 text-sm md:text-base',
          size === 'xl' && 'px-12 py-7 text-lg md:text-xl',

          // Common Animations
          'hover:scale-[1.05] active:scale-[0.95]',

          // Variants
          variant === 'neon' && [
            'bg-neon-verde text-preto-profundo border-none',
            'shadow-[0_0_20px_rgba(0,255,0,0.3)] hover:shadow-[0_0_40px_rgba(0,255,0,0.6)]',
            'before:absolute before:inset-0 before:bg-white/20 before:translate-x-[-100%] hover:before:translate-x-[100%] before:transition-transform before:duration-700 before:skew-x-[45deg]'
          ],
          
          variant === 'sos' && [
            'bg-red-600 text-white border-2 border-white/20',
            'shadow-[0_0_30px_rgba(220,38,38,0.4)] hover:shadow-[0_0_50px_rgba(220,38,38,0.8)]',
            'animate-pulse hover:animate-none'
          ],

          variant === 'outline' && [
            'bg-transparent text-neon-verde border-2 border-neon-verde/50',
            'hover:bg-neon-verde hover:text-preto-profundo hover:border-neon-verde shadow-none hover:shadow-[0_0_30px_rgba(0,255,0,0.4)]'
          ],

          variant === 'cyber' && [
             'bg-grafite text-white border border-white/10',
             'hover:border-neon-verde hover:text-neon-verde'
          ],

          className
        )}
        {...props}
      >
        <span className="skew-x-[15deg] flex items-center gap-2">
          {props.children}
        </span>
      </button>
    );
  }
);
Button.displayName = 'Button';

export { Button };
