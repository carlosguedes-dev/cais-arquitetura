import { useEffect, useState } from 'react';
import { ArrowUp, Check, Copy } from 'lucide-react';

interface FooterProps {
  onNavigate: (sectionId: string) => void;
}

function getCityClock(timeZone: string): string {
  try {
    return new Intl.DateTimeFormat('pt-BR', {
      hour: '2-digit',
      minute: '2-digit',
      timeZone,
    }).format(new Date());
  } catch {
    return '--:--';
  }
}

export function Footer({ onNavigate }: FooterProps) {
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [clocks, setClocks] = useState({
    sp: getCityClock('America/Sao_Paulo'),
    lx: getCityClock('Europe/Lisbon'),
  });

  useEffect(() => {
    const timer = window.setInterval(() => {
      setClocks({
        sp: getCityClock('America/Sao_Paulo'),
        lx: getCityClock('Europe/Lisbon'),
      });
    }, 30000);
    return () => window.clearInterval(timer);
  }, []);

  async function handleCopyEmail() {
    try {
      await navigator.clipboard.writeText('atelier@caisarquitetura.com.br');
      setCopiedEmail(true);
      window.setTimeout(() => setCopiedEmail(false), 2400);
    } catch {
      setCopiedEmail(false);
    }
  }

  return (
    <footer className="site-footer" data-header-tone="dark">
      <div className="container">
        <div className="footer-top">
          <div className="footer-brand-col">
            <div className="footer-wordmark serif-display">CAIS</div>
            <p className="footer-tagline">
              Arquitetura contemporânea autoral — concreto aparente, madeira
              certificada e desenho da luz natural.
            </p>
            <button
              type="button"
              className="footer-email-copy mono"
              onClick={handleCopyEmail}
            >
              <span>atelier@caisarquitetura.com.br</span>
              {copiedEmail ? <Check size={14} /> : <Copy size={14} />}
              <em className="copy-state">{copiedEmail ? 'Copiado' : 'Copiar'}</em>
            </button>
          </div>

          <div className="footer-nav-col">
            <span className="mono footer-col-label">NAVEGAÇÃO</span>
            <ul>
              <li>
                <a
                  href="#inicio"
                  onClick={(e) => {
                    e.preventDefault();
                    onNavigate('#inicio');
                  }}
                >
                  Abertura
                </a>
              </li>
              <li>
                <a
                  href="#obras"
                  onClick={(e) => {
                    e.preventDefault();
                    onNavigate('#obras');
                  }}
                >
                  Obras Selecionadas
                </a>
              </li>
              <li>
                <a
                  href="#profundidade"
                  onClick={(e) => {
                    e.preventDefault();
                    onNavigate('#profundidade');
                  }}
                >
                  Câmara de Luz
                </a>
              </li>
              <li>
                <a
                  href="#materiais"
                  onClick={(e) => {
                    e.preventDefault();
                    onNavigate('#materiais');
                  }}
                >
                  Biblioteca Matérica
                </a>
              </li>
              <li>
                <a
                  href="#arquivo"
                  onClick={(e) => {
                    e.preventDefault();
                    onNavigate('#arquivo');
                  }}
                >
                  Arquivo Completo
                </a>
              </li>
            </ul>
          </div>

          <div className="footer-clock-col">
            <span className="mono footer-col-label">ATELIÊS AO VIVO</span>
            <div className="footer-clock-row mono">
              <span>SÃO PAULO</span>
              <span>{clocks.sp} BRT</span>
            </div>
            <div className="footer-clock-row mono">
              <span>LISBOA</span>
              <span>{clocks.lx} WET</span>
            </div>

            <button
              type="button"
              className="back-to-top-btn mono"
              onClick={() => onNavigate('#inicio')}
            >
              <ArrowUp size={14} strokeWidth={1.6} />
              <span>Voltar ao topo</span>
            </button>
          </div>
        </div>

        <div className="footer-bottom mono">
          <span>© 2026 CAIS Arquitetura. Todos os direitos reservados.</span>
          <span>
            Concepção &amp; Engenharia:{' '}
            <a
              href="https://github.com/carlosguedes-dev"
              target="_blank"
              rel="noopener noreferrer"
              className="footer-author-link"
            >
              Carlos Guedes
            </a>
          </span>
        </div>
      </div>
    </footer>
  );
}
