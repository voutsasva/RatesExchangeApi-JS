const app = document.getElementById('root');
document.addEventListener('DOMContentLoaded', getLatestRates);

const apiKey = '[REPLACE_THIS_VALUE_WITH_YOUR_ACCESS_KEY]';
var baseCurrency = 'EUR';

function getLatestRates() {
    fetch(`https://api.ratesexchange.eu/client/latestdetails?apikey=${apiKey}&base_currency=${baseCurrency}`)
        .then(handleErrors)
        .then((data) => {
            let result = `<h3 class="w3-center w3-allerta w3-xlarge"> Base currency: ${data.base} </h3>`;
            result += `<h5> Rates date: ${data.date} </h5>`;
            result += `<table class="w3-table-all w3-card-4">
                        <tr>
                            <th>Currency</th>
                            <th>Symbol</th>
                            <th>Value</th>
                        </tr>`;
            data.rates.forEach((rate) => {
                const {currency, symbol, value} = rate
                result += 
                    `<tr>
                        <td>${currency}</td>
                        <td>${symbol}</td>
                        <td>${value}</td>
                    </tr>`;
            });
            result += `</table>`;
            document.getElementById('result').innerHTML = result;
        })
        .catch(error => {
            console.log(error);
            reject(error);
          });
}

function handleErrors(response) {
    if (!response.ok) {
        const errorMessage = document.createElement('marquee');
        errorMessage.textContent = `Ooops, it's not working!`;
        app.appendChild(errorMessage);
        console.log('Response error: ', response.statusText);
        throw new Error(response.statusText);
    }
    return response.json();
}