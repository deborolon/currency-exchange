function CurrencyConverter({amount, baseCurrency, result, targetCurrency, defaultAmount, rateDiff }) {
    const currencyParser = (target) => {
        const res = target.split(",")[0]
        return res
      };
    return (
        <div className="currency-converter">
        <p className="current">{`${amount} ${currencyParser(baseCurrency)} = ${result} ${currencyParser(targetCurrency)}`}</p>
        <p className="unit-rate">{`${defaultAmount} ${currencyParser(baseCurrency)} = ${rateDiff} ${currencyParser(targetCurrency)}`}</p>
      </div>
    );
  }
  
  export default CurrencyConverter;