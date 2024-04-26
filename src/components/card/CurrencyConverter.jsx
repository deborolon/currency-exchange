function CurrencyConverter({amount, fromCurrency, convertedAmount, toCurrency, exchangeRate }) {
    return (
        <div className="currency-converter">
        <p className="current">{`${amount} ${fromCurrency} = ${convertedAmount} ${toCurrency}`}</p>
        <p className="unit-rate">{`1 ${fromCurrency} = ${exchangeRate} ${toCurrency}`}</p>
      </div>
    );
  }
  
  export default CurrencyConverter;