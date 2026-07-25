import React from 'react';

const ButtonGrid = ({ jpTypes, selectedType, onSelectType }) => {
  return (
    <div className="button-grid-wrapper">
      <div className="button-grid">
        {jpTypes.map((jpType) => {
          const isSelected = selectedType?.id === jpType.id;
          const isPerfect = jpType.id === 'perfect';

          return (
            <button
              key={jpType.id}
              id={`btn-${jpType.id}`}
              className={`jp-card-button ${isSelected ? 'card-selected' : ''} ${
                isPerfect ? 'card-perfect-glow' : ''
              }`}
              style={{
                '--card-accent': jpType.accentColor,
                '--card-glow': jpType.glowColor,
                '--card-bg-gradient': jpType.color,
              }}
              onClick={(e) => onSelectType(e, jpType)}
            >
              <div className="card-top-bar">
                <span className="motion-badge">
                  <span className="motion-icon">{jpType.motionEmoji}</span>
                </span>
                <span className="interest-badge">
                  {jpType.interest}% ❤️
                </span>
              </div>

              <div className="card-content">
                <div className="card-emoji-container">
                  <span className="card-main-emoji">{jpType.emoji}</span>
                </div>
                <div className="card-text-group">
                  <h3 className="card-title">{jpType.label}</h3>
                  <p className="card-tagline">{jpType.tagline}</p>
                </div>
              </div>

              {/* Hover & Selection Glow Overlays */}
              <div className="card-border-glow" />
              <div className="card-inner-shine" />
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default ButtonGrid;
