import React from "react";

export function SplitBill({
  selectedUser,
  onSplitBill,
  whoIsPaying,
  yourExpense,
  billValue,
  setBillValue,
  setYourExpense,
  setWhoIsPaying,
}) {
  if (!selectedUser) return null;

  const handleBillValueChange = (e) => {
    setBillValue(e.target.value);
  };

  const handleYourExpenseChange = (e) => {
    setYourExpense(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSplitBill(billValue, yourExpense, whoIsPaying);
  };

  return (
    <div className="split-bill-container">
      <form className="split-bill-form" onSubmit={handleSubmit}>
        <h2>Split Bill with {selectedUser.name}</h2>
        <div className="input-group">
          <label>💰 Bill Value</label>
          <input
            type="number"
            value={billValue}
            onChange={handleBillValueChange}
          />
        </div>
        <div className="input-group">
          <label>🧍‍♂️ Your Expense</label>
          <input
            type="number"
            value={yourExpense}
            onChange={handleYourExpenseChange}
          />
        </div>
        <div className="input-group">
          <label>👫 {selectedUser.name}'s Expense</label>
          <input type="number" value={billValue - yourExpense} disabled />
        </div>
        <div className="input-group">
          <label>🤑 Who's paying?</label>
          <select 
            value={whoIsPaying} 
            onChange={(e) => setWhoIsPaying(e.target.value)}
          >
            <option value="you">You</option>
            <option value={selectedUser.name}>{selectedUser.name}</option>
          </select>
        </div>
        <Button type="submit" onClick={handleSubmit}>
          Split Bill
        </Button>
      </form>
    </div>
  );
}

function Button({ children, onClick, type }) {
  return (
    <button className="button" onClick={onClick} type={type || "button"}>
      {children}
    </button>
  );
}
