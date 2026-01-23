import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Dialog, Tooltip } from "@case-study/ui";
import { Content } from "./Content/Content.tsx";
import type { AdminUser } from "@/api/users/userController";
import { useAppSelector } from "@/store/hooks";

interface UserDeleteDialogProps {
  user: AdminUser;
}

export function UserDeleteDialog({ user }: UserDeleteDialogProps) {
  const [open, setOpen] = useState(false);
  const { t } = useTranslation();
  const currentUser = useAppSelector((state) => state.auth.user);

  const isSelf = currentUser?.id === user.id;

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Tooltip.Provider>
        <Tooltip.Root>
          <Tooltip.Trigger
            render={(props, triggerState) => (
              <span {...props} {...triggerState} tabIndex={-1}>
                <Dialog.Trigger data-variant="danger" disabled={isSelf}>
                  {t("userManagement.delete")}
                </Dialog.Trigger>
              </span>
            )}
          />
          <Tooltip.Portal>
            <Tooltip.Positioner>
              <Tooltip.Popup>
                <Tooltip.Arrow />
                {isSelf
                  ? t("userManagement.deleteDialog.cannotDeleteSelf")
                  : t("userManagement.delete")}
              </Tooltip.Popup>
            </Tooltip.Positioner>
          </Tooltip.Portal>
        </Tooltip.Root>
      </Tooltip.Provider>
      <Dialog.Portal>
        <Dialog.Backdrop />
        <Dialog.Popup>
          <Content user={user} setOpen={setOpen} />
        </Dialog.Popup>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
