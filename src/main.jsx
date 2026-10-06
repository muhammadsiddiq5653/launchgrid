import * as React from 'react';
import { createRoot } from 'react-dom/client';
import './styles.css';

import {
  Nav, Hero, ProofBar, Process, Pricing, Guarantee, Comparison,
  Work, Testimonials, FAQ, FinalCTA, Footer, useReveal,
} from './site.jsx';

function App() {
  useReveal();
  return (
    <>
      <a className="skip-link" href="#main">Skip to content</a>
      <Nav />
      <main id="main">
        <Hero />
        <ProofBar />
        <Comparison />
        <Process />
        <Pricing />
        <Guarantee />
        <Work />
        <Testimonials />
        <FAQ />
        <FinalCTA />
      </main>
      <Footer />
    </>
  );
}

createRoot(document.getElementById('root')).render(<App />);
