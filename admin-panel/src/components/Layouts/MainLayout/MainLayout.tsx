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

  const isAdmin = user?.role === "Admin";
  const isModerator = user?.role === "Moderator";

  return (
    <Toast.Provider>
      <div className={styles.layoutWrapper}>
        <aside className={styles.sidebar}>
          <div className={styles.logo}>
            <h2>Admin Panel</h2>
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
              to="/pending-requests"
              className={({ isActive }) =>
                isActive ? `${styles.navItem} ${styles.active}` : styles.navItem
              }
            >
              {t("common.pendingRequests")}
            </NavLink>

            {(isAdmin || isModerator) && (
              <NavLink
                to="/all-requests"
                className={({ isActive }) =>
                  isActive
                    ? `${styles.navItem} ${styles.active}`
                    : styles.navItem
                }
              >
                {t("common.allRequests")}
              </NavLink>
            )}

            {isAdmin && (
              <NavLink
                to="/user-management"
                className={({ isActive }) =>
                  isActive
                    ? `${styles.navItem} ${styles.active}`
                    : styles.navItem
                }
              >
                {t("common.userManagement")}
              </NavLink>
            )}

            <ThemeSwitcher />
            <LanguageSwitcher />
          </nav>
          <div className={styles.footer}>
            <div className={styles.userInfo}>
              <span className={styles.userName}>{user?.name}</span>
              <span className={styles.userEmail}>{user?.email}</span>
              <span className={styles.userRole}>{user?.role}</span>
            </div>
            <button onClick={handleLogout} className={styles.logoutButton}>
              {t("common.logout")}
            </button>
          </div>
        </aside>
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
