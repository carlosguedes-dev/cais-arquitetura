import { useEffect, useState } from 'react';
import { X, ArrowUpRight } from 'lucide-react';
import { PROJECTS, type ArchitecturalProject } from '../data/projects';

interface IndexOverlayProps {
  open: boolean;
  onClose: () => void;
  onNavigate: (sectionId: string) => void;
  onSelectProject: (project: ArchitecturalProject) => void;
  onOpenBriefing: () => void;
}

const CHAPTERS = [
  { id: '#inicio', index: '00', label: 'Abertura', note: 'Pavilhão & Manifesto' },
  { id: '#obras', index: '01', label: 'Obras Selecionadas', note: 'Galeria Horizontal' },
  { id: '#profundidade', index: '02', label: 'Câmara de Luz', note: 'Profundidade & Sol' },
  { id: '#materiais', index: '03', label: 'Biblioteca Matérica', note: 'Cortes & Tectônica' },
  { id: '#metodo', index: '04', label: 'Método em Quatro Atos', note: 'Processo Construtivo' },
  { id: '#arquivo', index: '05', label: 'Arquivo Completo', note: '8 Obras Catalogadas' },
  { id: '#contato', index: '06', label: 'Estudo Preliminar', note: 'São Paulo & Lisboa' },
];

function formatCityTime(timeZone: string): string {
  try {
    return new Intl.DateTimeFormat('pt-BR', {
      hour: '2-digit',
      minute: '2-digit',
      timeZone,
    }).format(new Date());
  } catch {
    return '--:--';
  }
}

export function IndexOverlay({
  open,
  onClose,
  onNavigate,
  onSelectProject,
  onOpenBriefing,
}: IndexOverlayProps) {
  const [hoveredProject, setHoveredProject] = useState<ArchitecturalProject>(PROJECTS[0]);
  const [clocks, setClocks] = useState({
    sp: formatCityTime('America/Sao_Paulo'),
    lx: formatCityTime('Europe/Lisbon'),
  });

  useEffect(() => {
    if (!open) return;

    const update = () => {
      setClocks({
        sp: formatCityTime('America/Sao_Paulo'),
        lx: formatCityTime('Europe/Lisbon'),
      });
    };
    update();
    const timer = window.setInterval(update, 15000);

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKeyDown);

    return () => {
      window.clearInterval(timer);
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      id="architectural-index-overlay"
      className="index-overlay"
      role="dialog"
      aria-modal="true"
      aria-label="Índice Arquitetônico do Site"
      data-lenis-prevent
    >
      <div className="index-overlay-inner container">
        <div className="index-overlay-top">
          <div className="index-overlay-meta mono">
            <span>ÍNDICE GERAL</span>
            <span className="sep">/</span>
            <span>SÃO PAULO {clocks.sp}</span>
            <span className="sep">·</span>
            <span>LISBOA {clocks.lx}</span>
          </div>
          <button
            type="button"
            className="icon-close-btn"
            onClick={onClose}
            aria-label="Fechar índice"
          >
            <span className="mono">Fechar</span>
            <X size={18} strokeWidth={1.5} />
          </button>
        </div>

        <div className="index-overlay-grid">
          <div className="index-chapters">
            <p className="index-col-label mono">Capítulos</p>
            <ul className="index-chapter-list">
              {CHAPTERS.map((chapter) => (
                <li key={chapter.id}>
                  <button
                    type="button"
                    className="index-chapter-btn"
                    onClick={() => {
                      onClose();
                      window.setTimeout(() => onNavigate(chapter.id), 90);
                    }}
                  >
                    <span className="chapter-num mono">{chapter.index}</span>
                    <span className="chapter-title serif-display">{chapter.label}</span>
                    <span className="chapter-note mono">{chapter.note}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div className="index-featured-works">
            <p className="index-col-label mono">Acesso Direto às Monografias</p>
            <div className="index-preview-frame">
              <img src={hoveredProject.image} alt={hoveredProject.imageAlt} />
              <div className="index-preview-caption">
                <span className="mono">{hoveredProject.location}</span>
                <span className="mono">{hoveredProject.areaSqm} m²</span>
              </div>
            </div>

            <ul className="index-mini-works">
              {PROJECTS.slice(0, 5).map((project) => (
                <li key={project.id}>
                  <button
                    type="button"
                    className={`index-mini-work-btn ${
                      hoveredProject.id === project.id ? 'is-active' : ''
                    }`}
                    onMouseEnter={() => setHoveredProject(project)}
                    onFocus={() => setHoveredProject(project)}
                    onClick={() => {
                      onClose();
                      window.setTimeout(() => onSelectProject(project), 90);
                    }}
                  >
                    <span className="mono">{project.index}</span>
                    <span>{project.title}</span>
                    <ArrowUpRight size={14} strokeWidth={1.5} aria-hidden="true" />
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="index-overlay-bottom">
          <div className="index-addresses mono">
            <span>R. Mourato Coelho, 1140 — Pinheiros, São Paulo</span>
            <span>Rua Dom Pedro V, 84 — Príncipe Real, Lisboa</span>
          </div>
          <button
            type="button"
            className="btn-architectural btn-on-dark"
            onClick={() => {
              onClose();
              window.setTimeout(onOpenBriefing, 120);
            }}
          >
            <span>Agendar Conversa de Estudo</span>
            <ArrowUpRight size={16} strokeWidth={1.6} />
          </button>
        </div>
      </div>
    </div>
  );
}
