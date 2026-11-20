import { useEffect, useMemo, useRef, useState, useCallback } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Sun } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface DepthChamberProps {
  scrollToPosition: (y: number) => void;
}

interface SolarPreset {
  hour: number;
  label: string;
  timeText: string;
}

const SOLAR_PRESETS: SolarPreset[] = [
  { hour: 7, label: 'Manhã', timeText: '07:00' },
  { hour: 12.5, label: 'Zênite', timeText: '12:30' },
  { hour: 17.5, label: 'Poente', timeText: '17:30' },
  { hour: 20.5, label: 'Crepúsculo', timeText: '20:30' },
];

const DEPTH_NOTES = [
  {
    depth: 'Z +04.0m',
    progress: 0.12,
    title: 'Compressão do Pórtico',
    body: 'O pé-direito contido na entrada desacelera o olhar e calibra a pupila para a transição térmica e luminosa.',
  },
  {
    depth: 'Z +12.5m',
    progress: 0.5,
    title: 'Ritmo dos Brises',
    body: 'Lâminas verticais de freijó cortam a radiação direta em faixas geométricas que registram a passagem das horas.',
  },
  {
    depth: 'Z +24.0m',
    progress: 0.92,
    title: 'Abertura do Claustro',
    body: 'Ao final do eixo, o teto se interrompe e o espelho d’água reflete o céu aberto, devolvendo amplitude ao espaço.',
  },
];

