import { useEffect } from 'react';
import { X } from 'lucide-react';
import { BriefingForm } from './BriefingForm';

interface BriefingDrawerProps {
  open: boolean;
  referenceProject?: string;
  onClose: () => void;
}

export function BriefingDrawer({
  open,
  referenceProject,
  onClose,
}: BriefingDrawerProps) {
  useEffect(() => {
    if (!open) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      className="drawer-backdrop"
      role="dialog"
      aria-modal="true"
      aria-labelledby="briefing-drawer-title"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      data-lenis-prevent
    >
      <div className="briefing-drawer">
        <div className="drawer-head">
          <div>
            <span className="mono drawer-eyebrow">NOVO ESTUDO · CAIS</span>
            <h2 id="briefing-drawer-title" className="serif-display drawer-title">
              Iniciar Projeto
            </h2>
          </div>

          <button
            type="button"
            className="icon-close-btn"
            onClick={onClose}
            aria-label="Fechar painel de briefing"
          >
            <X size={18} strokeWidth={1.6} />
          </button>
        </div>

        <div className="drawer-body">
          <p className="drawer-intro">
            Compartilhe as primeiras coordenadas do terreno e do programa. Os
            dados são registrados com protocolo de atendimento imediato.
          </p>
          <BriefingForm initialReference={referenceProject} compact />
        </div>
      </div>
    </div>
  );
}
