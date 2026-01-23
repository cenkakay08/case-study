import { useTranslation } from "react-i18next";
import { Switch, Popover } from "@case-study/ui";
import styles from "./LanguageSwitcher.module.css";

export function LanguageSwitcher() {
  const { i18n } = useTranslation();
  const currentLanguage = i18n.language.startsWith("tr") ? "tr" : "en";

  const toggleLanguage = (checked: boolean) => {
    const newLang = checked ? "en" : "tr";
    i18n.changeLanguage(newLang);
  };

  const SwitcherContent = (
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

  return (
    <>
      {/* Desktop: inline switcher */}
      <div className={styles.desktopSwitcher}>{SwitcherContent}</div>

      {/* Mobile: popover trigger */}
      <div className={styles.mobileSwitcher}>
        <Popover.Root>
          <Popover.Trigger className={styles.popoverTrigger}>
            <span className={styles.triggerLabel}>
              {currentLanguage.toUpperCase()}
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
