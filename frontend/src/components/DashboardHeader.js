import React from 'react';
import { Bell } from 'lucide-react';
import { Button } from "./ui/button";

const DashboardHeader = () => (
  <header className="flex justify-between items-center mb-8">
    <h1 className="text-4xl font-bold">KORAH</h1>
    <Button variant="outline">
      <Bell className="mr-2 h-4 w-4" /> Notifications
    </Button>
  </header>
);

export default DashboardHeader;