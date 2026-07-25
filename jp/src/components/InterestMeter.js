import React, { useEffect, useState } from 'react';

const InterestMeter = ({ interest, label }) => {
  const [displayValue, setDisplayValue] = useState(0);

  // Smooth counter effect
  useEffect(() => {
    let startTimestamp;
    const startValue = displayValue;
    const duration = 600; // ms

    const step = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      // Ease out cubic
      const easedProgress = 1 - Math.pow(1 - progress, 3);
      const current = Math.round(startValue + (interest - startValue) * easedProgress);
      setDisplayValue(current);

      if (progress < 1) {
        requestAnimationFrame(step);
      }
    };

    requestAnimationFrame(step);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [interest]);

  const getBarGradient = (value) => {
    if (value <= 15) return 'linear-gradient(90deg, #64748b, #94a3b8)';
    if (value <= 40) return 'linear-gradient(90deg, #0284c7, #38bdf8)';
    if (value <= 60) return 'linear-gradient(90deg, #7c3aed, #a78bfa)';
    if (value <= 80) return 'linear-gradient(90deg, #ea580c, #f97316, #fb923c)';
    if (value <= 95) return 'linear-gradient(90deg, #e11d48, #f43f5e, #fb7185)';
    return 'linear-gradient(90deg, #eab308, #ec4899, #8b5cf6, #ef4444)';
  };

  const getStatusMessage = (value) => {
    if (value <= 10) return '😐 Meh... zero spark detected';
    if (value <= 30) return '🤔 Hmm... slightly intriguing?';
    if (value <= 55) return '👀 Definitely turning heads!';
    if (value <= 75) return '😍 Highly impressed & smiling!';
    if (value <= 89) return '🥰 Extremely interested! Heart racing!';
    if (value <= 95) return '😳 Deep in love! Butterflies everywhere!';
    return '💍 WEDDING BELLS! ULTIMATE MATCH! 👑';
  };

  return (
    <div className="interest-meter-card">
      <div className="meter-header">
        <div className="meter-title-group">
          <span className="meter-pulse-dot" />
          <h4 className="meter-title">Nisha Interest Meter ❤️</h4>
        </div>
        <div className="meter-number-glow">
          <span className="meter-number">{displayValue}%</span>
        </div>
      </div>

      <div className="meter-track-container">
        <div className="meter-track-bg">
          <div
            className="meter-fill-bar"
            style={{
              width: `${displayValue}%`,
              background: getBarGradient(displayValue),
            }}
          >
            <div className="meter-fill-sparkle" />
          </div>
        </div>
      </div>

      <div className="meter-footer-info">
        <span className="meter-status-pill">{getStatusMessage(displayValue)}</span>
        <span className="meter-version-pill">{label}</span>
      </div>
    </div>
  );
};

export default InterestMeter;
