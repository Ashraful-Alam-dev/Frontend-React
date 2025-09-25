import React, { useState, useEffect } from "react";
import TransactionForm from "./TransactionForm";
import TransactionList from "./TransactionList";
import TransactionEdit from './TransactionEdit';
import "./styles.css";

function CashTracker() {
  const [transactions, setTransactions] = useState(() => {
    const saved = localStorage.getItem("transactions");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem("transactions", JSON.stringify(transactions));
  }, [transactions]);

  const totalIncome = transactions
    .filter((t) => t.type === "income")
    .reduce((sum, t) => sum + Number(t.amount), 0);

  const totalExpense = transactions
    .filter((t) => t.type === "expense")
    .reduce((sum, t) => sum + Number(t.amount), 0);

  const netSaving = totalIncome - totalExpense;
  const [editIndex, setEditIndex] = useState(null);

  const handleAdd = (newTransaction) => {
    setTransactions([...transactions, newTransaction]);
  };

  const handleUpdate = (updatedTransaction) => {
    const updatedList = transactions.map((t, i) =>
      i === updatedTransaction.index ? updatedTransaction : t
    );
    setTransactions(updatedList);
    setEditIndex(null);
  };

  const handleEdit = (index) => {
    setEditIndex(index);
  };

  const handleDelete = (index) => {
    setTransactions(transactions.filter((_, i) => i !== index));
  };

  return (
    <div className="primary">
      <h1>CashTracker</h1>

      {editIndex !== null ? (
        <TransactionEdit
          transaction={{ ...transactions[editIndex], index: editIndex }}
          onUpdate={handleUpdate}
          onCancel={() => setEditIndex(null)}
        />
      ) : (
        <TransactionForm onAdd={handleAdd} />
      )}

      <div className="summary">
         <div className="box">
          <div className="income">Total Income</div>
          <div className="amount">{totalIncome}</div>
        </div>
        
        <div className="box">
          <div className="expense">Total Expense</div>
          <div className="amount">{totalExpense}</div>
        </div>

        <div className="box">
          <div className="saving">Net Savings</div>
          <div className="amount">{netSaving}</div>
        </div>
      </div>

      <TransactionList
        transactions={transactions}
        onDelete={handleDelete}
        onEdit={handleEdit}
      />
      
    </div>
  );
}

export default CashTracker;
