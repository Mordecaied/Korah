// src/components/CategoryGrid.js
import React from 'react';
import { getIconByName } from '../utils/iconUtils';

const CategoryGrid = ({ categories = [] }) => {
  if (categories.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold mb-4">Categories</h2>
        <p>No categories available.</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold mb-4">Categories</h2>
      <div className="grid grid-cols-2 gap-4">
        {categories.map((category) => {
          const IconComponent = getIconByName(category.icon);
          return (
            <div key={category.id} className="p-4 border rounded-lg">
              <div className="flex items-center mb-2">
                {IconComponent && <IconComponent className="w-6 h-6 mr-2" style={{color: category.color}} />}
                <h3 className="font-medium">{category.title}</h3>
              </div>
              <p className="text-xl font-bold">${category.amount.toLocaleString()}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CategoryGrid;