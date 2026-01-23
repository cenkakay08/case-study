import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { fetchUsersAsync } from "@/store/slices/userSlice";
import { UserCreateDialog } from "@/components/Dialogs/UserCreateDialog/UserCreateDialog";
import { UserEditDialog } from "@/components/Dialogs/UserEditDialog/UserEditDialog";
import { UserDeleteDialog } from "@/components/Dialogs/UserDeleteDialog/UserDeleteDialog";
import { Badge, type BadgeType } from "@case-study/ui";
import styles from "./UserManagement.module.css";
import { TableSkeleton } from "@/components/Skeletons/TableSkeleton";
import { useTranslation } from "react-i18next";

export default function UserManagement() {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const { users, isLoading } = useAppSelector((state) => state.users);

  useEffect(() => {
    const promise = dispatch(fetchUsersAsync());
    return () => {
      promise.abort();
    };
  }, [dispatch]);

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div className={styles.headerText}>
          <h1 className={styles.title}>{t("userManagement.title")}</h1>
          <p className={styles.subtitle}>{t("userManagement.subtitle")}</p>
        </div>
        <UserCreateDialog />
      </header>

      <div className={styles.tableContainer}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>{t("userManagement.table.name")}</th>
              <th>{t("userManagement.table.email")}</th>
              <th>{t("userManagement.table.role")}</th>
              <th className={styles.stickyColumn}>
                {t("tasks.table.actions")}
              </th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <TableSkeleton columns={4} rows={10} />
            ) : users.length > 0 ? (
              users.map((user) => (
                <tr key={user.id}>
                  <td>
                    <span className={styles.userName}>{user.name}</span>
                  </td>
                  <td>{user.email}</td>
                  <td>
                    <Badge type={user.role.toLowerCase() as BadgeType}>
                      {user.role}
                    </Badge>
                  </td>
                  <td className={styles.stickyColumn}>
                    <div className={styles.actionButtons}>
                      <UserEditDialog user={user} />
                      <UserDeleteDialog user={user} />
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={4} className={styles.emptyState}>
                  {t("userManagement.noUsers")}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
