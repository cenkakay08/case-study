import { useTranslation } from "react-i18next";
import { Dialog } from "@case-study/ui";
import type { Task } from "@/api/tasks/taskController";
import { Content } from "./Content/Content";
import styles from "./TaskDetailDialog.module.css";

interface TaskDetailDialogProps {
  task: Task;
}

export function TaskDetailDialog({ task }: TaskDetailDialogProps) {
  const { t } = useTranslation();

  return (
    <Dialog.Root>
      <Dialog.Trigger>{t("myTasks.details.viewDetails")}</Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Backdrop />
        <Dialog.Popup className={styles.popup}>
          <Content task={task} />
        </Dialog.Popup>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
