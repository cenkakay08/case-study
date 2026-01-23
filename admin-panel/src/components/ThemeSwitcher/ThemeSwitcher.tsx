import React from "react";
import { Switch, Popover } from "@case-study/ui";
import styles from "./ThemeSwitcher.module.css";

const SunIcon = ({ size = 16 }: { size?: number }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="12" cy="12" r="5" />
    <line x1="12" y1="1" x2="12" y2="3" />
    <line x1="12" y1="21" x2="12" y2="23" />
    <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
    <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
    <line x1="1" y1="12" x2="3" y2="12" />
    <line x1="21" y1="12" x2="23" y2="12" />
    <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
    <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
  </svg>
);

const MoonIcon = ({ size = 16 }: { size?: number }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
  </svg>
);

export function ThemeSwitcher() {
  const [theme, setTheme] = React.useState<"light" | "dark">(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("theme") as "light" | "dark";
      if (saved) return saved;
      return window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light";
    }
    return "light";
  });

  React.useEffect(() => {
    const root = document.documentElement;
    if (theme === "dark") {
      root.classList.add("dark");
      root.classList.remove("light");
    } else {
      root.classList.add("light");
      root.classList.remove("dark");
    }
    localStorage.setItem("theme", theme);
  }, [theme]);

  const SwitcherContent = (
    <div className={styles.themeSwitcher}>
      <span
        className={`${styles.icon} ${theme === "light" ? styles.activeIcon : ""}`}
      >
        <SunIcon />
      </span>
      <Switch.Root
        checked={theme === "dark"}
        onCheckedChange={(checked) => setTheme(checked ? "dark" : "light")}
      >
        <Switch.Thumb />
      </Switch.Root>
      <span
        className={`${styles.icon} ${theme === "dark" ? styles.activeIcon : ""}`}
      >
        <MoonIcon />
      </span>
    </div>
  );

  return (
    <>
      {/* Desktop: inline switcher */}
      <div className={styles.desktopSwitcher}>{SwitcherContent}</div>

      {/* Mobile: popover trigger */}
      <div className={styles.mobileSwitcher}>
        <Popover.Root>
          <Popover.Trigger className={styles.popoverTrigger}>
            <span className={styles.triggerIcon}>
              {theme === "dark" ? (
                <MoonIcon size={18} />
              ) : (
                <SunIcon size={18} />
              )}
            </span>
          </Popover.Trigger>
          <Popover.Portal>
            <Popover.Positioner sideOffset={8}>
              <Popover.Popup className={styles.popupContent}>
                <Popover.Arrow>
                  <Popover.ArrowSvg />
                </Popover.Arrow>
                {SwitcherContent}
              </Popover.Popup>
            </Popover.Positioner>
          </Popover.Portal>
        </Popover.Root>
      </div>
    </>
  );
}
