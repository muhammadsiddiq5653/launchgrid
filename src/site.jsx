import * as React from 'react';

// ── Booking link ─────────────────────────────────────────────────────────────
// Replace with your Calendly / Cal.com link before deploying.
// Every "Book a discovery call" button on the site uses this one constant.
export const CALENDLY_URL = 'https://calendly.com/YOUR_USERNAME/discovery-call';

export const LINKEDIN_URL = 'https://www.linkedin.com/company/108582258/';
export const EMAIL = 'hello.launchgridhq@gmail.com';

// Calendly's widget is only fetched on the first click, so it costs nothing on page load.
let calendlyLoading = null;
function loadCalendly() {
  if (window.Calendly) return Promise.resolve();
  if (!calendlyLoading) {
    calendlyLoading = new Promise((resolve, reject) => {
      const css = document.createElement('link');
      css.rel = 'stylesheet';
      css.href = 'https://assets.calendly.com/assets/external/widget.css';
      document.head.appendChild(css);
      const s = document.createElement('script');
      s.src = 'https://assets.calendly.com/assets/external/widget.js';
      s.async = true;
      s.onload = resolve;
      s.onerror = reject;
      document.head.appendChild(s);
    });
  }
  return calendlyLoading;
}

function onBook(e) {
  if (!CALENDLY_URL.includes('calendly.com') || e.metaKey || e.ctrlKey) return; // let the link open normally
  e.preventDefault();
  loadCalendly()
    .then(() => window.Calendly.initPopupWidget({ url: CALENDLY_URL }))
    .catch(() => window.open(CALENDLY_URL, '_blank', 'noopener'));
}

function BookButton({ children = 'Book a discovery call', variant = 'primary', size, className = '' }) {
  return (
    <a href={CALENDLY_URL} target="_blank" rel="noopener" onClick={onBook}
      className={`btn btn-${variant}${size ? ` btn-${size}` : ''} ${className}`}>
      {children}
      <Arrow />
    </a>
  );
}

