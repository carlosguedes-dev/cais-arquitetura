import express from 'express';
import cors from 'cors';
import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { PROJECTS } from '../src/data/projects.ts';
import { MATERIALS } from '../src/data/materials.ts';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.resolve(__dirname, '..');
const DIST_DIR = path.join(ROOT_DIR, 'dist');
const INQUIRIES_FILE = path.join(__dirname, 'data', 'inquiries.json');

interface InquiryPayload {
  name: string;
  email: string;
  city: string;
  typology: string;
  areaSqm: number;
  referenceProject?: string;
  message: string;
}

interface StoredInquiry extends InquiryPayload {
  protocol: string;
  createdAt: string;
}

const app = express();
const PORT = Number(process.env.PORT ?? 3001);

app.use(cors());
app.use(express.json({ limit: '64kb' }));

async function readInquiries(): Promise<StoredInquiry[]> {
  try {
    const raw = await fs.readFile(INQUIRIES_FILE, 'utf-8');
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

async function writeInquiries(items: StoredInquiry[]): Promise<void> {
  await fs.mkdir(path.dirname(INQUIRIES_FILE), { recursive: true });
  await fs.writeFile(INQUIRIES_FILE, JSON.stringify(items, null, 2), 'utf-8');
}

function generateProtocol(count: number): string {
  const year = new Date().getFullYear();
  const seq = String(count + 105).padStart(4, '0');
  return `CAIS-${year}-${seq}`;
}

app.get('/api/health', (_req, res) => {
  res.json({
    status: 'operational',
    studio: 'CAIS Arquitetura',
    cities: ['São Paulo', 'Lisboa'],
    timestamp: new Date().toISOString(),
  });
});

app.get('/api/projects', (req, res) => {
  const category = typeof req.query.category === 'string' ? req.query.category : 'Todas';
  const filtered =
    category === 'Todas'
      ? PROJECTS
      : PROJECTS.filter((project) => project.category === category);
  res.json({
    total: filtered.length,
    projects: filtered,
  });
});

app.get('/api/materials', (_req, res) => {
  res.json({
    total: MATERIALS.length,
    materials: MATERIALS,
  });
});

app.get('/api/inquiries/summary', async (_req, res) => {
  const items = await readInquiries();
  res.json({
    totalReceived: items.length,
    latestProtocol: items[items.length - 1]?.protocol ?? null,
  });
});

app.post('/api/inquiries', async (req, res) => {
  const body = req.body as Partial<InquiryPayload>;

  const name = typeof body.name === 'string' ? body.name.trim() : '';
  const email = typeof body.email === 'string' ? body.email.trim() : '';
  const city = typeof body.city === 'string' ? body.city.trim() : '';
  const typology = typeof body.typology === 'string' ? body.typology.trim() : 'Residência';
  const areaSqm = Number(body.areaSqm ?? 420);
  const referenceProject =
    typeof body.referenceProject === 'string' ? body.referenceProject.trim() : undefined;
  const message = typeof body.message === 'string' ? body.message.trim() : '';

  if (name.length < 2) {
    res.status(400).json({ error: 'Informe seu nome completo.' });
    return;
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    res.status(400).json({ error: 'Informe um endereço de e-mail válido.' });
    return;
  }

  if (message.length < 10) {
    res.status(400).json({ error: 'Descreva brevemente o terreno ou programa desejado (mínimo 10 caracteres).' });
    return;
  }

  try {
    const existing = await readInquiries();
    const protocol = generateProtocol(existing.length);

    const record: StoredInquiry = {
      protocol,
      name,
      email,
      city: city || 'Não informada',
      typology,
      areaSqm: Number.isFinite(areaSqm) ? Math.max(80, Math.min(10000, Math.round(areaSqm))) : 420,
      referenceProject: referenceProject || undefined,
      message,
      createdAt: new Date().toISOString(),
    };

    existing.push(record);
    await writeInquiries(existing);

    res.status(201).json({
      ok: true,
      protocol: record.protocol,
      receivedAt: record.createdAt,
      summary: {
        typology: record.typology,
        areaSqm: record.areaSqm,
        city: record.city,
      },
    });
  } catch (err) {
    console.error('Erro ao salvar solicitação:', err);
    res.status(500).json({ error: 'Não foi possível registrar o briefing no momento.' });
  }
});

// Serve static production build when dist/ exists
app.use(express.static(DIST_DIR));

app.get('/{*splat}', async (req, res, next) => {
  if (req.path.startsWith('/api/')) {
    res.status(404).json({ error: 'Endpoint não encontrado.' });
    return;
  }
  try {
    const indexPath = path.join(DIST_DIR, 'index.html');
    await fs.access(indexPath);
    res.sendFile(indexPath);
  } catch {
    next();
  }
});

app.listen(PORT, () => {
  console.log(`[CAIS API] Servidor operacional em http://localhost:${PORT}`);
});
