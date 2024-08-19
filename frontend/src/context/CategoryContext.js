import React, { createContext, useState, useContext, useCallback } from 'react';
import { getCategoryDetails, addCategory, updateCategory, deleteCategory, addSubCategory, updateSubCategory, deleteSubCategory } from '../utils/api';

const CategoryContext = createContext();

export const CategoryProvider = ({ children }) => {
  const [categoryDetails, setCategoryDetails] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const getCategoryDetailsHandler = useCallback(async (categoryId) => {
    if (categoryDetails[categoryId]) {
      return categoryDetails[categoryId];
    }

    setLoading(true);
    setError(null);
    try {
      const details = await getCategoryDetails(categoryId);
      setCategoryDetails(prevDetails => ({
        ...prevDetails,
        [categoryId]: details
      }));
      return details;
    } catch (error) {
      console.error("Failed to fetch category details:", error);
      setError("Failed to load category details. Please try again.");
      throw error;
    } finally {
      setLoading(false);
    }
  }, [categoryDetails]);

  const addNewCategory = useCallback(async (category) => {
    setLoading(true);
    setError(null);
    try {
      const newCategory = await addCategory(category);
      return newCategory;
    } catch (error) {
      console.error("Failed to add new category:", error);
      setError("Failed to add category. Please try again.");
      throw error;
    } finally {
      setLoading(false);
    }
  }, []);

  const updateExistingCategory = useCallback(async (categoryId, updates) => {
    setLoading(true);
    setError(null);
    try {
      const updatedCategory = await updateCategory(categoryId, updates);
      return updatedCategory;
    } catch (error) {
      console.error("Failed to update category:", error);
      setError("Failed to update category. Please try again.");
      throw error;
    } finally {
      setLoading(false);
    }
  }, []);

  const deleteExistingCategory = useCallback(async (categoryId) => {
    setLoading(true);
    setError(null);
    try {
      await deleteCategory(categoryId);
      setCategoryDetails(prevDetails => {
        const { [categoryId]: removed, ...rest } = prevDetails;
        return rest;
      });
    } catch (error) {
      console.error("Failed to delete category:", error);
      setError("Failed to delete category. Please try again.");
      throw error;
    } finally {
      setLoading(false);
    }
  }, []);

  const addNewSubCategory = useCallback(async (categoryId, subCategory) => {
    setLoading(true);
    setError(null);
    try {
      const newSubCategory = await addSubCategory(categoryId, subCategory);
      setCategoryDetails(prevDetails => ({
        ...prevDetails,
        [categoryId]: {
          ...prevDetails[categoryId],
          subCategories: [...(prevDetails[categoryId]?.subCategories || []), newSubCategory]
        }
      }));
      return newSubCategory;
    } catch (error) {
      console.error("Failed to add sub-category:", error);
      setError("Failed to add sub-category. Please try again.");
      throw error;
    } finally {
      setLoading(false);
    }
  }, []);

  const updateExistingSubCategory = useCallback(async (categoryId, updatedSubCategory) => {
    setLoading(true);
    setError(null);
    try {
      const updated = await updateSubCategory(categoryId, updatedSubCategory);
      setCategoryDetails(prevDetails => ({
        ...prevDetails,
        [categoryId]: {
          ...prevDetails[categoryId],
          subCategories: prevDetails[categoryId]?.subCategories?.map(sc =>
            sc.id === updated.id ? updated : sc
          ) || []
        }
      }));
      return updated;
    } catch (error) {
      console.error("Failed to update sub-category:", error);
      setError("Failed to update sub-category. Please try again.");
      throw error;
    } finally {
      setLoading(false);
    }
  }, []);

  const deleteExistingSubCategory = useCallback(async (categoryId, subCategoryId) => {
    setLoading(true);
    setError(null);
    try {
      await deleteSubCategory(categoryId, subCategoryId);
      setCategoryDetails(prevDetails => ({
        ...prevDetails,
        [categoryId]: {
          ...prevDetails[categoryId],
          subCategories: prevDetails[categoryId]?.subCategories?.filter(sc => sc.id !== subCategoryId) || []
        }
      }));
    } catch (error) {
      console.error("Failed to delete sub-category:", error);
      setError("Failed to delete sub-category. Please try again.");
      throw error;
    } finally {
      setLoading(false);
    }
  }, []);

  return (
    <CategoryContext.Provider value={{
      categoryDetails,
      loading,
      error,
      getCategoryDetails: getCategoryDetailsHandler,
      addCategory: addNewCategory,
      updateCategory: updateExistingCategory,
      deleteCategory: deleteExistingCategory,
      addSubCategory: addNewSubCategory,
      updateSubCategory: updateExistingSubCategory,
      deleteSubCategory: deleteExistingSubCategory
    }}>
      {children}
    </CategoryContext.Provider>
  );
};

export const useCategory = () => useContext(CategoryContext);