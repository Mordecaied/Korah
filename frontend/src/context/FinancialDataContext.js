import React, { createContext, useState, useContext, useCallback } from 'react';
import { getFinancialData } from '../utils/api';

const FinancialDataContext = createContext();

export const FinancialDataProvider = ({ children }) => {
  const [financialData, setFinancialData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchFinancialData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getFinancialData();
      setFinancialData(data);
    } catch (error) {
      console.error("Failed to fetch financial data:", error);
      setError("Failed to load financial data. Please try again.");
    } finally {
      setLoading(false);
    }
  }, []);

  return (
    <FinancialDataContext.Provider value={{ financialData, loading, error, fetchFinancialData }}>
      {children}
    </FinancialDataContext.Provider>
  );
};

export const useFinancialData = () => useContext(FinancialDataContext);