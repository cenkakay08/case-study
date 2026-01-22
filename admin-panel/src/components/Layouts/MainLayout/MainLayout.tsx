import React from "react";
import { Outlet } from "react-router";
import { Header } from "@/components/Header/Header";
import styles from "./MainLayout.module.css";

const MainLayout: React.FC = () => {
  return (
    <div className={styles.layoutWrapper}>
      <Header />
      <main className={styles.content}>
        <Outlet />
      </main>
    </div>
  );
};

export default MainLayout;
