import React, { useState, useCallback, useMemo } from 'react';
import './App.css';
import { CATEGORIES, JP_TYPES } from './data/replies';
import AmbientBackground from './components/AmbientBackground';
import CategoryFilter from './components/CategoryFilter';
import ButtonGrid from './components/ButtonGrid';
import InterestMeter from './components/InterestMeter';
import ResultCard from './components/ResultCard';
import Confetti from './components/Confetti';

function App() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [selectedType, setSelectedType] = useState(null);
  const [reply, setReply] = useState('');
  const [showResult, setShowResult] = useState(false);
  const [confettiActive, setConfettiActive] = useState(false);
  const [confettiKey, setConfettiKey] = useState(0);

  // Filter types based on selected category tab
  const filteredTypes = useMemo(() => {
    if (activeCategory === 'all') return JP_TYPES;
    return JP_TYPES.filter((t) => t.category === activeCategory);
  }, [activeCategory]);

  const handleSelectType = useCallback((e, jpType) => {
    // Hide previous result card smoothly before showing new reply
    setShowResult(false);

    setTimeout(() => {
      // Pick a random reply from the 5–10 available responses
      const randomIndex = Math.floor(Math.random() * jpType.replies.length);
      const chosenReply = jpType.replies[randomIndex];

      setSelectedType(jpType);
      setReply(chosenReply);
      setShowResult(true);

      // Trigger confetti explosion if Ultimate Perfect JP is picked
      if (jpType.id === 'perfect') {
        setConfettiKey((prev) => prev + 1);
        setConfettiActive(true);
        setTimeout(() => setConfettiActive(false), 200);
      }

      // Smooth scroll to the result section
      setTimeout(() => {
        const resultSection = document.getElementById('result-section');
        if (resultSection) {
          resultSection.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      }, 150);
    }, 250);
  }, []);

  return (
    <div className="app-root">
      {/* Igloo.inc style Ambient Dark Background */}
      <AmbientBackground />

      {/* Screen-wide Confetti + Falling Heart Rain for Perfect JP */}
      <Confetti key={confettiKey} active={confettiActive} />

      <div className="app-container">
        {/* Futuristic Hero Section */}
        <header className="hero-header">
          <div className="hero-pill-badge">
            <span className="live-dot" />
            <span>Nisha Relationship Simulator v2.0</span>
          </div>

          <h1 className="hero-title">
            Does Nisha Like <span className="hero-title-accent">JP?</span> ⚡
          </h1>

          <p className="hero-subtitle">
            Select a version of <em>JP</em> to simulate Nisha's instant emotional reaction, interest percentage, and witty commentary!
          </p>
        </header>

        {/* Category Segmented Control Filter */}
        <CategoryFilter
          categories={CATEGORIES}
          activeCategory={activeCategory}
          onSelectCategory={setActiveCategory}
        />

        {/* Interactive Option Buttons Grid */}
        <ButtonGrid
          jpTypes={filteredTypes}
          selectedType={selectedType}
          onSelectType={handleSelectType}
        />

        {/* Floating Results Section */}
        <section id="result-section" className="result-section-anchor">
          {selectedType && (
            <>
              <InterestMeter
                interest={showResult ? selectedType.interest : 0}
                label={selectedType.label}
              />
              <ResultCard
                selectedType={selectedType}
                reply={reply}
                interest={selectedType.interest}
                visible={showResult}
              />
            </>
          )}
        </section>

        {/* Stylish & Witty Footer */}
        <footer className="app-footer">
          <div className="footer-divider" />
          <p className="footer-disclaimer">
            😂 Purely for fun and entertainment. Don't take the results too seriously! ❤️
          </p>
          <p className="footer-credit">
            Crafted with 💖 for laughs & futuristic vibes • 2026
          </p>
        </footer>
      </div>
    </div>
  );
}

export default App;