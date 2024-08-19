// src/components/AddCategoryForm.js
import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { iconOptions } from '../utils/iconUtils';

const AddCategoryForm = ({ onAddCategory, onCancel }) => {
  const { control, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      title: '',
      icon: '',
      color: '#000000',
      type: 'expense'
    }
  });

  const onSubmit = (data) => {
    onAddCategory(data);
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-lg">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <h2 className="text-2xl font-bold mb-4">Add New Category</h2>
        
        <Controller
          name="title"
          control={control}
          rules={{ required: 'Category name is required' }}
          render={({ field }) => (
            <Input
              {...field}
              placeholder="Category name"
              className={errors.title ? 'border-red-500' : ''}
            />
          )}
        />
        {errors.title && <p className="text-red-500 text-sm">{errors.title.message}</p>}

        <div>
          <p className="mb-2">Select an icon:</p>
          <Controller
            name="icon"
            control={control}
            rules={{ required: 'Icon is required' }}
            render={({ field }) => (
              <div className="grid grid-cols-4 gap-2">
                {iconOptions.map((option, index) => (
                  <label key={`${option.name}-${index}`} className="flex items-center">
                    <input
                      type="radio"
                      {...field}
                      value={option.name}
                      checked={field.value === option.name}
                      className="mr-2"
                    />
                    <option.icon className="w-5 h-5 mr-1" />
                    {option.name}
                  </label>
                ))}
              </div>
            )}
          />
        </div>
        {errors.icon && <p className="text-red-500 text-sm">{errors.icon.message}</p>}

        <Controller
          name="color"
          control={control}
          rules={{ required: 'Color is required' }}
          render={({ field }) => (
            <input
              type="color"
              {...field}
              className="w-full h-10"
            />
          )}
        />
        {errors.color && <p className="text-red-500 text-sm">{errors.color.message}</p>}

        <Controller
          name="type"
          control={control}
          render={({ field }) => (
            <select {...field} className="w-full p-2 border rounded">
              <option value="expense">Expense</option>
              <option value="income">Income</option>
            </select>
          )}
        />

        <div className="flex justify-end space-x-2">
          <Button type="button" onClick={onCancel} variant="outline">Cancel</Button>
          <Button type="submit">Add Category</Button>
        </div>
      </form>
    </div>
  );
};

export default AddCategoryForm;