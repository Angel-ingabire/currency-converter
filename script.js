const apiKey = "YOUR_API_KEY"; // Replace with your API key
const apiUrl = `https://v6.exchangerate-api.com/v6/${apiKey}/latest/USD`;

document.addEventListener("DOMContentLoaded", async () => {
    const fromCurrency = document.getElementById("from-currency");
    const toCurrency = document.getElementById("to-currency");
    const amount = document.getElementById("amount");
    const convertBtn = document.getElementById("convert-btn");
    const result = document.getElementById("result");

    try {
        // Fetch currency data
        const response = await fetch(apiUrl);
        const data = await response.json();
        const currencies = Object.keys(data.conversion_rates);

        // Populate the currency dropdowns with the available currencies
        currencies.forEach(currency => {
            // Create option elements for "from" and "to" currency dropdowns
            let option1 = document.createElement("option");
            let option2 = document.createElement("option");

            // Set the value and text of the option
            option1.value = option2.value = currency;
            option1.textContent = option2.textContent = currency;

            // Append the options to the respective dropdowns
            fromCurrency.appendChild(option1);
            toCurrency.appendChild(option2);
        });

        // Set default values for the dropdowns
        fromCurrency.value = "USD"; // Default "From" currency (USD)
        toCurrency.value = "EUR";   // Default "To" currency (EUR)
    } catch (error) {
        console.error("Error fetching exchange rates:", error);
        result.textContent = "Error fetching exchange rates.";
    }

    // Convert currency on button click
    convertBtn.addEventListener("click", async () => {
        let from = fromCurrency.value;
        let to = toCurrency.value;
        let amountValue = amount.value;

        if (!amountValue || amountValue <= 0) {
            result.textContent = "Please enter a valid amount.";
            return;
        }

        try {
            const response = await fetch(`https://v6.exchangerate-api.com/v6/${apiKey}/pair/${from}/${to}/${amountValue}`);
            const data = await response.json();
            result.textContent = `Converted Amount: ${data.conversion_result} ${to}`;
        } catch (error) {
            console.error("Error converting currency:", error);
            result.textContent = "Error converting currency.";
        }
    });
});
