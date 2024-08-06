import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

const ExpenseChart = ({ expenses }) => {
  const canvasRef = useRef(null);
  const chartRef = useRef(null);

  useEffect(() => {
    const ctx = canvasRef.current.getContext('2d');

    if (chartRef.current) {
      chartRef.current.destroy();
    }

    let tags = expenses.map(expense => expense.tag);
    let amounts = expenses.map(expense => expense.amount);

    // condense tags
    for(var i = 0; i < tags.length - 1; i++){
      for(var j = i + 1; j < tags.length; j++) {
        if(tags[i] == tags[j]){
          amounts[i] += amounts[j];

          tags.splice(j, 1);
          amounts.splice(j, 1);
        }
      }
    }

    const colors = ['#C62828', '#1565C0', '#2E7D32'];

    chartRef.current = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: tags,
        datasets: [{
          label: 'Expenses',
          data: amounts,
          backgroundColor: colors,
          borderColor: colors.map(color => color.replace('70%', '50%')),
          borderWidth: 1,
          borderRadius: 10,
          barThickness: 30
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          },
          x: {
            stacked: true
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
      <h2>Expense Chart</h2>
      <canvas ref={canvasRef}></canvas>
    </div>
  );
};

export default ExpenseChart;
