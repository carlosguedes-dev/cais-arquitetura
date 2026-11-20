import { useEffect, useState } from 'react';
import { ArrowUpRight } from 'lucide-react';

interface HeaderProps {
  onNavigate: (sectionId: string) => void;
  onOpenIndex: () => void;
  onOpenBriefing: () => void;
  indexOpen: boolean;
}

const NAV_ITEMS = [
  { id: '#obras', label: 'Obras' },
  { id: '#profundidade', label: 'Luz & Profundidade' },
  { id: '#materiais', label: 'Matéria' },
  { id: '#arquivo', label: 'Arquivo' },
];

export function Header({
  onNavigate,
  onOpenIndex,
  onOpenBriefing,
  indexOpen,
}: HeaderProps) {
  const [scrolled, setScrolled] = useState(false);
  const [tone, setTone] = useState<'dark' | 'light'>('dark');

  useEffect(() => {
    const updateHeaderState = () => {
      const y = window.scrollY;
      setScrolled(y > 48);

      const probeY = 44;
      const sections = document.querySelectorAll<HTMLElement>('[data-header-tone]');
      let activeTone: 'dark' | 'light' = 'dark';
      sections.forEach((sec) => {
        const rect = sec.getBoundingClientRect();
        if (rect.top <= probeY && rect.bottom > probeY) {
          const attr = sec.dataset.headerTone;
          if (attr === 'light' || attr === 'dark') {
            activeTone = attr;
          }
        }
      });
      setTone(activeTone);
    };

    updateHeaderState();
    window.addEventListener('scroll', updateHeaderState, { passive: true });
    window.addEventListener('resize', updateHeaderState, { passive: true });
    return () => {
      window.removeEventListener('scroll', updateHeaderState);
      window.removeEventListener('resize', updateHeaderState);
    };
  }, []);

  return (
    <header
      className={`site-header ${scrolled ? 'is-scrolled' : ''} tone-${tone}`}
      role="banner"
    >
      <div className="container header-inner">
        <a
          href="#inicio"
          className="brand-mark"
          onClick={(e) => {
            e.preventDefault();
            onNavigate('#inicio');
          }}
          aria-label="CAIS Arquitetura — Voltar ao início"
        >
          <span className="brand-square" aria-hidden="true">
            <span className="brand-square-cross" />
          </span>
          <span className="brand-wordmark">
            <strong>CAIS</strong>
            <span className="brand-sub mono">SP · LX</span>
          </span>
        </a>

        <nav className="header-nav" aria-label="Navegação principal">
          {NAV_ITEMS.map((item) => (
            <a
              key={item.id}
              href={item.id}
              className="header-nav-link"
              onClick={(e) => {
                e.preventDefault();
                onNavigate(item.id);
              }}
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="header-actions">
          <button
            type="button"
            className="header-index-btn mono"
            onClick={onOpenIndex}
            aria-expanded={indexOpen}
            aria-controls="architectural-index-overlay"
          >
            <span className="index-bars" aria-hidden="true">
              <span />
              <span />
            </span>
            <span>Índice</span>
          </button>

          <button
            type="button"
            className="header-cta"
            onClick={onOpenBriefing}
          >
            <span>Iniciar Projeto</span>
            <ArrowUpRight size={15} strokeWidth={1.6} aria-hidden="true" />
          </button>
        </div>
      </div>
    </header>
  );
}
