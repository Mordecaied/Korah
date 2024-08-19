import { useMemo } from 'react';

const useFilteredData = (categories, transactions, filters) => {
  return useMemo(() => {
    if (!categories || !transactions) return [];

    return categories.map(category => {
      const categoryTransactions = transactions.filter(t => t.categoryId === category.id);
      const filteredTransactions = categoryTransactions.filter(transaction => {
        const transactionDate = new Date(transaction.date);
        if (filters.year && transactionDate.getFullYear().toString() !== filters.year) {
          return false;
        }
        if (filters.month !== 'all' && transactionDate.getMonth().toString() !== filters.month) {
          return false;
        }
        if (filters.period === 'ytd') {
          const currentDate = new Date();
          return transactionDate <= currentDate && transactionDate.getFullYear() === currentDate.getFullYear();
        }
        return true;
      });

      return {
        ...category,
        amount: filteredTransactions.reduce((sum, t) => sum + t.amount, 0),
        transactions: filteredTransactions
      };
    });
  }, [categories, transactions, filters]);
};

export default useFilteredData;