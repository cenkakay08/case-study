import React from "react";
import { useTranslation } from "react-i18next";
import { TASK_PRIORITY } from "@/api/tasks/taskController";
import styles from "./PriorityDistribution.module.css";

interface PriorityDistributionProps {
  priorityCounts: {
    [K in (typeof TASK_PRIORITY)[keyof typeof TASK_PRIORITY]]: number;
  };
}

export const PriorityDistribution: React.FC<PriorityDistributionProps> = ({
  priorityCounts,
}) => {
  const { t } = useTranslation();

  return (
    <section className={styles.prioritySection}>
      <h2>{t("dashboard.priorityDistribution")}</h2>
      <div className={styles.priorityGrid}>
        <div className={`${styles.priorityCard} ${styles.urgent}`}>
          <span className={styles.priorityCount}>{priorityCounts.urgent}</span>
          <span className={styles.priorityLabel}>{t("priorities.urgent")}</span>
        </div>
        <div className={`${styles.priorityCard} ${styles.high}`}>
          <span className={styles.priorityCount}>{priorityCounts.high}</span>
          <span className={styles.priorityLabel}>{t("priorities.high")}</span>
        </div>
        <div className={`${styles.priorityCard} ${styles.normal}`}>
          <span className={styles.priorityCount}>{priorityCounts.normal}</span>
          <span className={styles.priorityLabel}>{t("priorities.normal")}</span>
        </div>
        <div className={`${styles.priorityCard} ${styles.low}`}>
          <span className={styles.priorityCount}>{priorityCounts.low}</span>
          <span className={styles.priorityLabel}>{t("priorities.low")}</span>
        </div>
      </div>
    </section>
  );
};
