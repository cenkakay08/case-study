import React from "react";
import { useTranslation } from "react-i18next";
import styles from "./StatsOverview.module.css";

interface StatsOverviewProps {
  pendingCount: number;
  todayApproved: number;
  todayRejected: number;
}

export const StatsOverview: React.FC<StatsOverviewProps> = ({
  pendingCount,
  todayApproved,
  todayRejected,
}) => {
  const { t } = useTranslation();

  return (
    <div className={styles.statsGrid}>
      <div className={styles.statCard}>
        <span className={styles.statLabel}>{t("dashboard.totalPending")}</span>
        <span className={styles.statValue}>{pendingCount}</span>
      </div>
      <div className={styles.statCard}>
        <span className={styles.statLabel}>{t("dashboard.todayApproved")}</span>
        <span className={styles.statValue}>{todayApproved}</span>
      </div>
      <div className={styles.statCard}>
        <span className={styles.statLabel}>{t("dashboard.todayRejected")}</span>
        <span className={styles.statValue}>{todayRejected}</span>
      </div>
    </div>
  );
};
