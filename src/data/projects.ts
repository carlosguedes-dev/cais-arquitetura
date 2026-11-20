export type ProjectCategory = 'Residencial' | 'Cultural' | 'Refúgio';

export interface ArchitecturalProject {
  id: string;
  index: string;
  title: string;
  subtitle: string;
  category: ProjectCategory;
  location: string;
  coordinates: string;
  year: number;
  areaSqm: number;
  elevation: string;
  status: 'Concluída' | 'Em Obra' | 'Estudo Final';
  featured: boolean;
  aspect: 'wide' | 'tall' | 'editorial';
  image: string;
  imageAlt: string;
  summary: string;
  narrative: string[];
  materials: string[];
  materialIds: string[];
  program: {
    label: string;
    value: string;
  }[];
  planGeometry: {
    lotLabel: string;
    orientation: string;
    cantilever: string;
    rooms: { x: number; y: number; w: number; h: number; label: string; accent?: boolean }[];
    axisY: number;
  };
}

export const PROJECTS: ArchitecturalProject[] = [
  {
    id: 'casa-pedra-branca',
    index: '01',
    title: 'Casa Pedra Branca',
    subtitle: 'Balanço em travertino bruto sobre matacões costeiros',
    category: 'Residencial',
    location: 'Paraty, RJ',
    coordinates: '23°13′S 44°42′W',
    year: 2026,
    areaSqm: 680,
    elevation: 'ELEV. +18.40m',
    status: 'Concluída',
    featured: true,
    aspect: 'wide',
    image: '/images/work-pedra-branca.jpg',
    imageAlt: 'Casa Pedra Branca — residência em travertino bruto e concreto aparente sobre rochas costeiras em Paraty',
    summary:
      'Implantada entre matacões de granito originais sem escavação agressiva, a laje protendida de 14 metros filtra o sol atlântico e enquadra a linha de neblina do mar.',
    narrative: [
      'Em vez de nivelar a encosta, a arquitetura pousa em três apoios estruturais pontuais que respeitam a drenagem natural das pedras. O vazio sob a casa mantém a brisa marinha circulando continuamente, reduzindo a carga térmica interna em até 6 °C.',
      'No pavimento social, o travertino romano bruto encontra o forro contínuo de freijó lavado. Caixilhos minimalistas recolhem-se integralmente em nichos de alvenaria, dissolvendo o limite entre sala, terraço e horizonte.',
    ],
    materials: ['Travertino Romano Bruto', 'Concreto Ripado', 'Freijó Natural', 'Vidro Extra-Clear'],
    materialIds: ['travertino-bruto', 'concreto-ripado', 'freijo-natural', 'vidro-acustico'],
    program: [
      { label: 'Área Construída', value: '680 m²' },
      { label: 'Terreno', value: '3.400 m²' },
      { label: 'Vão Livre', value: '14,20 m' },
      { label: 'Conclusão', value: '2026' },
    ],
    planGeometry: {
      lotLabel: 'COTA +18.40 · EIXO MAR',
      orientation: 'N 24° E',
      cantilever: 'BALANÇO 6.40m',
      axisY: 112,
      rooms: [
        { x: 34, y: 54, w: 92, h: 64, label: 'SUÍTE MASTER' },
        { x: 132, y: 54, w: 126, h: 64, label: 'ESTAR + VARANDA', accent: true },
        { x: 264, y: 54, w: 72, h: 64, label: 'COZINHA' },
        { x: 132, y: 124, w: 164, h: 28, label: 'ESPELHO D’ÁGUA' },
      ],
    },
  },
  {
    id: 'pavilhao-da-neblina',
    index: '02',
    title: 'Pavilhão da Neblina',
    subtitle: 'Prisma de aço enegrecido suspenso sobre vale de araucárias',
    category: 'Cultural',
    location: 'Campos do Jordão, SP',
    coordinates: '22°44′S 45°35′W',
    year: 2025,
    areaSqm: 940,
    elevation: 'ELEV. +1.640m',
    status: 'Concluída',
    featured: true,
    aspect: 'editorial',
    image: '/images/work-pavilhao-neblina.jpg',
    imageAlt: 'Pavilhão da Neblina — estrutura horizontal em aço escovado escuro e vidro suspensa sobre vale enevoado',
    summary:
      'Um espaço de escuta e exposições temporárias desenhado para quase desaparecer quando a cerração da Mantiqueira sobe pelo vale.',
    narrative: [
      'A estrutura metálica treliçada vence 28 metros livres apoiada em dois núcleos monolíticos de concreto escuro. Do lado de fora, o ritmo de montantes de aço escovado ecoa a verticalidade dos pinheiros ao redor.',
      'O teto em ripado acústico de cedro aquece a luz difusa da serra e absorve reverberações, criando uma nave de silêncio onde bancos monolíticos de pedra convidam à permanência sem pressa.',
    ],
    materials: ['Aço Enegrecido', 'Concreto Ripado', 'Freijó Natural', 'Vidro Acústico Duplo'],
    materialIds: ['aco-corten', 'concreto-ripado', 'freijo-natural', 'vidro-acustico'],
    program: [
      { label: 'Área Construída', value: '940 m²' },
      { label: 'Vão Central', value: '28,00 m' },
      { label: 'Altitude', value: '1.640 m' },
      { label: 'Conclusão', value: '2025' },
    ],
    planGeometry: {
      lotLabel: 'COTA +1640.00 · VALE SUL',
      orientation: 'S 12° W',
      cantilever: 'BALANÇO 8.50m',
      axisY: 96,
      rooms: [
        { x: 26, y: 66, w: 68, h: 60, label: 'FOYER' },
        { x: 100, y: 66, w: 178, h: 60, label: 'NAVE EXPOSITIVA', accent: true },
        { x: 284, y: 66, w: 58, h: 60, label: 'MIRANTE' },
      ],
    },
  },
  {
    id: 'galeria-cais-sul',
    index: '03',
    title: 'Galeria Cais Sul',
    subtitle: 'Luz zenital esculpida em concreto aparente de pé-direito duplo',
    category: 'Cultural',
    location: 'Porto Alegre, RS',
    coordinates: '30°01′S 51°13′W',
    year: 2025,
    areaSqm: 1420,
    elevation: 'ELEV. +6.20m',
    status: 'Concluída',
    featured: true,
    aspect: 'tall',
    image: '/images/work-galeria-cais.jpg',
    imageAlt: 'Galeria Cais Sul — átrio monumental em concreto aparente com rasgos zenitais cortando feixes de luz natural',
    summary:
      'Antigo armazém portuário reconfigurado como museu de escultura contemporânea, onde a luz natural é tratada como matéria estrutural.',
    narrative: [
      'A cobertura foi redesenhada com sheds assimétricos orientados a sul, evitando incidência solar direta sobre obras sensíveis enquanto projeta planos geométricos mutáveis no piso de calcário apicoado ao longo das horas.',
      'Nenhuma luminária disputa atenção com o volume. Toda infraestrutura técnica corre embutida em câmaras acústicas atrás das paredes de concreto moldado em fôrmas de pinus selecionado.',
    ],
    materials: ['Concreto Ripado', 'Travertino Romano Bruto', 'Freijó Natural'],
    materialIds: ['concreto-ripado', 'travertino-bruto', 'freijo-natural'],
    program: [
      { label: 'Área Construída', value: '1.420 m²' },
      { label: 'Pé-direito', value: '9,40 m' },
      { label: 'Sheds Zenitais', value: '12 eixos' },
      { label: 'Conclusão', value: '2025' },
    ],
    planGeometry: {
      lotLabel: 'COTA +6.20 · EIXO GUAÍBA',
      orientation: 'S 04° E',
      cantilever: 'SHED ZENITAL 9.40m',
      axisY: 100,
      rooms: [
        { x: 42, y: 44, w: 86, h: 108, label: 'ÁTRIO DE LUZ', accent: true },
        { x: 136, y: 44, w: 102, h: 52, label: 'SALA NORTE' },
        { x: 136, y: 102, w: 102, h: 50, label: 'ACERVO' },
        { x: 246, y: 44, w: 72, h: 108, label: 'PÁTIO' },
      ],
    },
  },
  {
    id: 'refugio-araucaria',
    index: '04',
    title: 'Refúgio Araucária',
    subtitle: 'Casca em aço Corten oxidado e lareira central nos campos de cima da serra',
    category: 'Refúgio',
    location: 'São Francisco de Paula, RS',
    coordinates: '29°26′S 50°35′W',
    year: 2024,
    areaSqm: 410,
    elevation: 'ELEV. +912m',
    status: 'Concluída',
    featured: true,
    aspect: 'wide',
    image: '/images/work-refugio-araucaria.jpg',
    imageAlt: 'Refúgio Araucária — casa de serra em aço Corten oxidado e concreto bruto emoldurada por araucárias',
    summary:
      'Pensada para envelhecer com o clima úmido e frio do planalto gaúcho, a envoltória de aço Corten cria uma pátina mineral que se funde à casca das araucárias.',
    narrative: [
      'A planta organiza-se em torno de uma lareira escultórica de pedra basalto que irradia inércia térmica por toda a ala social. Os vãos envidraçados duplos com gás argônio preservam a transparência absoluta sem perda de calor.',
      'Cada janela atua como uma moldura precisa de bosque: na ala íntima, aberturas verticais estreitas acompanham o tronco das árvores sem expor o interior ao vento minuano.',
    ],
    materials: ['Aço Corten Oxidado', 'Concreto Ripado', 'Vidro Acústico Duplo', 'Freijó Natural'],
    materialIds: ['aco-corten', 'concreto-ripado', 'vidro-acustico', 'freijo-natural'],
    program: [
      { label: 'Área Construída', value: '410 m²' },
      { label: 'Inércia Térmica', value: 'Classe A+' },
      { label: 'Altitude', value: '912 m' },
      { label: 'Conclusão', value: '2024' },
    ],
    planGeometry: {
      lotLabel: 'COTA +912.00 · BOSQUE',
      orientation: 'N 18° W',
      cantilever: 'BALANÇO 5.20m',
      axisY: 104,
      rooms: [
        { x: 36, y: 58, w: 94, h: 78, label: 'ALA ÍNTIMA' },
        { x: 136, y: 58, w: 122, h: 78, label: 'LAREIRA + SALÃO', accent: true },
        { x: 264, y: 58, w: 66, h: 78, label: 'DECK SUL' },
      ],
    },
  },
  {
    id: 'residencia-mirante-jardim',
    index: '05',
    title: 'Residência Mirante Jardim',
    subtitle: 'Brises verticais filtrando o sol paulistano sobre pátio aquático',
    category: 'Residencial',
    location: 'São Paulo, SP',
    coordinates: '23°34′S 46°40′W',
    year: 2026,
    areaSqm: 790,
    elevation: 'ELEV. +765m',
    status: 'Em Obra',
    featured: true,
    aspect: 'tall',
    image: '/images/work-torre-mirante.jpg',
    imageAlt: 'Residência Mirante Jardim — fachada vertical em brises de concreto e madeira filtrando luz sobre jardim interno',
    summary:
      'Um oásis urbano de silêncio no Jardim Europa: fachadas de brises móveis protegem a privacidade enquanto trazem luz filtrada e vegetação tropical para o centro da casa.',
    narrative: [
      'Em um lote urbano adensado, a estratégia foi inverter o olhar para dentro. Um pátio central de pé-direito triplo com canal de água em pedra preta atua como pulmão microclimático e eixo visual de todos os pavimentos.',
      'Os brises verticais em freijó maciço e concreto pré-moldado criam uma pele vibrante que muda o desenho das sombras interiores a cada quinze minutos do dia.',
    ],
    materials: ['Freijó Natural', 'Concreto Ripado', 'Travertino Romano Bruto', 'Vidro Extra-Clear'],
    materialIds: ['freijo-natural', 'concreto-ripado', 'travertino-bruto', 'vidro-acustico'],
    program: [
      { label: 'Área Construída', value: '790 m²' },
      { label: 'Pavimentos', value: '3 níveis' },
      { label: 'Pátio Interno', value: '145 m²' },
      { label: 'Previsão', value: '2026' },
    ],
    planGeometry: {
      lotLabel: 'COTA +765.00 · JARDIM EUROPA',
      orientation: 'N 08° E',
      cantilever: 'BRISE 11.20m',
      axisY: 98,
      rooms: [
        { x: 46, y: 46, w: 96, h: 102, label: 'LIVING' },
        { x: 148, y: 46, w: 74, h: 102, label: 'PÁTIO ÁGUA', accent: true },
        { x: 228, y: 46, w: 90, h: 102, label: 'ATELIÊ' },
      ],
    },
  },
  {
    id: 'casa-claro-escuro',
    index: '06',
    title: 'Casa Claro-Escuro',
    subtitle: 'Claustro contemporâneo em concreto e espelho d’água em Comporta',
    category: 'Refúgio',
    location: 'Comporta, Portugal',
    coordinates: '38°22′N 08°47′W',
    year: 2024,
    areaSqm: 520,
    elevation: 'ELEV. +12.00m',
    status: 'Concluída',
    featured: false,
    aspect: 'wide',
    image: '/images/depth-courtyard.jpg',
    imageAlt: 'Casa Claro-Escuro — galeria em concreto aparente abrindo para claustro ensolarado e espelho d água',
    summary:
      'Primeiro projeto do escritório na costa alentejana: um percurso de compressão e abertura que conduz do silêncio sombreado à luz seca das dunas.',
    narrative: [
      'A casa organiza-se como um claustro linear de 34 metros. A galeria de circulação em concreto aparente controla rigorosamente o ofuscamento do sol de verão, conduzindo o visitante ao pátio d’água central.',
      'Reboco mineral à base de cal local e madeira de carvalho europeu envelhecido compõem uma paleta quase silenciosa, onde apenas o movimento da água marca o tempo.',
    ],
    materials: ['Concreto Ripado', 'Travertino Romano Bruto', 'Freijó Natural'],
    materialIds: ['concreto-ripado', 'travertino-bruto', 'freijo-natural'],
    program: [
      { label: 'Área Construída', value: '520 m²' },
      { label: 'Eixo Claustro', value: '34,00 m' },
      { label: 'Localidade', value: 'Alentejo, PT' },
      { label: 'Conclusão', value: '2024' },
    ],
    planGeometry: {
      lotLabel: 'COTA +12.00 · EIXO DUNAS',
      orientation: 'W 15° S',
      cantilever: 'GALERIA 34.0m',
      axisY: 98,
      rooms: [
        { x: 34, y: 60, w: 112, h: 72, label: 'CLAUSTRO' },
        { x: 152, y: 60, w: 96, h: 72, label: 'PÁTIO CENTRAL', accent: true },
        { x: 254, y: 60, w: 78, h: 72, label: 'PAVILHÃO' },
      ],
    },
  },
  {
    id: 'atelier-botanico-lisboa',
    index: '07',
    title: 'Ateliê Botânico Príncipe Real',
    subtitle: 'Restauro silencioso de palacete pombalino com inserções de travertino',
    category: 'Cultural',
    location: 'Lisboa, Portugal',
    coordinates: '38°42′N 09°08′W',
    year: 2023,
    areaSqm: 610,
    elevation: 'ELEV. +72.00m',
    status: 'Concluída',
    featured: false,
    aspect: 'wide',
    image: '/images/studio-atelier.jpg',
    imageAlt: 'Ateliê Botânico Príncipe Real — interior sereno com mesa monolítica em travertino, maquetes e cortinas de linho',
    summary:
      'Intervenção reversível que dialoga com cantarias do século XIX através de planos soltos de travertino, linho cru e marcenaria de precisão.',
    narrative: [
      'Todo elemento contemporâneo foi afastado 12 centímetros das paredes históricas de alvenaria de pedra, marcando com clareza o diálogo entre passado e presente sem mimetismo.',
      'As bancadas monolíticas abrigam pesquisa botânica, acervo de gravuras e pequenas exposições abertas ao bairro.',
    ],
    materials: ['Travertino Romano Bruto', 'Freijó Natural', 'Vidro Extra-Clear'],
    materialIds: ['travertino-bruto', 'freijo-natural', 'vidro-acustico'],
    program: [
      { label: 'Área Intervinda', value: '610 m²' },
      { label: 'Edifício Original', value: '1884' },
      { label: 'Localidade', value: 'Lisboa, PT' },
      { label: 'Conclusão', value: '2023' },
    ],
    planGeometry: {
      lotLabel: 'COTA +72.00 · PRÍNCIPE REAL',
      orientation: 'S 20° E',
      cantilever: 'RESTAURO REVERSÍVEL',
      axisY: 96,
      rooms: [
        { x: 38, y: 52, w: 100, h: 86, label: 'HERBÁRIO' },
        { x: 144, y: 52, w: 108, h: 86, label: 'SALÃO DE LEITURA', accent: true },
        { x: 258, y: 52, w: 70, h: 86, label: 'JARDIM' },
      ],
    },
  },
  {
    id: 'casa-espelho-atlantica',
    index: '08',
    title: 'Casa Espelho Atlântica',
    subtitle: 'Balanço horizontal sobre lâmina d’água negra na Serra do Mar',
    category: 'Residencial',
    location: 'Ubatuba, SP',
    coordinates: '23°26′S 45°04′W',
    year: 2025,
    areaSqm: 840,
    elevation: 'ELEV. +34.50m',
    status: 'Concluída',
    featured: false,
    aspect: 'wide',
    image: '/images/hero-pavilion.jpg',
    imageAlt: 'Casa Espelho Atlântica — pavilhão em concreto e madeira refletido em espelho d água escuro ao entardecer',
    summary:
      'Um pavilhão de concreto aparente que flutua 35 centímetros acima de um espelho d’água em basalto, duplicando a copa da Mata Atlântica.',
    narrative: [
      'A aproximação acontece por uma passarela de pedra sobre a água, desacelerando o passo antes mesmo de cruzar o limiar da casa. À noite, a iluminação rasante em 2700K transforma o volume em uma lanterna discreta na floresta.',
      'A ventilação cruzada integral e a cobertura verde nativa eliminam a necessidade de climatização artificial durante nove meses do ano.',
    ],
    materials: ['Concreto Ripado', 'Freijó Natural', 'Aço Corten Oxidado', 'Vidro Acústico Duplo'],
    materialIds: ['concreto-ripado', 'freijo-natural', 'aco-corten', 'vidro-acustico'],
    program: [
      { label: 'Área Construída', value: '840 m²' },
      { label: 'Espelho d’Água', value: '290 m²' },
      { label: 'Balanço', value: '9,80 m' },
      { label: 'Conclusão', value: '2025' },
    ],
    planGeometry: {
      lotLabel: 'COTA +34.50 · MATA ATLÂNTICA',
      orientation: 'E 11° N',
      cantilever: 'BALANÇO 9.80m',
      axisY: 102,
      rooms: [
        { x: 30, y: 50, w: 120, h: 66, label: 'PAVILHÃO SOCIAL', accent: true },
        { x: 156, y: 50, w: 110, h: 66, label: 'SUÍTES' },
        { x: 272, y: 50, w: 62, h: 66, label: 'SAUNA' },
        { x: 30, y: 122, w: 236, h: 26, label: 'LÂMINA D’ÁGUA BASALTO' },
      ],
    },
  },
];
