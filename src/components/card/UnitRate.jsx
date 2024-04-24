function UnitRate({baseCurrency, targetCurrency }) {
    const calculateResult = () => {
        //TODO: logica de cálculo
      };
    return (
      <div className="unit-rate">
        <p>{`1 ${baseCurrency} = ${calculateResult()} ${targetCurrency}`}</p>
      </div>
    );
  }
  
  export default UnitRate;