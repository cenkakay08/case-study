import { useTranslation } from "react-i18next";
import { Dialog } from "@case-study/ui";
import { Badge } from "@case-study/ui";
import type { Task } from "@/api/tasks/taskController";
import styles from "./Content.module.css";

interface ContentProps {
  task: Task;
}

export function Content({ task }: ContentProps) {
  const { t, i18n } = useTranslation();

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString(
      i18n.language === "tr" ? "tr-TR" : "en-US",
      {
        year: "numeric",
        month: "long",
        day: "numeric",
      },
    );
  };

  return (
    <>
      <div className={styles.dialogHeader}>
        <Dialog.Title>{t("myTasks.details.title")}</Dialog.Title>
        <Dialog.Close className={styles.dialogCloseButton}>✕</Dialog.Close>
      </div>

      <div className={styles.dialogContent}>
        <div className={styles.detailRow}>
          <span className={styles.detailLabel}>
            {t("createTask.form.titleLabel")}
          </span>
          <span className={styles.detailValue}>{task.title}</span>
        </div>

        <div className={styles.detailRow}>
          <span className={styles.detailLabel}>
            {t("myTasks.details.description")}
          </span>
          <p className={styles.detailDescription}>{task.description}</p>
        </div>

        <div className={styles.detailGrid}>
          <div className={styles.detailRow}>
            <span className={styles.detailLabel}>
              {t("myTasks.table.category")}
            </span>
            <span className={styles.detailValue}>
              {t(`categories.${task.category}`)}
            </span>
          </div>

          <div className={styles.detailRow}>
            <span className={styles.detailLabel}>
              {t("myTasks.table.priority")}
            </span>
            <div>
              <Badge type={task.priority}>
                {t(`priorities.${task.priority}`)}
              </Badge>
            </div>
          </div>

          <div className={styles.detailRow}>
            <span className={styles.detailLabel}>
              {t("myRequests.table.status")}
            </span>
            <div>
              <Badge type={task.status}>{t(`status.${task.status}`)}</Badge>
            </div>
          </div>

          <div className={styles.detailRow}>
            <span className={styles.detailLabel}>
              {t("myRequests.table.date")}
            </span>
            <span className={styles.detailValue}>
              {formatDate(task.createdAt)}
            </span>
          </div>
        </div>

        {task.status === "rejected" && task.rejectionReason && (
          <div className={`${styles.detailRow} ${styles.rejectionRow}`}>
            <span className={styles.detailLabel}>
              {t("myTasks.details.rejectionReason")}
            </span>
            <p className={styles.rejectionText}>{task.rejectionReason}</p>
          </div>
        )}
      </div>

      <div className={styles.dialogFooter}>
        <Dialog.Close>{t("myTasks.details.close")}</Dialog.Close>
      </div>
    </>
  );
}
