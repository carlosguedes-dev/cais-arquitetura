export interface ArchitecturalMaterial {
  id: string;
  code: string;
  name: string;
  origin: string;
  finish: string;
  swatchHex: string;
  swatchSecondary: string;
  patternType: 'concrete' | 'wood' | 'stone' | 'corten' | 'glass';
  description: string;
  agingNote: string;
  metrics: {
    density: string;
    thermal: string;
    acoustic: string;
    thickness: string;
  };
  appliedProjectId: string;
  appliedProjectName: string;
  sectionLayers: {
    label: string;
    spec: string;
    widthPct: number;
    fill: string;
  }[];
}

export const MATERIALS: ArchitecturalMaterial[] = [
  {
    id: 'concreto-ripado',
    code: 'MAT.01',
    name: 'Concreto Aparente Ripado',
    origin: 'Moldado in loco · Fôrma de pinus 7cm',
    finish: 'Sem pintura · Hidrofugante mineral fosco',
    swatchHex: '#9C988F',
    swatchSecondary: '#7D7970',
    patternType: 'concrete',
    description:
      'Estrutura e acabamento fundidos em um único gesto. As tábuas de pinus escovado transferem o veio orgânico da madeira para a massa mineral, suavizando a escala monumental.',
    agingNote:
      'Desenvolve micro-variações tonais sob chuva e maresia, integrando a edificação à rocha local sem necessidade de repintura.',
    metrics: {
      density: '2.420 kg/m³',
      thermal: '1,65 W/m·K',
      acoustic: '54 dB Rw',
      thickness: '250 mm',
    },
    appliedProjectId: 'galeria-cais-sul',
    appliedProjectName: 'Galeria Cais Sul',
    sectionLayers: [
      { label: 'Concreto fôrma pinus', spec: '120mm', widthPct: 44, fill: '#9C988F' },
      { label: 'Câmara térmica lã rocha', spec: '50mm', widthPct: 22, fill: '#C8B99E' },
      { label: 'Parede estrutural interna', spec: '80mm', widthPct: 34, fill: '#7B776F' },
    ],
  },
  {
    id: 'freijo-natural',
    code: 'MAT.02',
    name: 'Madeira Freijó Lavado',
    origin: 'Manejo certificado FSC · Pará, BR',
    finish: 'Óleo natural fosco · Escovação leve',
    swatchHex: '#A7845E',
    swatchSecondary: '#866747',
    patternType: 'wood',
    description:
      'Responsável pelo calor tátil e pelo conforto acústico dos interiores. Aplicada em forros contínuos, painéis pivotantes e brises que desenham sombras dinâmicas.',
    agingNote:
      'Sob luz solar filtrada, adquire tom mel acinzentado sereno, mantendo estabilidade dimensional em regiões úmidas.',
    metrics: {
      density: '620 kg/m³',
      thermal: '0,14 W/m·K',
      acoustic: 'NRC 0,68',
      thickness: '32 mm',
    },
    appliedProjectId: 'residencia-mirante-jardim',
    appliedProjectName: 'Residência Mirante Jardim',
    sectionLayers: [
      { label: 'Ripa maciça freijó', spec: '32mm', widthPct: 36, fill: '#A7845E' },
      { label: 'Manta acústica negra', spec: '18mm', widthPct: 20, fill: '#2B2A27' },
      { label: 'Subestrutura alumínio', spec: '40mm', widthPct: 44, fill: '#8E8B84' },
    ],
  },
  {
    id: 'travertino-bruto',
    code: 'MAT.03',
    name: 'Travertino Romano Bruto',
    origin: 'Corte de veio aberto · Sem resina',
    finish: 'Levogamento fosco · Poros naturais abertos',
    swatchHex: '#D8CFC0',
    swatchSecondary: '#BFB3A0',
    patternType: 'stone',
    description:
      'Pedra sedimentar deixada intencionalmente sem estuque ou brilho artificial. Seus poros abertos capturam a luz rasante e revelam a estratigrafia geológica da superfície.',
    agingNote:
      'Pisa-se descalço sem aquecer sob sol pleno graças à alta refletância difusa e baixa condução superficial.',
    metrics: {
      density: '2.510 kg/m³',
      thermal: '1,92 W/m·K',
      acoustic: '48 dB Rw',
      thickness: '40 mm',
    },
    appliedProjectId: 'casa-pedra-branca',
    appliedProjectName: 'Casa Pedra Branca',
    sectionLayers: [
      { label: 'Chapa travertino bruto', spec: '40mm', widthPct: 32, fill: '#D8CFC0' },
      { label: 'Argamassa flexível branca', spec: '15mm', widthPct: 16, fill: '#B6AEA0' },
      { label: 'Base monolítica armada', spec: '140mm', widthPct: 52, fill: '#8C887F' },
    ],
  },
  {
    id: 'aco-corten',
    code: 'MAT.04',
    name: 'Aço Corten Oxidado',
    origin: 'Liga patinável ASTM A588 · 6mm',
    finish: 'Oxidação natural estabilizada',
    swatchHex: '#8C4A32',
    swatchSecondary: '#5E2F1E',
    patternType: 'corten',
    description:
      'Chapas estruturais de aço patinável cuja camada superficial de óxido atua como escudo autônomo contra corrosão profunda, criando uma pele terracota fosca e mineral.',
    agingNote:
      'Transita do ocre quente ao marrom ferrugem profundo nos primeiros 18 meses, estabilizando-se por décadas.',
    metrics: {
      density: '7.850 kg/m³',
      thermal: '45 W/m·K',
      acoustic: '44 dB Rw',
      thickness: '6 mm + isol.',
    },
    appliedProjectId: 'refugio-araucaria',
    appliedProjectName: 'Refúgio Araucária',
    sectionLayers: [
      { label: 'Chapa Corten A588', spec: '6mm', widthPct: 14, fill: '#8C4A32' },
      { label: 'Câmara ventilada', spec: '45mm', widthPct: 30, fill: '#2B2926' },
      { label: 'Isolamento + vedação', spec: '120mm', widthPct: 56, fill: '#B3AA9B' },
    ],
  },
  {
    id: 'vidro-acustico',
    code: 'MAT.05',
    name: 'Vidro Extra-Clear Duplo',
    origin: 'Baixo teor de ferro · Câmara de argônio',
    finish: 'Antirreflexo neutro · Caixilho embutido',
    swatchHex: '#B6C4C2',
    swatchSecondary: '#7B8C8A',
    patternType: 'glass',
    description:
      'Transparência sem esverdeamento residual que elimina a barreira visual entre o interior e a paisagem, preservando rigoroso silêncio acústico e desempenho térmico.',
    agingNote:
      'Guias inferiores drenantes embutidas no nível do piso mantêm o plano contínuo sem degraus ou trilhos aparentes.',
    metrics: {
      density: '2.500 kg/m³',
      thermal: 'U = 1,1 W/m²K',
      acoustic: '43 dB Rw',
      thickness: '28 mm (8+12+8)',
    },
    appliedProjectId: 'pavilhao-da-neblina',
    appliedProjectName: 'Pavilhão da Neblina',
    sectionLayers: [
      { label: 'Lâmina Extra-Clear ext.', spec: '8mm', widthPct: 28, fill: '#B6C4C2' },
      { label: 'Câmara gás Argônio 90%', spec: '12mm', widthPct: 44, fill: '#E7ECEB' },
      { label: 'Lâmina laminada int.', spec: '8mm', widthPct: 28, fill: '#97A8A6' },
    ],
  },
];
