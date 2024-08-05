import React, { useState } from 'react';

function ExpenseInput({ addExpense }) {
  const [name, setName] = useState('');
  const [tag, setTag] = useState('');
  const [amount, setAmount] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name && tag && !isNaN(parseFloat(amount))) {
      addExpense({ name, tag, amount: parseFloat(amount) });
      setName('');
      setTag('');
      setAmount('');
    } else {
      alert('Please fill in all fields correctly.');
    }
  };

  return (
    <div className="input-section">
      <input
        type="text"
        id="expense-name"
        placeholder="Expense Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="text"
        id="expense-tag"
        placeholder="Tag"
        value={tag}
        onChange={(e) => setTag(e.target.value)}
      />
      <input
        type="number"
        id="expense-amount"
        placeholder="Amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />
      <button onClick={handleSubmit}>Add Expense</button>
    </div>
  );
}

export default ExpenseInput;
