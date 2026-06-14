import * as React from "react";
import { useInView, Reveal, MagneticButton, SectionHeader, openCalendly } from "./hooks.jsx";

// ─── ROI Calculator ───
function ROICalculator() {
  const [budget, setBudget] = React.useState(50000);
  const [timeline, setTimeline] = React.useState(6);
  const ref = React.useRef(null);
  const inView = useInView(ref);

  const diyMonths = Math.max(timeline, 4);
  const agencyMonths = Math.max(timeline * 1.8, 5);
  const lgWeeks = 6;

  const diyCost = budget * 0.7;
  const agencyCost = budget * 2.2;
  const lgCost = 14900;

  const diySaved = Math.max(0, diyCost - lgCost);
  const agencySaved = Math.max(0, agencyCost - lgCost);
  const timeSaved = Math.max(0, Math.round((diyMonths * 4.3 - lgWeeks)));

  const barMax = Math.max(diyCost, agencyCost, lgCost);
  const pct = (v) => Math.max(8, (v / barMax) * 100);

  return (
    <section id="calculator" ref={ref}>
      <div className="container">
        <SectionHeader label="ROI Calculator" title="See How Much You Save"
          description="Compare your estimated cost and timeline across three paths. Drag the sliders." center />
        <Reveal>
          <div className="calc-card">
            <div className="calc-inputs">
              <div className="calc-input-group">
                <label>Estimated Project Budget</label>
                <div className="calc-slider-row">
                  <input type="range" min="10000" max="200000" step="5000"
                    value={budget} onChange={(e) => setBudget(Number(e.target.value))}
                    className="calc-range" />
                  <span className="calc-value">${budget.toLocaleString()}</span>
                </div>
              </div>
              <div className="calc-input-group">
                <label>Expected Timeline (months)</label>
                <div className="calc-slider-row">
                  <input type="range" min="2" max="18" step="1"
                    value={timeline} onChange={(e) => setTimeline(Number(e.target.value))}
                    className="calc-range" />
                  <span className="calc-value">{timeline} mo</span>
                </div>
              </div>
            </div>

            <div className="calc-results">
              <div className="calc-bar-group">
                <div className="calc-bar-row">
                  <span className="calc-bar-label">DIY with AI</span>
                  <div className="calc-bar-track">
                    <div className="calc-bar bad" style={{ width: `${pct(diyCost)}%` }}>
                      <span>${Math.round(diyCost / 1000)}K</span>
                    </div>
                  </div>
                  <span className="calc-bar-time">{diyMonths} mo</span>
                </div>
                <div className="calc-bar-row">
                  <span className="calc-bar-label">Agency</span>
                  <div className="calc-bar-track">
                    <div className="calc-bar worse" style={{ width: `${pct(agencyCost)}%` }}>
                      <span>${Math.round(agencyCost / 1000)}K</span>
                    </div>
                  </div>
                  <span className="calc-bar-time">{Math.round(agencyMonths)} mo</span>
                </div>
                <div className="calc-bar-row">
                  <span className="calc-bar-label">LaunchGrid</span>
                  <div className="calc-bar-track">
                    <div className="calc-bar best" style={{ width: `${pct(lgCost)}%` }}>
                      <span>${(lgCost / 1000).toFixed(1)}K</span>
                    </div>
                  </div>
                  <span className="calc-bar-time">6 wk</span>
                </div>
              </div>

              <div className="calc-savings">
                <div className="calc-save-card">
                  <div className="calc-save-num">${Math.round(agencySaved / 1000)}K</div>
                  <div className="calc-save-label">Saved vs Agency</div>
                </div>
                <div className="calc-save-card">
                  <div className="calc-save-num">{timeSaved} wk</div>
                  <div className="calc-save-label">Faster to Market</div>
                </div>
                <div className="calc-save-card">
                  <div className="calc-save-num">Day 1</div>
                  <div className="calc-save-label">Validation Included</div>
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

// ─── Idea Readiness Quiz ───
const quizQuestions = [
  {
    q: 'Have you talked to potential users about this problem?',
    opts: [
      { text: 'Yes, 10+ interviews', score: 3 },
      { text: 'A few conversations', score: 2 },
      { text: 'Only friends & family', score: 1 },
      { text: 'Not yet', score: 0 }
    ]
  },
  {
    q: 'Do you know who would pay for this?',
    opts: [
      { text: 'Specific persona defined', score: 3 },
      { text: 'General idea of the audience', score: 2 },
      { text: 'Everyone could use it!', score: 1 },
      { text: 'Haven\'t thought about it', score: 0 }
    ]
  },
  {
    q: 'How do people solve this problem today?',
    opts: [
      { text: 'I\'ve mapped all competitors', score: 3 },
      { text: 'I know a few alternatives', score: 2 },
      { text: 'I think it\'s a new market', score: 1 },
      { text: 'Not sure', score: 0 }
    ]
  },
  {
    q: 'Have you tested demand (landing page, waitlist, pre-orders)?',
    opts: [
      { text: 'Yes, got signups/payments', score: 3 },
      { text: 'Put up a page, some interest', score: 2 },
      { text: 'Planned but not done', score: 1 },
      { text: 'No', score: 0 }
    ]
  },
  {
    q: 'What\'s your timeline expectation?',
    opts: [
      { text: '4–8 weeks to launch', score: 3 },
      { text: '2–3 months', score: 2 },
      { text: '6+ months', score: 1 },
      { text: 'No deadline', score: 0 }
    ]
  }
];

const quizResults = [
  { min: 0, max: 5, tier: 'Needs Work', color: '#ef4444', emoji: '🔴', title: 'Your Idea Needs Validation First',
    msg: 'You have a concept, but critical assumptions remain untested. Our Validate package is built exactly for this — we\'ll find out if the market wants it before you spend on building.' },
  { min: 6, max: 10, tier: 'Getting There', color: '#eab308', emoji: '🟡', title: 'You\'re on the Right Track',
    msg: 'You\'ve done some homework, but gaps remain. Our full Launch package fills them: deeper validation, design, build, and market in 6 weeks.' },
  { min: 11, max: 15, tier: 'Launch Ready', color: '#00e87b', emoji: '🟢', title: 'Your Idea Is Ready to Build',
    msg: 'You\'ve done the work. Market signals are strong. Let\'s turn this validated idea into a real product and get it in front of users in 6 weeks.' }
];

function IdeaQuiz() {
  const [step, setStep] = React.useState(0);
  const [answers, setAnswers] = React.useState([]);
  const [hoveredOpt, setHoveredOpt] = React.useState(null);
  const totalQ = quizQuestions.length;
  const isDone = step >= totalQ;
  const score = answers.reduce((sum, a) => sum + a, 0);
  const result = quizResults.find(r => score >= r.min && score <= r.max);

  const pick = (s) => {
    setAnswers([...answers, s]);
    setTimeout(() => setStep(step + 1), 300);
  };

  const restart = () => { setStep(0); setAnswers([]); };

  return (
    <section id="quiz">
      <div className="container">
        <SectionHeader label="Self-Assessment" title="Is Your Idea Ready?"
          description="Take this 60-second quiz to find out where your idea stands — and what to do next." center />
        <Reveal>
          <div className="quiz-card">
            {!isDone ? (
              <>
                <div className="quiz-progress-bar">
                  <div className="quiz-progress-fill" style={{ width: `${(step / totalQ) * 100}%` }}></div>
                </div>
                <div className="quiz-step-label">Question {step + 1} of {totalQ}</div>
                <h3 className="quiz-question">{quizQuestions[step].q}</h3>
                <div className="quiz-options">
                  {quizQuestions[step].opts.map((opt, i) => (
                    <button key={i} className={`quiz-option ${hoveredOpt === i ? 'hovered' : ''}`}
                      onClick={() => pick(opt.score)}
                      onMouseEnter={() => setHoveredOpt(i)}
                      onMouseLeave={() => setHoveredOpt(null)}>
                      <span className="quiz-opt-letter">{String.fromCharCode(65 + i)}</span>
                      {opt.text}
                    </button>
                  ))}
                </div>
              </>
            ) : (
              <div className="quiz-result">
                <div className="quiz-result-emoji">{result.emoji}</div>
                <div className="quiz-result-score" style={{ color: result.color }}>
                  {score} / 15 — {result.tier}
                </div>
                <h3 className="quiz-result-title">{result.title}</h3>
                <p className="quiz-result-msg">{result.msg}</p>
                <div className="quiz-result-actions">
                  <MagneticButton className="btn btn-primary" onClick={openCalendly}>
                    Book Discovery Call
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path></svg>
                  </MagneticButton>
                  <button className="btn btn-secondary" onClick={restart}>Retake Quiz</button>
                </div>
              </div>
            )}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

export { ROICalculator, IdeaQuiz };