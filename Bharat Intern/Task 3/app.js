document.addEventListener('DOMContentLoaded', () => {
    const transactionForm = document.getElementById('transaction-form');
    const transactionList = document.getElementById('transaction-list');
    const balanceDisplay = document.getElementById('balance');
    let balance = 0;
  
    transactionForm.addEventListener('submit', (event) => {
      event.preventDefault();
  
      const description = document.getElementById('description').value;
      const amount = parseFloat(document.getElementById('amount').value);
      const type = document.getElementById('type').value;
  
      if (description && !isNaN(amount)) {
        const listItem = document.createElement('li');
        listItem.innerHTML = `<span>${description}</span><span class="${type}">${(type === 'income' ? '+' : '-')} $${amount.toFixed(2)}</span>`;
        transactionList.appendChild(listItem);
  
        if (type === 'income') {
          balance += amount;
        } else if (type === 'expense') {
          balance -= amount;
        }
  
        updateBalanceDisplay();
      }
  
      transactionForm.reset();
    });
  
    function updateBalanceDisplay() {
      balanceDisplay.textContent = `Balance: $${balance.toFixed(2)}`;
    }
  });
  