"use client";

import { useState } from "react";
import Sidebar from "../Sidebar";

interface AppLayoutProps {
  children: React.ReactNode;
}

const AppLayout = ({ children }: AppLayoutProps) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div style={{ display: 'flex', minHeight: '100vh' }}>
      <Sidebar 
        isOpen={isSidebarOpen} 
        onToggle={toggleSidebar}
      />
      <main 
        style={{
          marginLeft: isSidebarOpen ? '240px' : '80px',
          transition: 'margin-left 0.3s ease',
          flex: 1,
          padding: '20px'
        }}
      >
        {children}
      </main>
    </div>
  );
};

export default AppLayout;
