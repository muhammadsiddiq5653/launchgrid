import * as React from "react";
import { Reveal, TiltCard, SectionHeader } from "./hooks.jsx";

const caseStudies = [
  { tag: 'Fintech', title: 'FinTrack', desc: 'AI-powered expense tracking that cut manual entry by 80%. Validated with 15 user interviews, pivoted pricing model before launch.', metric: '500', metricLabel: 'beta users in week 1' },
  { tag: 'Health & Wellness', title: 'MealPrep AI', desc: 'Personalized meal planning with grocery integration. Discovery revealed the real pain point was shopping lists, not recipes.', metric: '12K', metricLabel: 'downloads in 3 months' },
  { tag: 'B2B SaaS', title: 'ConnectHub', desc: 'Niche professional networking platform. Pivoted twice during validation — saved 4 months and $60K of building the wrong product.', metric: '$120K', metricLabel: 'ARR within 6 months' }
];

function CaseStudiesSection() {
  return (
    <section id="cases">
      <div className="container">
        <SectionHeader label="Our Work" title="Products We've Launched"
          description="Real MVPs, built in 6 weeks, validated with real users." center />
        <div className="cases-grid">
          {caseStudies.map((cs, i) => (
            <Reveal key={i} delay={i * 120}>
              <TiltCard className="case-card">
                <div className="case-img">
                  <div className="placeholder">
                    <svg width="36" height="36" viewBox="0 0 40 40" fill="none">
                      <rect x="4" y="8" width="32" height="24" rx="3" stroke="var(--text-dim)" strokeWidth="1.5" fill="none"></rect>
                      <circle cx="14" cy="18" r="3" stroke="var(--text-dim)" strokeWidth="1" fill="none"></circle>
                      <path d="M4 28l8-6 6 4 10-8 8 6" stroke="var(--text-dim)" strokeWidth="1" fill="none"></path>
                    </svg>
                    <div style={{ marginTop: 6 }}>product screenshot</div>
                  </div>
                </div>
                <div className="case-body">
                  <div className="case-tag">{cs.tag}</div>
                  <h3>{cs.title}</h3>
                  <p>{cs.desc}</p>
                  <div className="case-metric">
                    <span className="val">{cs.metric}</span>
                    <span className="desc">{cs.metricLabel}</span>
                  </div>
                </div>
              </TiltCard>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

const testimonials = [
  {
    quote: "LaunchGrid saved us from building the wrong product. Their validation uncovered that our original idea had zero demand — and helped us pivot to something users actually pay for.",
    name: "Sarah Chen", role: "Founder, MealPrep AI", initials: "SC"
  },
  {
    quote: "Six weeks felt impossible. But they shipped a working MVP that we put in front of real users on day one. Clean code, polished design, validated concept.",
    name: "Marcus Rivera", role: "CTO, ConnectHub", initials: "MR"
  },
  {
    quote: "Every other agency just builds what you tell them. LaunchGrid challenges your assumptions and makes sure you're not wasting money solving a problem nobody has.",
    name: "Alex Kim", role: "CEO, FinTrack", initials: "AK"
  }
];

function TestimonialsSection() {
  return (
    <section>
      <div className="container">
        <SectionHeader label="Testimonials" title="What Founders Say" center />
        <div className="testimonials-grid">
          {testimonials.map((t, i) => (
            <Reveal key={i} delay={i * 120}>
              <div className="card testimonial-card" style={{ height: '100%' }}>
                <div className="quote-mark">"</div>
                <p className="quote">{t.quote}</p>
                <div className="author">
                  <div className="avatar">{t.initials}</div>
                  <div className="author-info">
                    <div className="a-name">{t.name}</div>
                    <div className="a-role">{t.role}</div>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

const teamMembers = [
  { name: 'Your Name', role: 'Founder & CEO', initials: 'YN', bio: 'Serial entrepreneur. Built and scaled 3 products from zero. Obsessed with validation-first development.' },
  { name: 'Co-Founder', role: 'CTO', initials: 'CF', bio: '10+ years full-stack engineering. Built systems serving millions. Clean code evangelist.' },
  { name: 'Lead Designer', role: 'Head of Design', initials: 'LD', bio: 'UX designer with 8 years shipping products. Believes design solves problems, not decorates them.' }
];

function TeamSection() {
  return (
    <section id="team">
      <div className="container">
        <SectionHeader label="Our Team" title="The People Behind LaunchGrid"
          description="A lean team of operators who've been in your shoes." center />
        <div className="team-grid">
          {teamMembers.map((m, i) => (
            <Reveal key={i} delay={i * 120}>
              <div className="card team-card">
                <div className="photo">{m.initials}</div>
                <h3>{m.name}</h3>
                <div className="t-role">{m.role}</div>
                <p className="bio">{m.bio}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export { CaseStudiesSection, TestimonialsSection, TeamSection };