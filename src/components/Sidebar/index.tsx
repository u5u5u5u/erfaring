"use client";

import {
  BookOpen,
  ChevronLeft,
  ChevronRight,
  Home,
  Swords,
  User,
  UserRound,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "./index.module.css";
import Avatar from "@/components/Avatar";

interface SidebarProps {
  isOpen: boolean;
  avatarUrl: string;
  onToggle: () => void;
}

const Sidebar = ({ isOpen, avatarUrl, onToggle }: SidebarProps) => {
  const pathname = usePathname();

  const menuItems = [
    {
      name: "ホーム",
      icon: Home,
      href: "/home",
    },
    {
      name: "探究ノート",
      icon: BookOpen,
      href: "/question",
    },
    {
      name: "クエスト",
      icon: Swords,
      href: "/quest",
    },
    {
      name: "マイページ",
      icon: User,
      href: "/profile",
    },
  ];

  const toggleSidebar = () => {
    onToggle();
  };

  return (
    <div
      className={`${styles.sidebar} ${isOpen ? styles.open : styles.closed}`}
    >
      <div className={styles.header}>
        {isOpen && (
          <>
            {avatarUrl ? (
              <Avatar url={avatarUrl} size={50} />
            ) : (
              <UserRound size={50} className={styles.userIcon} />
            )}
          </>
        )}
        <button
          onClick={toggleSidebar}
          className={styles.toggleButton}
          aria-label={isOpen ? "サイドバーを閉じる" : "サイドバーを開く"}
        >
          {isOpen ? <ChevronLeft size={20} /> : <ChevronRight size={20} />}
        </button>
      </div>
      <div className={styles.menuContainer}>
        {menuItems.map((item) => {
          const isActive = pathname === item.href;
          const IconComponent = item.icon;

          return (
            <Link key={item.name} href={item.href} className={styles.menuLink}>
              <div
                className={`${styles.menuItem} ${
                  isActive ? styles.active : ""
                }`}
              >
                <IconComponent size={20} className={styles.icon} />
                {isOpen && <span className={styles.menuText}>{item.name}</span>}
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default Sidebar;
