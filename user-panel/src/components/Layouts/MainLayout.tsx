import React from "react";
import { Outlet, NavLink } from "react-router";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { logout } from "../../store/slices/authSlice";
import styles from "./MainLayout.module.css";

const MainLayout: React.FC = () => {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <>
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
            Dashboard
          </NavLink>
          <NavLink
            to="/create-request"
            className={({ isActive }) =>
              isActive ? `${styles.navItem} ${styles.active}` : styles.navItem
            }
          >
            Talep Oluştur
          </NavLink>
          <NavLink
            to="/my-requests"
            className={({ isActive }) =>
              isActive ? `${styles.navItem} ${styles.active}` : styles.navItem
            }
          >
            Taleplerim
          </NavLink>
        </nav>
        <div className={styles.footer}>
          <div className={styles.userInfo}>
            <span className={styles.userName}>{user?.name}</span>
            <span className={styles.userEmail}>{user?.email}</span>
          </div>
          <button onClick={handleLogout} className={styles.logoutButton}>
            Çıkış Yap
          </button>
        </div>
      </aside>
      <main className={styles.content}>
        <Outlet />
      </main>
    </>
  );
};

export default MainLayout;
