import React, { useState, useEffect } from "react";
import CurrencySelector from "./CurrencySelector";
import CurrencyConverter from "./CurrencyConverter";
import LoadingSpinner from "../../utils/spinner";
import AmountInput from "./AmountInput";
import { getRates } from "../../utils/getRates";
import ExchangeSvg from "../../utils/ExchangeSvg"
import UnitRate from "./UnitRate";

function Converter() {
  const [rates, setRates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [amount, setAmount] = useState(1);
  const [baseCurrency, setBaseCurrency] = useState("EUR");
  const [targetCurrency, setTargetCurrency] = useState("USD");

  useEffect(() => {
    getRates("EUR").then((res) => {
      const ratesArray = Object.entries(res.rates).map(([currency, rate]) => ({
        currency,
        rate,
      }));
      setRates(ratesArray);
      setLoading(false);
    });
  }, []);

  return loading ? (
    <LoadingSpinner />
  ) : (
    <div className="converter">
      <AmountInput value={amount} onChange={(e) => setAmount(e.target.value)} />
      <CurrencySelector
        label="From"
        currencies={rates}
        onChange={(e) => setBaseCurrency(e.target.value)}
      />
      <button className="exchange-svg">
        <ExchangeSvg />
      </button>
      <CurrencySelector
        label="To"
        currencies={rates}
        onChange={(e) => setTargetCurrency(e.target.value)}
      />
      <CurrencyConverter
        amount={amount}
        baseCurrency={baseCurrency}
        targetCurrency={targetCurrency}
      />
      <UnitRate
        baseCurrency={baseCurrency}
        targetCurrency={targetCurrency}
      />
    </div>
  );
}

export default Converter;