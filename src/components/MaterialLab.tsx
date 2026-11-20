import { useState } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { MATERIALS } from '../data/materials';
import { PROJECTS, type ArchitecturalProject } from '../data/projects';

interface MaterialLabProps {
  onSelectProject: (project: ArchitecturalProject) => void;
}

export function MaterialLab({ onSelectProject }: MaterialLabProps) {
  const [selectedId, setSelectedId] = useState(MATERIALS[0].id);

  const activeMaterial =
    MATERIALS.find((m) => m.id === selectedId) ?? MATERIALS[0];

  const linkedProject =
    PROJECTS.find((p) => p.id === activeMaterial.appliedProjectId) ?? PROJECTS[0];

  return (
    <section
      id="materiais"
      className="material-lab-section"
      data-header-tone="light"
    >
      <div className="container">
        <div className="section-head-split">
          <div>
            <span className="eyebrow tone-muted">03 · Biblioteca Matérica</span>
            <h2 className="serif-display section-title-dark">
              Tectônica e <em>verdade</em>
              <br />
              das superfícies.
            </h2>
          </div>

          <p className="section-intro-copy">
            Não aplicamos revestimentos para mascarar a estrutura. Selecionamos
            cinco materiais primários que suportam o tempo, absorvem a luz e
            revelam exatamente como o edifício se sustenta.
          </p>
        </div>

        <div className="material-lab-grid">
          {/* Left selector list */}
          <div className="material-list" role="tablist" aria-label="Materiais arquitetônicos">
            {MATERIALS.map((mat) => {
              const isSelected = mat.id === activeMaterial.id;
              return (
                <button
                  key={mat.id}
                  type="button"
                  role="tab"
                  aria-selected={isSelected}
                  className={`material-row-btn ${isSelected ? 'is-active' : ''}`}
                  onClick={() => setSelectedId(mat.id)}
                >
                  <span
                    className={`material-swatch pattern-${mat.patternType}`}
                    style={{
                      backgroundColor: mat.swatchHex,
                      ['--swatch-sec' as string]: mat.swatchSecondary,
                    }}
                    aria-hidden="true"
                  />
                  <span className="material-row-info">
                    <span className="mono material-code">{mat.code}</span>
                    <strong className="material-name">{mat.name}</strong>
                    <span className="material-origin">{mat.origin}</span>
                  </span>
                  <span className="material-indicator" aria-hidden="true" />
                </button>
              );
            })}
          </div>

          {/* Right detail & architectural section cut */}
          <div className="material-inspector" role="tabpanel" aria-live="polite">
            <div className="material-inspector-top">
              <div
                className={`material-plate pattern-${activeMaterial.patternType}`}
                style={{
                  backgroundColor: activeMaterial.swatchHex,
                  ['--swatch-sec' as string]: activeMaterial.swatchSecondary,
                }}
              >
                <div className="material-plate-meta mono">
                  <span>{activeMaterial.code}</span>
                  <span>{activeMaterial.metrics.thickness}</span>
                </div>
                <div className="material-plate-title serif-display">
                  {activeMaterial.name}
                </div>
              </div>

              <div className="material-copy-block">
                <p className="mono material-finish-label">
                  ACABAMENTO — {activeMaterial.finish}
                </p>
                <p className="material-description">{activeMaterial.description}</p>
                <p className="material-aging">{activeMaterial.agingNote}</p>
              </div>
            </div>

            {/* Technical metrics row */}
            <div className="material-metrics-grid">
              <div className="mat-metric">
                <span className="mono mat-metric-label">DENSIDADE</span>
                <span className="mono mat-metric-val">{activeMaterial.metrics.density}</span>
              </div>
              <div className="mat-metric">
                <span className="mono mat-metric-label">CONDUTIVIDADE</span>
                <span className="mono mat-metric-val">{activeMaterial.metrics.thermal}</span>
              </div>
              <div className="mat-metric">
                <span className="mono mat-metric-label">ISOLAMENTO</span>
                <span className="mono mat-metric-val">{activeMaterial.metrics.acoustic}</span>
              </div>
              <div className="mat-metric">
                <span className="mono mat-metric-label">ESPESSURA</span>
                <span className="mono mat-metric-val">{activeMaterial.metrics.thickness}</span>
              </div>
            </div>

            {/* Architectural Wall Section Diagram */}
            <div className="wall-section-box">
              <div className="wall-section-head mono">
                <span>CORTE CONSTRUTIVO ESQUEMÁTICO · ESCALA 1:10</span>
                <span>EXTERIOR → INTERIOR</span>
              </div>

              <div className="wall-layers-diagram" aria-label="Camadas construtivas do material">
                {activeMaterial.sectionLayers.map((layer) => (
                  <div
                    key={layer.label}
                    className="wall-layer-slice"
                    style={{ width: `${layer.widthPct}%` }}
                  >
                    <div
                      className="wall-layer-bar"
                      style={{ backgroundColor: layer.fill }}
                    />
                    <span className="mono wall-layer-spec">{layer.spec}</span>
                    <span className="wall-layer-label">{layer.label}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="material-inspector-footer">
              <span className="mono material-applied-tag">
                OBRA DE REFERÊNCIA
              </span>
              <button
                type="button"
                className="btn-architectural btn-on-light"
                onClick={() => onSelectProject(linkedProject)}
              >
                <span>Ver em {activeMaterial.appliedProjectName}</span>
                <ArrowUpRight size={15} strokeWidth={1.6} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
