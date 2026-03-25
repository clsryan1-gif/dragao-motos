# Design System — Dragão Motos
### Landing Page PWA · Alta Performance & Vibe Coding
**Versão 1.0 · Março 2026 · Richard G Studios**

---

## FILOSOFIA VISUAL

A identidade da **Dragão Motos** deve transmitir instantaneamente três sensações:
1. **Poder e Velocidade:** Escuridão intensa (Asfalto à noite) rasgada por luzes técnicas fortes.
2. **Precisão Mecânica:** Linhas duras, texturas fosco-metálicas, interfaces limpas.
3. **Alto Nível (Premium):** Uma oficina que atende motos sofisticadas e projetos customizados, sem perder a "garra" da manutenção do dia-a-dia da rua.

**Palavra-chave de Execução:** "Cyber-Mecânica". Escuridão total iluminada apenas pelo essencial em Verde Neon (fogo do dragão).

---

## ⛔ REGRAS GLOBAIS — NUNCA FAZER

| ❌ Nunca | ✅ Sempre |
|----------|----------|
| Fundo branco ou claro (`#FFFFFF`). | Fundos Preto ou Grafite (`bg-preto-profundo`, `bg-grafite`). |
| Usar cinzas genéricos do Tailwind sem contexto. | Usar `rgba(255,255,255,0.x)` para textos em cima de fundos pretos. |
| Cores quentes (Vermelho, Laranja, Amarelo) como destaque. | Usar o Verde Neon (`#00FF00`) escasso e estratégico como cor de sotaque (+ Branco). |
| Tipografias delicadas, cursivas ou redondas. | Uso de *Teko* (Agressiva, Condensada) e *Inter* (Legível). |

---

## 1. PALETA DE CORES (Setup Tailwind v4 `@theme`)

Configuradas nativamente no `globals.css` via pacote `@theme`.

### Backgrounds & Superfícies (Escuridão)
| Nome | Hex | Tailwind Class / Variable | Uso |
|------|-----|---------------------------|-----|
| Preto Profundo | `#000000` | `bg-preto-profundo` / `--color-preto-profundo` | Background do App, Navbar e Footer. O Vazio absoluto. |
| Preto Asfalto  | `#0F0F0F` | `bg-preto-asfalto`  / `--color-preto-asfalto`  | Seções alternadas e Hero Overlay. |
| Grafite        | `#1C1C1C` | `bg-grafite`        / `--color-grafite`        | Background de Cards de Serviço e botões desativados. |
| Grafite Claro  | `#2A2A2A` | `bg-grafite-claro`  / `--color-grafite-claro`  | Bordas de separação delicadas (stroke). |

### Accents & Destaques (O Fogo do Dragão)
| Nome | Hex | Tailwind Class / Variable | Uso |
|------|-----|---------------------------|-----|
| Verde Neon   | `#00FF00` | `text-neon-verde` / `bg-neon-verde` / `--color-neon-verde` | Action Buttons principais (SOS Oficina), Efeitos de Hover Glow, Ícones de cards. |
| Neon Escuro  | `#008800` | `text-neon-escuro`/ `bg-neon-escuro`/ `--color-neon-escuro` | Sombras neon base, ou estado "active" (clicked) de botões. |

### Tipografia
| Nome | Uso Contextual | Tailwind Class Substituta (via Opacidade) |
|------|----------------|-----------------------------------------|
| Branco Puro | Headings (`H1`, `H2`)   | `text-white` |
| Branco Fosco | Textos base `body`     | `text-white/80` |
| Cinza Texto  | Textos secundários     | `text-white/60` |

---

## 2. TIPOGRAFIA

Importadas via URL do `next/font/google` no `layout.tsx`.

| Contexto   | Fonte | Tailwind Class | Pesos & Case | Comentário |
|------------|-------|----------------|--------------|------------|
| Header (H1)| Teko  | `font-display` | `font-bold uppercase tracking-wide` | Estético, parece logotipo de moto/games. |
| Títulos    | Teko  | `font-display` | `font-semibold uppercase` | Para seções, ex: "NOSSOS SERVIÇOS". |
| Botões     | Inter | `font-sans`    | `font-bold tracking-wider uppercase` | Super estruturado e legível na correria. |
| Corpo      | Inter | `font-sans`    | `font-medium` | Leitura simples para parágrafos longos. |

---

## 3. SOMBRAS E GLOW NEON (MUITO IMPORTANTE)

Em fundos 100% pretos, a sombra comum (preta) é inútil. Usamos o **Glow** (sombra da luz neon que rebate) para trazer elementos pra frente.

