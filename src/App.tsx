import { useCallback, useEffect, useState } from 'react';
import { useLenisScroll } from './hooks/useLenisScroll';
import type { ArchitecturalProject } from './data/projects';
import { Header } from './components/Header';
import { IndexOverlay } from './components/IndexOverlay';
import { Hero } from './components/Hero';
import { ManifestoStrip } from './components/ManifestoStrip';
import { HorizontalWorks } from './components/HorizontalWorks';
import { DepthChamber } from './components/DepthChamber';
import { MaterialLab } from './components/MaterialLab';
import { ProcessDepth } from './components/ProcessDepth';
import { WorksArchive } from './components/WorksArchive';
import { BriefingSection } from './components/BriefingSection';
import { Footer } from './components/Footer';
import { ProjectModal } from './components/ProjectModal';
import { BriefingDrawer } from './components/BriefingDrawer';

export default function App() {
  const [indexOpen, setIndexOpen] = useState(false);
  const [briefingOpen, setBriefingOpen] = useState(false);
  const [selectedProject, setSelectedProject] =
    useState<ArchitecturalProject | null>(null);
  const [briefingReference, setBriefingReference] = useState<string | undefined>(
    undefined
  );

  const anyModalOpen = indexOpen || briefingOpen || selectedProject !== null;
  const { scrollToTarget } = useLenisScroll(anyModalOpen);

  useEffect(() => {
    document.body.classList.toggle('modal-open', anyModalOpen);
    return () => {
      document.body.classList.remove('modal-open');
    };
  }, [anyModalOpen]);

  const handleNavigate = useCallback(
    (sectionId: string) => {
      const offset = sectionId === '#inicio' || sectionId === '#obras' || sectionId === '#profundidade' ? 0 : -40;
      scrollToTarget(sectionId, offset);
    },
    [scrollToTarget]
  );

  const handleScrollToPosition = useCallback(
    (y: number) => {
      scrollToTarget(y, 0);
    },
    [scrollToTarget]
  );

  const handleOpenBriefingWithReference = useCallback((projectTitle: string) => {
    setSelectedProject(null);
    setBriefingReference(projectTitle);
    setBriefingOpen(true);
  }, []);

  return (
    <div className="app-shell">
      <Header
        onNavigate={handleNavigate}
        onOpenIndex={() => setIndexOpen(true)}
        onOpenBriefing={() => setBriefingOpen(true)}
        indexOpen={indexOpen}
      />

      <main>
        <Hero onNavigate={handleNavigate} />
        <ManifestoStrip />
        <HorizontalWorks
          onSelectProject={setSelectedProject}
          scrollToPosition={handleScrollToPosition}
        />
        <DepthChamber scrollToPosition={handleScrollToPosition} />
        <MaterialLab onSelectProject={setSelectedProject} />
        <ProcessDepth />
        <WorksArchive onSelectProject={setSelectedProject} />
        <BriefingSection referenceProject={briefingReference} />
      </main>

      <Footer onNavigate={handleNavigate} />

      <IndexOverlay
        open={indexOpen}
        onClose={() => setIndexOpen(false)}
        onNavigate={handleNavigate}
        onSelectProject={setSelectedProject}
        onOpenBriefing={() => setBriefingOpen(true)}
      />

      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
        onRequestStudy={handleOpenBriefingWithReference}
      />

      <BriefingDrawer
        open={briefingOpen}
        referenceProject={briefingReference}
        onClose={() => setBriefingOpen(false)}
      />
    </div>
  );
}
