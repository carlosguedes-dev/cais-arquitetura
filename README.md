<div align="center">

# CAIS — Arquitetura, Luz & Matéria

**Experiência digital editorial e monografia interativa para um escritório autoral de arquitetura contemporânea (São Paulo & Lisboa).**

[![React](https://img.shields.io/badge/React-19-141412?style=for-the-badge&logo=react&logoColor=F2EFE9)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8-141412?style=for-the-badge&logo=typescript&logoColor=F2EFE9)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-6-141412?style=for-the-badge&logo=vite&logoColor=F2EFE9)](https://vite.dev/)
[![Node.js](https://img.shields.io/badge/Node.js-Express_5-141412?style=for-the-badge&logo=node.js&logoColor=F2EFE9)](https://expressjs.com/)
[![GSAP](https://img.shields.io/badge/GSAP-ScrollTrigger-A65336?style=for-the-badge)](https://gsap.com/)
[![Licença MIT](https://img.shields.io/badge/Licença-MIT-A65336?style=for-the-badge)](LICENSE)

</div>

---

## Sobre o Projeto

O **CAIS Arquitetura** foi concebido para unir **direção de arte editorial contemporânea**, **profundidade espacial 3D**, **navegação horizontal coreografada** e uma **arquitetura full-stack em React + Node.js**.

Em vez de layouts genéricos ou excesso de ornamentos, o projeto trabalha o ritmo entre **Basalto Fumê (`#111110`)**, **Pedra Travertino (`#F2EFE9`)** e **Terracota Corten (`#A65336`)**, combinados às fontes `Cormorant Garamond`, `Plus Jakarta Sans` e `IBM Plex Mono` e a uma série coesa de fotografias arquitetônicas.

---

## Principais Recursos

- **Cabeçalho Adaptativo:** detecta automaticamente a seção em foco e alterna com suavidade entre contraste claro e escuro (`tone-dark` / `tone-light`), além de oferecer o **Índice Geral Fullscreen** com relógios ao vivo de São Paulo e Lisboa.
- **Hero em Múltiplos Planos:** separação parallax entre fotografia crepuscular, eixos técnicos de cota e composição tipográfica monumental.
- **Galeria Horizontal Pinada (`Obras Selecionadas`):** rolagem vertical convertida em deslocamento lateral via **Lenis + GSAP ScrollTrigger**, com proporções assimétricas, contra-parallax interno nas fotografias, índices clicáveis (`01–05`), setas de navegação e fallback `scroll-snap` nativo em dispositivos móveis.
- **Câmara de Luz & Profundidade (`Eixo Z`):** perspectiva 3D real com brises laterais que se abrem durante o scroll, 3 waypoints clicáveis de profundidade (`Z +04.0m`, `Z +12.5m`, `Z +24.0m`) e **Simulador Solar interativo (`06:00 → 21:00`)** que altera ângulo de luz, temperatura de cor, azimute e luminância em tempo real.
- **Biblioteca Matérica:** inspeção interativa de 5 materiais primários com desenho esquemático de corte construtivo em escala `1:10`, métricas térmicas/acústicas e acesso direto à obra de referência.
- **Monografia Interativa (Modal):** clique em qualquer obra para alternar entre **Fotografia**, **Planta Baixa SVG** e **Corte Longitudinal SVG**, consultar a ficha técnica completa e abrir o briefing já pré-preenchido com aquela referência.
- **Arquivo Filtrável & Ordenável:** catálogo das 8 obras com filtros por tipologia (`Todas`, `Residencial`, `Cultural`, `Refúgio`), ordenação dinâmica (`Mais recentes` / `Maior área`) e pré-visualização lateral instantânea.
- **API Node.js + Express (`server/index.ts`):** persistência local em JSON (`server/data/inquiries.json`) com validação e emissão de protocolo real (`CAIS-2026-XXXX`), além de fallback resiliente no cliente.

---

## Endpoints da API

| Método | Rota | Descrição |
| :--- | :--- | :--- |
| `GET` | `/api/health` | Status operacional do servidor e ateliês |
| `GET` | `/api/projects` | Catálogo de obras (aceita `?category=Residencial\|Cultural\|Refúgio`) |
| `GET` | `/api/materials` | Especificações da biblioteca matérica |
| `GET` | `/api/inquiries/summary` | Resumo de solicitações registradas |
| `POST` | `/api/inquiries` | Valida e registra um novo briefing, retornando protocolo `CAIS-YYYY-XXXX` |

---

## Estrutura do Projeto

```text
cais-arquitetura/
├── public/
│   ├── favicon.svg              # Marca geométrica vetorial CAIS
│   └── images/                  # 8 fotografias arquitetônicas otimizadas (.jpg)
├── server/
│   ├── index.ts                 # Servidor Express 5 (API REST + entrega de dist/)
│   └── data/
│       └── inquiries.json       # Persistência dos briefings recebidos
├── src/
│   ├── components/              # Header, Hero, HorizontalWorks, DepthChamber, MaterialLab, etc.
│   ├── data/                    # Catálogo de obras e biblioteca de materiais
│   ├── hooks/                   # Sincronização Lenis + GSAP ScrollTrigger
│   ├── styles/                  # Design tokens, base e estilos modulares
│   ├── utils/                   # Cliente da API com fallback local
│   ├── App.tsx
│   └── main.tsx
├── index.html
├── package.json
├── tsconfig.json
└── vite.config.ts
```

---

## Como Executar Localmente

### Pré-requisitos
- **Node.js** 18+ (recomendado 20/22/24)
- **npm** 9+

### Desenvolvimento (Front-end + API simultâneos)

```bash
git clone https://github.com/carlosguedes-dev/cais-arquitetura.git
cd cais-arquitetura
npm install
npm run dev
```

- **Aplicação Web (Vite):** `http://localhost:5173`
- **API Express:** `http://localhost:3001`

### Build & Produção (Servidor Único)

```bash
npm run build
npm start
```

O servidor Express servirá tanto o bundle otimizado de `dist/` quanto os endpoints `/api/*` em `http://localhost:3001`.

---

## Contribuição e Licença

Contribuições são bem-vindas — consulte [CONTRIBUTING.md](CONTRIBUTING.md).  
Distribuído sob a licença **MIT**. Veja [LICENSE](LICENSE) para mais detalhes.

---

<div align="center">
  Desenvolvido por <a href="https://github.com/carlosguedes-dev"><strong>Carlos Guedes</strong></a>
</div>
