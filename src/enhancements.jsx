import * as React from "react";
import { useInView, Reveal, SectionHeader, smoothScrollTo } from "./hooks.jsx";

// ─── Custom Cursor ───
function CustomCursor({ mouseX, mouseY }) {
  const posRef = React.useRef({ x: 0, y: 0 });
  const ringRef = React.useRef(null);
  const [state, setState] = React.useState('');
  const scrollTimer = React.useRef(null);

  // Smooth ring follow
  React.useEffect(() => {
    let raf;
    const follow = () => {
      posRef.current.x += (mouseX - posRef.current.x) * 0.15;
      posRef.current.y += (mouseY - posRef.current.y) * 0.15;
      if (ringRef.current) {
        ringRef.current.style.transform = `translate(${posRef.current.x}px, ${posRef.current.y}px)`;
      }
      raf = requestAnimationFrame(follow);
    };
    raf = requestAnimationFrame(follow);
    return () => cancelAnimationFrame(raf);
  }, [mouseX, mouseY]);

  // Hover detection
  React.useEffect(() => {
    const over = (e) => {
      const t = e.target.closest('a, button, .btn, .nav-cta, .case-card, .tech-badge, .faq-question, .pricing-card, .tombstone, .terminal-replay');
      setState(prev => t ? 'hovering' : prev === 'scrolling' ? 'scrolling' : '');
    };
    document.addEventListener('mouseover', over);
    return () => document.removeEventListener('mouseover', over);
  }, []);

  // Scroll detection
  React.useEffect(() => {
    const handler = () => {
      setState('scrolling');
      clearTimeout(scrollTimer.current);
      scrollTimer.current = setTimeout(() => setState(''), 180);
    };
    window.addEventListener('scroll', handler, { passive: true });
    return () => { window.removeEventListener('scroll', handler); clearTimeout(scrollTimer.current); };
  }, []);

  // Click detection
  React.useEffect(() => {
    const down = () => setState('clicking');
    const up = () => setTimeout(() => setState(''), 120);
    document.addEventListener('mousedown', down);
    document.addEventListener('mouseup', up);
    return () => { document.removeEventListener('mousedown', down); document.removeEventListener('mouseup', up); };
  }, []);

  return (
    <>
      <div className={`custom-cursor ${state}`} style={{ transform: `translate(${mouseX}px, ${mouseY}px)` }}>
        <div className="cursor-dot"></div>
      </div>
      <div className={`custom-cursor ${state}`} ref={ringRef}>
        <div className="cursor-ring"></div>
      </div>
    </>
  );
}

// ─── Cursor Particle Trail ───
function CursorParticles({ mouseX, mouseY }) {
  const [particles, setParticles] = React.useState([]);
  const lastRef = React.useRef({ x: 0, y: 0, t: 0 });
  const idRef = React.useRef(0);

  React.useEffect(() => {
    const now = Date.now();
    const dx = mouseX - lastRef.current.x;
    const dy = mouseY - lastRef.current.y;
    const dist = Math.sqrt(dx * dx + dy * dy);
    if (dist < 10 || now - lastRef.current.t < 35) return;
    lastRef.current = { x: mouseX, y: mouseY, t: now };

    const count = Math.min(3, Math.ceil(dist / 18));
    const newP = Array.from({ length: count }, () => ({
      id: idRef.current++,
      x: mouseX + (Math.random() - 0.5) * 14,
      y: mouseY + (Math.random() - 0.5) * 14,
      size: 2 + Math.random() * 3.5,
      life: 500 + Math.random() * 450,
      vx: (Math.random() - 0.5) * 30,
      vy: (Math.random() - 0.5) * 30 - 12
    }));

    setParticles(prev => [...prev.slice(-40), ...newP]);
    newP.forEach(p => {
      setTimeout(() => setParticles(prev => prev.filter(pp => pp.id !== p.id)), p.life);
    });
  }, [mouseX, mouseY]);

  if (particles.length === 0) return null;
  return (
    <div style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 997 }}>
      {particles.map(p => (
        <div key={p.id} className="cursor-particle" style={{
          left: p.x, top: p.y, width: p.size, height: p.size,
          animationDuration: `${p.life}ms`,
          '--vx': `${p.vx}px`, '--vy': `${p.vy}px`
        }}></div>
      ))}
    </div>
  );
}

