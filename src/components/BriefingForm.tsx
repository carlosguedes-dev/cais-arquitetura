import { useEffect, useState, type FormEvent } from 'react';
import { ArrowUpRight, Check, Copy } from 'lucide-react';
import { submitStudioInquiry, type InquiryResponse } from '../utils/api';

interface BriefingFormProps {
  initialReference?: string;
  compact?: boolean;
  onSuccess?: (result: InquiryResponse) => void;
}

const TYPOLOGIES = ['Residência', 'Espaço Cultural', 'Refúgio / Serra', 'Interiores'];

export function BriefingForm({
  initialReference,
  compact = false,
  onSuccess,
}: BriefingFormProps) {
  const [typology, setTypology] = useState(TYPOLOGIES[0]);
  const [areaSqm, setAreaSqm] = useState(480);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [city, setCity] = useState('');
  const [referenceProject, setReferenceProject] = useState(initialReference ?? '');
  const [message, setMessage] = useState('');

  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [receipt, setReceipt] = useState<InquiryResponse | null>(null);
  const [copiedProtocol, setCopiedProtocol] = useState(false);

  useEffect(() => {
    if (initialReference) {
      setReferenceProject(initialReference);
    }
  }, [initialReference]);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);

    if (name.trim().length < 2) {
      setError('Informe seu nome completo.');
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      setError('Informe um e-mail válido.');
      return;
    }
    if (message.trim().length < 10) {
      setError('Conte-nos brevemente sobre o terreno ou programa (mín. 10 caracteres).');
      return;
    }

    setSubmitting(true);
    try {
      const result = await submitStudioInquiry({
        name: name.trim(),
        email: email.trim(),
        city: city.trim(),
        typology,
        areaSqm,
        referenceProject: referenceProject.trim() || undefined,
        message: message.trim(),
      });
      setReceipt(result);
      onSuccess?.(result);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : 'Não foi possível enviar a solicitação agora.'
      );
    } finally {
      setSubmitting(false);
    }
  }

  function handleReset() {
    setReceipt(null);
    setName('');
    setEmail('');
    setCity('');
    setMessage('');
    setError(null);
    setCopiedProtocol(false);
  }

  async function handleCopyProtocol() {
    if (!receipt) return;
    try {
      await navigator.clipboard.writeText(receipt.protocol);
      setCopiedProtocol(true);
      window.setTimeout(() => setCopiedProtocol(false), 2400);
    } catch {
      setCopiedProtocol(false);
    }
  }

  if (receipt) {
    return (
      <div className="briefing-receipt" role="status" aria-live="polite">
        <div className="receipt-badge mono">
          <Check size={14} strokeWidth={2} />
          <span>REGISTRO CONFIRMADO</span>
        </div>

        <h3 className="serif-display receipt-title">
          Estudo preliminar recebido com sucesso.
        </h3>

        <p className="receipt-text">
          Nossa equipe em São Paulo e Lisboa responderá em até 48 horas úteis
          para agendar uma conversa inicial sobre o sítio e o programa.
        </p>

        <div className="receipt-card mono">
          <div>
            <span className="receipt-k">PROTOCOLO</span>
            <strong className="receipt-protocol">{receipt.protocol}</strong>
          </div>
          <button
            type="button"
            className="receipt-copy-btn mono"
            onClick={handleCopyProtocol}
          >
            {copiedProtocol ? <Check size={14} /> : <Copy size={14} />}
            <span>{copiedProtocol ? 'Copiado' : 'Copiar'}</span>
          </button>
        </div>

        <div className="receipt-meta mono">
          <span>{receipt.summary.typology}</span>
          <span>·</span>
          <span>{receipt.summary.areaSqm} m²</span>
          <span>·</span>
          <span>{receipt.summary.city}</span>
        </div>

        <button
          type="button"
          className="btn-text-link"
          onClick={handleReset}
        >
          <span>Enviar nova solicitação</span>
        </button>
      </div>
    );
  }

  return (
    <form
      className={`briefing-form ${compact ? 'is-compact' : ''}`}
      onSubmit={handleSubmit}
      noValidate
    >
      <div className="form-field">
        <span className="field-label mono">TIPOLOGIA DO PROJETO</span>
        <div className="typology-chips" role="group" aria-label="Selecionar tipologia">
          {TYPOLOGIES.map((item) => (
            <button
              key={item}
              type="button"
              className={`typology-chip ${typology === item ? 'is-selected' : ''}`}
              onClick={() => setTypology(item)}
              aria-pressed={typology === item}
            >
              {item}
            </button>
          ))}
        </div>
      </div>

      <div className="form-field">
        <div className="field-label-row">
          <label htmlFor={`area-${compact ? 'drawer' : 'page'}`} className="field-label mono">
            ÁREA ESTIMADA
          </label>
          <span className="mono area-readout">{areaSqm} m²</span>
        </div>
        <input
          id={`area-${compact ? 'drawer' : 'page'}`}
          type="range"
          min={150}
          max={2400}
          step={30}
          value={areaSqm}
          onChange={(e) => setAreaSqm(Number(e.target.value))}
          className="area-slider"
        />
      </div>

      {referenceProject && (
        <div className="reference-pill-row mono">
          <span>REFERÊNCIA: {referenceProject}</span>
          <button
            type="button"
            onClick={() => setReferenceProject('')}
            aria-label="Remover obra de referência"
          >
            Remover
          </button>
        </div>
      )}

      <div className="form-two-col">
        <div className="form-field">
          <label htmlFor={`name-${compact ? 'drawer' : 'page'}`} className="field-label mono">
            NOME COMPLETO
          </label>
          <input
            id={`name-${compact ? 'drawer' : 'page'}`}
            type="text"
            required
            placeholder="Ex.: Mariana Albuquerque"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="arch-input"
          />
        </div>

        <div className="form-field">
          <label htmlFor={`email-${compact ? 'drawer' : 'page'}`} className="field-label mono">
            E-MAIL
          </label>
          <input
            id={`email-${compact ? 'drawer' : 'page'}`}
            type="email"
            required
            placeholder="nome@dominio.com.br"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="arch-input"
          />
        </div>
      </div>

      <div className="form-field">
        <label htmlFor={`city-${compact ? 'drawer' : 'page'}`} className="field-label mono">
          CIDADE / LOCAL DO TERRENO
        </label>
        <input
          id={`city-${compact ? 'drawer' : 'page'}`}
          type="text"
          placeholder="Ex.: Paraty, RJ · Comporta, PT"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          className="arch-input"
        />
      </div>

      <div className="form-field">
        <label htmlFor={`msg-${compact ? 'drawer' : 'page'}`} className="field-label mono">
          NOTAS SOBRE O TERRENO E PROGRAMA
        </label>
        <textarea
          id={`msg-${compact ? 'drawer' : 'page'}`}
          rows={compact ? 3 : 4}
          required
          placeholder="Conte-nos sobre a topografia, prazo desejado e o que espera viver neste espaço..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="arch-textarea"
        />
      </div>

      {error && (
        <p className="form-error-msg" role="alert">
          {error}
        </p>
      )}

      <button
        type="submit"
        className="btn-architectural btn-on-dark btn-full"
        disabled={submitting}
      >
        <span>{submitting ? 'Registrando briefing...' : 'Solicitar Conversa Inicial'}</span>
        <ArrowUpRight size={16} strokeWidth={1.6} />
      </button>
    </form>
  );
}
