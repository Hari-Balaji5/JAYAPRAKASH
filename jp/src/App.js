import './App.css';
import { useState, useCallback } from 'react';
import { JP_TYPES } from './data';
import FloatingHearts from './FloatingHearts';
import Confetti from './Confetti';
import InterestMeter from './InterestMeter';
import ResultCard from './ResultCard';

function App() {
  const [selectedType, setSelectedType] = useState(null);
  const [reply, setReply] = useState('');
  const [interest, setInterest] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [confettiActive, setConfettiActive] = useState(false);
  const [confettiKey, setConfettiKey] = useState(0);
  const [clickBurst, setClickBurst] = useState(null);

  const handleSelect = useCallback((jpType) => {
    // Hide previous result with animation
    setShowResult(false);

    setTimeout(() => {
      // Pick a random reply
      const randomReply =
        jpType.replies[Math.floor(Math.random() * jpType.replies.length)];

      setSelectedType(jpType);
      setReply(randomReply);
      setInterest(jpType.interest);
      setShowResult(true);

      // Trigger confetti for Perfect JP
      if (jpType.id === 'perfect') {
        setConfettiKey((prev) => prev + 1);
        setConfettiActive(true);
        setTimeout(() => setConfettiActive(false), 100);
      }

      // Scroll to result
      setTimeout(() => {
        const resultEl = document.getElementById('result-section');
        if (resultEl) {
          resultEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      }, 200);
    }, 300);
  }, []);

  const handleButtonClick = (e, jpType) => {
    // Create click burst animation
    const rect = e.currentTarget.getBoundingClientRect();
    setClickBurst({
      x: rect.left + rect.width / 2,
      y: rect.top + rect.height / 2,
      id: Date.now(),
    });

    handleSelect(jpType);
  };

  return (
    <div className="app">
      <FloatingHearts />
      <Confetti key={confettiKey} active={confettiActive} />

      {/* Click burst hearts */}
      {clickBurst && (
        <div
          className="click-burst"
          style={{ left: clickBurst.x, top: clickBurst.y }}
          key={clickBurst.id}
        >
          {Array.from({ length: 6 }).map((_, i) => (
            <span
              key={i}
              className="burst-heart"
              style={{
                '--angle': `${i * 60}deg`,
                '--delay': `${i * 0.05}s`,
              }}
            >
              💗
            </span>
          ))}
        </div>
      )}

      <div className="content-wrapper">
        {/* Header */}
        <header className="header">
          <div className="header-glow" />
          <h1 className="title">
            <span className="title-emoji">💖</span>
            Does Nisha Like JP?
            <span className="title-emoji">💖</span>
          </h1>
          <p className="subtitle">
            <em>"Choose which version of JP to check Nisha's reaction! 😄"</em>
          </p>
        </header>

        {/* Buttons Grid */}
        <section className="buttons-section">
          <div className="buttons-grid">
            {JP_TYPES.map((jpType) => (
              <button
                key={jpType.id}
                className={`jp-button ${
                  selectedType?.id === jpType.id ? 'jp-button-active' : ''
                }`}
                style={{ '--btn-gradient': jpType.color }}
                onClick={(e) => handleButtonClick(e, jpType)}
                id={`btn-${jpType.id}`}
              >
                <span className="btn-emoji">{jpType.emoji}</span>
                <span className="btn-label">{jpType.label}</span>
                <div className="btn-shine" />
              </button>
            ))}
          </div>
        </section>

        {/* Result Section */}
        <section id="result-section" className="result-section">
          {selectedType && (
            <>
              <InterestMeter
                interest={showResult ? interest : 0}
                label={selectedType.label}
              />
              <ResultCard
                reply={reply}
                emoji={selectedType.emoji}
                interest={interest}
                visible={showResult}
              />
            </>
          )}
        </section>

        {/* Footer */}
        <footer className="footer">
          <div className="footer-content">
            <p className="footer-text">
              😂 This website is purely for fun and entertainment. Don't take the
              results seriously! ❤️
            </p>
            <p className="footer-sub">
              Made with 💖 for laughs
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
}

export default App;