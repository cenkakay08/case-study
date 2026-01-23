import { NavLink } from "react-router";
import { useTranslation } from "react-i18next";
import { useAppSelector } from "@/store/hooks";
import { USER_ROLES } from "@/api/users/userController";
import styles from "./DesktopNav.module.css";

export function DesktopNav() {
  const { t } = useTranslation();
  const { user } = useAppSelector((state) => state.auth);

  const isAdmin = user?.role === USER_ROLES.ADMIN;
  const isModerator = user?.role === USER_ROLES.MODERATOR;

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
        to="/pending-tasks"
        className={({ isActive }) =>
          isActive ? `${styles.navItem} ${styles.active}` : styles.navItem
        }
      >
        {t("common.pendingTasks")}
      </NavLink>

      {(isAdmin || isModerator) && (
        <NavLink
          to="/all-tasks"
          className={({ isActive }) =>
            isActive ? `${styles.navItem} ${styles.active}` : styles.navItem
          }
        >
          {t("common.allTasks")}
        </NavLink>
      )}

      {isAdmin && (
        <NavLink
          to="/user-management"
          className={({ isActive }) =>
            isActive ? `${styles.navItem} ${styles.active}` : styles.navItem
          }
        >
          {t("common.userManagement")}
        </NavLink>
      )}
    </nav>
  );
}
