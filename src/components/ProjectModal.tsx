import { useEffect, useState } from 'react';
import { X, ArrowUpRight, Layers, Compass, Camera } from 'lucide-react';
import type { ArchitecturalProject } from '../data/projects';

interface ProjectModalProps {
  project: ArchitecturalProject | null;
  onClose: () => void;
  onRequestStudy: (projectTitle: string) => void;
}

type ViewTab = 'photo' | 'plan' | 'elevation';

export function ProjectModal({
  project,
  onClose,
  onRequestStudy,
}: ProjectModalProps) {
  const [viewTab, setViewTab] = useState<ViewTab>('photo');

  useEffect(() => {
    setViewTab('photo');
  }, [project?.id]);

  useEffect(() => {
    if (!project) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [project, onClose]);

  if (!project) return null;

  return (
    <div
      className="modal-backdrop"
      role="dialog"
      aria-modal="true"
      aria-labelledby="monograph-title"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      data-lenis-prevent
    >
      <div className="monograph-dialog">
        <div className="monograph-topbar">
          <div className="monograph-breadcrumb mono">
            <span>MONOGRAFIA {project.index}</span>
            <span className="sep">/</span>
            <span>{project.location}</span>
            <span className="sep">·</span>
            <span>{project.coordinates}</span>
          </div>

          <button
            type="button"
            className="icon-close-btn light-surface"
            onClick={onClose}
            aria-label="Fechar monografia"
          >
            <span className="mono">Fechar</span>
            <X size={18} strokeWidth={1.6} />
          </button>
        </div>

        <div className="monograph-scroll-body">
          <div className="monograph-hero-head">
            <div>
              <span className="mono monograph-cat-tag">
                {project.category} · {project.status} · {project.year}
              </span>
              <h2 id="monograph-title" className="serif-display monograph-title">
                {project.title}
              </h2>
              <p className="monograph-subtitle">{project.subtitle}</p>
            </div>

            <div className="monograph-view-switcher" role="tablist" aria-label="Modo de visualização da obra">
              <button
                type="button"
                role="tab"
                aria-selected={viewTab === 'photo'}
                className={`view-tab-btn mono ${viewTab === 'photo' ? 'is-active' : ''}`}
                onClick={() => setViewTab('photo')}
              >
                <Camera size={14} strokeWidth={1.6} />
                <span>Fotografia</span>
              </button>
              <button
                type="button"
                role="tab"
                aria-selected={viewTab === 'plan'}
                className={`view-tab-btn mono ${viewTab === 'plan' ? 'is-active' : ''}`}
                onClick={() => setViewTab('plan')}
              >
                <Compass size={14} strokeWidth={1.6} />
                <span>Planta</span>
              </button>
              <button
                type="button"
                role="tab"
                aria-selected={viewTab === 'elevation'}
                className={`view-tab-btn mono ${viewTab === 'elevation' ? 'is-active' : ''}`}
                onClick={() => setViewTab('elevation')}
              >
                <Layers size={14} strokeWidth={1.6} />
                <span>Corte</span>
              </button>
            </div>
          </div>

          <div className="monograph-visual-stage">
            {viewTab === 'photo' && (
              <div className="monograph-photo-frame">
                <img src={project.image} alt={project.imageAlt} />
              </div>
            )}

            {viewTab === 'plan' && (
              <div className="monograph-blueprint-frame">
                <div className="blueprint-meta-row mono">
                  <span>{project.planGeometry.lotLabel}</span>
                  <span>ORIENTAÇÃO {project.planGeometry.orientation}</span>
                </div>
                <svg
                  viewBox="0 0 380 190"
                  className="blueprint-svg"
                  role="img"
                  aria-label={`Planta baixa esquemática de ${project.title}`}
                >
                  <defs>
                    <pattern id="bpGrid" width="16" height="16" patternUnits="userSpaceOnUse">
                      <path
                        d="M 16 0 L 0 0 0 16"
                        fill="none"
                        stroke="rgba(20,20,18,0.07)"
                        strokeWidth="0.6"
                      />
                    </pattern>
                  </defs>
                  <rect width="380" height="190" fill="url(#bpGrid)" />
                  <line
                    x1="12"
                    y1={project.planGeometry.axisY}
                    x2="368"
                    y2={project.planGeometry.axisY}
                    stroke="#A65336"
                    strokeWidth="0.8"
                    strokeDasharray="4 4"
                  />
                  {project.planGeometry.rooms.map((room) => (
                    <g key={room.label}>
                      <rect
                        x={room.x}
                        y={room.y}
                        width={room.w}
                        height={room.h}
                        fill={room.accent ? 'rgba(166, 83, 54, 0.12)' : 'rgba(20, 20, 18, 0.04)'}
                        stroke={room.accent ? '#A65336' : '#141412'}
                        strokeWidth={room.accent ? '1.4' : '1'}
                      />
                      <text
                        x={room.x + room.w / 2}
                        y={room.y + room.h / 2 + 3}
                        textAnchor="middle"
                        className="bp-svg-label"
                      >
                        {room.label}
                      </text>
                    </g>
                  ))}
                  {/* North indicator */}
                  <g transform="translate(346, 26)">
                    <circle cx="0" cy="0" r="11" fill="none" stroke="#141412" strokeWidth="0.8" />
                    <path d="M 0 -8 L 3 4 L 0 1 L -3 4 Z" fill="#A65336" />
                    <text x="0" y="21" textAnchor="middle" className="bp-svg-label">
                      N
                    </text>
                  </g>
                </svg>
                <div className="blueprint-meta-row mono">
                  <span>ESCALA GRÁFICA 1:150</span>
                  <span>{project.planGeometry.cantilever}</span>
                </div>
              </div>
            )}

            {viewTab === 'elevation' && (
              <div className="monograph-blueprint-frame">
                <div className="blueprint-meta-row mono">
                  <span>CORTE LONGITUDINAL AA′</span>
                  <span>{project.elevation}</span>
                </div>
                <svg
                  viewBox="0 0 380 190"
                  className="blueprint-svg"
                  role="img"
                  aria-label={`Corte de elevação esquemático de ${project.title}`}
                >
                  {/* Ground line */}
                  <line x1="14" y1="142" x2="366" y2="142" stroke="#141412" strokeWidth="1.4" />
                  <path
                    d="M 14 142 Q 110 152 190 144 T 366 150 L 366 176 L 14 176 Z"
                    fill="rgba(20,20,18,0.06)"
                  />
                  {/* Structural roof slab cantilever */}
                  <rect x="46" y="58" width="286" height="12" fill="#141412" />
                  {/* Columns */}
                  <rect x="96" y="70" width="12" height="72" fill="#56524A" />
                  <rect x="242" y="70" width="12" height="72" fill="#56524A" />
                  {/* Glazed interior envelope */}
                  <rect
                    x="108"
                    y="70"
                    width="134"
                    height="72"
                    fill="rgba(166, 83, 54, 0.08)"
                    stroke="#A65336"
                    strokeWidth="0.9"
                  />
                  {/* Solar ray geometry */}
                  <line
                    x1="28"
                    y1="18"
                    x2="176"
                    y2="142"
                    stroke="#A65336"
                    strokeWidth="0.9"
                    strokeDasharray="3 3"
                  />
                  <line
                    x1="58"
                    y1="18"
                    x2="206"
                    y2="142"
                    stroke="#A65336"
                    strokeWidth="0.9"
                    strokeDasharray="3 3"
                  />
                  <text x="190" y="45" textAnchor="middle" className="bp-svg-label">
                    LAJE PROTENDIDA · {project.planGeometry.cantilever}
                  </text>
                  <text x="175" y="110" textAnchor="middle" className="bp-svg-label">
                    VENTILAÇÃO CRUZADA + LUZ INDIRETA
                  </text>
                </svg>
                <div className="blueprint-meta-row mono">
                  <span>INCIDÊNCIA SOLAR SOLSTÍCIO VERÃO 68°</span>
                  <span>PÉ-DIREITO LIVRE · MATÉRIA APARENTE</span>
                </div>
              </div>
            )}
          </div>

          <div className="monograph-content-grid">
            <div className="monograph-narrative">
              <p className="monograph-summary-lead">{project.summary}</p>
              {project.narrative.map((para) => (
                <p key={para}>{para}</p>
              ))}
            </div>

            <div className="monograph-specs-col">
              <div className="monograph-spec-group">
                <span className="mono spec-heading">FICHA TÉCNICA</span>
                <dl className="monograph-dl">
                  {project.program.map((item) => (
                    <div key={item.label} className="monograph-dl-row">
                      <dt>{item.label}</dt>
                      <dd className="mono">{item.value}</dd>
                    </div>
                  ))}
                </dl>
              </div>

              <div className="monograph-spec-group">
                <span className="mono spec-heading">PALETA CONSTRUTIVA</span>
                <div className="monograph-material-tags">
                  {project.materials.map((mat) => (
                    <span key={mat} className="mono mat-tag">
                      {mat}
                    </span>
                  ))}
                </div>
              </div>

              <button
                type="button"
                className="btn-architectural btn-on-light btn-full"
                onClick={() => onRequestStudy(project.title)}
              >
                <span>Solicitar Estudo com Esta Referência</span>
                <ArrowUpRight size={16} strokeWidth={1.6} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
