import React, { useState, useEffect } from "react";
import "./styles.css";

function TransactionEdit({ transaction, onUpdate, onCancel }) {
  const [desc, setDesc] = useState("");
  const [amount, setAmount] = useState("");
  const [type, setType] = useState("income");
  const [date, setDate] = useState("");

  useEffect(() => {
    if (transaction) {
      setDesc(transaction.desc || "");
      setAmount(transaction.amount || "");
      setType(transaction.type || "income");
      setDate(transaction.date || new Date().toISOString().split("T")[0]);
    }
  }, [transaction]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!desc || !amount || !type || !date) {
      alert("All fields are required");
      return;
    }

    onUpdate({
      ...transaction, 
      desc,
      amount: Number(amount),
      type,
      date,
    });
  };

  return (
    <form className="form" onSubmit={handleSubmit}>
      <select value={type} onChange={(e) => setType(e.target.value)}>
        <option value="income">Income</option>
        <option value="expense">Expense</option>
      </select>

      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
      />

      <input
        type="text"
        placeholder="Description"
        value={desc}
        onChange={(e) => setDesc(e.target.value)}
      />

      <input
        type="number"
        placeholder="Amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />

      <button type="submit">Update</button>
      <button type="button" onClick={onCancel}>Cancel</button>
    </form>
  );
}

export default TransactionEdit;
