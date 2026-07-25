import React from 'react';

const InterestMeter = ({ interest, label }) => {
  const getBarColor = (value) => {
    if (value <= 20) return 'linear-gradient(90deg, #636e72, #b2bec3)';
    if (value <= 40) return 'linear-gradient(90deg, #a29bfe, #6c5ce7)';
    if (value <= 60) return 'linear-gradient(90deg, #fd79a8, #e84393)';
    if (value <= 80) return 'linear-gradient(90deg, #ff6b9d, #ee5a24)';
    if (value <= 95) return 'linear-gradient(90deg, #f9ca24, #f0932b)';
    return 'linear-gradient(90deg, #ffd700, #ff6348, #ff4757, #c44dff)';
  };

  const getStatusText = (value) => {
    if (value <= 10) return '😐 Meh...';
    if (value <= 30) return '🤔 Hmm, maybe?';
    if (value <= 50) return '👀 Getting interested...';
    if (value <= 70) return '😍 Quite impressed!';
    if (value <= 85) return '🥰 Very interested!';
    if (value <= 95) return '😳 Almost in love!';
    return '💍 WEDDING BELLS!';
  };

  return (
    <div className="interest-meter">
      <div className="meter-header">
        <span className="meter-label">Nisha Interest Meter ❤️</span>
        <span className="meter-value">{interest}%</span>
      </div>
      <div className="meter-track">
        <div
          className="meter-fill"
          style={{
            width: `${interest}%`,
            background: getBarColor(interest),
          }}
        >
          <div className="meter-glow" />
        </div>
      </div>
      <div className="meter-status">
        <span className="status-text">{getStatusText(interest)}</span>
        <span className="status-label">{label}</span>
      </div>
    </div>
  );
};

export default InterestMeter;
