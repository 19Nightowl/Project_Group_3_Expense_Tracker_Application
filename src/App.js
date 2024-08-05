import React, { useState, useEffect } from 'react';
import BudgetChart from './components/BudgetChart';
import ExpenseChart from './components/ExpenseChart';
import AnnualSpendingChart from './components/AnnualSpendingChart';
import Overlay from './components/Overlay';
import './App.css';

const App = () => {
  const [expenses, setExpenses] = useState([]);
  const [monthlyBudget, setMonthlyBudget] = useState(0);
  const [overlayVisible, setOverlayVisible] = useState(true);

  const [expenseName, setExpenseName] = useState('');
  const [expenseTag, setExpenseTag] = useState('');
  const [expenseAmount, setExpenseAmount] = useState('');
  const [budgetAmount, setBudgetAmount] = useState('');

  useEffect(() => {
    const storedExpenses = JSON.parse(localStorage.getItem('expenses')) || [];
    const storedBudget = JSON.parse(localStorage.getItem('monthlyBudget')) || 0;

    setExpenses(storedExpenses);
    setMonthlyBudget(storedBudget);
  }, []);

  useEffect(() => {
    localStorage.setItem('expenses', JSON.stringify(expenses));
  }, [expenses]);

  useEffect(() => {
    localStorage.setItem('monthlyBudget', JSON.stringify(monthlyBudget));
  }, [monthlyBudget]);

  const handleAddExpense = () => {
    if (expenseName && expenseTag && expenseAmount) {
      const newExpense = { tag: expenseTag, amount: parseFloat(expenseAmount) };
      setExpenses([...expenses, newExpense]);
      setExpenseName('');
      setExpenseTag('');
      setExpenseAmount('');
    }
  };

  const handleUpdateMonthlyBudget = () => {
    if (budgetAmount) {
      setMonthlyBudget(parseFloat(budgetAmount));
      setBudgetAmount('');
    }
  };

  const handleDeleteExpense = (index) => {
    const updatedExpenses = expenses.filter((_, i) => i !== index);
    setExpenses(updatedExpenses);
  };

  const handleOverlayClick = () => {
    setOverlayVisible(false);
  };

  return (
    <div className="container">
      {overlayVisible && <Overlay onClick={handleOverlayClick} />}
      <div className="main-content">
        <div className="input-section">
          <h2>Add Expense</h2>
          <input
            value={expenseName}
            onChange={(e) => setExpenseName(e.target.value)}
            type="text"
            placeholder="Expense Name"
          />
          <input
            value={expenseTag}
            onChange={(e) => setExpenseTag(e.target.value)}
            type="text"
            placeholder="Tag"
          />
          <input
            value={expenseAmount}
            onChange={(e) => setExpenseAmount(e.target.value)}
            type="number"
            placeholder="Amount"
          />
          <button onClick={handleAddExpense}>Add Expense</button>
          <h2>Set Monthly Budget</h2>
          <input
            value={budgetAmount}
            onChange={(e) => setBudgetAmount(e.target.value)}
            type="number"
            placeholder="Total Monthly Budget"
          />
          <button onClick={handleUpdateMonthlyBudget}>Update Monthly Budget</button>
        </div>
        <div className="chart-section">
          <div className="chart-container">
            <BudgetChart expenses={expenses} monthlyBudget={monthlyBudget} />
          </div>
          <div className="chart-container">
            <ExpenseChart expenses={expenses} />
          </div>
          <div className="chart-container">
            <AnnualSpendingChart expenses={expenses} />
          </div>
        </div>
      </div>
      <div className="list-section">
        <h2>Expenses</h2>
        <ul>
          {expenses.map((expense, index) => (
            <li key={index}>
              {expense.tag}: ${expense.amount}
              <button onClick={() => handleDeleteExpense(index)}>Delete</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default App;
