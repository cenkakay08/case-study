import { useState } from "react";
import { useTranslation } from "react-i18next";
import { AlertDialog, Tooltip } from "@case-study/ui";
import { useAppSelector } from "@/store/hooks";
import type { Task } from "@/api/tasks/taskController";
import { Content } from "./Content/Content";
import styles from "./TaskRejectConfirmDialog.module.css";
import { USER_ROLES } from "@/api/users/userController";

interface TaskRejectConfirmDialogProps {
  task: Task;
}

export function TaskRejectConfirmDialog({
  task,
}: TaskRejectConfirmDialogProps) {
  const { t } = useTranslation();
  const { user } = useAppSelector((state) => state.auth);
  const [open, setOpen] = useState(false);

  const canReject =
    user?.role === USER_ROLES.ADMIN || user?.role === USER_ROLES.MODERATOR;

  return (
    <AlertDialog.Root open={open} onOpenChange={setOpen}>
      <Tooltip.Provider>
        <Tooltip.Root>
          <Tooltip.Trigger
            render={(props, state) => (
              <span {...props} {...state} tabIndex={-1}>
                <AlertDialog.Trigger
                  disabled={!canReject}
                  data-variant="danger"
                  className={styles.rejectButton}
                >
                  {t("pendingTasks.reject")}
                </AlertDialog.Trigger>
              </span>
            )}
          />
          <Tooltip.Portal>
            <Tooltip.Positioner>
              <Tooltip.Popup>
                <Tooltip.Arrow />
                {canReject
                  ? t("pendingTasks.reject")
                  : t("pendingTasks.noPermission")}
              </Tooltip.Popup>
            </Tooltip.Positioner>
          </Tooltip.Portal>
        </Tooltip.Root>
      </Tooltip.Provider>
      <AlertDialog.Portal>
        <AlertDialog.Backdrop />
        <AlertDialog.Popup className={styles.popup}>
          <Content task={task} setOpenDialog={setOpen} />
        </AlertDialog.Popup>
      </AlertDialog.Portal>
    </AlertDialog.Root>
  );
}
