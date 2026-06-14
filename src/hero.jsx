import * as React from "react";
import { useScramble, MagneticButton, CountStat, smoothScrollTo, openCalendly } from "./hooks.jsx";

function MeteorField() {
  const meteors = React.useMemo(() =>
    Array.from({ length: 16 }, (_, i) => ({
      id: i,
      top: `${-15 + Math.random() * 55}%`,
      left: `${25 + Math.random() * 85}%`,
      height: 50 + Math.random() * 130,
      duration: 2.5 + Math.random() * 5,
      delay: Math.random() * 25
    }))
  , []);
  return (
    <div className="meteor-field">
      {meteors.map(m => (
        <div key={m.id} className="meteor" style={{
          top: m.top, left: m.left, height: m.height,
          animationDuration: `${m.duration}s`,
          animationDelay: `${m.delay}s`
        }}></div>
      ))}
    </div>
  );
}

function FloatingShapes() {
  return (
    <>
      <div className="floating-shape" style={{ top: '12%', left: '6%', animation: 'shape-drift1 35s linear infinite' }}>
        <svg width="44" height="44" viewBox="0 0 44 44"><polygon points="22,2 42,14 42,34 22,42 2,34 2,14" stroke="rgba(0,212,255,0.1)" strokeWidth="1" fill="none"></polygon></svg>
      </div>
      <div className="floating-shape" style={{ top: '55%', right: '4%', animation: 'shape-drift2 28s linear infinite' }}>
        <svg width="32" height="32" viewBox="0 0 32 32"><rect x="2" y="2" width="28" height="28" rx="3" stroke="rgba(139,92,246,0.09)" strokeWidth="1" fill="none" transform="rotate(45 16 16)"></rect></svg>
      </div>
      <div className="floating-shape" style={{ top: '35%', left: '88%', animation: 'shape-drift3 32s linear infinite' }}>
        <svg width="28" height="28" viewBox="0 0 28 28"><polygon points="14,2 26,24 2,24" stroke="rgba(0,232,123,0.08)" strokeWidth="1" fill="none"></polygon></svg>
      </div>
      <div className="floating-shape" style={{ top: '78%', left: '12%', animation: 'shape-drift1 30s linear infinite reverse' }}>
        <svg width="22" height="22" viewBox="0 0 22 22"><circle cx="11" cy="11" r="9" stroke="rgba(0,212,255,0.07)" strokeWidth="1" fill="none"></circle></svg>
      </div>
      <div className="floating-shape" style={{ top: '22%', left: '65%', animation: 'shape-drift2 38s linear infinite reverse' }}>
        <svg width="18" height="18" viewBox="0 0 18 18"><rect x="1" y="1" width="16" height="16" rx="2" stroke="rgba(245,158,11,0.06)" strokeWidth="1" fill="none"></rect></svg>
      </div>
      <div className="floating-shape" style={{ top: '70%', right: '20%', animation: 'shape-drift3 26s linear infinite' }}>
        <svg width="36" height="36" viewBox="0 0 36 36"><polygon points="18,3 33,13 33,29 18,33 3,29 3,13" stroke="rgba(139,92,246,0.06)" strokeWidth="1" fill="none"></polygon></svg>
      </div>
    </>
  );
}

function GridBackground({ mouseX, mouseY }) {
  return (
    <div className="grid-bg">
      <div className="grid-dots"></div>
      <div className="grid-glow" style={{
        background: `radial-gradient(650px circle at ${mouseX}px ${mouseY}px, rgba(0,212,255,0.05), transparent 70%)`
      }}></div>
      <MeteorField />
      <FloatingShapes />
      <div className="grid-orb" style={{
        width: 900, height: 900,
        background: 'radial-gradient(circle, rgba(139,92,246,0.05), transparent 70%)',
        top: '-5%', right: '-15%', animation: 'float1 28s ease-in-out infinite'
      }}></div>
      <div className="grid-orb" style={{
        width: 700, height: 700,
        background: 'radial-gradient(circle, rgba(0,212,255,0.035), transparent 70%)',
        bottom: '5%', left: '-10%', animation: 'float2 32s ease-in-out infinite'
      }}></div>
      <div className="grid-orb" style={{
        width: 500, height: 500,
        background: 'radial-gradient(circle, rgba(0,232,123,0.025), transparent 70%)',
        top: '50%', left: '40%', animation: 'float3 22s ease-in-out infinite'
      }}></div>
    </div>
  );
}

