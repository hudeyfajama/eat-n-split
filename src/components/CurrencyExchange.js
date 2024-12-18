// `https://api.frankfurter.app/latest?amount=100&from=EUR&to=USD`
import { useEffect, useState } from "react";

export default function CurrencyExchange() {
  const [amount, setAmount] = useState("");
  const [fromCurrency, setFromCurrency] = useState("GBP");
  const [toCurrency, setToCurrency] = useState("USD");
  const [convertedAmount, setConvertedAmount] = useState(0);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const BASE_URL = "https://api.frankfurter.app";

  useEffect(
    function () {
      const controller = new AbortController();

      async function fetchCurrency() {
        try {
          setIsLoading(true);
          const res = await fetch(
            `${BASE_URL}/latest?amount=${amount}&from=${fromCurrency}&to=${toCurrency}`,
            { signal: controller.signal }
          );
          const data = await res.json();
          
          if (data && data.rates) {
            setConvertedAmount(Number(data.rates[toCurrency]).toFixed(2));
            setError(null);
          } else {
            setError("Invalid response from server");
          }
        } catch (err) {
          if (err.name !== "AbortError") {
            console.log(err.message);
            setError(err.message);
          }
        } finally {
          setIsLoading(false);
        }
      }

      if (!amount || amount <= 0) {
        setConvertedAmount(null);
        return;
      }

      if (fromCurrency === toCurrency) {
        setConvertedAmount(Number(amount).toFixed(2));
        return;
      }

      fetchCurrency();

      return () => controller.abort();
    },
    [amount, fromCurrency, toCurrency]
  );

  function handleFromCurrencyChange(e) {
    setFromCurrency(e.target.value);
  }

  function handleToCurrencyChange(e) {
    setToCurrency(e.target.value);
  }

  function handleAmountChange(e) {
    setAmount(e.target.value);
  }

  return (
    <div className="currency-converter">
      <h2>Currency Converter</h2>
      <div className="converter-grid">
        <div className="amount-box">
          <label>Amount</label>
          <input
            type="number"
            placeholder="Enter amount..."
            value={amount}
            onChange={handleAmountChange}
          />
        </div>
        <div
          className="currency-box"
          onChange={handleFromCurrencyChange}
          value={fromCurrency}
        >
          <label>From</label>
          <Options
            currency={fromCurrency}
            onChangeCurrency={handleFromCurrencyChange}
          />
        </div>
        <div
          className="currency-box"
          onChange={handleToCurrencyChange}
          value={toCurrency}
        >
          <label>To</label>
          <Options
            currency={toCurrency}
            onChangeCurrency={handleToCurrencyChange}
          />
        </div>
      </div>
      {amount && (
        <p className="result">
          {isLoading ? (
            <Loader />
          ) : error ? (
            <ErrorMessage message={error} />
          ) : (
            convertedAmount
          )}
        </p>
      )}
    </div>
  );
}

function Options({ currency, onChangeCurrency }) {
  return (
    <select value={currency} onChange={onChangeCurrency}>
      <option value="CAD">CAD</option>
      <option value="EUR">EUR</option>
      <option value="GBP">GBP</option>
      <option value="INR">INR</option>
      <option value="USD">USD</option>
    </select>
  );
}

function Loader() {
  return <p className="loader">Loading...</p>;
}

function ErrorMessage({ message }) {
  return (
    <p className="error">
      <span>⛔️</span> {message}
    </p>
  );
}
