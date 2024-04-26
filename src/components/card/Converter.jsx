import React, { useState, useEffect } from "react";
import LoadingSpinner from "../../utils/spinner";
import ExchangeSvg from "../../utils/ExchangeSvg";
import CurrencyConverter from "./CurrencyConverter";
import WarningMessage from "../warning/WarningMessage";

const Test = () => {
  const [amount, setAmount] = useState(1)
  const regex = /^\d{0,10}(?:\.\d{0,4})?$/;
  const [currencies, setCurrencies] = useState([]);
  const [fromCurrency, setFromCurrency] = useState("");
  const [toCurrency, setToCurrency] = useState("");
  const [exchangeRate, setExchangeRate] = useState(1);
  const [convertedAmount, setConvertedAmount] = useState(0);
  const [loading, setLoading] = useState(true);

  //Fetch currencies
  useEffect(() => {
    fetch(process.env.REACT_APP_GET_CURRENCIES)
      .then((response) => response.json())
      .then((data) => {
        setCurrencies(Object.keys(data));
        setFromCurrency(Object.keys(data)[1]);
        setToCurrency(Object.keys(data)[0]);
        setLoading(false);
      })
      .catch((error) => console.error("Error fetching currencies:", error));
  }, []);

  //Fetch rates
  useEffect(() => {
    if (fromCurrency && toCurrency) {
      fetch(process.env.REACT_APP_GET_RATES + `${fromCurrency}`)
        .then((response) => response.json())
        .then((data) => {
          setExchangeRate(data.rates[toCurrency]);
        })
        .catch((error) =>
          console.error("Error fetching exchange rate:", error)
        );
    }
  }, [fromCurrency, toCurrency]);

  const handleAmountChange = (e) => {
    const value = e.target.value;
    if (regex.test(value)) {
      setAmount(value);
      setConvertedAmount(parseFloat(value) * exchangeRate);
    }
  };

  const handleCurrencyChange = (e, setter) => {
    const selectedCurrency = e.target.value;
    setter(selectedCurrency);
  };

  const invertCurrencies = () => {
    const tempFromCurrency = fromCurrency;
    setFromCurrency(toCurrency);
    setToCurrency(tempFromCurrency);
  };

  useEffect(() => {
    setConvertedAmount(parseFloat(amount) * exchangeRate);
  }, [amount, exchangeRate]);

  return loading ? (
    <LoadingSpinner />
  ) : (
    <div className="converter">
      <div className="amount-input">
        <label>Amount:</label>
        <input type="text" value={amount} onChange={handleAmountChange} />
      </div>
      <div className="currency-selector">
        <label>From:</label>
        <select
          value={fromCurrency}
          onChange={(e) => handleCurrencyChange(e, setFromCurrency)}
        >
          {currencies.map((currency) => (
            <option key={currency} value={currency}>
              {currency}
            </option>
          ))}
        </select>
      </div>
      <button className="exchange-svg" onClick={invertCurrencies}>
        <ExchangeSvg />
      </button>
      <div className="currency-selector">
        <label>To:</label>
        <select
          value={toCurrency}
          onChange={(e) => handleCurrencyChange(e, setToCurrency)}
        >
          {currencies.map((currency) => (
            <option key={currency} value={currency}>
              {currency}
            </option>
          ))}
        </select>
      </div>
      <CurrencyConverter
        amount={amount}
        fromCurrency={fromCurrency}
        convertedAmount={convertedAmount}
        toCurrency={toCurrency}
        exchangeRate={exchangeRate}
      />
      <WarningMessage />
    </div>
  );
};

export default Test;