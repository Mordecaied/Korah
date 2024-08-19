// src/components/FinancialSummary.js
import React from 'react';

const FinancialSummary = ({ income = 0, expenses = 0, balance = 0 }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
      <h2 className="text-2xl font-bold mb-4">Financial Summary</h2>
      <div className="grid grid-cols-3 gap-4">
        <div>
          <h3 className="text-lg font-semibold text-green-600">Income</h3>
          <p className="text-2xl font-bold">${income.toLocaleString()}</p>
        </div>
        <div>
          <h3 className="text-lg font-semibold text-red-600">Expenses</h3>
          <p className="text-2xl font-bold">${expenses.toLocaleString()}</p>
        </div>
        <div>
          <h3 className="text-lg font-semibold text-blue-600">Balance</h3>
          <p className="text-2xl font-bold">${balance.toLocaleString()}</p>
        </div>
      </div>
    </div>
  );
};

export default FinancialSummary;