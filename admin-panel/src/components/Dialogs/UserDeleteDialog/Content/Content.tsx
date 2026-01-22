import { useTranslation } from "react-i18next";
import { Button, Dialog } from "@case-study/ui";
import { useAppDispatch } from "@/store/hooks";
import { deleteUserAsync } from "@/store/slices/userSlice";
import type { AdminUser } from "@/api/users/userController";
import styles from "./Content.module.css";

interface ContentProps {
  user: AdminUser;
  setOpen: (open: boolean) => void;
}

export function Content({ user, setOpen }: ContentProps) {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();

  const handleDelete = async () => {
    const result = await dispatch(deleteUserAsync(user.id));
    if (deleteUserAsync.fulfilled.match(result)) {
      setOpen(false);
    }
  };

  return (
    <div className={styles.dialogContent}>
      <div className={styles.dialogHeader}>
        <Dialog.Title>{t("userManagement.deleteDialog.title")}</Dialog.Title>
        <Dialog.Close className={styles.dialogCloseButton}>✕</Dialog.Close>
      </div>

      <div className={styles.dialogBody}>
        <p className={styles.deleteConfirmText}>
          {t("userManagement.deleteDialog.description", {
            name: user.name,
          })}
        </p>
      </div>

      <div className={styles.dialogFooter}>
        <Dialog.Close className={styles.cancelButton}>
          {t("common.cancel")}
        </Dialog.Close>
        <Button className={styles.deleteButton} onClick={handleDelete}>
          {t("userManagement.delete")}
        </Button>
      </div>
    </div>
  );
}
