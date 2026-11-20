# Contribuindo com o Projeto CAIS Arquitetura

Obrigado pelo interesse em contribuir com o **CAIS — Arquitetura, Luz & Matéria**. Este projeto combina direção de arte editorial (*Quiet Luxury*), coreografia espacial de scroll e engenharia full-stack em React, TypeScript e Node.js.

---

## Como Contribuir

1. Faça um **Fork** do repositório.
2. Crie uma branch para sua melhoria ou correção (`git checkout -b feat/nova-funcionalidade`).
3. Mantenha o código limpo, tipado (`npm run typecheck` sem erros) e coerente com o sistema de design.
4. Faça commits claros seguindo Conventional Commits (`feat:`, `fix:`, `style:`, `docs:`, `refactor:`).
5. Envie a branch para o seu fork (`git push origin feat/nova-funcionalidade`).
6. Abra um **Pull Request** descrevendo o contexto, as alterações e, se houver impacto visual, inclua capturas em desktop e mobile.

---

## Diretrizes de Design & Engenharia

- **Sobriedade Editorial:** evite excesso de efeitos decorativos, neon, emojis informais ou caixas redundantes. Priorize hierarquia tipográfica, espaço negativo e contraste legível (WCAG AA+).
- **Paleta Arquitetônica:** preserve a alternância entre Pedra Travertino (`#F2EFE9`), Basalto Fumê (`#111110`) e acento contido em Terracota Corten (`#A65336`).
- **Movimento com Propósito:** toda animação (GSAP/Lenis) deve respeitar `prefers-reduced-motion` e manter fluidez sem bloquear o carregamento inicial.
- **Qualidade de Código:** garanta que `npm run build` (`tsc --noEmit && vite build`) passe sem avisos ou erros e que todos os controles interativos sejam acessíveis por teclado.

---

## Reportando Problemas

Ao abrir uma **Issue**, informe:
- Passos para reproduzir o comportamento
- Navegador, sistema operacional e resolução de tela (desktop/mobile)
- Mensagens de console ou resposta da API, se aplicável
