// src/services/api.js

import { mockCategories, mockCategoryDetails, mockTransactions } from './mockData';

let categories = [...mockCategories];
let categoryDetails = { ...mockCategoryDetails };
let transactions = [...mockTransactions];

const generateUniqueId = () => {
  return Date.now().toString(36) + Math.random().toString(36).substr(2, 5);
};

export const getFinancialData = (filters = {}) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      // Apply filters here if needed
      const filteredCategories = categories.map(category => ({
        ...category,
        transactions: transactions.filter(t => t.categoryId === category.id)
      }));
      resolve(filteredCategories);
    }, 500);
  });
};

export const getTransactions = (categoryId) => {
  return new Promise((resolve) => {
    const filteredTransactions = transactions.filter(t => t.categoryId === categoryId);
    setTimeout(() => resolve(filteredTransactions), 500);
  });
};

export const addTransaction = (transaction) => {
  return new Promise((resolve) => {
    const newTransaction = { ...transaction, id: generateUniqueId() };
    transactions = [...transactions, newTransaction];
    
    categories = categories.map(category => 
      category.id === transaction.categoryId 
        ? { ...category, amount: category.amount + transaction.amount }
        : category
    );
    
    setTimeout(() => resolve(newTransaction), 500);
  });
};

export const getCategoryDetails = (categoryId) => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(categoryDetails[categoryId]), 500);
  });
};

export const addCategory = (category) => {
  return new Promise((resolve) => {
    const newCategory = { 
      ...category, 
      id: generateUniqueId(), 
      amount: 0,
      transactions: [] // Initialize with empty transactions array
    };
    categories = [...categories, newCategory];
    setTimeout(() => resolve(newCategory), 500);
  });
};

export const updateCategory = (categoryId, updates) => {
  return new Promise((resolve) => {
    categories = categories.map(category =>
      category.id === categoryId ? { ...category, ...updates } : category
    );
    setTimeout(() => resolve(categories.find(c => c.id === categoryId)), 500);
  });
};

export const deleteCategory = (categoryId) => {
  return new Promise((resolve) => {
    categories = categories.filter(category => category.id !== categoryId);
    delete categoryDetails[categoryId];
    transactions = transactions.filter(t => t.categoryId !== categoryId);
    setTimeout(() => resolve(), 500);
  });
};

export const addSubCategory = (categoryId, subCategory) => {
  return new Promise((resolve) => {
    const newSubCategory = { ...subCategory, id: generateUniqueId() };
    categoryDetails = {
      ...categoryDetails,
      [categoryId]: {
        ...categoryDetails[categoryId],
        subCategories: [...(categoryDetails[categoryId]?.subCategories || []), newSubCategory]
      }
    };
    setTimeout(() => resolve(newSubCategory), 500);
  });
};

export const updateSubCategory = (categoryId, updatedSubCategory) => {
  return new Promise((resolve) => {
    categoryDetails = {
      ...categoryDetails,
      [categoryId]: {
        ...categoryDetails[categoryId],
        subCategories: categoryDetails[categoryId].subCategories.map(sc =>
          sc.id === updatedSubCategory.id ? updatedSubCategory : sc
        )
      }
    };
    setTimeout(() => resolve(updatedSubCategory), 500);
  });
};

export const deleteSubCategory = (categoryId, subCategoryId) => {
  return new Promise((resolve) => {
    categoryDetails = {
      ...categoryDetails,
      [categoryId]: {
        ...categoryDetails[categoryId],
        subCategories: categoryDetails[categoryId].subCategories.filter(sc => sc.id !== subCategoryId)
      }
    };
    setTimeout(() => resolve(), 500);
  });
};