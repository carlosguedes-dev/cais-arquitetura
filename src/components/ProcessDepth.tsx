const PROCESS_ACTS = [
  {
    number: '01',
    duration: 'SEMANAS 01 — 04',
    title: 'Leitura Silenciosa do Sítio',
    summary:
      'Antes do primeiro traço, visitamos o terreno em três horários distintos. Mapeamos ventos dominantes, cartas solares de solstício, drenagem natural, vizinhança acústica e flora preservável.',
    deliverables: ['Estudo Solar & Eólico', 'Levantamento Topográfico', 'Maquete de Massa 1:200'],
  },
  {
    number: '02',
    duration: 'SEMANAS 05 — 12',
    title: 'Volumetria, Luz & Proporção',
    summary:
      'Definimos a implantação, os grandes vãos e a relação entre cheios e vazios. Validamos o desenho em modelos físicos de madeira balsa e simulações de iluminação natural real.',
    deliverables: ['Anteprojeto Arquitetônico', 'Cortes de Iluminação', 'Paleta Matérica Física'],
  },
  {
    number: '03',
    duration: 'SEMANAS 13 — 22',
    title: 'Compatibilização & Tectônica',
    summary:
      'Cada encontro entre concreto, vidro e madeira é resolvido em escala 1:5 antes de ir para o canteiro. Estrutura, drenagem, acústica e luminotécnica nascem integrados em BIM.',
    deliverables: ['Projeto Executivo Completo', 'Caderno de Esquadrias', 'Coordenação Estrutural'],
  },
  {
    number: '04',
    duration: 'DA FUNDAÇÃO À ENTREGA',
    title: 'Presença de Obra & Curadoria',
    summary:
      'Acompanhamos concretagens, escolha de pranchas de madeira na serraria e testes de luz noturna in loco. O projeto só se encerra quando o espaço respira como desenhado.',
    deliverables: ['Visitas Técnicas Quinzenais', 'Aprovação de Protótipos', 'As-Built & Manutenção'],
  },
];

export function ProcessDepth() {
  return (
    <section
      id="metodo"
      className="process-section"
      data-header-tone="light"
    >
      <div className="container">
        <div className="process-layout">
          <div className="process-sticky-col">
            <span className="eyebrow tone-muted">04 · Processo</span>
            <h2 className="serif-display section-title-dark">
              Método em
              <br />
              <em>quatro atos.</em>
            </h2>
            <p className="process-lead">
              Cada obra atravessa quatro camadas sucessivas de rigor. Aceitamos
              no máximo seis novos projetos por ano para garantir autoria direta
              dos sócios do estudo inicial ao último acabamento.
            </p>

            <div className="process-studio-figure">
              <img
                src="./images/studio-atelier.jpg"
                alt="Mesa monolítica em travertino do ateliê CAIS com maquete em madeira e amostras de pedra e concreto"
                decoding="async"
              />
              <span className="mono figure-caption">
                ATELIÊ PINHEIROS · ESTUDO DE MAQUETE 1:100
              </span>
            </div>
          </div>

          <div className="process-cards-stack">
            {PROCESS_ACTS.map((act, index) => (
              <article
                key={act.number}
                className="process-depth-card"
                style={{
                  ['--stack-index' as string]: index,
                }}
              >
                <div className="process-card-top mono">
                  <span className="process-card-num">ATO {act.number}</span>
                  <span className="process-card-dur">{act.duration}</span>
                </div>

                <h3 className="serif-display process-card-title">{act.title}</h3>
                <p className="process-card-body">{act.summary}</p>

                <ul className="process-deliverables">
                  {act.deliverables.map((item) => (
                    <li key={item} className="mono">
                      {item}
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
