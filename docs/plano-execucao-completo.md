# Plano de Execução Completo — Dragão Motos
### Otimizado para Vibe Coding de Alta Performance
**Versão 1.0 · Março 2026 · Richard G Studios**

---

## Leitura Obrigatória (nesta ordem)

Para a inteligência artificial (e desenvolvedores humanos) antes de codificar qualquer etapa, garanta que os contextos fundacionais abaixo estão completamente mapeados em memória:

| # | Documento Obrigatório | O que extrair (Fator Mestre) |
|---|-----------------------|------------------------------|
| 1 | `PRD.md`              | Objetivo, Seções Base, Público "Oficina/Custom" e Funcionalidade PWA instalável. |
| 2 | `design-system.md`    | Foco primário no Dark Mode Absoluto (Fundo `#000`/`#0F0F0F`) e Glow Neon Verde (`#00FF00`). Uso de tipografia `Teko` e `Inter`. |
| 3 | `file-structure.md`   | Ordem e nomenclatura de diretórios. As dependências do CSS-First via Tailwind v4 (`@theme`). |
| 4 | `assets-prompts.md`   | Visualização "Batcave Premium". Imagens fotorealistas, cenários limpos. |

📍 **NOTA CRÍTICA DE EXECUÇÃO:** O projeto é compilado usando Next.js 16 (App Router) + Tailwind CSS v4. O arquivo `tailwind.config.ts` **NÃO EXISTE**. Toda e qualquer configuração customizada de fontes, breakpoints, cores e sombras reside no topo de `globals.css` utilizando o bloco-diretiva `@theme`.

---

## ⛔ Diretrizes Zero Tolerance (Regras de Codificação)

Estas diretrizes sobrepõem qualquer padrão convencional e devem ser blindadas em todas as Fases da construção Front-End:
- **Zero Placeholder Text:** Todas as labels e copys descritivos devem ser baseadas no que consta no `PRD.md` do usuário ou passadas em Constants (não deixar "Lorem Ipsum").
- **Tipagem Absoluta:** O projeto usa TypeScript rígido. Proibido cast assustador como `any` ou `as unknown`.
- **Evolução Gradativa de Commits:** As seções são geradas **UMA por vez** para validações independentes. Se você der o comando para a IA "fazer o site todo", ele vai falhar e o design premium se perderá.
- **Micro-Interações Obrigatórias:** O projeto lida com motores e performance. Botões precisam de `hover:scale-[1.02]`, cards devem reagir magneticamente. O Design System já prevê isso com `--shadow-neon-hover`.

---

## O Roadmap Lógico — As 5 Fases

A orquestração exata do esforço garante que a complexidade aumente apenas quando a infra está 100% suportada.

### FASE 1: Setup Radical & Fundações Estruturais
📍 *Esta fase configura a raiz da aplicação e blinda o design system contra vazamentos de classes nativas feias.*

* **1.1. Iniciar App Router (Next 16):** Instalar esqueleto Vercel via `npx create-next-app` sem diretório src supérfluo se não configurado.
* **1.2. Injetar Design System (Tailwind v4):** Redigir o `globals.css` na íntegra, extraindo as cores Dark/Neon e as fontes `Teko`/`Inter` fornecidas pelos docs. Configuração final de `--shadow-neon`.
* **1.3. Service Worker PWA Inicial:** Instalar e setar a flag de Next-PWA (`next-pwa`) gerando o `manifest.json`. **Sem isso o projeto falha ao atender o PRD logo na largada.**
* **1.4. Boilerplate do `layout.tsx`:** Inclusões pesadas (viewport, meta headers, theme-color `#000000` hardcoded para mobile browsers).

✅ *Checkpoint Phase 1:* O `npm run dev` abre tela preta completa responsiva sem erros no console, pronto pra receber os componentes orgânicos.

---

### FASE 2: Engenharia de Base Atômica (UI Components)
📍 *Construção dos blocos independentes antes de ligá-los a blocos complexos de Layout.*

