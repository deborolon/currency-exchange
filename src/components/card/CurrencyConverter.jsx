function CurrencyConverter({convertedAmount, baseCurrency }) {
    return (
        <div className="currency-converter">
        <p className="current">{`${convertedAmount.toFixed(6)}`}</p>
        <p className="unit-rate">{"Acá la base"}</p>
      </div>
    );
  }
  
  export default CurrencyConverter;