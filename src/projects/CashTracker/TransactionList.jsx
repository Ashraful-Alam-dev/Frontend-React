import React from "react";
import "./styles.css";

function TransactionList({ transactions, onDelete, onEdit }) {
  return (
    <div className="transaction-columns">
      <div className="income-column">
        <h2>Income</h2>
        {transactions.map((t, index) =>
          t.type === "income" ? (
            <div className="transaction-card income" key={index}>
              <div className="transaction-main">
                <div className="transaction-details">
                  <div className="transaction-desc">{t.desc}</div>
                  <div className="transaction-date">{t.date}</div>
                </div>
                <div className="transaction-amount">BDT {t.amount}</div>
              </div>
              <div className="transaction-buttons">
                <button className="edit" 
                onClick={() => onEdit(index)}>
                  Edit
                </button>
                <button className="delete" onClick={() => onDelete(index)}>
                  Delete
                </button>
              </div>
            </div>
          ) : null
        )}
      </div>

      <div className="expense-column">
        <h2>Expense</h2>
        {transactions.map((t, index) =>
          t.type === "expense" ? (
            <div className="transaction-card expense" key={index}>
              <div className="transaction-main">
                <div className="transaction-details">
                  <div className="transaction-desc">{t.desc}</div>
                  <div className="transaction-date">{t.date}</div>
                </div>
                <div className="transaction-amount">BDT {t.amount}</div>
              </div>
              <div className="transaction-buttons">
                <button className="edit" 
                onClick={() => onEdit(index)}>
                  Edit
                </button>
                <button className="delete" onClick={() => onDelete(index)}>
                  Delete
                </button>
              </div>
            </div>
          ) : null
        )}
      </div>
    </div>
  );
}

export default TransactionList;
