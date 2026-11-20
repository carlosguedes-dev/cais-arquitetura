import { useMemo, useState } from 'react';
import { ArrowUpRight, ArrowUpDown } from 'lucide-react';
import {
  PROJECTS,
  type ArchitecturalProject,
  type ProjectCategory,
} from '../data/projects';

interface WorksArchiveProps {
  onSelectProject: (project: ArchitecturalProject) => void;
}

const CATEGORIES: ('Todas' | ProjectCategory)[] = [
  'Todas',
  'Residencial',
  'Cultural',
  'Refúgio',
];

type SortMode = 'year' | 'area';

export function WorksArchive({ onSelectProject }: WorksArchiveProps) {
  const [category, setCategory] = useState<'Todas' | ProjectCategory>('Todas');
  const [sortBy, setSortBy] = useState<SortMode>('year');
  const [hoveredId, setHoveredId] = useState<string>(PROJECTS[0].id);

  const filteredProjects = useMemo(() => {
    const base =
      category === 'Todas'
        ? [...PROJECTS]
        : PROJECTS.filter((p) => p.category === category);

    base.sort((a, b) =>
      sortBy === 'year' ? b.year - a.year : b.areaSqm - a.areaSqm
    );
    return base;
  }, [category, sortBy]);

  const previewProject =
    filteredProjects.find((p) => p.id === hoveredId) ??
    filteredProjects[0] ??
    PROJECTS[0];

  return (
    <section
      id="arquivo"
      className="archive-section"
      data-header-tone="light"
    >
      <div className="container">
        <div className="archive-header">
          <div>
            <span className="eyebrow tone-muted">05 · Arquivo Completo</span>
            <h2 className="serif-display section-title-dark">
              Índice de <em>obras</em>
              <br />e pesquisas.
            </h2>
          </div>

          <div className="archive-toolbar">
            <div className="archive-filters" role="group" aria-label="Filtrar obras por categoria">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  className={`filter-chip mono ${category === cat ? 'is-active' : ''}`}
                  onClick={() => setCategory(cat)}
                  aria-pressed={category === cat}
                >
                  {cat}
                </button>
              ))}
            </div>

            <button
              type="button"
              className="sort-toggle-btn mono"
              onClick={() => setSortBy((prev) => (prev === 'year' ? 'area' : 'year'))}
              aria-label="Alternar critério de ordenação"
            >
              <ArrowUpDown size={14} strokeWidth={1.6} aria-hidden="true" />
              <span>
                Ordenar: {sortBy === 'year' ? 'Mais recentes' : 'Maior área'}
              </span>
            </button>
          </div>
        </div>

        <div className="archive-body-grid">
          <div className="archive-table" role="list">
            <div className="archive-table-head mono" aria-hidden="true">
              <span>Nº</span>
              <span>Obra</span>
              <span>Localização</span>
              <span>Tipologia</span>
              <span>Área</span>
              <span>Ano</span>
              <span />
            </div>

            {filteredProjects.map((project) => (
              <button
                key={project.id}
                type="button"
                role="listitem"
                className={`archive-row ${previewProject.id === project.id ? 'is-hovered' : ''}`}
                onMouseEnter={() => setHoveredId(project.id)}
                onFocus={() => setHoveredId(project.id)}
                onClick={() => onSelectProject(project)}
              >
                <span className="mono row-idx">{project.index}</span>
                <span className="row-title serif-display">{project.title}</span>
                <span className="row-loc">{project.location}</span>
                <span className="mono row-cat">{project.category}</span>
                <span className="mono row-area">{project.areaSqm} m²</span>
                <span className="mono row-year">{project.year}</span>
                <span className="row-arrow" aria-hidden="true">
                  <ArrowUpRight size={16} strokeWidth={1.5} />
                </span>
              </button>
            ))}
          </div>

          <aside className="archive-preview-card" aria-label="Pré-visualização da obra selecionada">
            <div className="archive-preview-img-wrap">
              <img
                key={previewProject.id}
                src={previewProject.image}
                alt={previewProject.imageAlt}
              />
            </div>
            <div className="archive-preview-body">
              <div className="mono archive-preview-meta">
                <span>{previewProject.status}</span>
                <span>{previewProject.coordinates}</span>
              </div>
              <h3 className="serif-display">{previewProject.title}</h3>
              <p>{previewProject.summary}</p>
              <button
                type="button"
                className="archive-preview-btn mono"
                onClick={() => onSelectProject(previewProject)}
              >
                <span>Ler Monografia Completa</span>
                <ArrowUpRight size={14} strokeWidth={1.6} />
              </button>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
