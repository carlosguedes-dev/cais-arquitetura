import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowDown, ArrowUpRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface HeroProps {
  onNavigate: (sectionId: string) => void;
}

export function Hero({ onNavigate }: HeroProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const mediaRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced || !sectionRef.current) return;

    const ctx = gsap.context(() => {
      // Calm, architectural entrance
      gsap.from('.hero-stagger', {
        y: 26,
        opacity: 0,
        duration: 1.05,
        stagger: 0.11,
        ease: 'power3.out',
        clearProps: 'transform,opacity',
      });

      // Multi-plane scroll depth separation
      gsap.to(mediaRef.current, {
        yPercent: 16,
        scale: 1.09,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      });

      gsap.to(contentRef.current, {
        yPercent: -12,
        opacity: 0.25,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      });

      gsap.to(frameRef.current, {
        yPercent: 7,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="inicio"
      ref={sectionRef}
      className="hero-section"
      data-header-tone="dark"
    >
      <div className="hero-media-layer" ref={mediaRef} aria-hidden="true">
        <img
          src="./images/hero-pavilion.jpg"
          alt=""
          className="hero-photo"
          fetchPriority="high"
        />
        <div className="hero-scrim" />
      </div>

      {/* Subtle architectural elevation frame moving at intermediate parallax speed */}
      <div className="hero-axis-layer" ref={frameRef} aria-hidden="true">
        <div className="container hero-axis-grid">
          <span className="axis-line axis-v-left" />
          <span className="axis-line axis-v-right" />
          <span className="axis-tick axis-tl mono">23°33′S 46°41′W</span>
          <span className="axis-tick axis-tr mono">ELEV. +765.00m</span>
        </div>
      </div>

      <div className="container hero-foreground" ref={contentRef}>
        <div className="hero-top-spacer" />

        <div className="hero-editorial">
          <p className="eyebrow hero-eyebrow hero-stagger">
            Arquitetura Contemporânea · São Paulo &amp; Lisboa
          </p>

          <h1 className="hero-title serif-display hero-stagger">
            Espaços que
            <br />
            <em>esculpem o silêncio</em>
            <br />e a luz natural.
          </h1>

          <div className="hero-lead-row hero-stagger">
            <p className="hero-lead">
              Desenhamos residências, pavilhões culturais e refúgios de longa
              permanência — onde concreto aparente, madeira nativa e sombra
              trabalham juntos com a paisagem.
            </p>

            <div className="hero-cta-group">
              <button
                type="button"
                className="btn-architectural btn-on-dark"
                onClick={() => onNavigate('#obras')}
              >
                <span>Explorar Obras</span>
                <ArrowUpRight size={16} strokeWidth={1.6} />
              </button>

              <button
                type="button"
                className="btn-text-link"
                onClick={() => onNavigate('#profundidade')}
              >
                <span>Estudo de Luz &amp; Profundidade</span>
                <ArrowDown size={15} strokeWidth={1.6} />
              </button>
            </div>
          </div>
        </div>

        <div className="hero-footer-bar hero-stagger">
          <div className="hero-caption-col">
            <span className="mono caption-label">EM DESTAQUE</span>
            <span className="caption-value">
              Casa Espelho Atlântica — Ubatuba, 2025
            </span>
          </div>

          <div className="hero-metrics-inline">
            <div>
              <span className="mono metric-k">38</span>
              <span className="metric-v">Obras Construídas</span>
            </div>
            <span className="metric-divider" aria-hidden="true" />
            <div>
              <span className="mono metric-k">14</span>
              <span className="metric-v">Anos de Prática</span>
            </div>
            <span className="metric-divider" aria-hidden="true" />
            <div>
              <span className="mono metric-k">02</span>
              <span className="metric-v">Ateliês · BR / PT</span>
            </div>
          </div>

          <button
            type="button"
            className="hero-scroll-cue mono"
            onClick={() => onNavigate('#manifesto')}
            aria-label="Rolar para o manifesto"
          >
            <span>Rolar</span>
            <span className="scroll-cue-line" aria-hidden="true" />
          </button>
        </div>
      </div>
    </section>
  );
}