function formatHour(val: number): string {
  const h = Math.floor(val);
  const m = Math.round((val - h) * 60);
  return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`;
}

export function DepthChamber({ scrollToPosition }: DepthChamberProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const backPlaneRef = useRef<HTMLDivElement>(null);
  const midPlaneRef = useRef<HTMLDivElement>(null);
  const louverLeftRef = useRef<HTMLDivElement>(null);
  const louverRightRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<ScrollTrigger | null>(null);

  const [solarHour, setSolarHour] = useState<number>(17.5);
  const [depthProgress, setDepthProgress] = useState<number>(0);
  const [isDesktop, setIsDesktop] = useState<boolean>(true);

  useEffect(() => {
    const mm = gsap.matchMedia();

    mm.add('(min-width: 960px)', () => {
      setIsDesktop(true);
      const section = sectionRef.current;
      if (!section) return;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: '+=210%',
          pin: true,
          scrub: 0.85,
          onUpdate: (self) => {
            setDepthProgress(self.progress);
          },
        },
      });

      triggerRef.current = tl.scrollTrigger ?? null;

      // True 3D Z-axis architectural progression through the cloister
      tl.to(
        backPlaneRef.current,
        {
          scale: 1.24,
          z: 140,
          ease: 'none',
        },
        0
      )
        .to(
          midPlaneRef.current,
          {
            scale: 1.44,
            z: 250,
            opacity: 0.2,
            ease: 'none',
          },
          0
        )
        .to(
          louverLeftRef.current,
          {
            xPercent: -68,
            z: 320,
            opacity: 0.14,
            ease: 'none',
          },
          0
        )
        .to(
          louverRightRef.current,
          {
            xPercent: 68,
            z: 320,
            opacity: 0.14,
            ease: 'none',
          },
          0
        );

      return () => {
        triggerRef.current = null;
        tl.kill();
      };
    });

    mm.add('(max-width: 959px)', () => {
      setIsDesktop(false);
      triggerRef.current = null;
    });

    return () => mm.revert();
  }, []);

  const jumpToDepth = useCallback(
    (targetProgress: number) => {
      setDepthProgress(targetProgress);
      if (isDesktop && triggerRef.current) {
        const st = triggerRef.current;
        const targetY = st.start + (st.end - st.start) * targetProgress;
        scrollToPosition(targetY);
      }
    },
    [isDesktop, scrollToPosition]
  );

  const solarAtmosphere = useMemo(() => {
    const norm = Math.max(0, Math.min(1, (solarHour - 6) / 15));
    const azimuthDeg = Math.round(68 + norm * 218);
    const beamAngle = -38 + norm * 76;
    const isTwilight = solarHour >= 19.2;
    const isGolden = solarHour >= 15.8 && solarHour < 19.2;
    const isMorning = solarHour < 10;

    let filter = 'brightness(0.95) contrast(1.04) saturate(0.94)';
    let tint = 'rgba(246, 238, 222, 0.08)';
    let beamColor = 'rgba(255, 244, 222, 0.22)';
    let lux = '1.840 lx';
    let kelvin = '5.200 K';

    if (isMorning) {
      filter = 'brightness(1.03) contrast(1.02) saturate(0.9) hue-rotate(-3deg)';
      tint = 'rgba(222, 232, 240, 0.14)';
      beamColor = 'rgba(240, 245, 250, 0.24)';
      lux = '920 lx';
      kelvin = '6.100 K';
    } else if (isGolden) {
      filter = 'brightness(0.88) contrast(1.09) sepia(0.22) saturate(1.1)';
      tint = 'rgba(182, 100, 56, 0.2)';
      beamColor = 'rgba(232, 165, 108, 0.26)';
      lux = '640 lx';
      kelvin = '3.100 K';
    } else if (isTwilight) {
      // Natural architectural blue-hour twilight without artificial cyan shift on wood
      filter = 'brightness(0.48) contrast(1.16) saturate(0.54) sepia(0.08)';
      tint = 'rgba(22, 32, 48, 0.56)';
      beamColor = 'rgba(164, 180, 210, 0.11)';
      lux = '145 lx';
      kelvin = '2.700 K';
    }

    return { azimuthDeg, beamAngle, filter, tint, beamColor, lux, kelvin };
  }, [solarHour]);

  const activeStageIndex = depthProgress < 0.34 ? 0 : depthProgress < 0.68 ? 1 : 2;
  const activeDepthMeters = (depthProgress * 24).toFixed(1);
  const mobileZoomScale = 1 + depthProgress * 0.14;

  return (
    <section
      id="profundidade"
      ref={sectionRef}
      className="depth-chamber-section"
      data-header-tone="dark"
    >
      <div className="depth-stage-wrapper">
        {/* Desktop Full-Bleed 3D Spatial Viewport */}
        <div className="depth-3d-viewport">
          <div className="depth-plane depth-plane-back" ref={backPlaneRef}>
            <img
              src="/images/depth-courtyard.jpg"
              alt="Perspectiva arquitetônica em concreto aparente com brises de madeira e espelho d'água ao fundo"
              className="depth-cloister-img"
              style={{
                filter: solarAtmosphere.filter,
                transform: !isDesktop ? `scale(${mobileZoomScale.toFixed(3)})` : undefined,
              }}
            />
            <div
              className="depth-solar-tint"
              style={{ backgroundColor: solarAtmosphere.tint }}
            />
            <div
              className="depth-light-shafts"
              style={{
                transform: `skewX(${solarAtmosphere.beamAngle}deg)`,
                backgroundImage: `repeating-linear-gradient(90deg, transparent 0px, transparent 90px, ${solarAtmosphere.beamColor} 90px, ${solarAtmosphere.beamColor} 124px)`,
              }}
            />
          </div>

          <div className="depth-plane depth-plane-mid" ref={midPlaneRef} aria-hidden="true">
            <div className="spatial-portal-frame">
              <span className="portal-corner tl" />
              <span className="portal-corner tr" />
              <span className="portal-corner bl" />
              <span className="portal-corner br" />
              <span className="portal-axis-label mono">EIXO Z · CORTE AA′</span>
            </div>
          </div>

          <div className="depth-wing depth-wing-left" ref={louverLeftRef} aria-hidden="true">
            <span className="wing-rib" />
            <span className="wing-rib" />
            <span className="wing-rib" />
          </div>
          <div className="depth-wing depth-wing-right" ref={louverRightRef} aria-hidden="true">
            <span className="wing-rib" />
            <span className="wing-rib" />
            <span className="wing-rib" />
          </div>

          <div className="depth-vignette" aria-hidden="true" />
        </div>

        {/* Crisp Editorial Overlay */}
        <div className="depth-overlay container">
          <div className="depth-header">
            <div>
              <span className="eyebrow">02 · Câmara de Luz &amp; Profundidade</span>
              <h2 className="serif-display depth-title">
                A arquitetura se revela
                <br />
                <em>em camadas de sombra.</em>
              </h2>
            </div>

            <div className="depth-telemetry mono" aria-live="polite">
              <div className="tele-cell">
                <span className="tele-label">EIXO Z</span>
                <span className="tele-val">+{activeDepthMeters}m</span>
              </div>
              <div className="tele-cell">
                <span className="tele-label">AZIMUTE</span>
                <span className="tele-val">{solarAtmosphere.azimuthDeg}°</span>
              </div>
              <div className="tele-cell">
                <span className="tele-label">LUMINÂNCIA</span>
                <span className="tele-val">{solarAtmosphere.lux}</span>
              </div>
              <div className="tele-cell">
                <span className="tele-label">TEMP. COR</span>
                <span className="tele-val">{solarAtmosphere.kelvin}</span>
              </div>
            </div>
          </div>

          {/* Dedicated clean viewport preview window on mobile so sunlight changes are always visible */}
          <div className="depth-mobile-window" aria-hidden="true">
            <img
              src="/images/depth-courtyard.jpg"
              alt=""
              className="depth-cloister-img"
              style={{
                filter: solarAtmosphere.filter,
                transform: `scale(${mobileZoomScale.toFixed(3)})`,
              }}
            />
            <div
              className="depth-solar-tint"
              style={{ backgroundColor: solarAtmosphere.tint }}
            />
            <div
              className="depth-light-shafts"
              style={{
                transform: `skewX(${solarAtmosphere.beamAngle}deg)`,
                backgroundImage: `repeating-linear-gradient(90deg, transparent 0px, transparent 60px, ${solarAtmosphere.beamColor} 60px, ${solarAtmosphere.beamColor} 84px)`,
              }}
            />
            <span className="mobile-window-tag mono">
              Z +{activeDepthMeters}m · {formatHour(solarHour)}
            </span>
          </div>

          {/* 3-Stage Depth Notes synchronized with scroll progression */}
          <div className="depth-notes-strip">
            {DEPTH_NOTES.map((note, idx) => (
              <button
                key={note.depth}
                type="button"
                className={`depth-note-card ${activeStageIndex === idx ? 'is-active' : ''}`}
                onClick={() => jumpToDepth(note.progress)}
              >
                <span className="mono depth-note-code">{note.depth}</span>
                <h3 className="serif-display">{note.title}</h3>
                <p>{note.body}</p>
              </button>
            ))}
          </div>

          {/* Interactive Solar Elevation Control */}
          <div className="solar-dial-bar">
            <div className="solar-dial-label">
              <Sun size={15} strokeWidth={1.6} aria-hidden="true" />
              <span className="mono">SIMULADOR SOLAR · {formatHour(solarHour)}</span>
            </div>

            <div className="solar-presets" role="group" aria-label="Horários solares pré-definidos">
              {SOLAR_PRESETS.map((preset) => {
                const isSelected = Math.abs(solarHour - preset.hour) < 0.6;
                return (
                  <button
                    key={preset.label}
                    type="button"
                    className={`solar-preset-btn mono ${isSelected ? 'is-active' : ''}`}
                    onClick={() => setSolarHour(preset.hour)}
                  >
                    <span>{preset.timeText}</span>
                    <em>{preset.label}</em>
                  </button>
                );
              })}
            </div>

            <label className="solar-slider-wrap">
              <span className="sr-only">Ajustar hora solar contínua</span>
              <input
                type="range"
                min={6}
                max={21}
                step={0.25}
                value={solarHour}
                onChange={(e) => setSolarHour(Number(e.target.value))}
                className="solar-range-input"
              />
            </label>
          </div>
        </div>
      </div>
    </section>
  );
}
