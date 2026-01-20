import { useTranslation } from "react-i18next";
import * as Switch from "@/components/Switch/Switch";
import styles from "./LanguageSwitcher.module.css";

export function LanguageSwitcher() {
  const { i18n } = useTranslation();
  const currentLanguage = i18n.language.startsWith("tr") ? "tr" : "en";

  const toggleLanguage = (checked: boolean) => {
    const newLang = checked ? "en" : "tr";
    i18n.changeLanguage(newLang);
  };

  return (
    <div className={styles.container}>
      <span
        className={`${styles.label} ${currentLanguage === "tr" ? styles.active : ""}`}
      >
        TR
      </span>
      <Switch.Root
        checked={currentLanguage === "en"}
        onCheckedChange={toggleLanguage}
        className={styles.switch}
      >
        <Switch.Thumb />
      </Switch.Root>
      <span
        className={`${styles.label} ${currentLanguage === "en" ? styles.active : ""}`}
      >
        EN
      </span>
    </div>
  );
}
