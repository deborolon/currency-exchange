import React, { useState, useEffect } from "react";
import CurrencySelector from "./CurrencySelector";
import LoadingSpinner from "../../utils/spinner";
import AmountInput from "./AmountInput";
import { getRates } from "../../utils/getRates";
import ExchangeSvg from "../../utils/ExchangeSvg";
import CurrencyConverter from "./CurrencyConverter";

function Converter() {
  const defaultCurrency = "USD";
  const defaultAmount= 1;
  const defaultBaseCurrency = "USD,1";
  const defaultTarget = "EUR,0.9358038555118847";
  const [rates, setRates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [amount, setAmount] = useState('');
  let [baseCurrency, setBaseCurrency] = useState("");
  let [targetCurrency, setTargetCurrency] = useState("");
  const [rateDiff, setRateDiff] = useState('');
  const [result, setResult] = useState('');

  //Fetch to API one time only
  useEffect(() => {
    getRates(defaultCurrency)
      .then((res) => {
        const ratesArray = Object.entries(res.rates).map(([currency, rate]) => ({ currency, rate }));
        setRates(ratesArray);
        setAmount(defaultAmount);
        setBaseCurrency(defaultBaseCurrency);
        setTargetCurrency(defaultTarget);
        setLoading(false);
    });
  }, [defaultCurrency]);

  useEffect(()=>{
    if(amount && targetCurrency && baseCurrency){
      //TODO: calculo al cambiar base currency;
      const valTarget = parseFloat(targetCurrency.split(",")[1]);
      setRateDiff(valTarget);
      const calculate = parseFloat(amount) * valTarget;
      setResult(calculate);
    }
  }, [amount, baseCurrency, targetCurrency])

  console.log('RATES: ', rates)
  // console.log('defaultBaseCurrency ', defaultBaseCurrency)
  return loading && baseCurrency && targetCurrency ? (
    <LoadingSpinner />
  ) : (
    <div className="converter">
      <AmountInput value={amount} onChange={(e) => setAmount(e.target.value)} />
      <CurrencySelector
        label="From"
        currencies={rates}
        onChange={(e) => setBaseCurrency(e.target.value)}
        defaultValue={baseCurrency}
      />
      <button className="exchange-svg">
        <ExchangeSvg />
      </button>
      <CurrencySelector
        label="To"
        currencies={rates}
        onChange={(e) => setTargetCurrency(e.target.value)}
        defaultValue={targetCurrency}
      />
      <CurrencyConverter
        amount={amount}
        baseCurrency={baseCurrency}
        result={result}
        targetCurrency={targetCurrency}
        defaultAmount={defaultAmount}
        rateDiff={rateDiff}
      />
    </div>
  );
}

export default Converter;