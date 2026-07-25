import React, { useState } from 'react';

const ResultCard = ({ selectedType, reply, interest, visible }) => {
  const [imgLoaded, setImgLoaded] = useState(false);
  const isPerfect = interest === 100;

  if (!selectedType) return null;

  return (
    <div
      className={`result-card-container ${visible ? 'result-visible' : ''} ${
        isPerfect ? 'result-perfect-glitch' : ''
      }`}
    >
      <div className="result-glass-card">
        {/* Glow halo */}
        <div
          className="result-card-glow-halo"
          style={{ background: selectedType.glowColor }}
        />

        {/* Reaction GIF & Emotion Display */}
        <div className="result-media-wrapper">
          <div className="media-badge">
            <span className="media-emoji">{selectedType.emoji}</span>
          </div>

          <div className={`gif-container ${!imgLoaded ? 'gif-loading' : ''}`}>
            <img
              src={selectedType.gif}
              alt={selectedType.label}
              className="reaction-gif"
              onLoad={() => setImgLoaded(true)}
              onError={(e) => {
                // Fallback to static animated emoji container if image fails
                e.target.style.display = 'none';
              }}
            />
            {!imgLoaded && (
              <div className="gif-placeholder">
                <span className="placeholder-emoji">{selectedType.motionEmoji}</span>
              </div>
            )}
          </div>
        </div>

        {/* Reply Text */}
        <div className="result-text-content">
          <div className="quote-mark left-quote">“</div>
          <p className="nisha-reply-text">{reply}</p>
          <div className="quote-mark right-quote">”</div>
        </div>

        {/* Rating Hearts Bar */}
        <div className="result-rating-row">
          <span className="rating-label">Attraction Index:</span>
          <div className="rating-hearts">
            {Array.from({ length: Math.max(1, Math.ceil(interest / 20)) }).map((_, i) => (
              <span
                key={i}
                className="animated-heart"
                style={{ animationDelay: `${i * 0.12}s` }}
              >
                💖
              </span>
            ))}
          </div>
        </div>

        {/* Perfect JP Special Badge */}
        {isPerfect && (
          <div className="perfect-glitch-badge">
            <div className="glitch-text" data-text="💍 ULTIMATE MATCH UNLOCKED 💍">
              💍 ULTIMATE MATCH UNLOCKED 💍
            </div>
            <p className="glitch-sub">CONFETTI EXPLOSION INITIATED 🎉⚡</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ResultCard;
