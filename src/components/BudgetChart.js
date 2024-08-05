import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

const BudgetChart = ({ expenses, monthlyBudget }) => {
  const canvasRef = useRef(null);
  const chartRef = useRef(null);

  useEffect(() => {
    const ctx = canvasRef.current.getContext('2d');

    if (chartRef.current) {
      chartRef.current.destroy();
    }

    const labels = expenses.map(expense => expense.tag);
    const amounts = expenses.map(expense => expense.amount);

    const colors = ['#C62828', '#1565C0', '#2E7D32'];

    const data = labels.map((label, i) => ({
      label,
      data: [amounts[i]],
      backgroundColor: colors[i % colors.length],
      borderWidth: 1,
      borderRadius: 20,
      barThickness: 40
    }));

    chartRef.current = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: [''],
        datasets: data
      },
      options: {
        indexAxis: 'y',
        responsive: true,
        scales: {
          y: {
            beginAtZero: true,
            stacked: true
          },
          x: {
            stacked: true,
            max: monthlyBudget
          }
        }
      }
    });

    return () => {
      if (chartRef.current) {
        chartRef.current.destroy();
      }
    };
  }, [expenses, monthlyBudget]);

  let total = expenses.reduce((sum, expense) => sum + expense.amount, 0);
  let remaining = monthlyBudget - total;

  return (
    <div className="chart-container">
      <h2>Monthly Budget Chart</h2>
      <canvas ref={canvasRef}></canvas>
      <p>You have: ${remaining.toFixed(2)} remaining before you go over your monthly budget</p>
    </div>
  );
};

export default BudgetChart;
