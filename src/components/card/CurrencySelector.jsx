function CurrencySelector({ label, currencies, onChange }) {
  return (
    <div className="currency-selector">
      <label>{label}</label>
      <select onChange={onChange}>
        {currencies.map((currency, index) => (
          <option key={index} value={currency.currency}>
            {currency.currency}
          </option>
        ))}
      </select>
    </div>
  );
}

export default CurrencySelector;