"use client";

import { useEffect, useState } from "react";
import Sidebar from "../Sidebar";

interface AppLayoutProps {
  children: React.ReactNode;
  avatarUrl: string;
}

const AppLayout = ({ children, avatarUrl }: AppLayoutProps) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean | null>(null);

  useEffect(() => {
    const savedSidebarState = localStorage.getItem("sidebarOpen");
    if (savedSidebarState !== null) {
      setIsSidebarOpen(JSON.parse(savedSidebarState));
    } else {
      setIsSidebarOpen(true);
    }
  }, []);

  const toggleSidebar = () => {
    if (isSidebarOpen === null) return;

    const newState = !isSidebarOpen;
    setIsSidebarOpen(newState);
    localStorage.setItem("sidebarOpen", JSON.stringify(newState));
  };

  if (isSidebarOpen === null) {
    return (
      <div style={{ display: "flex", minHeight: "100vh" }}>
        <div style={{ width: "240px", backgroundColor: "transparent" }}></div>
        <main
          style={{
            marginLeft: "240px",
            flex: 1,
            padding: "20px",
          }}
        >
          {children}
        </main>
      </div>
    );
  }

  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      <Sidebar isOpen={isSidebarOpen} onToggle={toggleSidebar} avatarUrl={avatarUrl} />
      <main
        style={{
          marginLeft: isSidebarOpen ? "240px" : "80px",
          transition: "margin-left 0.3s ease",
          flex: 1,
          padding: "20px",
        }}
      >
        {children}
      </main>
    </div>
  );
};

export default AppLayout;
