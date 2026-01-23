import React from "react";
import { Outlet } from "react-router";
import { Header } from "@/components/Header/Header";
import { Toast, ToastList } from "@case-study/ui";
import styles from "./MainLayout.module.css";

const MainLayout: React.FC = () => {
  return (
    <Toast.Provider>
      <div className={styles.layoutWrapper}>
        <Header />
        <main className={styles.content}>
          <Outlet />
        </main>
      </div>
      <Toast.Viewport>
        <ToastList />
      </Toast.Viewport>
    </Toast.Provider>
  );
};

export default MainLayout;
