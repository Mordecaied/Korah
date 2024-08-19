// src/components/Dashboard.js
import React, { useState, useEffect, useCallback } from 'react';
import DashboardHeader from './DashboardHeader';
import FinancialSummary from './FinancialSummary';
import ExpenseBreakdown from './ExpenseBreakdown';
import CategoryGrid from './CategoryGrid';
import AddCategoryForm from './AddCategoryForm';
import AddTransactionForm from './AddTransactionForm';
import FilterControls from './FilterControls';
import { Button } from './ui/button';
import { getFinancialData, addCategory, addTransaction } from '../utils/api';

const Dashboard = () => {
  const [financialData, setFinancialData] = useState({
    categories: [],
    totalIncome: 0,
    totalExpenses: 0,
    totalBalance: 0
  });
  const [filters, setFilters] = useState({
    year: new Date().getFullYear().toString(),
    month: 'all',
    period: 'all'
  });
  const [showAddCategory, setShowAddCategory] = useState(false);
  const [showAddTransaction, setShowAddTransaction] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchFinancialData = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await getFinancialData(filters);
      const totalIncome = data.reduce((sum, category) => category.type === 'income' ? sum + category.amount : sum, 0);
      const totalExpenses = data.reduce((sum, category) => category.type === 'expense' ? sum + category.amount : sum, 0);
      setFinancialData({
        categories: data,
        totalIncome,
        totalExpenses,
        totalBalance: totalIncome - totalExpenses
      });
    } catch (error) {
      console.error("Error fetching financial data:", error);
      setError("Failed to load financial data. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }, [filters]);

  useEffect(() => {
    fetchFinancialData();
  }, [fetchFinancialData]);

  const handleFilterChange = (filterType, value) => {
    setFilters(prev => ({ ...prev, [filterType]: value }));
  };

  const handleAddCategory = async (newCategory) => {
    try {
      const addedCategory = await addCategory(newCategory);
      setFinancialData(prevData => ({
        ...prevData,
        categories: [...prevData.categories, addedCategory]
      }));
      setShowAddCategory(false);
      fetchFinancialData(); // Refresh all data
    } catch (error) {
      console.error("Error adding category:", error);
      setError("Failed to add category. Please try again.");
    }
  };

  const handleAddTransaction = async (newTransaction) => {
    try {
      await addTransaction(newTransaction);
      setShowAddTransaction(false);
      fetchFinancialData(); // Refresh all data
    } catch (error) {
      console.error("Error adding transaction:", error);
      setError("Failed to add transaction. Please try again.");
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <DashboardHeader />
      <main className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6">
          <FilterControls filters={filters} onFilterChange={handleFilterChange} />
          <div>
            <Button onClick={() => setShowAddCategory(true)} className="mr-2">
              Add Category
            </Button>
            <Button onClick={() => setShowAddTransaction(true)}>
              Add Transaction
            </Button>
          </div>
        </div>

        {error && <div className="text-red-500 mb-4">{error}</div>}

        {isLoading ? (
          <div className="text-center py-10">Loading...</div>
        ) : (
          <>
            <FinancialSummary
              income={financialData.totalIncome}
              expenses={financialData.totalExpenses}
              balance={financialData.totalBalance}
            />
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
              <ExpenseBreakdown categories={financialData.categories} />
              <CategoryGrid categories={financialData.categories} />
            </div>
          </>
        )}

        {showAddCategory && (
          <AddCategoryForm
            onAddCategory={handleAddCategory}
            onCancel={() => setShowAddCategory(false)}
          />
        )}
        {showAddTransaction && (
          <AddTransactionForm
            categories={financialData.categories}
            onAddTransaction={handleAddTransaction}
            onCancel={() => setShowAddTransaction(false)}
          />
        )}
      </main>
    </div>
  );
};

export default Dashboard;