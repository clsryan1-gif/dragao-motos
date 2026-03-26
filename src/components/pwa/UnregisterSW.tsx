'use client';

import { useEffect } from 'react';

export default function UnregisterSW() {
  useEffect(() => {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.getRegistrations().then((registrations) => {
        for (const registration of registrations) {
          registration.unregister().then((success) => {
            if (success) {
              console.log('Dragão PWA: Service Worker desregistrado com sucesso.');
            }
          });
        }
      });

      // Limpar todos os caches para evitar dados obsoletos (bugs de memória/cache)
      if ('caches' in window) {
        caches.keys().then((names) => {
          for (const name of names) {
            caches.delete(name).then(() => {
              console.log(`Dragão PWA: Cache ${name} removido.`);
            });
          }
        });
      }
    }
  }, []);

  return null;
}