* **2.1. O Botão Primário e Ghost:** Desenvolver o polimorfismo do botão com a variação `variant="neon"` e animações de glow.
* **2.2. O Marcador de Seção (`SectionLabel`):** Elemento de texto esticado (`tracking-[0.2em]`) com um ponto (`div w-2 h-2`) piscando neon estilo sistema/início de software automotivo.
* **2.3. O Card Automotivo (`CardServico`):** Superfície de luxo "Vidro Fumê" (fundo grafite + borda sutil) contendo Imagem 100% grayscale que satura e traciona em direção à câmera (`group-hover:scale-110`) quando olhada num hover.
* **2.4. Wrapper de Animação de Entrada (`FadeIn`):** O `framer-motion` acionando elementos de baixo para cima `y:20 opacity:0 delay`.

✅ *Checkpoint Phase 2:* Tudo importável e utilizável. Qualquer componente funciona isolado num "Test Page".

---

### FASE 3: Frente de Construção Lógica (Seções em Top-Down)
📍 *Agora os componentes criados se unem. Você (ou a IA executora) executa 1 comando exclusivo por trecho. Proibido combinar.*

* **3.1. Navbar / Navigation Fixo:** Navbar transparente que abraça o Top do Hero. `backdrop-blur` quando o usuário far o scroll e soltar da primeira âncora.
* **3.2. Hero Section (A Imersão):** Imagem Hero de uma moto premium deitada (`absolute inset-0`). Título principal gigantesco em Teko Italizado. Texto auxiliar focado. 2 Call-to-actions claros pra conversão de oficina.
* **3.3. Seção "Os Nossos Serviços":** Chamada com o `SectionLabel`. Grid responsivo contendo os 3 serviços mestres `CardServico` (Mecânica Geral, Performance, Custom) rodando limpo de 1-column mobile para 3-column lg desktop.
* **3.4. Diferenciais Competitivos:** "Por que a Dragão". Cards de ícone neon sobre fundo Grafite descrevendo confiança, peças e transparência.
* **3.5. Social Proof (O Galinheiro Real):** Galeria visual "Antes/Depois". Como há restrição de bundle, sugerido carrossel horizontal de fotos potentes integrados com Depoimentos (se previstos nos próximos copies).
* **3.6. A Ancoragem de Contato e Local:** Endereço (Footer e Maps iframe responsivo). O botão flutuante persistente de WhatsApp no canto da tela (o SOS Oficina com brilho neon contínuo para urgências).

✅ *Checkpoint Phase 3:* Seu landing site está tecnicamente "Pronto". Ele flui de cima para baixo lindamente, é pesado, misterioso, confiável e limpo.

---

### FASE 4: Refinamento Extremo, QA e App Store PWA
📍 *Auditoria fina de interface gráfica e requisitos para manifest mobile.*

* **4.1 Auditoria do Dark Mode em Luz do Sol:** As fontes secundárias em `text-white/60` dão conta de contraste suficiente ao ar livre? Isso é uma Oficina de moto, o app será usado no meio da rua. Verificar a WCAG (4.5:1 ratio).
* **4.2 Click Areas no Aparelho Móvel (Fat Finger):** Tudo listado na NavBar mobile ou no grid deve ter target-size >= 44x44. Ninguém com luva suja deve errar o link principal.
* **4.3 Teste Progressivo Web App (PWA):** No DevTools do Chrome (Aba Application), conferir se ServiceWorker foi detectado, Icones PNG estão registrados no WebManifest. Rodar o prompt do Chrome "Instalar Dragão Motos".

✅ *Checkpoint Phase 4:* A Landig Page se comporta 100% como um App nativo ultra-performoso no Lighthouse.

---

### FASE 5: Vercel e o Mundo Real (Deploy)
📍 *A esteira de integração final.*

* **5.1. Lock de Variáveis:** Se você tem link do Whats (`wa.me/`), número local, url de insta — confira no `lib/constants.ts` se estão injetados. Tira isso de "TODO".
* **5.2. Build Preview:** Rodar `npm run build` na própria máquina (não mande para a cloud sem conferir antes).
* **5.3. Integração Github/Vercel (Production):** Criação de projeto na Dashboard Vercel e o claim do link .vercel.app.
* **5.4. Liveness Post-Deploy:** Navegação de ponta a ponta na cloud. As imagens carregaram comprimidas pelo WebP do Next-Image Server-Side? O Neon Brilha? Clicar no botão do Whats e confirmar.

🚀 *Missão Cumprida.*

---
*Documento de Execução v1.0 · Dragão Motos Oficial*
