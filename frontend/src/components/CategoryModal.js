// src/components/CategoryModal.js
import React, { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from './ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from './ui/dialog';
import { iconOptions } from '../utils/iconUtils';
import { colorOptions } from '../utils/colorUtils';
import BarChart from './BarChart';
import FilterControls from './FilterControls';

const CategoryModal = ({ isOpen, onClose, onAddCategory, category = null }) => {
  const [newCategory, setNewCategory] = useState(category || { title: '', icon: 'Codesandbox', color: 'blue' });
  const [filters, setFilters] = useState({
    year: new Date().getFullYear().toString(),
    month: 'all',
    period: 'all'
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddCategory(newCategory);
    onClose();
  };

  const handleFilterChange = (filterType, value) => {
    setFilters(prev => ({ ...prev, [filterType]: value }));
  };

  const filteredTransactions = category?.transactions?.filter(transaction => {
    const transactionDate = new Date(transaction.date);
    if (filters.year && transactionDate.getFullYear().toString() !== filters.year) return false;
    if (filters.month !== 'all' && transactionDate.getMonth().toString() !== filters.month) return false;
    if (filters.period === 'ytd') {
      const currentDate = new Date();
      return transactionDate <= currentDate && transactionDate.getFullYear() === currentDate.getFullYear();
    }
    return true;
  }) || [];

  const chartData = filteredTransactions.map(transaction => ({
    name: transaction.description,
    value: transaction.amount
  }));

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl">
        <DialogHeader>
          <DialogTitle>{category ? 'Category Details' : 'Add New Category'}</DialogTitle>
        </DialogHeader>
        {category ? (
          <div>
            <h2 className="text-2xl font-bold mb-4">{category.title}</h2>
            <FilterControls 
              filters={filters}
              onFilterChange={handleFilterChange}
            />
            <BarChart data={chartData} />
            {/* Add more category details here */}
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <div className="grid gap-4 py-4">
              <Input
                placeholder="Category Name"
                value={newCategory.title}
                onChange={(e) => setNewCategory({ ...newCategory, title: e.target.value })}
                required
              />
              <Select
                value={newCategory.icon}
                onValueChange={(value) => setNewCategory({ ...newCategory, icon: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select an icon" />
                </SelectTrigger>
                <SelectContent>
                  {iconOptions.map((option) => (
                    <SelectItem key={option.name} value={option.name}>
                      <div className="flex items-center">
                        <option.icon className="mr-2 h-4 w-4" />
                        {option.name}
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select
                value={newCategory.color}
                onValueChange={(value) => setNewCategory({ ...newCategory, color: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select a color" />
                </SelectTrigger>
                <SelectContent>
                  {colorOptions.map((color) => (
                    <SelectItem key={color.name} value={color.name}>
                      <div className="flex items-center">
                        <div className={`w-4 h-4 rounded-full mr-2 bg-${color.name}-500`}></div>
                        {color.name}
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <DialogFooter>
              <Button type="submit">Add Category</Button>
            </DialogFooter>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default CategoryModal;