**CSS base gerado do `@theme` (Tailwind v4):**
- `--shadow-neon`: `0 0 15px rgba(0, 255, 0, 0.4)` (Para botões em repouso)
- `--shadow-neon-hover`: `0 0 25px rgba(0, 255, 0, 0.8)` (Para botões no mouseover)

---

## 4. COMPONENTES DE FRONT-END (React Server/Client Components)

Esses são os scaffolds cruciais para o setup rápido. Todos usam Tailwind e Framer Motion.

### 4.1 Button Neon Primary & Secondary Dark

```tsx
import { cn } from '@/lib/utils';
import { forwardRef } from 'react';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'neon' | 'dark' | 'outline';
  size?: 'sm' | 'md' | 'lg';
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'neon', size = 'md', ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          'inline-flex items-center justify-center rounded-sm font-sans font-bold uppercase tracking-wider transition-all duration-300',
          // Size
          size === 'sm' && 'px-4 py-2 text-xs',
          size === 'md' && 'px-6 py-3 text-sm',
          size === 'lg' && 'px-10 py-4 text-base',
          // Variants
          variant === 'neon' && 'bg-neon-verde text-preto-profundo shadow-neon hover:shadow-neon-hover hover:scale-[1.02] active:scale-[0.98]',
          variant === 'dark' && 'bg-grafite text-white hover:bg-grafite-claro border border-grafite-claro',
          variant === 'outline' && 'border-2 border-neon-verde text-neon-verde hover:bg-neon-verde/10',
          className
        )}
        {...props}
      />
    );
  }
);
Button.displayName = 'Button';
```
*(Nota: O uso de botões com bordas quase zeradas - arredondamento mínimo `rounded-sm` - combina mais com o estilo hard-edge de performance em duas rodas do que bolhas curvas)*.

---

### 4.2 SectionLabel (Identificador Tecnológico)

```tsx
import { cn } from '@/lib/utils';

export function SectionLabel({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={cn('inline-flex items-center gap-2 mb-4', className)}>
      <div className="w-2 h-2 rounded-full bg-neon-verde shadow-neon animate-pulse" />
      <span className="font-display tracking-[0.2em] text-neon-verde uppercase text-lg">
        {children}
      </span>
    </div>
  );
}
```
*(O pontinho verde pulsante traz aquele efeito de painel de injeção ligando)*.

---

### 4.3 CardServico (Vidro e Asfalto)

```tsx
import Image from 'next/image';
import { cn } from '@/lib/utils';

interface CardProps {
  title: string;
  description: string;
  imageSrc: string;
}

export function CardServico({ title, description, imageSrc }: CardProps) {
  return (
    <div className="group relative overflow-hidden bg-grafite border border-grafite-claro transition-all duration-500 hover:border-neon-verde/50">
      <div className="relative h-[250px] w-full overflow-hidden">
        <Image 
          src={imageSrc} 
          alt={title} 
          fill 
          className="object-cover transition-transform duration-700 group-hover:scale-110 grayscale group-hover:grayscale-0"
        />
        {/* Camada escurecedora gradiente para transição */}
        <div className="absolute inset-0 bg-gradient-to-t from-preto-profundo via-preto-profundo/60 to-transparent" />
      </div>
      
      <div className="absolute bottom-0 p-6 z-10 w-full transform transition-transform duration-500 group-hover:-translate-y-2">
        <h3 className="font-display text-3xl font-bold text-white mb-2">{title}</h3>
        <p className="font-sans text-white/70 text-sm leading-relaxed max-w-[90%] opacity-80 group-hover:opacity-100 transition-opacity">
          {description}
        </p>
      </div>

      {/* Linha Fina de Luz inferior que surge no Hover */}
      <div className="absolute bottom-0 left-0 h-[2px] w-0 bg-neon-verde transition-all duration-500 group-hover:w-full" />
    </div>
  );
}
```
*(As imagens começam em grayscale/PB estilo "Garagem Sombria" e ganham cores e zoom quando o usuário olha de perto no Hover. O sublinhado de neon percorre a base na ação).*

---

## RESUMO DA APLICAÇÃO — "VIBE CODING":

Sempre que a IA abrir e codar uma nova página, verifique mentalmente o checklist:

1. [ ] A cor de fundo geral é #000 (preto)?
2. [ ] Tem algum detalhe em verde neon (#00FF00)?
3. [ ] As fontes são `font-display` (Teko) pros gigantismos e parágrafos `font-sans` (Inter)?
4. [ ] Botões primários estão usando o `variant="neon"` com glow?

Isso vai garantir 100% que as seções se comportem com total harmonia e alta agressividade de conversão.

---
*Design System Oficial v1.0 · Dragão Motos · Março 2026*
