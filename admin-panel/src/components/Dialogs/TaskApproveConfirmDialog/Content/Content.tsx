import { useTranslation } from "react-i18next";
import { AlertDialog } from "@case-study/ui";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { approveTaskAsync } from "@/store/slices/taskSlice";
import type { Task } from "@/api/tasks/taskController";
import styles from "./Content.module.css";
import { useEffect, useRef } from "react";
import { formatDate } from "@/utils/date";

interface ContentProps {
  task: Task;
  setOpenDialog: (open: boolean) => void;
}

export function Content({ task, setOpenDialog }: ContentProps) {
  const abort = useRef<AbortController["abort"] | null>(null);

  const { t, i18n } = useTranslation();
  const dispatch = useAppDispatch();
  const { isLoading } = useAppSelector((state) => state.tasks);

  const handleConfirm = async () => {
    const promise = dispatch(approveTaskAsync(task.id));
    abort.current = promise.abort;

    const response = await promise;

    if (approveTaskAsync.fulfilled.match(response)) {
      setOpenDialog(false);
    }
  };

  useEffect(() => {
    return () => {
      abort.current?.();
    };
  }, []);

  return (
    <>
      <div className={styles.dialogHeader}>
        <AlertDialog.Title>
          {t("pendingTasks.approveDialog.title")}
        </AlertDialog.Title>
        <AlertDialog.Close className={styles.dialogCloseButton}>
          ✕
        </AlertDialog.Close>
      </div>

      <div className={styles.dialogContent}>
        <AlertDialog.Description className={styles.dialogDescription}>
          {t("pendingTasks.approveDialog.description")}
        </AlertDialog.Description>

        <div className={styles.taskInfo}>
          <div className={styles.taskTitle}>{task.title}</div>

          <div className={styles.taskDescriptionText}>{task.description}</div>

          <div className={styles.taskDetailsGrid}>
            <div className={styles.taskDetail}>
              <span className={styles.detailLabel}>
                {t("tasks.table.owner")}:
              </span>
              <span className={styles.detailValue}>{task.createdBy}</span>
            </div>

            <div className={styles.taskDetail}>
              <span className={styles.detailLabel}>
                {t("tasks.table.category")}:
              </span>
              <span className={styles.detailValue}>
                {t(`categories.${task.category}`)}
              </span>
            </div>

            <div className={styles.taskDetail}>
              <span className={styles.detailLabel}>
                {t("tasks.table.priority")}:
              </span>
              <span className={styles.detailValue}>
                {t(`priorities.${task.priority}`)}
              </span>
            </div>

            <div className={styles.taskDetail}>
              <span className={styles.detailLabel}>
                {t("tasks.table.date")}:
              </span>
              <span className={styles.detailValue}>
                {formatDate(task.createdAt, i18n.language)}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.dialogFooter}>
        <AlertDialog.Close className={styles.cancelButton}>
          {t("common.cancel")}
        </AlertDialog.Close>
        <button
          className={styles.confirmButton}
          onClick={handleConfirm}
          disabled={isLoading}
        >
          {isLoading ? t("common.loading") : t("pendingTasks.approve")}
        </button>
      </div>
    </>
  );
}
