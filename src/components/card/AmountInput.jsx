function AmountInput({ value, onChange }) {
    return (
      <div className="amount-input">
        <label>Amount</label>
        <input
          type="number"
          min="0"
          value={value}
          onChange={onChange}
        />
      </div>
    );
  }

  export default AmountInput;