import React, { createContext, useState, useContext, useCallback } from 'react';
import { getTransactions, addTransaction } from '../utils/api';

const TransactionContext = createContext();

export const TransactionProvider = ({ children }) => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchTransactions = useCallback(async (categoryId) => {
    setLoading(true);
    setError(null);
    try {
      const fetchedTransactions = await getTransactions(categoryId);
      setTransactions(fetchedTransactions);
    } catch (error) {
      console.error("Failed to fetch transactions:", error);
      setError("Failed to load transactions. Please try again.");
    } finally {
      setLoading(false);
    }
  }, []);

  const addNewTransaction = useCallback(async (transaction) => {
    setLoading(true);
    setError(null);
    try {
      const newTransaction = await addTransaction(transaction);
      setTransactions(currentTransactions => [...currentTransactions, newTransaction]);
      return newTransaction;
    } catch (error) {
      console.error("Failed to add new transaction:", error);
      setError("Failed to add transaction. Please try again.");
      throw error;
    } finally {
      setLoading(false);
    }
  }, []);

  return (
    <TransactionContext.Provider value={{ transactions, loading, error, fetchTransactions, addNewTransaction }}>
      {children}
    </TransactionContext.Provider>
  );
};

export const useTransaction = () => useContext(TransactionContext);