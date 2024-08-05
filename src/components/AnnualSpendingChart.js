import React, { useRef, useEffect } from 'react';
import Chart from 'chart.js/auto';

const AnnualSpendingChart = ({ expenses }) => {
  const canvasRef = useRef(null);
  const chartRef = useRef(null);

  useEffect(() => {
    const ctx = canvasRef.current.getContext('2d');

    if (chartRef.current) {
      chartRef.current.destroy();
    }

    const tags = expenses.map(expense => expense.tag);
    const monthlyAmounts = expenses.map(expense => expense.amount);
    const yearlyAmounts = monthlyAmounts.map(amount => amount * 12);

    const colors = ['#C62828', '#1565C0', '#2E7D32'];

    chartRef.current = new Chart(ctx, {
      type: 'pie',
      data: {
        labels: tags,
        datasets: [{
          data: yearlyAmounts,
          backgroundColor: colors,
          borderColor: '#000',
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: 'top',
          },
          tooltip: {
            callbacks: {
              label: (tooltipItem) => {
                const value = tooltipItem.raw;
                return `${tooltipItem.label}: $${value.toFixed(2)}`;
              }
            }
          }
        }
      }
    });

    return () => {
      if (chartRef.current) {
        chartRef.current.destroy();
      }
    };
  }, [expenses]);

  return (
    <div className="chart-container">
      <h2>Annual Spending</h2>
      <div className="canvas-container">
        <canvas ref={canvasRef}></canvas>
      </div>
    </div>
  );
};

export default AnnualSpendingChart;
