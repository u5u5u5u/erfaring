"use client";

import { useState, useEffect } from "react";
import Sidebar from "../Sidebar";

interface AppLayoutProps {
  children: React.ReactNode;
}

const AppLayout = ({ children }: AppLayoutProps) => {
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

  // 初期化が完了するまでは、デフォルト状態で表示（フラッシュを防ぐ）
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
      <Sidebar isOpen={isSidebarOpen} onToggle={toggleSidebar} />
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
