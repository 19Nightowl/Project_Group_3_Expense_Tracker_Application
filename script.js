let expenses = JSON.parse(localStorage.getItem('expenses')) || [];
let budget = JSON.parse(localStorage.getItem('budget')) || [];

document.addEventListener('DOMContentLoaded', () => {
    updateExpenseList();
    updateChart();
});

function addExpense() {
    const name = document.getElementById('expense-name').value;
    const tag = document.getElementById('expense-tag').value;
    const amount = parseFloat(document.getElementById('expense-amount').value);

    if (name && tag && !isNaN(amount)) {
        expenses.push({ name, tag, amount });
        localStorage.setItem('expenses', JSON.stringify(expenses));
        document.getElementById('expense-name').value = '';
        document.getElementById('expense-tag').value = '';
        document.getElementById('expense-amount').value = '';
        updateExpenseList();
        updateChart();
    } else {
        alert('Please fill in all fields correctly.');
    }
}

function updateBudget() {
    const newBudget = document.getElementById('budget-total').value;
    if(!isNaN(newBudget)) {
        localStorage.setItem("budget", newBudget);
        budget = JSON.parse(localStorage.getItem('budget')) || [];
        document.getElementById('budget-total').value = '';
        updateChart();
    } else {
        alert('Please enter a number.');
    }
}


function deleteExpense(index) {
    expenses.splice(index, 1);
    localStorage.setItem('expenses', JSON.stringify(expenses));
    updateExpenseList();
    updateChart();
}

function updateExpenseList() {
    const expenseList = document.getElementById('expense-list');
    expenseList.innerHTML = '';
    expenses.forEach((expense, index) => {
        const li = document.createElement('li');
        li.innerHTML = `${expense.name} - ${expense.tag} - $${expense.amount.toFixed(2)} <button onclick="deleteExpense(${index})">Delete</button>`;
        expenseList.appendChild(li);
    });
}

function updateChart() {
    const ctx = document.getElementById('expense-chart').getContext('2d');
    const tags = expenses.map(expense => expense.tag);
    const amounts = expenses.map(expense => expense.amount);

    const colors = expenses.map(() => `hsl(${Math.floor(Math.random() * 360)}, 100%, 70%)`);

    if (window.myChart) {
        window.myChart.destroy();
    }

    window.myChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: tags,
            datasets: [{
                label: 'Expenses',
                data: amounts,
                backgroundColor: colors,
                borderColor: colors.map(color => color.replace('70%', '50%')),
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
    updateChartTwo();
}

function updateChartTwo() {
    const ctx2 = document.getElementById('budget-chart').getContext('2d');
    const label = expenses.map(expense => expense.tag);
    const amounts2 = expenses.map(expense => expense.amount);
    var datas = [];
    var total = 0;

    console.log(label.length);

    const colors = expenses.map(() => `hsl(${Math.floor(Math.random() * 360)}, 100%, 70%)`);

    if (window.myOtherChart) {
        window.myOtherChart.destroy();
    }

    for(var i = 0; i < label.length; i++) {
        var current = [];
        current.push(amounts2[i]);
        total += current[0];
        console.log(i + " " + current);
        datas[i] = {
            label: label[i],
            data: current,
            backgroundColor: colors[i],
            borderWidth: 1
        }
    }

    if(budget){
        window.myOtherChart = new Chart(ctx2, {
            type: 'bar',
            data: {
                labels: " ",
                datasets: datas
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
                        max: budget   
                    }
                }
            }
        });
    }
    
    let remaining = budget - total;
    document.getElementById('total-remaining').innerHTML = "You have: $" + remaining + " remaining before you go over budget";
}