// ─── Side Navigation Dots ───
function SideNav() {
  const [active, setActive] = React.useState(-1);
  const ids = ['graveyard', 'process', 'services', 'comparison', 'terminal', 'cases', 'pricing', 'faq', 'contact'];

  React.useEffect(() => {
    const handler = () => {
      if (window.scrollY < 300) { setActive(-1); return; }
      const mid = window.innerHeight * 0.4;
      for (let i = ids.length - 1; i >= 0; i--) {
        const el = document.getElementById(ids[i]);
        if (el && el.getBoundingClientRect().top < mid) { setActive(i); break; }
      }
    };
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, []);

  return (
    <div className="side-nav">
      {ids.map((id, i) => (
        <button key={i} className={`side-dot ${i === active ? 'active' : ''}`}
          onClick={() => smoothScrollTo(id)} aria-label={id}></button>
      ))}
    </div>
  );
}

// ─── Activity Ticker ───
function ActivityTicker() {
  const items = [
    '🟢 FinTrack launched — 500 beta signups in week 1',
    '✦ New MVP validated for healthcare startup',
    '🟢 MealPrep AI crossed 12,000 downloads',
    '✦ ConnectHub reached $120K ARR in 6 months',
    '🟢 E-commerce platform shipped in 5 weeks',
    '✦ 3 discovery calls booked in the last 24 hours',
    '🟢 AI recruitment tool entering build phase',
    '✦ SaaS dashboard MVP delivered ahead of schedule',
  ];
  return (
    <div className="ticker-strip" style={{ position: 'relative', zIndex: 1 }}>
      <div className="ticker-track">
        {[...items, ...items].map((item, i) => (
          <span key={i} className="ticker-item">{item}</span>
        ))}
      </div>
    </div>
  );
}

// ─── Startup Graveyard ───
const graves = [
  { name: 'SocialMeal', year: '2022 – 2023', cause: 'Built for 8 months. Zero users wanted social dining features. Market said no on day one — but nobody asked.', burned: '$120K' },
  { name: 'TaskFlow Pro', year: '2023 – 2024', cause: 'Gorgeous UI. Solved a problem that only existed in the founder\'s imagination. No interviews conducted.', burned: '$85K' },
  { name: 'CryptoTrackr', year: '2023', cause: '"Market research" was reading Twitter threads. The crypto tracking market had consolidated 6 months prior.', burned: '$200K' },
  { name: 'FitBuddy AI', year: '2023 – 2024', cause: '12 months perfecting AI models. A scrappy competitor launched and captured the market in 6 weeks.', burned: '$150K' },
];

function GraveyardSection() {
  const [waste, setWaste] = React.useState(2347891);
  React.useEffect(() => {
    const iv = setInterval(() => {
      setWaste(prev => prev + Math.floor(Math.random() * 900) + 200);
    }, 2200);
    return () => clearInterval(iv);
  }, []);

  return (
    <section id="graveyard">
      <div className="container">
        <SectionHeader label="The Startup Graveyard" title="Products That Skipped Validation"
          description="Funding, talent, ambition — they had everything except proof anyone wanted what they were building." center />
        <Reveal>
          <div className="waste-counter">
            <span className="waste-label">Estimated capital wasted on unvalidated products today</span>
            <span className="waste-value">${waste.toLocaleString()}</span>
            <span className="waste-live">● LIVE</span>
          </div>
        </Reveal>
        <div className="graveyard-grid">
          {graves.map((g, i) => (
            <Reveal key={i} delay={i * 180}>
              <div className="tombstone">
                <div className="tombstone-rip">R.I.P.</div>
                <div className="tombstone-cross">✝</div>
                <div className="tombstone-name">{g.name}</div>
                <div className="tombstone-year">{g.year}</div>
                <div className="tombstone-divider"></div>
                <div className="tombstone-cause">"{g.cause}"</div>
                <div className="tombstone-burned">{g.burned} burned</div>
              </div>
            </Reveal>
          ))}
        </div>
        <Reveal delay={700}>
          <p className="graveyard-cta">Don't let your product end up here.</p>
        </Reveal>
      </div>
    </section>
  );
}

// ─── Terminal Animation ───
const termLines = [
  { type: 'cmd', text: '$ launchgrid init "YourStartup"', delay: 0 },
  { type: 'ok', text: '✓ Project initialized', delay: 700 },
  { type: 'cmd', text: '$ launchgrid validate --market fintech --depth deep', delay: 1500 },
  { type: 'info', text: '→ Running competitive landscape analysis...', delay: 2100 },
  { type: 'info', text: '→ Conducting 15 user interviews...', delay: 3000 },
  { type: 'info', text: '→ A/B testing 3 landing page variants...', delay: 3900 },
  { type: 'ok', text: '✓ Validation: 78% positive signal — GO', delay: 4800 },
  { type: 'cmd', text: '$ launchgrid design --system modern --test', delay: 5700 },
  { type: 'info', text: '→ Wireframes generated (12 screens)', delay: 6300 },
  { type: 'info', text: '→ User testing: 4/5 core tasks passed', delay: 7200 },
  { type: 'ok', text: '✓ Design locked — stakeholder approved', delay: 8000 },
  { type: 'cmd', text: '$ launchgrid build --stack react,node,postgres --ci', delay: 8900 },
  { type: 'info', text: '→ Infrastructure scaffolded (AWS)', delay: 9500 },
  { type: 'info', text: '→ Core features built [████████████] 100%', delay: 10500 },
  { type: 'info', text: '→ Tests: 147/147 passed', delay: 11400 },
  { type: 'ok', text: '✓ MVP ready — all checks green', delay: 12100 },
  { type: 'cmd', text: '$ launchgrid launch --deploy prod --monitor --market', delay: 13000 },
  { type: 'info', text: '→ SSL ✓  CDN ✓  Monitoring ✓  Analytics ✓', delay: 13600 },
  { type: 'info', text: '→ SEO foundations deployed, ad campaigns live', delay: 14200 },
  { type: 'ok', text: '✓ 🚀 LIVE — First paying user in 47 minutes', delay: 15000 },
];

function TerminalSection() {
  const ref = React.useRef(null);
  const inView = useInView(ref, { threshold: 0.25 });
  const [lines, setLines] = React.useState([]);
  const [started, setStarted] = React.useState(false);
  const [isDone, setIsDone] = React.useState(false);
  const bodyRef = React.useRef(null);
  const timersRef = React.useRef([]);

  const runSequence = React.useCallback(() => {
    setLines([]);
    setIsDone(false);
    timersRef.current.forEach(clearTimeout);
    timersRef.current = [];
    termLines.forEach((line, i) => {
      const t = setTimeout(() => {
        setLines(prev => [...prev, line]);
        if (bodyRef.current) {
          bodyRef.current.scrollTop = bodyRef.current.scrollHeight;
        }
        if (i === termLines.length - 1) setTimeout(() => setIsDone(true), 600);
      }, line.delay + 200);
      timersRef.current.push(t);
    });
  }, []);

  React.useEffect(() => {
    if (inView && !started) {
      setStarted(true);
      runSequence();
    }
  }, [inView, started, runSequence]);

  React.useEffect(() => {
    return () => timersRef.current.forEach(clearTimeout);
  }, []);

  return (
    <section ref={ref} id="terminal">
      <div className="container">
        <SectionHeader label="See It In Action" title="Watch Us Build Your MVP" center
          description="From initialization to launch — every step validated, tested, and shipped." />
        <Reveal>
          <div className="terminal">
            <div className="terminal-header">
              <div className="terminal-dots">
                <span style={{ width: 11, height: 11, borderRadius: '50%', background: '#ff5f56', display: 'block' }}></span>
                <span style={{ width: 11, height: 11, borderRadius: '50%', background: '#ffbd2e', display: 'block' }}></span>
                <span style={{ width: 11, height: 11, borderRadius: '50%', background: '#27c93f', display: 'block' }}></span>
              </div>
              <span className="terminal-title">launchgrid-cli v2.4.0</span>
              {isDone && (
                <button className="terminal-replay" onClick={runSequence}>↻ Replay</button>
              )}
            </div>
            <div className="terminal-body" ref={bodyRef}>
              {lines.map((line, i) => (
                <div key={`${i}-${line.text}`} className={`terminal-line t-${line.type}`}>{line.text}</div>
              ))}
              {started && !isDone && <span className="terminal-cursor">█</span>}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

export { CustomCursor, CursorParticles, SideNav, ActivityTicker, GraveyardSection, TerminalSection };