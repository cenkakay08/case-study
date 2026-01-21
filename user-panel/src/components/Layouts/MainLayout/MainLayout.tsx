import React from "react";
import { Outlet, NavLink } from "react-router";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { logout } from "@/store/slices/authSlice";
import styles from "./MainLayout.module.css";
import { ThemeSwitcher } from "@/components/ThemeSwitcher/ThemeSwitcher";
import { Toast, ToastList } from "@case-study/ui";
import { LanguageSwitcher } from "@/components/LanguageSwitcher/LanguageSwitcher";
import { useTranslation } from "react-i18next";

const MainLayout: React.FC = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <Toast.Provider>
      <aside className={styles.sidebar}>
        <div className={styles.logo}>
          <h2>User Panel</h2>
        </div>
        <nav className={styles.nav}>
          <NavLink
            to="/dashboard"
            className={({ isActive }) =>
              isActive ? `${styles.navItem} ${styles.active}` : styles.navItem
            }
          >
            {t("common.dashboard")}
          </NavLink>
          <NavLink
            to="/create-task"
            className={({ isActive }) =>
              isActive ? `${styles.navItem} ${styles.active}` : styles.navItem
            }
          >
            {t("common.createTask")}
          </NavLink>
          <NavLink
            to="/my-tasks"
            className={({ isActive }) =>
              isActive ? `${styles.navItem} ${styles.active}` : styles.navItem
            }
          >
            {t("common.myTasks")}
          </NavLink>

          <ThemeSwitcher />
          <LanguageSwitcher />
        </nav>
        <div className={styles.footer}>
          <div className={styles.userInfo}>
            <span className={styles.userName}>{user?.name}</span>
            <span className={styles.userEmail}>{user?.email}</span>
          </div>
          <button onClick={handleLogout} className={styles.logoutButton}>
            {t("common.logout")}
          </button>
        </div>
      </aside>
      <main className={styles.content}>
        <Outlet />
      </main>
      <Toast.Viewport>
        <ToastList />
      </Toast.Viewport>
    </Toast.Provider>
  );
};

export default MainLayout;