function Navbar() {
  const [scrolled, setScrolled] = React.useState(false);
  const [menuOpen, setMenuOpen] = React.useState(false);

  React.useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, []);

  const navClick = (e, id) => { e.preventDefault(); smoothScrollTo(id); setMenuOpen(false); };

  return (
    <nav className={`main-nav ${scrolled ? 'scrolled' : ''}`}>
      <div className="nav-inner">
        <a href="#" className="nav-logo" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>
          <div className="logo-mark"><span></span><span></span><span></span><span></span></div>
          LaunchGrid
        </a>
        <ul className={`nav-links ${menuOpen ? 'open' : ''}`}>
          <li><a href="#process" onClick={(e) => navClick(e, 'process')}>Process</a></li>
          <li><a href="#services" onClick={(e) => navClick(e, 'services')}>Services</a></li>
          <li><a href="#pricing" onClick={(e) => navClick(e, 'pricing')}>Pricing</a></li>
          <li><a href="#cases" onClick={(e) => navClick(e, 'cases')}>Work</a></li>
          <li><a href="#faq" onClick={(e) => navClick(e, 'faq')}>FAQ</a></li>
        </ul>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <MagneticButton className="nav-cta" onClick={openCalendly}>Book a Call</MagneticButton>
          <button className="nav-toggle" onClick={() => setMenuOpen(!menuOpen)} aria-label="Menu">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              {menuOpen
                ? <><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></>
                : <><line x1="4" y1="8" x2="20" y2="8"></line><line x1="4" y1="16" x2="20" y2="16"></line></>
              }
            </svg>
          </button>
        </div>
      </div>
    </nav>
  );
}

function HeroSection() {
  const [loaded, setLoaded] = React.useState(false);
  const line1 = useScramble('From Idea to Market', { speed: 22, delay: 400, active: loaded });
  const line2 = useScramble('In 6 Weeks', { speed: 22, delay: 900, active: loaded });

  React.useEffect(() => { const t = setTimeout(() => setLoaded(true), 150); return () => clearTimeout(t); }, []);

  const t = (d, extra = {}) => ({
    opacity: loaded ? 1 : 0,
    transform: loaded ? 'translateY(0)' : 'translateY(16px)',
    transition: `opacity 0.7s var(--ease) ${d}s, transform 0.7s var(--ease) ${d}s`,
    ...extra
  });

  return (
    <section className="hero">
      <div className="container">
        <div style={t(0.15)}>
          <div className="hero-badge"><span className="dot"></span>MVP Development Studio</div>
        </div>
        <h1>
          <span style={t(0.3, { display: 'block', minHeight: '1.1em' })}>{line1 || '\u00a0'}</span>
          <span className="accent gradient-text" style={t(0.8, { display: 'block', minHeight: '1.1em' })}>{line2 || '\u00a0'}</span>
        </h1>
        <p className="hero-sub" style={t(1.2)}>
          We validate, build, and launch your MVP — before you waste months building something nobody wants.
        </p>
        <div className="hero-buttons" style={t(1.4)}>
          <MagneticButton className="btn btn-primary" onClick={openCalendly}>
            Book Discovery Call
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path></svg>
          </MagneticButton>
          <MagneticButton className="btn btn-secondary" onClick={() => smoothScrollTo('process')}>
            See How It Works
          </MagneticButton>
        </div>
        <div className="hero-stats" style={t(1.7)}>
          <CountStat value={50} suffix="+" label="MVPs Launched" />
          <CountStat value={6} suffix="" label="Week Delivery" />
          <CountStat value={92} suffix="%" label="Validation Rate" />
        </div>
      </div>
      <div className="scroll-indicator" style={{ opacity: loaded ? 0.6 : 0, transition: 'opacity 1s 2.2s' }}>
        <span>Scroll</span>
        <div className="scroll-line"></div>
      </div>
    </section>
  );
}

export { GridBackground, MeteorField, FloatingShapes, Navbar, HeroSection };