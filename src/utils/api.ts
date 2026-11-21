export interface InquirySubmission {
  name: string;
  email: string;
  city: string;
  typology: string;
  areaSqm: number;
  referenceProject?: string;
  message: string;
}

export interface InquiryResponse {
  ok: true;
  protocol: string;
  receivedAt: string;
  persistedMode: 'server' | 'local';
  summary: {
    typology: string;
    areaSqm: number;
    city: string;
  };
}

const LOCAL_STORAGE_KEY = 'cais_arquitetura_inquiries_v1';

export async function submitStudioInquiry(
  payload: InquirySubmission
): Promise<InquiryResponse> {
  try {
    const response = await fetch('/api/inquiries', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    const contentType = response.headers.get('content-type') || '';

    if (response.ok && contentType.includes('application/json')) {
      const data = (await response.json()) as Omit<InquiryResponse, 'persistedMode'>;
      return {
        ...data,
        persistedMode: 'server',
      };
    }

    // Only surface validation errors returned by our real JSON Express API (400/422)
    if (
      (response.status === 400 || response.status === 422) &&
      contentType.includes('application/json')
    ) {
      const errBody = (await response.json().catch(() => ({}))) as { error?: string };
      throw new Error(errBody.error || 'Revise os campos informados.');
    }
  } catch (err) {
    if (err instanceof Error && !err.message.toLowerCase().includes('fetch')) {
      throw err;
    }
  }

  // Graceful client persistence fallback when running purely static preview
  const existingRaw = window.localStorage.getItem(LOCAL_STORAGE_KEY);
  const existing = existingRaw ? (JSON.parse(existingRaw) as unknown[]) : [];
  const year = new Date().getFullYear();
  const protocol = `CAIS-${year}-${String(existing.length + 201).padStart(4, '0')}`;
  const receivedAt = new Date().toISOString();

  existing.push({ ...payload, protocol, receivedAt });
  window.localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(existing));

  return {
    ok: true,
    protocol,
    receivedAt,
    persistedMode: 'local',
    summary: {
      typology: payload.typology,
      areaSqm: payload.areaSqm,
      city: payload.city || 'Não informada',
    },
  };
}
