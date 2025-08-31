import React, { useState } from 'react';
import { Header } from './Header';
import { Sidebar } from './Sidebar';

export const Layout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-cyan-50 dark:from-gray-900 dark:via-gray-800 dark:to-indigo-900">
      <Header toggleSidebar={toggleSidebar} sidebarOpen={sidebarOpen} />
      
      
<div className="grid grid-cols-1 lg:grid-cols-[320px_1fr] h-screen">
  <div className="sticky top-0 h-screen overflow-y-auto">
    <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
  </div>
  
  <main className="overflow-y-auto">
    <div className="p-6">
      {children}
    </div>
  </main>
</div>
    </div>
  );
};
