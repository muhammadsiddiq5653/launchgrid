import * as React from "react";
import { Reveal, SectionHeader } from "./hooks.jsx";

const processSteps = [
  { week: 'Week 1', title: 'Discovery', desc: 'Deep dive into your idea, market landscape, competitors, and target users. We map core assumptions that need validation.', icon: '01' },
  { week: 'Week 2', title: 'Validation', desc: 'Test your riskiest assumptions with real users. Interviews, landing pages, and rapid experiments confirm market demand.', icon: '02' },
  { week: 'Week 3', title: 'Design', desc: 'UI/UX design, information architecture, and technical planning. You see and test the product before a line of code.', icon: '03' },
  { week: 'Week 4', title: 'Build', desc: 'Full-stack MVP development with daily progress updates. We ship the core features that solve the validated problem.', icon: '04' },
  { week: 'Week 5', title: 'Test & Refine', desc: 'Real user testing, performance tuning, and polish. We iterate on data and feedback — not guesswork.', icon: '05' },
  { week: 'Week 6', title: 'Launch', desc: 'Go live with monitoring, analytics, and growth foundations baked in. Your validated product meets the real market.', icon: '06' }
];

function ProcessCard({ step, index, isActive, isPassed }) {
  return (
    <div className={`process-card ${isActive ? 'active' : ''}`}>
      <div style={{
        position: 'absolute', top: 20, right: 20, width: 36, height: 36,
        borderRadius: '50%', border: `2px solid ${isPassed || isActive ? 'var(--primary)' : 'var(--border)'}`,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontSize: 11, fontWeight: 700, letterSpacing: '0.05em',
        color: isPassed || isActive ? 'var(--primary)' : 'var(--text-dim)',
        transition: 'all 0.35s var(--ease)',
        background: isActive ? 'var(--primary-dim)' : 'transparent'
      }}>
        {isPassed ? '✓' : step.icon}
      </div>
      <div className="week">{step.week}</div>
      <h3>{step.title}</h3>
      <p>{step.desc}</p>
    </div>
  );
}

function ProcessSection() {
  const sectionRef = React.useRef(null);
  const [progress, setProgress] = React.useState(0);
  const [isMobile, setIsMobile] = React.useState(window.innerWidth < 769);

  React.useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 769);
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  React.useEffect(() => {
    if (isMobile) return;
    const handler = () => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const totalScroll = rect.height - window.innerHeight;
      if (totalScroll <= 0) return;
      const scrolled = Math.max(0, Math.min(1, -rect.top / totalScroll));
      setProgress(scrolled);
    };
    window.addEventListener('scroll', handler, { passive: true });
    handler();
    return () => window.removeEventListener('scroll', handler);
  }, [isMobile]);

  const activeIdx = Math.min(Math.floor(progress * processSteps.length), processSteps.length - 1);
  const cardWidth = 384;
  const translateX = -(progress * (processSteps.length - 1) * cardWidth);

  if (isMobile) {
    return (
      <section id="process" style={{ padding: '80px 0' }}>
        <div className="container">
          <SectionHeader label="Our Process" title="6 Weeks. One Validated Product."
            description="A battle-tested process that turns your idea into a market-ready MVP." />
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {processSteps.map((step, i) => (
              <Reveal key={i} delay={i * 80}>
                <ProcessCard step={step} index={i} isActive={false} isPassed={false} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="process" ref={sectionRef} style={{ padding: 0 }}>
      <div className="process-wrapper">
        <div className="process-sticky">
          <div className="container" style={{ marginBottom: 48 }}>
            <SectionHeader label="Our Process" title="6 Weeks. One Validated Product."
              description="A battle-tested process that turns your idea into a market-ready MVP." />
          </div>
          <div className="process-track" style={{ transform: `translateX(${translateX}px)`, transition: 'transform 0.08s linear' }}>
            {processSteps.map((step, i) => (
              <ProcessCard key={i} step={step} index={i} isActive={i === activeIdx} isPassed={i < activeIdx} />
            ))}
          </div>
          <div className="process-progress">
            <div className="process-progress-fill" style={{ width: `${progress * 100}%`, transition: 'width 0.08s linear' }}></div>
          </div>
          <div className="process-week-dots">
            {processSteps.map((_, i) => (
              <div key={i} className={`process-week-dot ${i === activeIdx ? 'active' : ''} ${i < activeIdx ? 'passed' : ''}`}></div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export { ProcessSection };