import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function ManifestoStrip() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced || !sectionRef.current) return;

    const ctx = gsap.context(() => {
      gsap.from('.manifesto-reveal', {
        y: 32,
        opacity: 0,
        duration: 0.9,
        stagger: 0.12,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 76%',
          once: true,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="manifesto"
      ref={sectionRef}
      className="manifesto-section"
      data-header-tone="light"
    >
      <div className="container">
        <div className="manifesto-grid">
          <div className="manifesto-left manifesto-reveal">
            <span className="eyebrow tone-muted">00 · Princípio</span>
            <p className="manifesto-note mono">
              ARQUITETURA NÃO É FACHADA.
              <br />É O CORTE EXATO POR ONDE
              <br />A LUZ ENTRA NO DIA.
            </p>
          </div>

          <div className="manifesto-right">
            <h2 className="manifesto-statement serif-display manifesto-reveal">
              Reduzimos o projeto ao que permanece quando tudo o que é excesso
              se retira: <em>proporção, matéria honesta</em> e a temperatura do
              tempo sobre a pedra.
            </h2>

            <div className="manifesto-columns manifesto-reveal">
              <p>
                Cada implantação nasce de uma leitura silenciosa do terreno —
                ventos predominantes, insolação de inverno e verão, escoamento
                da chuva e a escala exata da vegetação existente.
              </p>
              <p>
                Em vez de importar soluções prontas, combinamos estrutura
                aparente, madeira brasileira certificada e pedras brutas para
                construir espaços que envelhecem com dignidade ao longo de
                décadas.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
