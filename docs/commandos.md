# COMANDOS — Dragão Motos
### Prompts para executar o plano fase por fase com IA
**Março 2026 · Desenvolvido por Richard G Studios**

---

## Instruções de Uso

1. Copie e cole cada comando, **um por vez**, na conversa com a IA
2. Espere a IA terminar completamente
3. Teste conforme indicado (✅ Teste)
4. Corrija problemas de UI antes de avançar
5. Só avance para o próximo comando se o teste passar
6. Marque com `[x]` os comandos já executados

---

## [ ] COMANDO 0: LEITURA INICIAL

```
Leia completamente os seguintes arquivos da pasta docs/, nesta ordem exata:

1. docs/dragao-motos-PRD.md — Entenda o produto (Landing Page para Dragão Motos), público-alvo, objetivo (serviços + peças), arquitetura de seções, integrações e o que NÃO faz parte do site.

2. docs/dragao-motos-design-system.md — Leia TUDO. Define: paleta de cores (provavelmente tons de preto, cinza e vermelho/laranja), tipografia robusta, espaçamento, bordas e todos os componentes UI (Button, CardServico, GaleriaMotos, etc).

3. docs/dragao-motos-copy.md — Textos exatos de cada seção. NUNCA invente textos — use SEMPRE os deste arquivo.

4. docs/dragao-motos-file-structure.md — Arquitetura de código completa: árvore de arquivos, mapa de dependências, código de configs (layout.tsx, globals.css) e scaffolds das seções.

5. docs/dragao-motos-assets-prompts.md — Referência de assets e imagens.

6. docs/plano-execucao-completo.md — O roadmap com critérios de aceite por etapa.

Depois de ler tudo, me confirme que entendeu:
1. O produto (Landing Page premium para Oficina e Loja de Peças Dragão Motos)
2. A stack (Next.js 16 + TypeScript + Tailwind CSS v4)
3. O Design System completo
4. A estrutura de arquivos e que os textos vêm do copy.md

NÃO crie nenhum arquivo ainda. Apenas confirme o entendimento.
```

✅ **Teste:** A IA deve listar os pontos confirmando o entendimento.

---

## FASE 1: SETUP DA INFRAESTRUTURA

### [ ] Comando 1.1: Criar Projeto

```
Crie o projeto Next.js com o seguinte comando:

npx -y create-next-app@latest ./ --typescript --tailwind --app --src-dir --import-alias "@/*" --no-eslint

Após criar, confirme que a estrutura básica existe.
```

✅ **Teste:** Rode `npm run dev` e acesse http://localhost:3000

---

### [ ] Comando 1.2: Instalar Dependências

```
Instale as dependências conforme o dragao-motos-file-structure.md:

npm install framer-motion lucide-react embla-carousel-react class-variance-authority clsx tailwind-merge zod sharp
npm install @radix-ui/react-dialog @radix-ui/react-visually-hidden

Confirme a instalação.
```

✅ **Teste:** `npm run dev` sem erros.

---

### [ ] Comando 1.3: Estrutura de Pastas

```
Crie a estrutura completa de pastas:
- public/images/hero/, public/images/servicos/, public/images/motos/, public/images/logo/
- public/icons/
- src/components/layout/, src/components/sections/, src/components/ui/
- src/lib/, src/data/, src/types/

NÃO crie os arquivos ainda.
```

✅ **Teste:** Pastas criadas conforme o planejado.

---

### [ ] Comando 1.4: Configurar Tokens (Tailwind v4)

```
Crie/substitua os arquivos usando o código do file-structure.md:

1. src/app/globals.css — com @import "tailwindcss" e bloco @theme com as cores e fontes de Dragão Motos.
2. postcss.config.mjs — com @tailwindcss/postcss

Use o código exato do documento.
```

✅ **Teste:** `npm run dev` sem erros visíveis.

---

## FASE 2: COMPONENTES UI BASE

### [ ] Comando 2.1: Botões e SectionLabels

```
Crie os componentes base:
1. src/components/ui/Button.tsx (variantes primary, secondary, outline)
2. src/components/ui/SectionLabel.tsx (pills de identificação de seção)

Use o código do Design System.
```

✅ **Teste:** Renderizar os botões em uma página temporária.

---

### [ ] Comando 2.2: Animações (FadeIn + Stagger)

```
Crie os wrappers de animação:
1. src/components/ui/FadeIn.tsx
2. src/components/ui/StaggerContainer.tsx

Usem 'use client' e framer-motion.
```

✅ **Teste:** `npm run build` sem erros.

---

## FASE 3: SEÇÕES DO SITE

### [ ] Comando 3.1: Navbar + Hero

```
Crie a navegação e a seção de abertura:
1. src/components/layout/Navbar.tsx
2. src/components/sections/Hero.tsx

Hero deve ter:
- Título: "Onde sua moto encontra o cuidado que merece."
- CTA: "Agendar Manutenção" e "Ver Catálogo de Peças"
- Imagem de alta qualidade de uma oficina premium.
```

✅ **Teste:** Verificar responsividade e scroll da navbar.

---

### [ ] Comando 3.2: Seção de Serviços

```
Crie src/components/sections/Servicos.tsx
- Grid com cards de serviços (Revisão, Motor, Elétrica, Pintura).
- Use CardServico.tsx (estilo DOCS RICHI).
```

---

## FASE 4: CONCLUSÃO E DEPLOY

### [ ] Comando 4.1: Ajustes Finais e SEO

```
Configure Metadata completo no layout.tsx e crie sitemap.ts.
Verifique contraste e acessibilidade.
```

### [ ] Comando 4.2: Deploy Vercel

```
Rode npm run build.
Se passar, prepare para deploy na Vercel.
```

---

*Comandos v1.0 · Dragão Motos · Março 2026*
*Richard G Studios Style*
