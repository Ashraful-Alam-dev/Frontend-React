import React, { useState } from "react";
import "./styles.css";

function TransactionForm({ onAdd }) {
  const [desc, setDesc] = useState("");
  const [amount, setAmount] = useState("");
  const [type, setType] = useState("income");
  const [date, setDate] = useState(() =>
    new Date().toISOString().split("T")[0]
  );

  const [error, setError] = useState("");
  const validateForm = () => {
    if (!desc.trim()) return "Description is required";
    const amountValue = Number(amount);
    if (isNaN(amountValue) || amountValue <= 0)
      return "Amount must be a positive number";
    if (!date) return "Date is required";

    const today = new Date().toISOString().split("T")[0];
    if (date > today) return "Date cannot be in the future";

    return null;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const errorMsg = validateForm();
    if (errorMsg) {
      setError(errorMsg);
      return;
    }

    setError("");
    onAdd({ desc: desc.trim(), amount: Number(amount), type, date });
    setDesc("");
    setAmount("");
    setType("income");
    setDate(new Date().toISOString().split("T")[0]);
  };

  return (
    <div>
      <form className="form" onSubmit={handleSubmit}>
        <select value={type} onChange={(e) => setType(e.target.value)}>
          <option value="income">Income</option>
          <option value="expense">Expense</option>
        </select>

        <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        required
        />

        <input
        type="text"
        placeholder="Description"
        value={desc}
        onChange={(e) => setDesc(e.target.value)}
        required
        />

        <input
        type="number"
        placeholder="Amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        required
        />

        <button type="submit">Add</button>
      </form>
      {error && <div className="error">{error}</div>}
    </div>
  );
}

export default TransactionForm;
