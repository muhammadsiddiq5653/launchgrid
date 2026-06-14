import * as React from "react";

// ── Calendly ─────────────────────────────────────────────────────────────────
// Replace this URL with your actual Calendly link before deploying.
const CALENDLY_URL = 'https://calendly.com/YOUR_USERNAME/discovery-call';

function openCalendly(e) {
  if (e && e.preventDefault) e.preventDefault();
  if (window.Calendly) {
    window.Calendly.initPopupWidget({ url: CALENDLY_URL });
  } else {
    window.open(CALENDLY_URL, '_blank');
  }
}
// ─────────────────────────────────────────────────────────────────────────────

function useInView(ref, options = {}) {
  const [inView, setInView] = React.useState(false);
  React.useEffect(() => {
    if (!ref.current) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { setInView(true); observer.disconnect(); }
    }, { threshold: 0.15, ...options });
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);
  return inView;
}

function useCountUp(target, duration = 2000, start = false) {
  const [value, setValue] = React.useState(0);
  React.useEffect(() => {
    if (!start) return;
    let startTime = null;
    const step = (ts) => {
      if (!startTime) startTime = ts;
      const p = Math.min((ts - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setValue(Math.round(eased * target));
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [start, target, duration]);
  return value;
}

function useScramble(text, { speed = 30, delay = 0, active = true } = {}) {
  const [displayed, setDisplayed] = React.useState('');
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ0123456789#@&';
  React.useEffect(() => {
    if (!active) { setDisplayed(''); return; }
    let timeout, interval, iter = 0;
    const len = text.length;
    timeout = setTimeout(() => {
      interval = setInterval(() => {
        setDisplayed(
          text.split('').map((ch, i) => {
            if (ch === ' ') return ' ';
            if (i < iter) return text[i];
            return chars[Math.floor(Math.random() * chars.length)];
          }).join('')
        );
        iter += 0.5;
        if (iter >= len) { setDisplayed(text); clearInterval(interval); }
      }, speed);
    }, delay);
    return () => { clearTimeout(timeout); clearInterval(interval); };
  }, [text, speed, delay, active]);
  return displayed;
}

function useScrollProgress() {
  const [progress, setProgress] = React.useState(0);
  React.useEffect(() => {
    const handler = () => {
      const total = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(total > 0 ? window.scrollY / total : 0);
    };
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, []);
  return progress;
}

// --- UTILITY COMPONENTS ---

function Reveal({ children, direction = 'up', delay = 0, className = '', style = {} }) {
  const ref = React.useRef(null);
  const inView = useInView(ref);
  const cls = direction === 'left' ? 'reveal-left' : direction === 'scale' ? 'reveal-scale' : 'reveal';
  return (
    <div ref={ref} className={`${cls} ${inView ? 'in-view' : ''} ${className}`}
      style={{ transitionDelay: `${delay}ms`, ...style }}>
      {children}
    </div>
  );
}

function MagneticButton({ children, className = '', onClick, style = {}, href }) {
  const ref = React.useRef(null);
  const [pos, setPos] = React.useState({ x: 0, y: 0 });
  const props = {
    ref, className, onClick,
    style: { transform: `translate(${pos.x}px, ${pos.y}px)`, transition: 'transform 0.25s ease-out', ...style },
    onMouseMove: (e) => {
      const r = ref.current.getBoundingClientRect();
      setPos({ x: (e.clientX - r.left - r.width / 2) * 0.15, y: (e.clientY - r.top - r.height / 2) * 0.15 });
    },
    onMouseLeave: () => setPos({ x: 0, y: 0 })
  };
  return href ? <a href={href} {...props}>{children}</a> : <button {...props}>{children}</button>;
}

function TiltCard({ children, className = '', style = {}, onClick }) {
  const ref = React.useRef(null);
  const [tf, setTf] = React.useState('');
  const [glowPos, setGlowPos] = React.useState({ x: '50%', y: '50%' });
  return (
    <div ref={ref} className={className} onClick={onClick}
      style={{ transform: tf, transition: 'transform 0.25s ease-out', '--cx': glowPos.x, '--cy': glowPos.y, ...style }}
      onMouseMove={(e) => {
        const r = ref.current.getBoundingClientRect();
        const x = (e.clientX - r.left) / r.width;
        const y = (e.clientY - r.top) / r.height;
        setTf(`perspective(800px) rotateX(${(y - 0.5) * -6}deg) rotateY(${(x - 0.5) * 6}deg) scale(1.015)`);
        setGlowPos({ x: `${x * 100}%`, y: `${y * 100}%` });
      }}
      onMouseLeave={() => { setTf(''); setGlowPos({ x: '50%', y: '50%' }); }}>
      {children}
    </div>
  );
}

function SectionHeader({ label, title, description, center = false }) {
  return (
    <Reveal className={`section-header ${center ? 'center' : ''}`}>
      {label && <div className="section-label">{label}</div>}
      <h2 className="section-title">{title}</h2>
      {description && <p className="section-desc">{description}</p>}
    </Reveal>
  );
}

function CountStat({ value, suffix = '', label }) {
  const ref = React.useRef(null);
  const inView = useInView(ref);
  const count = useCountUp(value, 2000, inView);
  return (
    <div ref={ref} className="hero-stat">
      <div className="number">{count}{suffix}</div>
      <div className="label">{label}</div>
    </div>
  );
}

function smoothScrollTo(id) {
  const el = document.getElementById(id);
  if (el) {
    const y = el.getBoundingClientRect().top + window.scrollY - 80;
    window.scrollTo({ top: y, behavior: 'smooth' });
  }
}

export { useInView, useCountUp, useScramble, useScrollProgress, Reveal, MagneticButton, TiltCard, SectionHeader, CountStat, smoothScrollTo, openCalendly, CALENDLY_URL };