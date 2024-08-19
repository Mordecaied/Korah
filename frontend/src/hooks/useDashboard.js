// src/hooks/useDashboard.js
import { useState, useEffect, useCallback } from 'react';
import { mockCategories, mockTransactions } from '../utils/mockData';

const useDashboard = () => {
  const [data, setData] = useState({
    filteredData: [],
    totalIncome: 0,
    totalExpenses: 0,
    totalBalance: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({
    year: new Date().getFullYear().toString(),
    month: 'all',
    period: 'all'
  });
  const [selectedCategory, setSelectedCategory] = useState(null);

  const fetchData = useCallback(() => {
    try {
      setLoading(true);
      
      const filteredTransactions = mockTransactions.filter(transaction => {
        const transactionDate = new Date(transaction.date);
        if (filters.year && transactionDate.getFullYear().toString() !== filters.year) return false;
        if (filters.month !== 'all' && transactionDate.getMonth().toString() !== filters.month) return false;
        if (filters.period === 'ytd') {
          const currentDate = new Date();
          return transactionDate <= currentDate && transactionDate.getFullYear() === currentDate.getFullYear();
        }
        return true;
      });

      const filteredData = mockCategories.map(category => ({
        ...category,
        amount: filteredTransactions
          .filter(t => t.categoryId === category.id)
          .reduce((sum, t) => sum + t.amount, 0),
        transactions: filteredTransactions.filter(t => t.categoryId === category.id)
      }));

      const totalIncome = filteredData.reduce((sum, item) => sum + (item.type === 'income' ? item.amount : 0), 0);
      const totalExpenses = filteredData.reduce((sum, item) => sum + (item.type === 'expense' ? item.amount : 0), 0);
      
      setData({
        filteredData,
        totalIncome,
        totalExpenses,
        totalBalance: totalIncome - totalExpenses,
      });
    } catch (err) {
      setError('Failed to fetch financial data');
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [filters]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleFilterChange = (filterType, value) => {
    setFilters(prev => ({ ...prev, [filterType]: value }));
  };

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
  };

  const handleCloseCategory = () => {
    setSelectedCategory(null);
  };

  const handleAddCategory = (newCategory) => {
    // Implement this function to add a new category
    console.log('Adding new category:', newCategory);
    fetchData();
  };

  const handleEditCategory = (updatedCategory) => {
    // Implement this function to edit a category
    console.log('Editing category:', updatedCategory);
    fetchData();
  };

  const handleDeleteCategory = (categoryId) => {
    // Implement this function to delete a category
    console.log('Deleting category:', categoryId);
    setSelectedCategory(null);
    fetchData();
  };

  const handleAddTransaction = (newTransaction) => {
    // Implement this function to add a new transaction
    console.log('Adding new transaction:', newTransaction);
    fetchData();
  };

  return {
    ...data,
    loading,
    error,
    filters,
    selectedCategory,
    handleFilterChange,
    handleCategorySelect,
    handleCloseCategory,
    handleAddCategory,
    handleEditCategory,
    handleDeleteCategory,
    handleAddTransaction,
  };
};

export default useDashboard;