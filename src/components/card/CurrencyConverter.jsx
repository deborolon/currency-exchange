function CurrencyConverter({ amount, baseCurrency, targetCurrency }) {
  const calculateResult = () => {
    //TODO: logica de cálculo
  };

  return (
    <div className="currency-converter">
      <p>{`${amount} ${baseCurrency} = ${calculateResult()} ${targetCurrency}`}</p>
    </div>
  );
}

export default CurrencyConverter;