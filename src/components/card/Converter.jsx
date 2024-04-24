import React, { useState, useEffect } from "react";
import CurrencySelector from "./CurrencySelector";
import LoadingSpinner from "../../utils/spinner";
import AmountInput from "./AmountInput";
import { getRates } from "../../utils/getRates";
import ExchangeSvg from "../../utils/ExchangeSvg";

function Converter() {
  const defaultCurrency = "EUR";
  const defaultAmount= 1;
  const defaultBaseCurrency = "EUR,1";
  const defaultTarget = "USD,1.0674";
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
  }, []);

  useEffect(()=>{
    if(amount && targetCurrency && baseCurrency){
      //TODO: calculo al cambiar base currency;
      const valTarget = parseFloat(targetCurrency.split(",")[1]);
      setRateDiff(valTarget);
      const calculate = parseFloat(amount) * valTarget;
      setResult(calculate);
    }
  }, [amount, baseCurrency, targetCurrency])

  const calculateResult = (result) => {
    const res = result.baseCurrency.split(",")[0]
    return res
  };

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
      <div className="currency-converter">
        <p>{`${amount} ${baseCurrency.split(",")[0]} = ${result} ${targetCurrency.split(",")[0]}`}</p>
      </div>
      <div className="unit-rate">
        <p>{`${defaultAmount} ${baseCurrency.split(",")[0]} = ${rateDiff} ${targetCurrency.split(",")[0]}`}</p>
      </div>
    </div>
  );
}

export default Converter;