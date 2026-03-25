# Changelog - Alterações por Antigravity (IA)

Este documento registra todas as melhorias técnicas, correções de bugs e otimizações realizadas para garantir a estabilidade e a experiência premium do projeto Dragão Motos.

## [1.2.0] - 2026-03-24 (Fase atual)
### ✨ Adicionado (PWA & Mobile UX)
- **Componente `InstallPrompt`**: Implementação de um prompt de instalação inteligente que detecta Android (nacional) e iOS (manual com instruções visuais).
- **Utilitário `getWhatsAppLink`**: Centralização da lógica de contato em `src/lib/contact.ts` para garantir links sanitizados e robustos.
- **Suporte a Safe Area**: Adicionado suporte a `env(safe-area-inset-bottom)` no `globals.css` e `BottomNav.tsx` para compatibilidade total com iPhones com notch.

### 🛠️ Corrigido (Estabilização & Performance)
- **Otimização de Imagem Principal**: O Hero agora usa `next/image` com `priority` em vez de CSS `backgroundImage`, melhorando o LCP (Largest Contentful Paint).
- **Otimização do PWA**: Reconfiguração do `next.config.ts` para permitir ativação em desenvolvimento a pedido do usuário, com ajustes de segurança.
- **Remoção de Redundância**: Eliminado o registro manual de Service Worker (`register-sw.js`), deixando a gestão nativa para o `@ducanh2912/next-pwa`.
- **Limpeza de Tipos**: Remoção TOTAL de `// @ts-nocheck` em todos os arquivos do projeto (`layout.tsx`, `page.tsx`, `Button.tsx`, `AgendamentoPage.tsx`, `StickySOS.tsx`, etc.).
- **Identidade Visual**: Atualização de ícones de serviços na página de agendamento para ícones específicos (`Zap`, `Settings`, `ShieldCheck`, `Sparkles`) em vez do ícone genérico de moto.

## [1.1.0] - 2026-03-24
### 🛠️ Corrigido
- **Ajustes de Layout**: Correção de metadados e fontes no `RootLayout` após refatoração técnica.
- **Navbar**: Limpeza de importações não utilizadas de `framer-motion` e `lucide-react`.

---
*Relatório gerado automaticamente para Ryan (Dragão Motos) com base na análise da pasta Docs.*
