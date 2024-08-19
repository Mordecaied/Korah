// src/components/DashboardTile.js
import React from 'react';
import { Card, CardContent } from "./ui/card";

const DashboardTile = ({ title, value, icon: Icon, color, onClick }) => {
  return (
    <Card 
      className="hover:shadow-lg transition-shadow duration-200 bg-white cursor-pointer" 
      onClick={onClick}
    >
      <CardContent className="pt-6">
        <div className="flex justify-between items-center">
          <div>
            <p className="text-sm font-medium text-gray-500">{title}</p>
            <p className="text-2xl font-bold mt-1" style={{color}}>{value}</p>
          </div>
          {Icon && <Icon className="h-8 w-8" style={{color}} />}
        </div>
      </CardContent>
    </Card>
  );
};

export default DashboardTile;