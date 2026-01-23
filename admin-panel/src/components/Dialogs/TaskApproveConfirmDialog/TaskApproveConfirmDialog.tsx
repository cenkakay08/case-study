import { useTranslation } from "react-i18next";
import { AlertDialog, Tooltip } from "@case-study/ui";
import { useAppSelector } from "@/store/hooks";
import type { Task } from "@/api/tasks/taskController";
import { Content } from "./Content/Content";
import styles from "./TaskApproveConfirmDialog.module.css";
import { useState } from "react";
import { USER_ROLES } from "@/api/users/userController";

interface TaskApproveConfirmDialogProps {
  task: Task;
}

export function TaskApproveConfirmDialog({
  task,
}: TaskApproveConfirmDialogProps) {
  const { t } = useTranslation();
  const { user } = useAppSelector((state) => state.auth);

  const [open, setOpen] = useState(false);

  const canApprove =
    user?.role === USER_ROLES.ADMIN || user?.role === USER_ROLES.MODERATOR;

  return (
    <AlertDialog.Root open={open} onOpenChange={setOpen}>
      <Tooltip.Provider>
        <Tooltip.Root>
          <Tooltip.Trigger
            render={(props, state) => (
              <span {...props} {...state} tabIndex={-1}>
                <AlertDialog.Trigger
                  disabled={!canApprove}
                  data-variant="success"
                >
                  {t("pendingTasks.approve")}
                </AlertDialog.Trigger>
              </span>
            )}
          />
          <Tooltip.Portal>
            <Tooltip.Positioner>
              <Tooltip.Popup>
                <Tooltip.Arrow />
                {canApprove
                  ? t("pendingTasks.approve")
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
