// src/components/TotalBalance.js
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

const TotalBalance = ({ income, expenses, balance }) => (
  <Card className="mb-8">
    <CardHeader>
      <CardTitle>Financial Summary</CardTitle>
    </CardHeader>
    <CardContent>
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
    </CardContent>
  </Card>
);

export default TotalBalance;