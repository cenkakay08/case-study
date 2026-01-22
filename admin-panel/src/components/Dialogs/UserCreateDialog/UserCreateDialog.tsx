import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Dialog } from "@case-study/ui";
import { Content } from "./Content/Content";

interface UserCreateDialogProps {}

export function UserCreateDialog({}: UserCreateDialogProps) {
  const [open, setOpen] = useState(false);
  const { t } = useTranslation();

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger>{t("userManagement.addUser")}</Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Backdrop />
        <Dialog.Popup>
          <Content setOpen={setOpen} />
        </Dialog.Popup>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
