import { useEffect, useRef, useState, useCallback } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowLeft, ArrowRight, ArrowUpRight } from 'lucide-react';
import { PROJECTS, type ArchitecturalProject } from '../data/projects';

gsap.registerPlugin(ScrollTrigger);

interface HorizontalWorksProps {
  onSelectProject: (project: ArchitecturalProject) => void;
  scrollToPosition: (y: number) => void;
}

const FEATURED_WORKS = PROJECTS.filter((p) => p.featured);

export function HorizontalWorks({
  onSelectProject,
  scrollToPosition,
}: HorizontalWorksProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<ScrollTrigger | null>(null);

  const [activeIndex, setActiveIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isDesktop, setIsDesktop] = useState(true);

  useEffect(() => {
    const mm = gsap.matchMedia();

    mm.add('(min-width: 960px)', () => {
      setIsDesktop(true);
      const section = sectionRef.current;
      const track = trackRef.current;
      if (!section || !track) return;

      const getMaxScroll = () => Math.max(0, track.scrollWidth - window.innerWidth);

      const tween = gsap.to(track, {
        x: () => -getMaxScroll(),
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: () => `+=${Math.max(getMaxScroll() * 1.15, window.innerHeight * 2.2)}`,
          pin: true,
          scrub: 0.9,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            setProgress(self.progress);
            const idx = Math.min(
              FEATURED_WORKS.length - 1,
              Math.round(self.progress * (FEATURED_WORKS.length - 1))
            );
            setActiveIndex(idx);

            // Subtle internal counter-parallax on each project image
            const imgs = track.querySelectorAll<HTMLImageElement>('.h-work-img');
            imgs.forEach((img, i) => {
              const localCenter = i / Math.max(1, FEATURED_WORKS.length - 1);
              const delta = (self.progress - localCenter) * 48;
              img.style.transform = `scale(1.12) translate3d(${delta.toFixed(1)}px, 0, 0)`;
            });
          },
        },
      });

      triggerRef.current = tween.scrollTrigger ?? null;

      return () => {
        triggerRef.current = null;
        tween.kill();
      };
    });

    mm.add('(max-width: 959px)', () => {
      setIsDesktop(false);
      triggerRef.current = null;
    });

    return () => mm.revert();
  }, []);

  const jumpToSlide = useCallback(
    (targetIdx: number) => {
      const clamped = Math.max(0, Math.min(FEATURED_WORKS.length - 1, targetIdx));
      setActiveIndex(clamped);

      if (isDesktop && triggerRef.current) {
        const st = triggerRef.current;
        const frac = clamped / Math.max(1, FEATURED_WORKS.length - 1);
        const targetY = st.start + (st.end - st.start) * frac;
        scrollToPosition(targetY);
        return;
      }

      // Mobile native horizontal scroll
      const stage = stageRef.current;
      const cards = stage?.querySelectorAll<HTMLElement>('.h-work-card');
      const card = cards?.[clamped];
      if (card && stage) {
        stage.scrollTo({
          left: Math.max(0, card.offsetLeft - 20),
          behavior: 'smooth',
        });
      }
    },
    [isDesktop, scrollToPosition]
  );

  // Track mobile horizontal swipe state
  const handleMobileScroll = useCallback(() => {
    if (isDesktop || !stageRef.current) return;
    const stage = stageRef.current;
    const max = stage.scrollWidth - stage.clientWidth;
    if (max <= 0) return;
    const ratio = stage.scrollLeft / max;
    setProgress(ratio);
    setActiveIndex(
      Math.min(FEATURED_WORKS.length - 1, Math.round(ratio * (FEATURED_WORKS.length - 1)))
    );
  }, [isDesktop]);

  const currentProject = FEATURED_WORKS[activeIndex] ?? FEATURED_WORKS[0];

  return (
    <section
      id="obras"
      ref={sectionRef}
      className="horizontal-works-section"
      data-header-tone="dark"
    >
      <div className="h-works-chrome container">
        <div className="h-works-heading">
          <span className="eyebrow">01 · Obras Selecionadas</span>
          <div className="h-works-live-meta mono">
            <span>{currentProject.location}</span>
            <span className="sep">/</span>
            <span>{currentProject.coordinates}</span>
          </div>
        </div>

        <div className="h-works-controls">
          <div className="h-index-pills" role="tablist" aria-label="Selecionar obra em destaque">
            {FEATURED_WORKS.map((work, i) => (
              <button
                key={work.id}
                type="button"
                role="tab"
                aria-selected={activeIndex === i}
                className={`h-pill mono ${activeIndex === i ? 'is-active' : ''}`}
                onClick={() => jumpToSlide(i)}
              >
                {work.index}
              </button>
            ))}
          </div>

          <div className="h-arrow-group">
            <button
              type="button"
              className="h-arrow-btn"
              onClick={() => jumpToSlide(activeIndex - 1)}
              disabled={activeIndex === 0}
              aria-label="Obra anterior"
            >
              <ArrowLeft size={16} strokeWidth={1.6} />
            </button>
            <button
              type="button"
              className="h-arrow-btn"
              onClick={() => jumpToSlide(activeIndex + 1)}
              disabled={activeIndex === FEATURED_WORKS.length - 1}
              aria-label="Próxima obra"
            >
              <ArrowRight size={16} strokeWidth={1.6} />
            </button>
          </div>
        </div>
      </div>

      <div
        className="h-works-viewport"
        ref={stageRef}
        onScroll={handleMobileScroll}
      >
        <div className="h-works-track" ref={trackRef}>
          <div className="h-works-intro-panel">
            <h2 className="serif-display h-intro-title">
              Cinco escalas,
              <br />
              <em>um mesmo silêncio.</em>
            </h2>
            <p className="h-intro-copy">
              Role para percorrer lateralmente o portfólio curado. Cada obra é
              enquadrada na sua proporção espacial original — da horizontalidade
              costeira à verticalidade urbana.
            </p>
            <div className="h-intro-hint mono">
              <span>DESLIZE LATERAL</span>
              <span className="h-hint-line" />
              <span>01 — 05</span>
            </div>
          </div>

          {FEATURED_WORKS.map((project, idx) => (
            <article
              key={project.id}
              className={`h-work-card aspect-${project.aspect} ${
                activeIndex === idx ? 'is-focused' : ''
              }`}
            >
              <button
                type="button"
                className="h-work-figure-btn"
                onClick={() => onSelectProject(project)}
                aria-label={`Abrir monografia completa de ${project.title}`}
              >
                <div className="h-work-frame">
                  <img
                    src={project.image}
                    alt={project.imageAlt}
                    className="h-work-img"
                    decoding="async"
                  />
                  <div className="h-work-frame-badge mono">
                    <span>{project.index}</span>
                    <span>{project.elevation}</span>
                  </div>
                </div>
              </button>

              <div className="h-work-meta">
                <div className="h-work-meta-top">
                  <span className="mono h-work-cat">
                    {project.category} · {project.year}
                  </span>
                  <span className="mono h-work-area">{project.areaSqm} m²</span>
                </div>

                <h3 className="serif-display h-work-title">{project.title}</h3>
                <p className="h-work-sub">{project.subtitle}</p>

                <button
                  type="button"
                  className="h-work-open-link"
                  onClick={() => onSelectProject(project)}
                >
                  <span>Abrir Monografia</span>
                  <ArrowUpRight size={15} strokeWidth={1.6} />
                </button>
              </div>
            </article>
          ))}

          <div className="h-works-tail-spacer" aria-hidden="true" />
        </div>
      </div>

      <div className="h-works-progress-bar container">
        <span className="mono progress-counter">
          {String(activeIndex + 1).padStart(2, '0')} /{' '}
          {String(FEATURED_WORKS.length).padStart(2, '0')}
        </span>
        <div className="progress-rail">
          <div
            className="progress-fill"
            style={{ transform: `scaleX(${Math.max(0.06, progress)})` }}
          />
        </div>
        <span className="mono progress-title">{currentProject.title}</span>
      </div>
    </section>
  );
}
