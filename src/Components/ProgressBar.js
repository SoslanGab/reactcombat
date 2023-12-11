import React from 'react';

function ProgressBar({ pv, pvMax, barType }) {
  return (
    <div className={`progress-container ${barType}`}>
      <span className="progress-label">{barType === 'health' ? 'Vie' : 'Mana'}: {pv} / {pvMax}</span>
      <div className="progress-bar">
        <div className="progress" style={{ width: `${(pv / pvMax) * 100}%` }}></div>
      </div>
    </div>
  );
}

export default ProgressBar;
