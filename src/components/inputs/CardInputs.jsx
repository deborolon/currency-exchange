import { useState, useEffect } from "react";
import SvgButton from "../../utils/SvgButton";
import { getRates } from "../../utils/getRates";
import LoadingSpinner from "../../utils/spinner";

function CardInputs() {
  const defaultBaseCurrency = "EUR";
  const defaultTargetCurrency = "USD";
  const defaultAmount = 1;
  const defaultTarget = 0.9673; 
  //const defaultBase = {EUR: 1}
  //const defaultTarge
  const [rates, setRates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [amount, setAmount] = useState(defaultAmount)
  const [baseCurrency, setBaseCurrency] = useState([defaultBaseCurrency, defaultAmount]);
  const [targetCurrency, setTargetCurrency] = useState([defaultTargetCurrency, defaultTarget])
  const [result, setResult] = useState('')
  
  useEffect(() => {
    getRates("EUR")
      .then((res) => {
        const ratesArray = Object.entries(res.rates).map(([currency, rate]) => ({ currency, rate }));
        setRates(ratesArray);
        setLoading(false)
    });
  }, []);

  useEffect(()=>{
    if(amount && targetCurrency){
      const valTarget = targetCurrency.find(element => typeof element === 'number')
      const calculate = amount * valTarget
      setResult(calculate)
    }
  }, [amount, baseCurrency, targetCurrency])


  // console.log ('BASE CURRENCY: ', baseCurrency)
  // console.log ('TARGET CURRENCY: ', targetCurrency)
  // console.log("RESULT: ", result)
  return loading ? (
    <LoadingSpinner />
  ) : (
    <div className="converter">
      <label className="converter-label" htmlFor="amount">Amount</label>
      <input className="converter-input" id={"amount"} name="amount" type="number" min="0" defaultValue={1} onInput={(e)=>{e.target.value = Math.abs(e.target.value)}} onChange={(e)=> setAmount(e.target.value)}/>
      <label className="converter-label" htmlFor="from">From</label>
      <select className="converter-select" id="from" name="from" onChange={(e)=> setBaseCurrency(e.target.value)}>
        {rates.map((option, index) => (
          <option key={index} value={[option.currency, option.rate]}>
            {option.currency}
          </option>
        ))}
      </select>
      <div className="svgButton">
        <SvgButton />
      </div>
      <label className="converter-label" htmlFor="to">To</label>
      <select className="converter-select" id="to" name="to" onChange={(e)=> setTargetCurrency(e.target.value)} defaultValue={[rates[4].currency, rates[4].rate]} >
        {rates.map((option, index) => (
          <option key={index} value={[option.currency, option.rate]}>
            {option.currency}
          </option>
        ))}
      </select>
      <div className="result">
        <p>{amount + ' ' + baseCurrency} = {result + ' ' + targetCurrency}</p>
      </div>
      <div className="unit">
        <p>{ `1 ${baseCurrency} = ${result} ${targetCurrency}`} </p>
      </div>
    </div>
  );
}

export default CardInputs;
