import React from "react";
import * as Switch from "@/components/Switch/Switch";
import styles from "./ThemeSwitcher.module.css";

export function ThemeSwitcher() {
  const [theme, setTheme] = React.useState<"light" | "dark">(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("theme") as "light" | "dark";
      if (saved) return saved;
      // Default to system preference if no saved theme
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

  return (
    <div className={styles.themeSwitcher}>
      <span className={styles.themeLabel}>Karanlık Mod</span>
      <Switch.Root
        checked={theme === "dark"}
        onCheckedChange={(checked) => setTheme(checked ? "dark" : "light")}
      >
        <Switch.Thumb />
      </Switch.Root>
    </div>
  );
}
