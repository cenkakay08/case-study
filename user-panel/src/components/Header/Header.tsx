import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { logout } from "@/store/slices/authSlice";
import { ThemeSwitcher } from "@/components/ThemeSwitcher/ThemeSwitcher";
import { LanguageSwitcher } from "@/components/LanguageSwitcher/LanguageSwitcher";
import { DesktopNav } from "@/components/DesktopNav/DesktopNav";
import { MobileNav } from "@/components/MobileNav/MobileNav";
import { useTranslation } from "react-i18next";
import { Button } from "@case-study/ui";
import styles from "./Header.module.css";

export function Header() {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <div className={styles.headerWrapper}>
      <header className={styles.header}>
        <div className={styles.leftSection}>
          <div className={styles.logo}>
            <h2>User Panel</h2>
          </div>
          <DesktopNav />
          <MobileNav />
        </div>

        <div className={styles.rightSection}>
          <div className={styles.actions}>
            <ThemeSwitcher />
            <LanguageSwitcher />
          </div>
          <div className={styles.userInfo}>
            <div className={styles.userDetails}>
              <span className={styles.userName}>{user?.name}</span>
              <span className={styles.userEmail}>{user?.email}</span>
            </div>
            <Button
              onClick={handleLogout}
              data-variant="danger"
              className={styles.logoutButton}
            >
              {t("common.logout")}
            </Button>
          </div>
        </div>
      </header>
    </div>
  );
}
