import { useState } from "react";
import { NavLink } from "react-router";
import { useTranslation } from "react-i18next";
import { Popover } from "@case-study/ui";
import styles from "./MobileNav.module.css";

const MenuIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <line x1="3" y1="12" x2="21" y2="12" />
    <line x1="3" y1="6" x2="21" y2="6" />
    <line x1="3" y1="18" x2="21" y2="18" />
  </svg>
);

export function MobileNav() {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);

  const handleNavClick = () => {
    setOpen(false);
  };

  return (
    <div className={styles.mobileNav}>
      <Popover.Root open={open} onOpenChange={setOpen}>
        <Popover.Trigger className={styles.menuTrigger}>
          <MenuIcon />
        </Popover.Trigger>
        <Popover.Portal>
          <Popover.Positioner sideOffset={8}>
            <Popover.Popup className={styles.navPopup}>
              <Popover.Arrow>
                <Popover.ArrowSvg />
              </Popover.Arrow>
              <nav className={styles.navList}>
                <NavLink
                  to="/dashboard"
                  className={({ isActive }) =>
                    isActive
                      ? `${styles.navItem} ${styles.active}`
                      : styles.navItem
                  }
                  onClick={handleNavClick}
                >
                  {t("common.dashboard")}
                </NavLink>
                <NavLink
                  to="/create-task"
                  className={({ isActive }) =>
                    isActive
                      ? `${styles.navItem} ${styles.active}`
                      : styles.navItem
                  }
                  onClick={handleNavClick}
                >
                  {t("common.createTask")}
                </NavLink>
                <NavLink
                  to="/my-tasks"
                  className={({ isActive }) =>
                    isActive
                      ? `${styles.navItem} ${styles.active}`
                      : styles.navItem
                  }
                  onClick={handleNavClick}
                >
                  {t("common.myTasks")}
                </NavLink>
              </nav>
            </Popover.Popup>
          </Popover.Positioner>
        </Popover.Portal>
      </Popover.Root>
    </div>
  );
}
