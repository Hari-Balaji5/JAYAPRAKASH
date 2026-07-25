import React from 'react';

const CategoryFilter = ({ categories, activeCategory, onSelectCategory }) => {
  return (
    <div className="category-filter-wrapper">
      <div className="category-tabs-container">
        {categories.map((cat) => {
          const isActive = activeCategory === cat.id;
          return (
            <button
              key={cat.id}
              className={`category-tab-btn ${isActive ? 'category-tab-active' : ''}`}
              onClick={() => onSelectCategory(cat.id)}
            >
              <span className="cat-icon">{cat.icon}</span>
              <span className="cat-label">{cat.label}</span>
              {isActive && <div className="cat-active-glow" />}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default CategoryFilter;
