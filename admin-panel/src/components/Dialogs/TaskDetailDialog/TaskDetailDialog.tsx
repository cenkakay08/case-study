import { useTranslation } from "react-i18next";
import { Dialog } from "@case-study/ui";
import type { Task } from "@/api/tasks/taskController";
import { Content } from "./Content/Content.tsx";

interface TaskDetailDialogProps {
  task: Task;
}

export function TaskDetailDialog({ task }: TaskDetailDialogProps) {
  const { t } = useTranslation();

  return (
    <Dialog.Root>
      <Dialog.Trigger>{t("allTasks.viewDetail")}</Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Backdrop />
        <Dialog.Popup>
          <Dialog.Title>{task?.title}</Dialog.Title>
          <Dialog.Description>
            {t("allTasks.detailDialog.description")}
          </Dialog.Description>
          <Content task={task} />
        </Dialog.Popup>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
