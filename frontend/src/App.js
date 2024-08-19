import React from 'react';
import Dashboard from './components/Dashboard';
import { FinancialDataProvider } from './context/FinancialDataContext';
import { TransactionProvider } from './context/TransactionContext';
import { CategoryProvider } from './context/CategoryContext';
import { FilterProvider } from './context/FilterContext';
import './App.css';

function App() {
  return (
    <FinancialDataProvider>
      <TransactionProvider>
        <CategoryProvider>
          <FilterProvider>
            <div className="App">
              <Dashboard />
            </div>
          </FilterProvider>
        </CategoryProvider>
      </TransactionProvider>
    </FinancialDataProvider>
  );
}

export default App;