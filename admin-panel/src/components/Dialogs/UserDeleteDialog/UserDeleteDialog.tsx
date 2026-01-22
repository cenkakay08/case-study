import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Dialog } from "@case-study/ui";
import { Content } from "./Content/Content.tsx";
import type { AdminUser } from "@/api/users/userController";

interface UserDeleteDialogProps {
  user: AdminUser;
}

export function UserDeleteDialog({ user }: UserDeleteDialogProps) {
  const [open, setOpen] = useState(false);
  const { t } = useTranslation();

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger>{t("userManagement.delete")}</Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Backdrop />
        <Dialog.Popup>
          <Content user={user} setOpen={setOpen} />
        </Dialog.Popup>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
