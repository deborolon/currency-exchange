import { useEffect, useState } from "react";

function CurrencySelector({ label, currencies, onChange, defaultValue }) {
  const [selectedValue, setSelectedValue] = useState(defaultValue)
  
  useEffect(()=>{
    setSelectedValue(defaultValue)
  }, [defaultValue])

  const handleOnChange = (e) => {
    setSelectedValue(e.target.value)
    onChange(e)
  }

  return (
    <div className="currency-selector">
      <label>{label}</label>
      <select onChange={handleOnChange} value={selectedValue}>
        {currencies.map((currency, index) => (
          <option key={index} value={[currency.currency, currency.rate]}>
            {currency.currency}
          </option>
        ))}
      </select>
    </div>
  );
}

export default CurrencySelector;