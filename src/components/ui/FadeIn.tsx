'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';

interface FadeInProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}

export function FadeIn({ children, className, delay = 0 }: FadeInProps) {
  const [isVisible, setIsVisible] = React.useState(false);
  const domRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    // Fallback: se o IntersectionObserver não existir ou não disparar, mostramos após um tempo
    const fallbackTimeout = setTimeout(() => {
      setIsVisible(true);
    }, delay + 2000); // 2 segundos de margem após o delay esperado

    if (typeof window === 'undefined' || !window.IntersectionObserver) {
      setIsVisible(true);
      clearTimeout(fallbackTimeout);
      return;
    }

    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          // Uma vez visível, não precisamos mais observar nem do fallback
          if (domRef.current) observer.unobserve(domRef.current);
          clearTimeout(fallbackTimeout);
        }
      });
    }, { threshold: 0.1 });
    
    const { current } = domRef;
    if (current) observer.observe(current);
    
    return () => {
      if (current) observer.unobserve(current);
      clearTimeout(fallbackTimeout);
    };
  }, [delay]);

  return (
    <div
      ref={domRef}
      className={cn(
        'transition-all duration-300 ease-out transform',
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10',
        className
      )}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}