function Arrow() {
  return (
    <svg className="btn-arrow" width="16" height="16" viewBox="0 0 16 16" aria-hidden="true">
      <path d="M3 8h10M9 4l4 4-4 4" fill="none" stroke="currentColor" strokeWidth="1.8"
        strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

// ── Reveal on scroll ─────────────────────────────────────────────────────────
export function useReveal() {
  React.useEffect(() => {
    const all = [...document.querySelectorAll('[data-reveal]')];
    // Anything already on screen (or every element, without IntersectionObserver) shows immediately,
    // so crawlers, link previews and tall viewports never see a blank page.
    const els = all.filter((el) => {
      const onScreen = el.getBoundingClientRect().top < window.innerHeight;
      if (onScreen || !('IntersectionObserver' in window)) el.classList.add('is-in');
      return !el.classList.contains('is-in');
    });
    if (!els.length) return;
    const io = new IntersectionObserver((entries) => {
      entries.forEach((en) => {
        if (en.isIntersecting) { en.target.classList.add('is-in'); io.unobserve(en.target); }
      });
    }, { rootMargin: '0px 0px -8% 0px' });
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
}

// ── Brand ────────────────────────────────────────────────────────────────────
export function LogoMark({ size = 28, className = '' }) {
  return (
    <svg className={className} width={size} height={size} viewBox="0 0 56 56" aria-hidden="true">
      <path d="M50 6 L42.14 13.86 A20 20 0 1 0 48 28 L33 28" fill="none" stroke="currentColor"
        strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M40 6 L50 6 L50 16" fill="none" stroke="currentColor" strokeWidth="5"
        strokeLinecap="round" strokeLinejoin="round" />
      <rect x="24" y="24" width="8" height="8" rx="1.5" fill="#FF6B5B" />
    </svg>
  );
}

function Logo({ href = '#top' }) {
  return (
    <a href={href} className="logo" aria-label="LaunchGrid home">
      <LogoMark />
      <span className="logo-word">LaunchGrid</span>
    </a>
  );
}

function Eyebrow({ children }) {
  return <p className="eyebrow">{children}</p>;
}

// ── Nav ──────────────────────────────────────────────────────────────────────
const navLinks = [
  ['Process', '#process'],
  ['Pricing', '#pricing'],
  ['Work', '#work'],
  ['FAQ', '#faq'],
];

export function Nav() {
  const [open, setOpen] = React.useState(false);
  const [scrolled, setScrolled] = React.useState(false);

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  React.useEffect(() => {
    document.body.classList.toggle('menu-open', open);
    const onKey = (e) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  return (
    <header className={`nav${scrolled ? ' is-scrolled' : ''}${open ? ' is-open' : ''}`}>
      <div className="container nav-inner">
        <Logo />
        <nav className="nav-links" aria-label="Main" onClick={(e) => e.target.closest('a') && setOpen(false)}>
          {navLinks.map(([label, href]) => <a key={href} href={href}>{label}</a>)}
          <BookButton className="nav-cta-mobile" />
        </nav>
        <BookButton className="nav-cta" size="sm" />
        <button className="nav-toggle" aria-expanded={open} aria-label={open ? 'Close menu' : 'Open menu'}
          onClick={() => setOpen(!open)}>
          <span></span><span></span>
        </button>
      </div>
    </header>
  );
}

// ── Hero ─────────────────────────────────────────────────────────────────────
export function Hero() {
  return (
    <section id="top" className="hero section-paper">
      <div className="container">
        <Eyebrow>MVP studio for founders</Eyebrow>
        <h1 className="display hero-title">
          We help founders build what people <em>actually</em> want.
        </h1>
        <div className="hero-foot">
          <p className="lead">We validate, build and launch your product in 6&nbsp;weeks.</p>
          <div className="btn-row">
            <BookButton>Book a free discovery call</BookButton>
            <a href="#pricing" className="btn btn-outline">See pricing</a>
          </div>
        </div>
      </div>
    </section>
  );
}

// ── Proof bar ────────────────────────────────────────────────────────────────
const proof = [
  ['49+', 'MVPs launched'],
  ['92%', 'found paying users within 30 days'],
  ['6 wks', 'from idea to launch'],
];

export function ProofBar() {
  return (
    <section className="proof section-paper" aria-label="Results">
      <div className="container">
        <dl className="proof-grid">
          {proof.map(([n, l]) => (
            <div key={l} className="proof-item" data-reveal>
              <dt className="proof-num">{n}</dt>
              <dd className="proof-label">{l}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}

// ── Comparison ───────────────────────────────────────────────────────────────
const compCols = ['DIY with AI', 'Agency', 'LaunchGrid'];
const compRows = [
  ['Timeline', '3–6 months', '4–12 months', '6 weeks'],
  ['Validation', 'None', 'Minimal', 'Built in'],
  ['Marketing', 'None', 'Separate vendor', 'Built in'],
  ['After launch', "You're alone", 'Extra cost', '30 days included'],
  ['Cost', 'Low*', '$50–200K+', 'From $14,900'],
];

export function Comparison() {
  return (
    <section id="compare" className="section section-paper">
      <div className="container">
        <div className="section-head" data-reveal>
          <Eyebrow>Compare your options</Eyebrow>
          <h2 className="display h2">Three ways to build your <em>MVP.</em></h2>
        </div>
        <div className="compare" role="table" aria-label="LaunchGrid compared with DIY and agencies" data-reveal>
          <div className="compare-row compare-headrow" role="row">
            <span className="compare-label" role="columnheader"><span className="sr-only">Criteria</span></span>
            {compCols.map((c, i) => (
              <span key={c} role="columnheader" className={`compare-cell compare-colhead${i === 2 ? ' is-us' : ''}`}>
                {i === 2 ? <em>{c}</em> : c}
              </span>
            ))}
          </div>
          {compRows.map(([label, ...vals]) => (
            <div key={label} className="compare-row" role="row">
              <span className="compare-label" role="rowheader">{label}</span>
              {vals.map((v, i) => (
                <span key={i} role="cell" className={`compare-cell${i === 2 ? ' is-us' : ''}`}>
                  <span className="compare-mobile-col" aria-hidden="true">{compCols[i]}</span>
                  {v}
                </span>
              ))}
            </div>
          ))}
        </div>
        <p className="footnote">*Until you count the months spent building the wrong thing.</p>
      </div>
    </section>
  );
}

// ── Process ──────────────────────────────────────────────────────────────────
const steps = [
  { name: 'Validate', weeks: 'Wk 1–2', span: 2, desc: 'Market research, 10+ customer interviews and demand tests, ending in a clear go/no-go call.' },
  { name: 'Design', weeks: 'Wk 3', span: 1, desc: 'UX and UI prototyped and tested with real users before a line of code.' },
  { name: 'Build', weeks: 'Wk 4–5', span: 2, desc: 'Full-stack MVP on a modern stack, with daily progress updates.' },
  { name: 'Launch', weeks: 'Wk 6', span: 1, desc: 'Live with analytics and growth foundations, plus 30 days of support.' },
];

export function Process() {
  return (
    <section id="process" className="section section-cobalt">
      <div className="container">
        <div className="section-head" data-reveal>
          <Eyebrow>The process · 6 weeks</Eyebrow>
          <h2 className="display h2">From idea to <em>launch,</em> week by week.</h2>
        </div>
        <ol className="steps">
          {steps.map((s, i) => (
            <li key={s.name} className={`step${i === steps.length - 1 ? ' is-last' : ''}`}
              style={{ '--span': s.span }} data-reveal>
              <span className="step-bar" aria-hidden="true"></span>
              <span className="step-weeks">{s.weeks}</span>
              <h3 className="step-name">{s.name}</h3>
              <p className="step-desc">{s.desc}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

// ── Pricing ──────────────────────────────────────────────────────────────────
const tiers = [
  {
    name: 'Validate', price: '$4,900', term: '2 weeks',
    summary: 'Find out if it’s worth building before you build it.',
    features: ['Market & competitor research', '10+ customer interviews', 'Assumption & demand testing', 'Validation report', 'Go / no-go call'],
  },
  {
    name: 'Launch', price: '$14,900', term: '6 weeks', featured: true,
    summary: 'Validate, design, build and launch your MVP.',
    features: ['Everything in Validate', 'UX/UI design & prototype', 'Full-stack MVP build', 'Launch, analytics & monitoring', '30 days post-launch support'],
  },
  {
    name: 'Scale', price: '$24,900', term: '6 weeks + 3 months',
    summary: 'Launch, then keep shipping with us.',
    features: ['Everything in Launch', 'Growth roadmap', 'Iteration sprints', 'Monthly strategy sessions', 'Priority fixes'],
  },
];

export function Pricing() {
  return (
    <section id="pricing" className="section section-cobalt section-rule-light">
      <div className="container">
        <div className="section-head" data-reveal>
          <Eyebrow>Transparent pricing</Eyebrow>
          <h2 className="display h2">Pick your <em>stage.</em></h2>
        </div>
        <div className="tiers">
          {tiers.map((t) => (
            <article key={t.name} className={`tier${t.featured ? ' is-featured' : ''}`} data-reveal>
              <div className="tier-top">
                <h3 className="tier-name">{t.name}</h3>
                {t.featured && <span className="pill-coral">Most popular</span>}
              </div>
              <p className="tier-price"><span className="tier-from">from</span>{t.price}</p>
              <p className="tier-term">{t.term}</p>
              <p className="tier-summary">{t.summary}</p>
              <ul className="tier-features">
                {t.features.map((f) => <li key={f}>{f}</li>)}
              </ul>
              <BookButton variant={t.featured ? 'primary' : 'paper'} className="tier-btn" />
            </article>
          ))}
        </div>
        <p className="tiers-foot">All prices “from” · You own 100% of the code · No hidden fees</p>
      </div>
    </section>
  );
}

// ── Guarantee ────────────────────────────────────────────────────────────────
const promises = [
  ['Full refund', 'on Validate if no actionable insights are delivered'],
  ['100% yours', 'code, designs and infrastructure, from day one'],
  ['30 days', 'of post-launch support, included with Launch'],
];

export function Guarantee() {
  return (
    <section id="guarantee" className="section section-paper">
      <div className="container guarantee">
        <div data-reveal>
          <Eyebrow>Our guarantee</Eyebrow>
          <h2 className="display h2">No validation? No <em>bill.</em></h2>
          <p className="lead">
            If our 2-week validation sprint doesn’t give you actionable market insights, you don’t pay for it.
          </p>
        </div>
        <ul className="promises">
          {promises.map(([t, d]) => (
            <li key={t} className="promise" data-reveal>
              <strong>{t}</strong>
              <span>{d}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

// ── Work ─────────────────────────────────────────────────────────────────────
const cases = [
  {
    tag: 'Fintech', name: 'FinTrack', metric: '500', label: 'beta users in week one',
    points: ['15 user interviews before a line of code', 'Pricing model pivoted before launch', 'AI expense tracking cut manual entry by 80%'],
  },
  {
    tag: 'Health & wellness', name: 'MealPrep AI', metric: '12K', label: 'downloads in 3 months',
    points: ['Discovery showed the pain was shopping lists, not recipes', 'Personalised meal plans with grocery integration'],
  },
  {
    tag: 'B2B SaaS', name: 'ConnectHub', metric: '$120K', label: 'ARR within 6 months',
    points: ['Pivoted twice during validation', 'Saved 4 months and $60K of building the wrong product'],
  },
];

export function Work() {
  return (
    <section id="work" className="section section-paper section-rule">
      <div className="container">
        <div className="section-head" data-reveal>
          <Eyebrow>Selected work</Eyebrow>
          <h2 className="display h2">Validated, built and <em>launched.</em></h2>
        </div>
        <div className="cases">
          {cases.map((c) => (
            <article key={c.name} className="case" data-reveal>
              <div className="case-top">
                <span className="eyebrow eyebrow-sm">{c.tag}</span>
                <h3 className="case-name">{c.name}</h3>
              </div>
              <p className="case-metric">{c.metric}</p>
              <p className="case-label">{c.label}</p>
              <ol className="case-points">
                {c.points.map((p) => <li key={p}>{p}</li>)}
              </ol>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── Testimonials ─────────────────────────────────────────────────────────────
const quotes = [
  {
    text: <>Their validation uncovered that our original idea had <em>zero demand</em> — and helped us pivot to something users actually pay for.</>,
    name: 'Sarah Chen', role: 'Founder, MealPrep AI', initials: 'SC', featured: true,
  },
  {
    text: 'Six weeks felt impossible. They shipped a working MVP we put in front of real users on day one.',
    name: 'Marcus Rivera', role: 'CTO, ConnectHub', initials: 'MR',
  },
  {
    text: 'Every other agency builds what you tell them. LaunchGrid challenges your assumptions first.',
    name: 'Alex Kim', role: 'CEO, FinTrack', initials: 'AK',
  },
];

export function Testimonials() {
  return (
    <section className="section section-cobalt" aria-labelledby="t-title">
      <div className="container">
        <Eyebrow>What founders say</Eyebrow>
        <h2 id="t-title" className="sr-only">Testimonials</h2>
        <div className="quotes">
          {quotes.map((q) => (
            <figure key={q.name} className={`quote${q.featured ? ' is-featured' : ''}`} data-reveal>
              <blockquote>{q.featured && <span className="quote-mark" aria-hidden="true">“</span>}{q.text}</blockquote>
              <figcaption>
                <span className="avatar" aria-hidden="true">{q.initials}</span>
                <span><strong>{q.name}</strong><span>{q.role}</span></span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── FAQ ──────────────────────────────────────────────────────────────────────
const faqs = [
  ['What if validation shows my idea won’t work?', 'That’s a win. You’ve saved months and tens of thousands. We’ll recommend a pivot backed by what we heard from customers, or a clear “don’t build this”.'],
  ['How involved do I need to be?', 'About 5–8 hours a week: a 15-minute daily standup, a weekly review, and being available for key decisions. You know your market and we need that insight.'],
  ['What happens after the 6 weeks?', 'You own everything: code, designs, domain and infrastructure. Launch includes 30 days of support, and Scale adds three months of iteration sprints.'],
  ['What technologies do you use?', 'We match the stack to the product, usually React, Next.js, Node.js or Python, Postgres and AWS or Vercel. Proven tools, not the trendiest ones.'],
  ['Do you only work with funded startups?', 'No. We work with solo founders, bootstrapped teams and funded startups. What matters is a real problem and a commitment to validating it.'],
  ['Can you work with an existing codebase?', 'Yes. We’ll assess what you have and recommend the fastest path: extend it, integrate with it, or start fresh.'],
];

export function FAQ() {
  return (
    <section id="faq" className="section section-paper">
      <div className="container faq">
        <div className="section-head" data-reveal>
          <Eyebrow>FAQ</Eyebrow>
          <h2 className="display h2">Questions, <em>answered.</em></h2>
        </div>
        <div className="faq-list">
          {faqs.map(([q, a], i) => (
            <details key={q} className="faq-item" name="faq" open={i === 0}>
              <summary>
                <span>{q}</span>
                <span className="faq-icon" aria-hidden="true"></span>
              </summary>
              <p>{a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── Final CTA ────────────────────────────────────────────────────────────────
export function FinalCTA() {
  return (
    <section id="contact" className="section section-ink cta">
      <div className="container">
        <Eyebrow>Free · 30 minutes · No pitch deck needed</Eyebrow>
        <h2 className="display h2 cta-title">Find out if it’s <em>worth</em> building.</h2>
        <p className="lead">We’ll talk through your idea, how we’d validate it, and your 6-week path to launch.</p>
        <BookButton size="lg">Book a free discovery call</BookButton>
      </div>
    </section>
  );
}

// ── Footer ───────────────────────────────────────────────────────────────────
export function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-inner">
        <Logo />
        <ul className="footer-links">
          <li><a href={LINKEDIN_URL} target="_blank" rel="noopener">LinkedIn</a></li>
          <li><a href={`mailto:${EMAIL}`}>{EMAIL}</a></li>
        </ul>
        <p className="footer-copy">© 2026 LaunchGrid</p>
      </div>
    </footer>
  );
}
