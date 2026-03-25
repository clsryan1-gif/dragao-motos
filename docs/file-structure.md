# Estrutura de Arquivos — Dragão Motos
### Landing Page PWA · Alta Performance & Vibe Coding
**Versão 1.0 · Março 2026 · Richard G Studios**

---

## STACK COMPLETA

| Tecnologia | Versão | Uso principal |
|---|---|---|
| **Next.js** | 16.1+ | Framework, App Router, SSR/SSG. |
| **React** | 19.x | UI Library. |
| **TypeScript** | 5.7+ | Tipagem forte para escalar sem bugs. |
| **Tailwind CSS** | ^4.0 | Estilização utilitária (CSS-first, configurado no `globals.css`). |
| **next-pwa** | ^5.6.0 | Transforma a LP em um aplicativo instalável (PWA). |
| **Framer Motion** | latest | Efeitos de glow, parallax e fading. |
| **Lucide React** | latest | Ícones vetoriais. |
| **clsx + tailwind-merge** | latest | Combinação dinâmica de classes (utilitário `cn()`). |

### Comandos de Instalação (Fase 1)

```bash
# Setup base do Next.js 16 (sem ESLint para Vibe Coding fluido)
npx -y create-next-app@latest ./ --typescript --tailwind --app --src-dir --import-alias "@/*" --no-eslint

# Dependências de UI, Animação e PWA
npm install framer-motion lucide-react clsx tailwind-merge next-pwa
npm install -D @tailwindcss/postcss
```

---

## ÁRVORE DE ARQUIVOS PROGRESSIVA

A arquitetura do projeto separa claramente dados, componentes estruturais (seções) e componentes visuais genéricos (UI).

```text
dragao-motos/
├── public/
│   ├── images/
│   │   ├── hero/                 # Backgrounds e Moto Principal
│   │   ├── servicos/             # Fotos de bloco de motor, elétrica, etc.
│   │   ├── galeria/              # Fotos antes/depois, oficina real
│   │   └── logo/                 # Dragão DM (SVG)
│   ├── icons/                    # Ícones PWA (192, 512, apple-icon)
│   ├── favicon.ico
│   ├── robots.txt
│   └── manifest.json             # Manifest do PWA
│
├── src/
│   ├── app/
│   │   ├── layout.tsx            # Setup de fontes (Teko + Inter), Metadata, PWA tags
│   │   ├── page.tsx              # Index orquestrando todas as seções
│   │   └── globals.css           # Tailwind v4 @theme (Cores Neon/Dark)
│   │
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Navbar.tsx        # Menu fixo com logo e CTA
│   │   │   └── Footer.tsx        # Mapa, Endereço e Links
│   │   │
│   │   ├── sections/
│   │   │   ├── Hero.tsx          # Primeira dobra, impacto imersivo
│   │   │   ├── Servicos.tsx      # Grid de serviços (Cards)
│   │   │   ├── Custom.tsx        # Destaque para projetos de Performance
│   │   │   ├── Diferenciais.tsx  # Por que escolher a Dragão Motos
│   │   │   ├── SocialProof.tsx   # Depoimentos e Galeria de Fotos
│   │   │   └── Contato.tsx       # Botão SOS Oficina / WhatsApp + Mapa Embed
│   │   │
│   │   └── ui/
│   │       ├── Button.tsx        # Botões base (Primary Neon, Secondary Dark)
│   │       ├── SectionLabel.tsx  # Marcador superior de seções
│   │       ├── CardServico.tsx   # Card component com prop data
│   │       ├── NeonGlow.tsx      # Wrapper framer-motion para efeitos de luz sutil
│   │       └── FadeIn.tsx        # Container de animação base
│   │
│   ├── lib/
│   │   ├── utils.ts              # Função cn()
│   │   └── constants.ts          # Links (WA, Maps), Telefones
│   │
│   └── types/
│       └── index.ts              # Interfaces do TypeScript
│
├── next.config.ts                # Setup do PWA (withPWA) e imagens
└── tsconfig.json
```

