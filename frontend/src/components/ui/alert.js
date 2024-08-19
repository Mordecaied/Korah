import React from 'react';

export const Alert = ({ children, variant = 'default' }) => {
  const baseClasses = 'p-4 mb-4 rounded-md';
  const variantClasses = {
    default: 'bg-blue-100 text-blue-700',
    destructive: 'bg-red-100 text-red-700',
  };

  return (
    <div className={`${baseClasses} ${variantClasses[variant]}`}>
      {children}
    </div>
  );
};

export const AlertDescription = ({ children }) => {
  return <p className="text-sm">{children}</p>;
};