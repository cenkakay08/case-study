import { NavLink } from "react-router";
import { useTranslation } from "react-i18next";
import styles from "./DesktopNav.module.css";

export function DesktopNav() {
  const { t } = useTranslation();

  return (
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
    </nav>
  );
}
