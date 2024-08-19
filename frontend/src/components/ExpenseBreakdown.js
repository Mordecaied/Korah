// src/components/ExpenseBreakdown.js
import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { motion, AnimatePresence } from 'framer-motion';
import { NumericFormat } from 'react-number-format';  // Updated import

const ExpenseBreakdown = ({ categories }) => {
  const [chartData, setChartData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    // Simulate data loading
    setTimeout(() => {
      const data = categories.map(category => ({
        name: category.title,
        amount: category.amount,
      })).sort((a, b) => b.amount - a.amount);
      setChartData(data);
      setIsLoading(false);
    }, 1000);
  }, [categories]);

  const colors = ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF', '#FF9F40'];

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-4">Expense Breakdown</h2>
      <AnimatePresence>
        {isLoading ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex justify-center items-center h-64"
          >
            <div className="text-2xl font-bold">Loading...</div>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
          >
            <ResponsiveContainer width="100%" height={400}>
              <BarChart data={chartData} layout="vertical">
                <XAxis type="number" tickFormatter={(value) => `$${value.toLocaleString()}`} />
                <YAxis type="category" dataKey="name" width={100} />
                <Tooltip
                  formatter={(value) => `$${value.toLocaleString()}`}
                  labelFormatter={(label) => `Category: ${label}`}
                />
                <Bar dataKey="amount" barSize={20}>
                  {chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
            <div className="mt-4">
              <h3 className="text-xl font-semibold mb-2">Total Expenses:</h3>
              <NumericFormat  // Updated component name
                value={chartData.reduce((sum, item) => sum + item.amount, 0)}
                displayType={'text'}
                thousandSeparator={true}
                prefix={'$'}
                renderText={(formattedValue) => <span className="text-2xl font-bold">{formattedValue}</span>}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ExpenseBreakdown;