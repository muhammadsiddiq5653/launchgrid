import * as React from "react";
import { Reveal, MagneticButton, TiltCard, SectionHeader, smoothScrollTo, openCalendly } from "./hooks.jsx";

const pricingTiers = [
  {
    tier: 'Starter', name: 'Validate', price: 'From $4,900', note: '2-week engagement',
    features: ['Market & competitor research', 'User interviews (10+)', 'Assumption testing', 'Validation report & insights', 'Go / no-go recommendation', 'Product brief document'],
    cta: 'Start Validating', featured: false
  },
  {
    tier: 'Most Popular', name: 'Launch', price: 'From $14,900', note: '6-week full build',
    features: ['Everything in Validate', 'UI/UX design & prototyping', 'Full-stack MVP development', 'User testing rounds', 'Launch & deployment', 'Analytics & monitoring setup', '30 days post-launch support'],
    cta: 'Launch Your MVP', featured: true
  },
  {
    tier: 'Growth', name: 'Scale', price: 'From $24,900', note: '6 weeks + 3 months support',
    features: ['Everything in Launch', 'Growth strategy & roadmap', 'Feature iteration sprints', 'Performance optimization', 'Dedicated Slack channel', 'Monthly strategy sessions', 'Priority bug fixes'],
    cta: 'Scale Your Product', featured: false
  }
];

function PricingSection() {
  return (
    <section id="pricing" style={{ background: 'var(--bg-2)' }}>
      <div className="container">
        <SectionHeader label="Pricing" title="Transparent Pricing"
          description="No hidden fees. No scope creep. Pick a tier that matches your stage." center />
        <div className="pricing-grid">
          {pricingTiers.map((tier, i) => (
            <Reveal key={i} delay={i * 120}>
              <TiltCard className={`pricing-card ${tier.featured ? 'featured' : ''}`}>
                <div className="tier">{tier.tier}</div>
                <div className="name">{tier.name}</div>
                <div className="price">{tier.price}</div>
                <div className="price-note">{tier.note}</div>
                <ul className="features">
                  {tier.features.map((f, j) => (
                    <li key={j}><span className="check">✓</span>{f}</li>
                  ))}
                </ul>
                <MagneticButton className={`btn ${tier.featured ? 'btn-primary' : 'btn-secondary'}`}
                  style={{ width: '100%', justifyContent: 'center' }}
                  onClick={openCalendly}>
                  {tier.cta}
                </MagneticButton>
              </TiltCard>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

const techStack = ['React', 'Next.js', 'Node.js', 'Python', 'TypeScript', 'PostgreSQL', 'MongoDB', 'AWS', 'Vercel', 'Docker', 'Figma', 'Stripe', 'OpenAI', 'Supabase'];

function TechStackSection() {
  return (
    <section>
      <div className="container">
        <SectionHeader label="Tech Stack" title="Built With Modern Tools"
          description="We pick the right tool for each job — proven technologies that scale." center />
        <Reveal>
          <div className="tech-grid">
            {techStack.map((t, i) => (
              <span key={i} className="tech-badge" style={{ animationDelay: `${i * 40}ms` }}>{t}</span>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

const faqData = [
  { q: 'What technologies do you use?', a: 'We match the stack to the product. Common choices include React, Next.js, Node.js, Python, PostgreSQL, and AWS — but we always pick the right tool for the job, not the trendiest one.' },
  { q: 'What if validation shows my idea won\'t work?', a: 'That\'s actually a win. We help you pivot to a validated direction or save you months and thousands by confirming early. Every Validate engagement includes a pivot recommendation.' },
  { q: 'Do you only work with funded startups?', a: 'No. We work with solo founders, bootstrapped teams, and funded startups. What matters is your commitment to validation and a real problem worth solving.' },
  { q: 'What happens after the 6 weeks?', a: 'You own everything — code, designs, domain, infrastructure. We offer optional Scale packages for continued growth support and feature development.' },
  { q: 'How involved do I need to be?', a: 'About 5–8 hours per week. Daily standups (15 min), weekly reviews, and availability for key decisions. You know your market — we need that insight.' },
  { q: 'Can you work with an existing codebase?', a: 'Yes. We can extend existing code, integrate with your stack, or start fresh. We\'ll assess your codebase and recommend the most efficient path forward.' }
];

function FAQSection() {
  const [openIdx, setOpenIdx] = React.useState(null);
  return (
    <section id="faq">
      <div className="container">
        <SectionHeader label="FAQ" title="Common Questions" center />
        <div className="faq-list">
          {faqData.map((item, i) => (
            <Reveal key={i} delay={i * 60}>
              <div className={`faq-item ${openIdx === i ? 'open' : ''}`}>
                <button className="faq-question" onClick={() => setOpenIdx(openIdx === i ? null : i)}>
                  <span>{item.q}</span>
                  <span className="faq-chevron">▾</span>
                </button>
                <div className="faq-answer">
                  <div className="faq-answer-inner"><p>{item.a}</p></div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function CTASection() {
  return (
    <section id="contact" className="cta-section">
      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        <Reveal>
          <div className="section-label" style={{ textAlign: 'center' }}>Ready?</div>
          <h2>
            Let's Build Something<br />
            <span className="gradient-text">People Actually Want</span>
          </h2>
          <p className="section-desc" style={{ maxWidth: 480, margin: '0 auto 40px', textAlign: 'center' }}>
            Book a free 30-minute discovery call. We'll discuss your idea, assess validation potential, and outline your 6-week path to launch.
          </p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: 16, flexWrap: 'wrap' }}>
            <MagneticButton className="btn btn-primary" style={{ fontSize: 17, padding: '18px 40px' }}
              onClick={openCalendly}>
              Book Your Discovery Call
              <svg width="18" height="18" viewBox="0 0 20 20" fill="none"><path d="M4 10h12M12 6l4 4-4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path></svg>
            </MagneticButton>
          </div>
          <p style={{ textAlign: 'center', fontSize: '0.82rem', color: 'var(--text-dim)', marginTop: 18 }}>
            Free · No commitment · No pitch deck required
          </p>
        </Reveal>
      </div>
    </section>
  );
}

function FooterSection() {
  const handleClick = (e, id) => { e.preventDefault(); smoothScrollTo(id); };
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-inner">
          <a href="#" className="nav-logo" style={{ fontSize: 16 }}
            onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>
            <div className="logo-mark" style={{ width: 22, height: 22, borderWidth: 1.5 }}>
              <span></span><span></span><span></span><span></span>
            </div>
            LaunchGrid
          </a>
          <ul className="footer-links">
            <li><a href="#process" onClick={(e) => handleClick(e, 'process')}>Process</a></li>
            <li><a href="#services" onClick={(e) => handleClick(e, 'services')}>Services</a></li>
            <li><a href="#pricing" onClick={(e) => handleClick(e, 'pricing')}>Pricing</a></li>
            <li><a href="#cases" onClick={(e) => handleClick(e, 'cases')}>Work</a></li>
            <li><a href="#faq" onClick={(e) => handleClick(e, 'faq')}>FAQ</a></li>
          </ul>
          <span className="footer-copy">© 2026 LaunchGrid. All rights reserved.</span>
        </div>
      </div>
    </footer>
  );
}

export { PricingSection, TechStackSection, FAQSection, CTASection, FooterSection };