---

## MAPA DE DEPENDÊNCIAS

1. **Camada Core (Zero dependências externas):** `types/index.ts`, `lib/constants.ts`, `lib/utils.ts`.
2. **Camada UI:** `components/ui/` importa a Camada Core.
3. **Camada Sections:** `components/sections/` importa a Camada UI e Core.
4. **Camada App:** `app/page.tsx` orquestra e junta as seções. Nenhuma seção deve importar o `page.tsx` de volta.

---

## CÓDIGOS DE SETUP — TAILWIND V4 & PWA

### `src/app/globals.css`
No Tailwind v4, o `tailwind.config.mjs` é substituído pelo bloco `@theme` diretamente no CSS.

```css
@import "tailwindcss";

@theme {
  /* Fontes do Google (Importadas no layout.tsx) */
  --font-display: var(--font-teko), sans-serif;
  --font-sans: var(--font-inter), sans-serif;

  /* Identidade Dragão Motos */
  --color-preto-profundo: #000000;
  --color-preto-asfalto: #0F0F0F;
  --color-grafite: #1C1C1C;
  --color-grafite-claro: #2A2A2A;
  
  --color-neon-verde: #00FF00;
  --color-neon-escuro: #008800;
  
  --color-branco: #FFFFFF;
  --color-cinza-texto: #A0A0A0;

  /* Efeitos Específicos */
  --shadow-neon: 0 0 15px rgba(0, 255, 0, 0.4);
  --shadow-neon-hover: 0 0 25px rgba(0, 255, 0, 0.7);
  --shadow-dark-card: 0 8px 30px rgba(0, 0, 0, 0.6);
}

@layer base {
  html {
    scroll-behavior: smooth;
    background-color: var(--color-preto-profundo);
    color: var(--color-branco);
  }
  
  ::selection {
    background-color: var(--color-neon-verde);
    color: var(--color-preto-profundo);
  }
}
```

---

### `next.config.ts` (Setup PWA Simples)

```ts
import type { NextConfig } from 'next';
import withPWAInit from 'next-pwa';

const withPWA = withPWAInit({
  dest: 'public',
  disable: process.env.NODE_ENV === 'development',
  register: true,
  skipWaiting: true,
});

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    formats: ['image/webp'],
    unoptimized: false,
  },
};

export default withPWA(nextConfig);
```

---

### `src/app/layout.tsx` (Boilerplate com Fontes)

```tsx
import type { Metadata, Viewport } from 'next';
import { Teko, Inter } from 'next/font/google';
import './globals.css';

const teko = Teko({
  subsets: ['latin'],
  weight: ['400', '600', '700'],
  variable: '--font-teko',
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-inter',
  display: 'swap',
});

// Meta e PWA info básica
export const metadata: Metadata = {
  title: 'Dragão Motos | Oficina Premium e Customização',
  description: 'A oficina definitiva para sua moto. Da manutenção de rotina ao projeto customizado de alta performance. Atendimento rápido.',
  manifest: '/manifest.json',
};

export const viewport: Viewport = {
  themeColor: '#000000',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR" className={`${teko.variable} ${inter.variable}`}>
      <body className="bg-preto-profundo text-branco antialiased font-sans">
        {children}
      </body>
    </html>
  );
}
```

---

### `public/manifest.json` (Exemplo Base)

```json
{
  "name": "Dragão Motos",
  "short_name": "Dragão Motos",
  "description": "Potência, Precisão e Performance na palma da sua mão.",
  "start_url": "/",
  "display": "standalone",
  "background_color": "#000000",
  "theme_color": "#000000",
  "icons": [
    {
      "src": "/icons/icon-192x192.png",
      "sizes": "192x192",
      "type": "image/png"
    },
    {
      "src": "/icons/icon-512x512.png",
      "sizes": "512x512",
      "type": "image/png"
    }
  ]
}
```

---
*Estrutura v1.0 · Dragão Motos · Março 2026*
