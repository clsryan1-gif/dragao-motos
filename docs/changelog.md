# Changelog — Dragão Motos
**Desenvolvido por Richard G Studios · Março 2026**

Este diário mapeia o histórico de versões da "Bíblia Documental" e, futuramente, do código-fonte da aplicação (App Router Next.js + PWA). Formatado no padrão [Keep a Changelog](https://keepachangelog.com/).

---

## [Unreleased]
*Tudo aquilo que está sendo preparado pela Inteligência Artificial para a fase de Infraestrutura e Interface será listado aqui antes de subir para a versão 0.2.0.*

---

## [0.2.0] — Março 2026

### ✨ Adicionado (Fase 1: Setup Técnico)
- **Infraestrutura Next.js 16:** Repositório inicializado com App Router e TypeScript.
- **Engine Tailwind v4:** Configuração via `@theme` no `globals.css` com paleta Dark Mode e sombras Neon Verde.
- **PWA Ready:** Inclusão de `next-pwa` e geração do `manifest.json`.
- **Bibliotecas de UI:** Instalação de `framer-motion`, `lucide-react` e `radix-ui`.
- **Componentes Atômicos:** Criação dos componentes `Button`, `SectionLabel` e `FadeIn`.
- **Utilitários e Constantes:** Implementação da função `cn` e central de URLs (`constants.ts`).

---

## [0.1.0] — Março 2026

### ✨ Adicionado
- **Marco Zero Documental (Vibe Coding Fundations)**
  - Construção da Arquitetura Principal de Projetos Assistidos por IA. Foram gerados os 5 documentos blindadores de contexto na pasta `docs/`.
  - **`plano-execucao-completo.md`:** A bússola contendo 5 Fases estritas de execução (da inicialização do Next.js até o Deploy na Vercel com suporte nativo a PWA Chrome/Safari).
  - **`commandos.md`:** O sequenciamento exato (Prompts Lineares) que serão postados na IA para forçar a construção atômica de cada tela da oficina.
  - **`design-system.md`:** O "Corpo Estético" traduzido paras as variáveis `@theme` exclusivas do Tailwind v4 (`--color-preto-profundo`, `--color-neon-verde` e `--shadow-neon-hover`).
  - **`file-structure.md`:** O mapa da árvore de diretórios detalhando a dependência unidirecional entre Camada de Tipagem `types/`, Botões `ui/` e Estrutura Principal `sections/`.
  - **`assets-prompts.md`:** Dossiê fotorealista com prompts brutos de IA de Imagem visando a estética Automotiva "Dark Mode & Neon Glow" limitando ambientes barulhentos ou sujos.

### 🔒 Gateways de Qualidade Definidos
- Tranca arquitetural estipulada em todo o escopo de copy/layout para evitar que a IA produza "Brancos Absolutos" ao invés das sombras do "Dark Mode".
- Gateway de Lighthouse PWA definido como Meta-Mestra antes de empacotar para celular.

---
*Changelog v1.0 · Dragão Motos Oficial*
