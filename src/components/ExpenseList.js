import React from 'react';

function ExpenseList({ expenses, deleteExpense }) {
  return (
    <div className="list-section">
      <h2>Expenses</h2>
      <ul id="expense-list">
        {expenses.map((expense, index) => (
          <li key={index}>
            {expense.name} - {expense.tag} - ${expense.amount.toFixed(2)}
            <button onClick={() => deleteExpense(index)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ExpenseList;
