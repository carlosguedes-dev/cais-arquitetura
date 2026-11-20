import { BriefingForm } from './BriefingForm';

interface BriefingSectionProps {
  referenceProject?: string;
}

export function BriefingSection({ referenceProject }: BriefingSectionProps) {
  return (
    <section
      id="contato"
      className="briefing-section"
      data-header-tone="dark"
    >
      <div className="container">
        <div className="briefing-grid">
          <div className="briefing-info-col">
            <span className="eyebrow">06 · Estudo Preliminar</span>
            <h2 className="serif-display briefing-title">
              Cada projeto começa
              <br />
              em uma <em>conversa calma.</em>
            </h2>
            <p className="briefing-lead">
              Recebemos solicitações para residências autorais, espaços
              culturais e refúgios no Brasil e em Portugal. Envie as diretrizes
              iniciais do seu terreno para agendarmos uma primeira sessão com
              os arquitetos titulares.
            </p>

            <div className="studio-offices-grid">
              <div className="office-block">
                <span className="mono office-city">SÃO PAULO</span>
                <p>Rua Mourato Coelho, 1140</p>
                <p>Pinheiros · 05417-002</p>
                <span className="mono office-phone">+55 11 3082-4190</span>
              </div>

              <div className="office-block">
                <span className="mono office-city">LISBOA</span>
                <p>Rua Dom Pedro V, 84</p>
                <p>Príncipe Real · 1250-094</p>
                <span className="mono office-phone">+351 21 346-0821</span>
              </div>
            </div>
          </div>

          <div className="briefing-form-shell">
            <BriefingForm initialReference={referenceProject} />
          </div>
        </div>
      </div>
    </section>
  );
}
