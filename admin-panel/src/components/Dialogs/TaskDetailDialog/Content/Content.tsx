import { useTranslation } from "react-i18next";
import { Badge, Dialog } from "@case-study/ui";
import type { Task } from "@/api/tasks/taskController";
import { formatDate } from "@/utils/date";
import styles from "./Content.module.css";

interface ContentProps {
  task: Task;
}

export function Content({ task }: ContentProps) {
  const { t, i18n } = useTranslation();

  return (
    <>
      <div className={styles.detailGrid}>
        <div className={styles.detailRow}>
          <span className={styles.detailLabel}>{t("tasks.table.owner")}:</span>
          <span className={styles.detailValue}>{task.createdBy}</span>
        </div>
        <div className={styles.detailRow}>
          <span className={styles.detailLabel}>
            {t("tasks.table.category")}:
          </span>
          <span className={styles.detailValue}>
            {t(`categories.${task.category}`)}
          </span>
        </div>
        <div className={styles.detailRow}>
          <span className={styles.detailLabel}>
            {t("tasks.table.priority")}:
          </span>
          <Badge type={task.priority}>{t(`priorities.${task.priority}`)}</Badge>
        </div>
        <div className={styles.detailRow}>
          <span className={styles.detailLabel}>{t("tasks.table.status")}:</span>
          <Badge type={task.status}>{t(`status.${task.status}`)}</Badge>
        </div>
        <div className={styles.detailRow}>
          <span className={styles.detailLabel}>{t("tasks.table.date")}:</span>
          <span className={styles.detailValue}>
            {formatDate(task.createdAt, i18n.language)}
          </span>
        </div>
        <div className={styles.detailRow}>
          <span className={styles.detailLabel}>
            {t("allTasks.detailDialog.descriptionLabel")}:
          </span>
          <span className={styles.detailValue}>{task.description}</span>
        </div>
        {task.status === "rejected" && task.rejectionReason && (
          <div>
            <span className={styles.detailLabel}>
              {t("allTasks.detailDialog.rejectionReason")}:
            </span>
            <div className={styles.rejectionReason}>{task.rejectionReason}</div>
          </div>
        )}
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          marginTop: "1.5rem",
        }}
      >
        <Dialog.Close>{t("common.close")}</Dialog.Close>
      </div>
    </>
  );
}
