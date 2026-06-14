import * as React from "react";
import { Reveal, TiltCard, SectionHeader } from "./hooks.jsx";

function ProblemSection() {
  const stats = [
    { num: '72%', text: 'of startups fail due to no market need' },
    { num: '$50K+', text: 'burned on average before first real customer' },
    { num: '3–6 mo', text: 'wasted building features nobody asked for' }
  ];
  return (
    <section style={{ paddingBottom: 48 }}>
      <div className="container">
        <div style={{ maxWidth: 820, margin: '0 auto', textAlign: 'center' }}>
          <Reveal>
            <div className="section-label">The Problem</div>
            <h2 className="section-title" style={{ marginBottom: 20 }}>
              Everyone's Building.<br />Nobody's Validating.
            </h2>
            <p className="section-desc" style={{ maxWidth: 580, margin: '0 auto 52px' }}>
              AI makes it effortless to build fast. But speed without direction creates expensive failures.
              Most startups don't die from bad engineering — they die from building the wrong thing.
            </p>
          </Reveal>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 20 }}>
            {stats.map((s, i) => (
              <Reveal key={i} delay={i * 120}>
                <TiltCard className="card" style={{ textAlign: 'center', padding: 28 }}>
                  <div style={{ fontSize: '2rem', fontWeight: 700, color: 'var(--primary)', marginBottom: 6, position: 'relative', zIndex: 1 }}>{s.num}</div>
                  <div style={{ fontSize: '0.88rem', color: 'var(--text-muted)', position: 'relative', zIndex: 1 }}>{s.text}</div>
                </TiltCard>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

const servicesData = [
  {
    title: 'Market Research & Discovery',
    desc: 'Deep competitor analysis, TAM/SAM/SOM sizing, and user persona mapping. We understand your market before you spend a dollar.',
    icon: <svg viewBox="0 0 32 32" width="22" height="22"><circle cx="14" cy="14" r="10" stroke="currentColor" strokeWidth="1.5" fill="none"></circle><line x1="21" y1="21" x2="28" y2="28" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"></line><circle cx="14" cy="14" r="4" stroke="currentColor" strokeWidth="1" fill="none" opacity="0.4"></circle></svg>
  },
  {
    title: 'Market Validation',
    desc: 'User interviews, assumption testing, landing page experiments, and demand signals. We prove your idea has legs before building it.',
    icon: <svg viewBox="0 0 32 32" width="22" height="22"><circle cx="16" cy="16" r="13" stroke="currentColor" strokeWidth="1.5" fill="none"></circle><circle cx="16" cy="16" r="7" stroke="currentColor" strokeWidth="1.5" fill="none"></circle><circle cx="16" cy="16" r="2.5" fill="currentColor"></circle></svg>
  },
  {
    title: 'UI/UX Design',
    desc: 'Wireframes, prototypes, and polished visual design. Every screen is tested with real users before development begins.',
    icon: <svg viewBox="0 0 32 32" width="22" height="22"><rect x="4" y="4" width="24" height="24" rx="4" stroke="currentColor" strokeWidth="1.5" fill="none"></rect><rect x="8" y="8" width="7" height="7" rx="1.5" fill="currentColor" opacity="0.4"></rect><rect x="17" y="8" width="7" height="3" rx="1" fill="currentColor" opacity="0.25"></rect><rect x="8" y="17" width="16" height="3" rx="1" fill="currentColor" opacity="0.25"></rect><rect x="8" y="22" width="10" height="3" rx="1" fill="currentColor" opacity="0.15"></rect></svg>
  },
  {
    title: 'Full-Stack Development',
    desc: 'Modern stack, clean architecture, daily deploys. We build MVPs that are production-ready and designed to scale from day one.',
    icon: <svg viewBox="0 0 32 32" width="22" height="22"><polyline points="10,8 4,16 10,24" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round"></polyline><polyline points="22,8 28,16 22,24" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round"></polyline><line x1="18" y1="6" x2="14" y2="26" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"></line></svg>
  },
  {
    title: 'Marketing & Acquisition',
    desc: 'Go-to-market strategy, SEO foundations, paid ads setup, content marketing, and growth loops. We get your first users — not just build the product.',
    icon: <svg viewBox="0 0 32 32" width="22" height="22"><path d="M4 16 C4 16 10 4 16 4 C22 4 28 16 28 16 C28 16 22 28 16 28 C10 28 4 16 4 16Z" stroke="currentColor" strokeWidth="1.5" fill="none"></path><circle cx="16" cy="16" r="4" stroke="currentColor" strokeWidth="1.5" fill="none"></circle><line x1="16" y1="2" x2="16" y2="6" stroke="currentColor" strokeWidth="1" strokeLinecap="round" opacity="0.4"></line><line x1="16" y1="26" x2="16" y2="30" stroke="currentColor" strokeWidth="1" strokeLinecap="round" opacity="0.4"></line></svg>
  },
  {
    title: 'Launch & Scale',
    desc: 'Deployment, monitoring, analytics, performance optimization, and ongoing iteration. We stay with you through growth, not just go-live.',
    icon: <svg viewBox="0 0 32 32" width="22" height="22"><path d="M16 4 L16 20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"></path><path d="M10 14 L16 4 L22 14" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round"></path><path d="M6 28 L26 28" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"></path><path d="M10 24 L22 24" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.4"></path></svg>
  }
];

function ServicesSection() {
  return (
    <section id="services">
      <div className="container">
        <SectionHeader label="What We Do" title="Everything You Need to Launch"
          description="End-to-end product development — no handoffs, no gaps, no surprises." center />
        <div className="services-grid">
          {servicesData.map((s, i) => (
            <Reveal key={i} delay={i * 100}>
              <TiltCard className="card service-card" style={{ height: '100%' }}>
                <div className="icon-wrap">{s.icon}</div>
                <h3>{s.title}</h3>
                <p>{s.desc}</p>
              </TiltCard>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

const compRows = [
  { label: 'Timeline', diy: '3–6 months', agency: '4–12 months', us: '6 weeks' },
  { label: 'Validation', diy: 'None', agency: 'Minimal', us: 'Built-in' },
  { label: 'Quality', diy: 'Inconsistent', agency: 'High', us: 'High' },
  { label: 'Scalability', diy: 'Poor', agency: 'Good', us: 'Built to scale' },
  { label: 'Marketing', diy: 'None', agency: 'Separate vendor', us: 'Built-in' },
  { label: 'Post-Launch', diy: 'You\'re alone', agency: 'Extra cost', us: 'Included' },
  { label: 'Cost', diy: 'Low*', agency: '$50–200K+', us: 'Competitive' }
];

function valClass(v) {
  const bad = ['None', 'Poor', 'Inconsistent', "You're alone", '$50–200K+', '3–6 months', '4–12 months'];
  const mid = ['Minimal', 'Low*', 'Extra cost', 'Good'];
  if (bad.includes(v)) return 'bad';
  if (mid.includes(v)) return 'mid';
  return '';
}

function ComparisonSection() {
  return (
    <section id="comparison" style={{ background: 'var(--bg-2)' }}>
      <div className="container">
        <SectionHeader label="Why LaunchGrid" title="Compare Your Options"
          description="See how we stack up against building it yourself or hiring a traditional agency." center />
        <Reveal>
          <div className="comparison-grid">
            <div className="comparison-col">
              <div className="comparison-header">DIY with AI</div>
              {compRows.map((r, i) => (
                <div key={i} className="comparison-row">
                  <span className="label">{r.label}</span>
                  <span className={`value ${valClass(r.diy)}`}>{r.diy}</span>
                </div>
              ))}
            </div>
            <div className="comparison-col">
              <div className="comparison-header">Traditional Agency</div>
              {compRows.map((r, i) => (
                <div key={i} className="comparison-row">
                  <span className="label">{r.label}</span>
                  <span className={`value ${valClass(r.agency)}`}>{r.agency}</span>
                </div>
              ))}
            </div>
            <div className="comparison-col featured">
              <div className="comparison-badge">Recommended</div>
              <div className="comparison-header">LaunchGrid</div>
              {compRows.map((r, i) => (
                <div key={i} className="comparison-row">
                  <span className="label">{r.label}</span>
                  <span className="value good">{r.us}</span>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

// Validation methodology section
const validationSteps = [
  { num: '01', title: 'Hypothesize', desc: 'Map your core assumptions. What must be true for this to work?' },
  { num: '02', title: 'Research', desc: 'Talk to real users. Analyze competitors. Size the market.' },
  { num: '03', title: 'Experiment', desc: 'Landing pages, fake doors, prototypes. Test demand with real signals.' },
  { num: '04', title: 'Measure', desc: 'Conversion rates, interview insights, willingness to pay. Hard data only.' },
  { num: '05', title: 'Decide', desc: 'Go, pivot, or kill. Every dollar after this point is an informed bet.' }
];

function ValidationSection() {
  return (
    <section style={{ background: 'var(--bg-2)' }}>
      <div className="container">
        <SectionHeader label="Our Methodology" title="We Don't Guess. We Validate."
          description="Most products fail because founders skip validation. Our 5-step framework ensures you only build what the market actually wants." center />
        <Reveal>
          <div className="validation-flow" style={{ gap: 8 }}>
            {validationSteps.map((step, i) => (
              <React.Fragment key={i}>
                <div className="validation-step">
                  <div className="step-num">{step.num}</div>
                  <h4>{step.title}</h4>
                  <p>{step.desc}</p>
                </div>
                {i < validationSteps.length - 1 && (
                  <div className="validation-connector">
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                      <path d="M4 10h12M12 6l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                    </svg>
                  </div>
                )}
              </React.Fragment>
            ))}
          </div>
        </Reveal>
        <Reveal delay={200}>
          <div style={{ textAlign: 'center', marginTop: 48 }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 12, padding: '14px 24px', borderRadius: 12, background: 'var(--primary-dim)', border: '1px solid rgba(0,212,255,0.15)' }}>
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M10 2v16M2 10h16" stroke="var(--primary)" strokeWidth="2" strokeLinecap="round"></path></svg>
              <span style={{ fontSize: '0.9rem', color: 'var(--primary)', fontWeight: 600 }}>Result: 92% of our launched products find paying users within 30 days</span>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

export { ProblemSection, ServicesSection, ComparisonSection, ValidationSection };