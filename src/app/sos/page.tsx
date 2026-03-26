'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function SOSPage() {
  const router = useRouter();

  useEffect(() => {
    router.replace('/#sos');
  }, [router]);

  return (
    <div className="min-h-screen bg-preto-profundo flex items-center justify-center">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-neon-verde"></div>
    </div>
  );
}
