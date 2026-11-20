# CAIS — Arquitetura, Luz & Matéria

Site institucional e monografia digital interativa para um escritório autoral de arquitetura contemporânea (São Paulo & Lisboa), construído em **React 19 + TypeScript + Vite + GSAP ScrollTrigger + Lenis + Node.js/Express**.

## Destaques Técnicos & Direção de Arte

- **Ritmo Cromático Editorial**: alternância intencional entre **Pedra Travertino (`#F2EFE9`)** e **Basalto Fumê (`#111110`)** com acento contido em **Terracota Corten (`#A65336`)**, fugindo de templates genéricos.
- **Tipografia Hierárquica**: `Cormorant Garamond` para títulos editoriais, `Plus Jakarta Sans` para leitura fluida e `IBM Plex Mono` para cotas, coordenadas e fichas técnicas.
- **Profundidade Espacial (`Câmara de Luz`)**: perspectiva 3D real no eixo Z sincronizada ao scroll (com brises verticais que se abrem em planos distintos) combinada a um **Simulador Solar interativo (`06:00 → 21:00`)** que altera ângulo de incidência luminosa, temperatura de cor e telemetria.
- **Galeria Horizontal Pinada (`Obras Selecionadas`)**: scroll vertical convertido em percurso lateral fluido via **Lenis + GSAP ScrollTrigger**, com composições assimétricas, contra-parallax interno nas fotografias e navegação direta por setas e índices (`01–05`).
- **Biblioteca Matérica & Cortes Construtivos**: seletor tátil dos 5 materiais primários com desenho esquemático de corte em escala 1:10 e vínculo direto à obra aplicada.
- **Monografia Completa com Planta e Corte SVG**: clique em qualquer obra para inspecionar fotografia, planta baixa esquemática, corte longitudinal e ficha técnica.
- **Back-end Node.js + Express (`server/index.ts`)**: API REST (`/api/health`, `/api/projects`, `/api/materials`, `/api/inquiries`) com validação, persistência em JSON local (`server/data/inquiries.json`) e geração de protocolo real (`CAIS-2026-XXXX`).

## Como Executar

```bash
npm install
npm run dev
```

- **Front-end (Vite):** `http://localhost:5173`
- **API (Express):** `http://localhost:3001`

Para build de produção servida pelo servidor Node.js:

```bash
npm run build
npm start
```

---

Concepção e engenharia por [Carlos Guedes](https://github.com/carlosguedes-dev).
