import React from 'react';

const ResultCard = ({ reply, emoji, interest, visible }) => {
  const isPerfect = interest === 100;

  return (
    <div className={`result-card ${visible ? 'result-visible' : ''} ${isPerfect ? 'result-perfect' : ''}`}>
      <div className="result-emoji-large">
        <span className="bouncing-emoji">{emoji}</span>
      </div>
      <div className="result-divider" />
      <p className="result-text">{reply}</p>
      <div className="result-hearts">
        {Array.from({ length: Math.ceil(interest / 20) }).map((_, i) => (
          <span
            key={i}
            className="result-heart"
            style={{ animationDelay: `${i * 0.15}s` }}
          >
            💕
          </span>
        ))}
      </div>
      {isPerfect && (
        <div className="perfect-badge">
          <span className="badge-text">💍 ULTIMATE MATCH 💍</span>
        </div>
      )}
    </div>
  );
};

export default ResultCard;
