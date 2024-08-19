// src/components/QuickActions.js
import React from 'react';
import { Button } from './ui/button';
import { Plus } from 'lucide-react';

const QuickActions = ({ onAddCategory, onAddTransaction }) => {
  return (
    <div className="flex space-x-2">
      <Button onClick={onAddCategory}>
        <Plus className="mr-2 h-4 w-4" /> Add Category
      </Button>
      <Button onClick={onAddTransaction}>
        <Plus className="mr-2 h-4 w-4" /> Add Transaction
      </Button>
    </div>
  );
};

export default QuickActions;