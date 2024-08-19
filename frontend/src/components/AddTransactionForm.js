// src/components/AddTransactionForm.js
import React, { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Select } from './ui/select';

const AddTransactionForm = ({ categories, onAddTransaction, onCancel }) => {
  const [transaction, setTransaction] = useState({
    description: '',
    amount: '',
    categoryId: '',
    date: new Date().toISOString().split('T')[0]
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTransaction(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddTransaction({
      ...transaction,
      amount: parseFloat(transaction.amount)
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input
        name="description"
        value={transaction.description}
        onChange={handleChange}
        placeholder="Transaction description"
        required
      />
      <Input
        name="amount"
        type="number"
        value={transaction.amount}
        onChange={handleChange}
        placeholder="Amount"
        required
      />
      <Select
        name="categoryId"
        value={transaction.categoryId}
        onChange={handleChange}
        required
      >
        <option value="">Select a category</option>
        {categories.map(category => (
          <option key={category.id} value={category.id}>{category.title}</option>
        ))}
      </Select>
      <Input
        name="date"
        type="date"
        value={transaction.date}
        onChange={handleChange}
        required
      />
      <div className="flex justify-end space-x-2">
        <Button type="button" onClick={onCancel} variant="outline">Cancel</Button>
        <Button type="submit">Add Transaction</Button>
      </div>
    </form>
  );
};

export default AddTransactionForm;