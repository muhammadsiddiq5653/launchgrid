import * as React from "react";
import { Reveal, TiltCard, SectionHeader } from "./hooks.jsx";

// ─── Guarantee Section ───
function GuaranteeSection() {
  return (
    <section id="guarantee">
      <div className="container">
        <Reveal>
          <div className="guarantee-card">
            <div className="guarantee-shield">
              <svg width="56" height="56" viewBox="0 0 56 56" fill="none">
                <path d="M28 4L6 16v14c0 12.6 9.4 24.3 22 28 12.6-3.7 22-15.4 22-28V16L28 4z"
                  stroke="var(--primary)" strokeWidth="2" fill="var(--primary-dim)"></path>
                <path d="M20 28l6 6 10-12" stroke="var(--primary)" strokeWidth="2.5"
                  strokeLinecap="round" strokeLinejoin="round" fill="none"></path>
              </svg>
            </div>
            <div className="guarantee-content">
              <div className="section-label">Our Guarantee</div>
              <h2 className="section-title" style={{ marginBottom: 16 }}>
                No Validation? <span className="gradient-text">No Bill.</span>
              </h2>
              <p className="section-desc" style={{ maxWidth: 620 }}>
                If our 2-week validation sprint fails to produce actionable market insights,
                you don't pay for the build phase. We stake our revenue on the quality of our research
                because we've never had to refund it.
              </p>
              <div className="guarantee-points">
                <div className="guarantee-point">
                  <span className="gp-icon">✓</span>
                  <div>
                    <strong>Full Refund</strong>
                    <span>on Validate phase if no actionable insights delivered</span>
                  </div>
                </div>
                <div className="guarantee-point">
                  <span className="gp-icon">✓</span>
                  <div>
                    <strong>Code Ownership</strong>
                    <span>Everything we build is 100% yours from day one</span>
                  </div>
                </div>
                <div className="guarantee-point">
                  <span className="gp-icon">✓</span>
                  <div>
                    <strong>30-Day Support</strong>
                    <span>Included free with every Launch package</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

// ─── Logo Wall ───
const logos = [
  { name: 'AWS', sub: 'Infrastructure Partner' },
  { name: 'Vercel', sub: 'Deployment Partner' },
  { name: 'Stripe', sub: 'Payments Partner' },
  { name: 'Supabase', sub: 'Backend Partner' },
  { name: 'Figma', sub: 'Design Partner' },
  { name: 'OpenAI', sub: 'AI Partner' },
  { name: 'Y Combinator', sub: 'Alumni Network' },
  { name: 'ProductHunt', sub: 'Launch Platform' }
];

function LogoWall() {
  return (
    <section className="logo-section">
      <div className="container">
        <Reveal>
          <p className="logo-section-label">Trusted Tools & Partners</p>
          <div className="logo-scroll-mask">
            <div className="logo-track">
              {[...logos, ...logos].map((logo, i) => (
                <div key={i} className="logo-item">
                  <span className="logo-name">{logo.name}</span>
                  <span className="logo-sub">{logo.sub}</span>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

// ─── Blog Preview ───
const blogPosts = [
  {
    tag: 'Validation',
    title: 'Why 90% of AI-Built MVPs End Up in the Graveyard',
    excerpt: 'AI can generate code in minutes. But it can\'t validate your market. Here\'s why speed without direction is the most expensive mistake in startups.',
    read: '6 min read',
    date: 'Jun 2026'
  },
  {
    tag: 'Playbook',
    title: 'The LaunchGrid Validation Playbook: 14 Days to Market Proof',
    excerpt: 'Our step-by-step framework for testing your riskiest assumptions before writing a single line of production code.',
    read: '9 min read',
    date: 'Jun 2026'
  },
  {
    tag: 'Growth',
    title: 'From MVP to First 1,000 Users: A Marketing Blueprint for Founders',
    excerpt: 'You launched. Now what? The marketing channels, tactics, and timelines that actually work for early-stage products.',
    read: '8 min read',
    date: 'May 2026'
  }
];

function BlogPreview() {
  return (
    <section id="blog">
      <div className="container">
        <SectionHeader label="Insights" title="From the LaunchGrid Blog"
          description="Thinking, frameworks, and playbooks from the trenches of MVP development." center />
        <div className="blog-grid">
          {blogPosts.map((post, i) => (
            <Reveal key={i} delay={i * 120}>
              <TiltCard className="blog-card card">
                <div className="blog-meta">
                  <span className="blog-tag">{post.tag}</span>
                  <span className="blog-date">{post.date}</span>
                </div>
                <h3 className="blog-title">{post.title}</h3>
                <p className="blog-excerpt">{post.excerpt}</p>
                <div className="blog-footer">
                  <span className="blog-read">{post.read}</span>
                  <span className="blog-arrow">→</span>
                </div>
              </TiltCard>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export { GuaranteeSection, LogoWall, BlogPreview };