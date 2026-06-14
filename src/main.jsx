import * as React from 'react';
import { createRoot } from 'react-dom/client';
import './styles.css';

import { useScrollProgress } from './hooks.jsx';
import { useTweaks, TweaksPanel, TweakSection, TweakRadio, TweakToggle } from './tweaks-panel.jsx';
import { CustomCursor, CursorParticles, SideNav, ActivityTicker, GraveyardSection, TerminalSection } from './enhancements.jsx';
import { GridBackground, Navbar, HeroSection } from './hero.jsx';
import { ValidationSection, ServicesSection, ComparisonSection } from './sections.jsx';
import { ProcessSection } from './process.jsx';
import { ROICalculator, IdeaQuiz } from './interactive.jsx';
import { CaseStudiesSection, TestimonialsSection } from './proof.jsx';
import { GuaranteeSection, LogoWall, BlogPreview } from './trust.jsx';
import { PricingSection, TechStackSection, FAQSection, CTASection, FooterSection } from './closing.jsx';

const TWEAK_DEFAULTS = {
  accentColor: 'Cyan',
  reduceMotion: false,
};

function App() {
  const [mousePos, setMousePos] = React.useState({ x: 0, y: 0 });
  const scrollProgress = useScrollProgress();
  const [tweaks, setTweak] = useTweaks(TWEAK_DEFAULTS);

  React.useEffect(() => {
    const handler = (e) => setMousePos({ x: e.clientX, y: e.clientY });
    window.addEventListener('mousemove', handler, { passive: true });
    return () => window.removeEventListener('mousemove', handler);
  }, []);

  React.useEffect(() => {
    const palettes = {
      Cyan:   { primary: '#00d4ff', dim: 'rgba(0,212,255,0.08)',  glow: 'rgba(0,212,255,0.15)' },
      Purple: { primary: '#8b5cf6', dim: 'rgba(139,92,246,0.08)', glow: 'rgba(139,92,246,0.15)' },
      Green:  { primary: '#00e87b', dim: 'rgba(0,232,123,0.08)',  glow: 'rgba(0,232,123,0.15)' },
      Amber:  { primary: '#f59e0b', dim: 'rgba(245,158,11,0.08)', glow: 'rgba(245,158,11,0.15)' },
    };
    const c = palettes[tweaks.accentColor] || palettes.Cyan;
    const r = document.documentElement;
    r.style.setProperty('--primary', c.primary);
    r.style.setProperty('--primary-dim', c.dim);
    r.style.setProperty('--primary-glow', c.glow);
  }, [tweaks.accentColor]);

  return (
    <>
      <CustomCursor mouseX={mousePos.x} mouseY={mousePos.y} />
      <GridBackground mouseX={mousePos.x} mouseY={mousePos.y} />
      <CursorParticles mouseX={mousePos.x} mouseY={mousePos.y} />
      <div className="noise-overlay"></div>
      <div className="scroll-progress" style={{ width: `${scrollProgress * 100}%` }}></div>
      <SideNav />

      <Navbar />
      <HeroSection />
      <ActivityTicker />
      <GraveyardSection />
      <ValidationSection />
      <ProcessSection />
      <ServicesSection />
      <ComparisonSection />
      <TerminalSection />
      <ROICalculator />
      <CaseStudiesSection />
      <GuaranteeSection />
      <IdeaQuiz />
      <TechStackSection />
      <PricingSection />
      <TestimonialsSection />
      <LogoWall />
      <BlogPreview />
      <FAQSection />
      <CTASection />
      <FooterSection />

      <TweaksPanel>
        <TweakSection label="Appearance">
          <TweakRadio label="Accent Color" value={tweaks.accentColor}
            options={['Cyan', 'Purple', 'Green', 'Amber']}
            onChange={(v) => setTweak('accentColor', v)} />
          <TweakToggle label="Reduce Motion" value={tweaks.reduceMotion}
            onChange={(v) => setTweak('reduceMotion', v)} />
        </TweakSection>
      </TweaksPanel>
    </>
  );
}

createRoot(document.getElementById('root')).render(<App />);
