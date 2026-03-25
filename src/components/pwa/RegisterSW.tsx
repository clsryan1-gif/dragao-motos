'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

export default function RegisterSW() {
  const pathname = usePathname();

  useEffect(() => {
    if ('serviceWorker' in navigator) {
      const register = () => {
        navigator.serviceWorker.register('/sw.js').then((reg) => {
          console.log('Dragão PWA: SW pronto!', reg.scope);
        }).catch((err) => {
          console.log('Dragão PWA: Erro no registro!', err);
        });
      };

      if (document.readyState === 'complete') {
        register();
      } else {
        window.addEventListener('load', register);
      }
    }
  }, [pathname]);

  return null;
}
