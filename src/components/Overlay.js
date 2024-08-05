import React from 'react';
import './Overlay.css';

const Overlay = ({ onClick }) => {
  return (
    <div className="overlay" onClick={onClick}>
      <div className="overlay-content">
        <h1>Welcome to CashFlow</h1>
        <p>Click anywhere to start</p>
      </div>
    </div>
  );
};

export default Overlay;
