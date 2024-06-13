document.addEventListener('DOMContentLoaded', function() {
    const amountInput = document.getElementById('amount');
    const fromCurrencySelect = document.getElementById('fromCurrency');
    const toCurrencySelect = document.getElementById('toCurrency');
    const convertForm = document.getElementById('convertForm');
    const convertResult = document.getElementById('convertResult');

    const apiURL = 'https://api.exchangerate-api.com/v4/latest/USD';

   
    fetch(apiURL)
        .then(response => response.json())
        .then(data => {
            const currencies = Object.keys(data.rates);
            currencies.forEach(currency => {
                const optionFrom = document.createElement('option');
                optionFrom.value = currency;
                optionFrom.textContent = currency;
                fromCurrencySelect.appendChild(optionFrom);

                const optionTo = document.createElement('option');
                optionTo.value = currency;
                optionTo.textContent = currency;
                toCurrencySelect.appendChild(optionTo);
            });
        });

   
    convertForm.addEventListener('submit', (event) => {
        event.preventDefault(); 

        const fromValue = fromCurrencySelect.value;
        const toValue = toCurrencySelect.value;
        const amountValue = amountInput.value;

        if (fromValue && toValue && amountValue) {
            fetch(`https://api.exchangerate-api.com/v4/latest/${fromValue}`)
                .then(response => response.json())
                .then(data => {
                    const rate = data.rates[toValue];
                    const convertedAmount = (amountValue * rate).toFixed(2);
                    convertResult.textContent = `${amountValue} ${fromValue} = ${convertedAmount} ${toValue}`;
                })
                .catch(error => {
                    console.error('Error fetching conversion rate:', error);
                    convertResult.textContent = 'An error occurred. Please try again.';
                });
        } else {
            convertResult.textContent = 'Please fill in all fields.';
        }
    });
});
