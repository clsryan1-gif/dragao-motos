Documento de Requisitos do Produto (PRD)
Projeto: Landing Page PWA - Dragão Motos
Stack Tecnológica: Next.js, TypeScript, Tailwind CSS, PWA
Status: Definição de MVP

1. Visão Geral e Objetivos do Produto
A "Dragão Motos" precisa de uma presença digital agressiva, moderna e de altíssimo desempenho, refletindo a qualidade de seus serviços (Mecânica, Performance e Customização).

Objetivo de Negócio: Captar leads locais e agendar serviços via WhatsApp de forma direta e sem atrito.

Objetivo Técnico: Criar uma aplicação ultrarrápida (Next.js), com tipagem segura (TypeScript), estilização escalável e manutenção simples (Tailwind), que possa ser instalada no celular do cliente como um aplicativo nativo (PWA) para fidelização.

2. Identidade Visual e UI/UX
Baseado nos designs de logo apresentados, a interface deve transmitir força, precisão mecânica e tecnologia.

Paleta de Cores:

Fundo Principal: Preto Sólido (#000000) e Grafite Escuro (#121212) texturizado (estilo asfalto ou metal escovado).

Cor de Destaque (Accent): Verde Neon (inspirado no fogo do dragão, ex: #39FF14 ou #00FF00) para botões de CTA e ícones.

Textos: Branco puro e cinza claro para legibilidade.

Tipografia: Fontes sans-serif modernas e agressivas (ex: Teko, Montserrat ou Rajdhani) para títulos, e uma fonte limpa (ex: Inter ou Roboto) para parágrafos.

Componentes Visuais: Efeitos de glow (brilho neon) sutis no Tailwind nos botões de contato, bordas metálicas e imagens de alta qualidade das motos na oficina.

3. Arquitetura da Informação (Estrutura da Página)
A landing page será single-page com navegação em âncoras lisas (smooth scroll).

Header (Fixo): Logo minimalista (o dragão com "DM"), menu de navegação e botão CTA "Agendar Revisão".

Hero Section: * Background com imagem escura da oficina ou vídeo curto em loop de uma moto acelerando.

Logo completa em destaque.

Headline: "Potência, Precisão e Performance."

Sub-headline: "A oficina definitiva para a sua moto. Da manutenção de rotina ao projeto customizado."

CTA Principal: "Falar com um Mecânico" (Link direto para WhatsApp).

Serviços (Cards com ícones neon):

Mecânica Geral: Revisão completa, injeção eletrônica, motores (cobrindo do uso diário intenso de linhas populares como a CG 125 até motos maiores).

Performance: Remapeamento, escapamentos esportivos, suspensão.

Custom: Projetos visuais, pintura, peças exclusivas.

Diferenciais / Por que escolher a Dragão: Foco em confiança, peças originais, entrega no prazo e transparência.

Depoimentos / Galeria (Social Proof): Carrossel de fotos (antes/depois) de motos na oficina e avaliações curtas de clientes.

Rodapé (Footer): Endereço físico com mapa integrado (Google Maps), horário de funcionamento, links das redes sociais e botão flutuante persistente do WhatsApp no canto inferior direito.

4. Requisitos Técnicos e Stack
Framework: Next.js (App Router) para otimização de SEO e tempo de carregamento (Server-Side Rendering).

Linguagem: TypeScript para evitar bugs em tempo de execução e facilitar a manutenção do código.

Estilização: Tailwind CSS. Criação de classes utilitárias personalizadas no tailwind.config.js para as cores neon e dark mode nativo.

PWA (Progressive Web App): * Configuração do manifest.json com os ícones do Dragão.

Implementação de um Service Worker (pode usar o pacote next-pwa) para cache de assets estáticos, permitindo que a página carregue instantaneamente em visitas futuras, mesmo com internet fraca.

Hospedagem: Vercel (ideal e gratuita para Next.js, garantindo deploy rápido e CI/CD).

5. Estratégia de MVP (Entrega Rápida)
Para garantir um ciclo de desenvolvimento ágil, focado em colocar o site no ar e gerar resultados (e fluxo de caixa) o mais rápido possível:

Fase 1 (Semana 1): Configuração do repositório, setup do Next.js + Tailwind, desenvolvimento da UI estática (Hero, Serviços, Footer) e integração dos links de WhatsApp. Deploy na Vercel.

Fase 2 (Semana 2): Implementação do PWA, otimização de imagens (usando next/image para garantir nota alta no Google Lighthouse), configuração de SEO básico (Meta tags) e refinamentos visuais (efeitos hover neon).