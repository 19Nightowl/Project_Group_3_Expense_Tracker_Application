import React, { useState } from 'react';

function BudgetInput({ updateBudget }) {
  const [budget, setBudget] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isNaN(parseFloat(budget))) {
      updateBudget(parseFloat(budget));
      setBudget('');
    } else {
      alert('Please enter a number.');
    }
  };

  return (
    <div className="budget-section">
      <input
        type="text"
        id="budget-total"
        placeholder="Total Budget"
        value={budget}
        onChange={(e) => setBudget(e.target.value)}
      />
      <button onClick={handleSubmit}>Update Budget</button>
    </div>
  );
}

export default BudgetInput;
