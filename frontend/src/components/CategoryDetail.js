// src/components/CategoryDetail.js
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { X } from 'lucide-react';

const CategoryDetail = ({ category, onClose }) => {
  return (
    <Card className="mt-4">
      <CardHeader className="flex justify-between items-center">
        <CardTitle>{category.title} Details</CardTitle>
        <Button variant="ghost" onClick={onClose}><X /></Button>
      </CardHeader>
      <CardContent>
        <p>Total Amount: ${category.amount.toLocaleString()}</p>
        <p>Type: {category.type}</p>
        <h3 className="font-bold mt-4">Transactions:</h3>
        <ul className="list-disc pl-5">
          {category.transactions.map((transaction, index) => (
            <li key={index}>
              {transaction.description}: ${transaction.amount.toLocaleString()} ({new Date(transaction.date).toLocaleDateString()})
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
};

export default CategoryDetail;