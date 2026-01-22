import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { Navigate } from "react-router";
import {
  fetchUsersAsync,
  createUserAsync,
  updateUserAsync,
  deleteUserAsync,
} from "@/store/slices/userSlice";
import { Button, Dialog, Select } from "@case-study/ui";
import type {
  AdminUser,
  CreateAdminUserPayload,
  UpdateAdminUserPayload,
} from "@/api/users/userController";
import styles from "./UserManagement.module.css";
import { useTranslation } from "react-i18next";

type UserRole = "Admin" | "Moderator" | "Viewer";

const ROLES: UserRole[] = ["Admin", "Moderator", "Viewer"];

export default function UserManagement() {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const { users, isLoading } = useAppSelector((state) => state.users);
  const { user } = useAppSelector((state) => state.auth);

  if (user?.role !== "Admin") {
    return <Navigate to="/dashboard" replace />;
  }

  // Dialog states
  const [createDialogOpen, setCreateDialogOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  // Form states
  const [selectedUser, setSelectedUser] = useState<AdminUser | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "Viewer" as UserRole,
  });

  useEffect(() => {
    const promise = dispatch(fetchUsersAsync());
    return () => {
      promise.abort();
    };
  }, [dispatch]);

  const resetForm = () => {
    setFormData({
      name: "",
      email: "",
      password: "",
      role: "Viewer",
    });
    setSelectedUser(null);
  };

  const handleOpenCreate = () => {
    resetForm();
    setCreateDialogOpen(true);
  };

  const handleOpenEdit = (user: AdminUser) => {
    setSelectedUser(user);
    setFormData({
      name: user.name,
      email: user.email,
      password: "",
      role: user.role,
    });
    setEditDialogOpen(true);
  };

  const handleOpenDelete = (user: AdminUser) => {
    setSelectedUser(user);
    setDeleteDialogOpen(true);
  };

  const handleCreate = async () => {
    if (!formData.name || !formData.email || !formData.password) return;

    const payload: CreateAdminUserPayload = {
      name: formData.name,
      email: formData.email,
      password: formData.password,
      role: formData.role,
    };

    await dispatch(createUserAsync(payload));
    setCreateDialogOpen(false);
    resetForm();
  };

  const handleUpdate = async () => {
    if (!selectedUser || !formData.name || !formData.email) return;

    const payload: UpdateAdminUserPayload = {
      name: formData.name,
      email: formData.email,
      role: formData.role,
    };

    if (formData.password) {
      payload.password = formData.password;
    }

    await dispatch(updateUserAsync({ userId: selectedUser.id, user: payload }));
    setEditDialogOpen(false);
    resetForm();
  };

  const handleDelete = async () => {
    if (!selectedUser) return;

    await dispatch(deleteUserAsync(selectedUser.id));
    setDeleteDialogOpen(false);
    resetForm();
  };

  const getRoleBadgeClass = (role: string) => {
    switch (role) {
      case "Admin":
        return styles.admin;
      case "Moderator":
        return styles.moderator;
      default:
        return styles.viewer;
    }
  };

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div className={styles.headerText}>
          <h1 className={styles.title}>{t("userManagement.title")}</h1>
          <p className={styles.subtitle}>{t("userManagement.subtitle")}</p>
        </div>
        <Button className={styles.addButton} onClick={handleOpenCreate}>
          {t("userManagement.addUser")}
        </Button>
      </header>

      <div className={styles.tableContainer}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>{t("userManagement.table.name")}</th>
              <th>{t("userManagement.table.email")}</th>
              <th>{t("userManagement.table.role")}</th>
              <th className={styles.stickyColumn}>
                {t("requests.table.actions")}
              </th>
            </tr>
          </thead>
          <tbody>
            {users.length > 0 ? (
              users.map((user) => (
                <tr key={user.id}>
                  <td>
                    <span className={styles.userName}>{user.name}</span>
                  </td>
                  <td>{user.email}</td>
                  <td>
                    <span
                      className={`${styles.roleBadge} ${getRoleBadgeClass(user.role)}`}
                    >
                      {user.role}
                    </span>
                  </td>
                  <td className={styles.stickyColumn}>
                    <div className={styles.actionButtons}>
                      <Button
                        className={styles.editButton}
                        onClick={() => handleOpenEdit(user)}
                      >
                        {t("userManagement.edit")}
                      </Button>
                      <Button
                        className={styles.deleteButton}
                        onClick={() => handleOpenDelete(user)}
                      >
                        {t("userManagement.delete")}
                      </Button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={4} className={styles.emptyState}>
                  {isLoading
                    ? t("common.loading")
                    : t("userManagement.noUsers")}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Create User Dialog */}
      <Dialog.Root open={createDialogOpen} onOpenChange={setCreateDialogOpen}>
        <Dialog.Portal>
          <Dialog.Backdrop />
          <Dialog.Popup>
            <Dialog.Title>
              {t("userManagement.createDialog.title")}
            </Dialog.Title>
            <Dialog.Description>
              {t("userManagement.createDialog.description")}
            </Dialog.Description>
            <div className={styles.form}>
              <div className={styles.formGroup}>
                <label className={styles.formLabel}>
                  {t("userManagement.form.name")}
                </label>
                <input
                  type="text"
                  className={styles.formInput}
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  placeholder={t("userManagement.form.namePlaceholder")}
                />
              </div>
              <div className={styles.formGroup}>
                <label className={styles.formLabel}>
                  {t("userManagement.form.email")}
                </label>
                <input
                  type="email"
                  className={styles.formInput}
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  placeholder={t("userManagement.form.emailPlaceholder")}
                />
              </div>
              <div className={styles.formGroup}>
                <label className={styles.formLabel}>
                  {t("userManagement.form.password")}
                </label>
                <input
                  type="password"
                  className={styles.formInput}
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                  placeholder={t("userManagement.form.passwordPlaceholder")}
                />
              </div>
              <div className={styles.formGroup}>
                <label className={styles.formLabel}>
                  {t("userManagement.form.role")}
                </label>
                <Select.Root
                  value={formData.role}
                  onValueChange={(val) =>
                    setFormData({
                      ...formData,
                      role: (val as UserRole) ?? "Viewer",
                    })
                  }
                >
                  <Select.Trigger>
                    <Select.Value>{formData.role}</Select.Value>
                    <Select.Icon>
                      <Select.ChevronUpDownIcon />
                    </Select.Icon>
                  </Select.Trigger>
                  <Select.Portal>
                    <Select.Positioner sideOffset={8}>
                      <Select.Popup>
                        <Select.List>
                          {ROLES.map((role) => (
                            <Select.Item key={role} value={role}>
                              <Select.ItemText>{role}</Select.ItemText>
                              <Select.ItemIndicator>
                                <Select.CheckIcon />
                              </Select.ItemIndicator>
                            </Select.Item>
                          ))}
                        </Select.List>
                      </Select.Popup>
                    </Select.Positioner>
                  </Select.Portal>
                </Select.Root>
              </div>
            </div>
            <div className={styles.formActions}>
              <Dialog.Close className={styles.cancelButton}>
                {t("common.cancel")}
              </Dialog.Close>
              <Button
                className={styles.submitButton}
                onClick={handleCreate}
                disabled={
                  !formData.name || !formData.email || !formData.password
                }
              >
                {t("userManagement.create")}
              </Button>
            </div>
          </Dialog.Popup>
        </Dialog.Portal>
      </Dialog.Root>

      {/* Edit User Dialog */}
      <Dialog.Root open={editDialogOpen} onOpenChange={setEditDialogOpen}>
        <Dialog.Portal>
          <Dialog.Backdrop />
          <Dialog.Popup>
            <Dialog.Title>{t("userManagement.editDialog.title")}</Dialog.Title>
            <Dialog.Description>
              {t("userManagement.editDialog.description")}
            </Dialog.Description>
            <div className={styles.form}>
              <div className={styles.formGroup}>
                <label className={styles.formLabel}>
                  {t("userManagement.form.name")}
                </label>
                <input
                  type="text"
                  className={styles.formInput}
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                />
              </div>
              <div className={styles.formGroup}>
                <label className={styles.formLabel}>
                  {t("userManagement.form.email")}
                </label>
                <input
                  type="email"
                  className={styles.formInput}
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                />
              </div>
              <div className={styles.formGroup}>
                <label className={styles.formLabel}>
                  {t("userManagement.form.newPassword")}
                </label>
                <input
                  type="password"
                  className={styles.formInput}
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                  placeholder={t("userManagement.form.newPasswordPlaceholder")}
                />
              </div>
              <div className={styles.formGroup}>
                <label className={styles.formLabel}>
                  {t("userManagement.form.role")}
                </label>
                <Select.Root
                  value={formData.role}
                  onValueChange={(val) =>
                    setFormData({
                      ...formData,
                      role: (val as UserRole) ?? "Viewer",
                    })
                  }
                >
                  <Select.Trigger>
                    <Select.Value>{formData.role}</Select.Value>
                    <Select.Icon>
                      <Select.ChevronUpDownIcon />
                    </Select.Icon>
                  </Select.Trigger>
                  <Select.Portal>
                    <Select.Positioner sideOffset={8}>
                      <Select.Popup>
                        <Select.List>
                          {ROLES.map((role) => (
                            <Select.Item key={role} value={role}>
                              <Select.ItemText>{role}</Select.ItemText>
                              <Select.ItemIndicator>
                                <Select.CheckIcon />
                              </Select.ItemIndicator>
                            </Select.Item>
                          ))}
                        </Select.List>
                      </Select.Popup>
                    </Select.Positioner>
                  </Select.Portal>
                </Select.Root>
              </div>
            </div>
            <div className={styles.formActions}>
              <Dialog.Close className={styles.cancelButton}>
                {t("common.cancel")}
              </Dialog.Close>
              <Button
                className={styles.submitButton}
                onClick={handleUpdate}
                disabled={!formData.name || !formData.email}
              >
                {t("userManagement.save")}
              </Button>
            </div>
          </Dialog.Popup>
        </Dialog.Portal>
      </Dialog.Root>

      {/* Delete Confirmation Dialog */}
      <Dialog.Root open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <Dialog.Portal>
          <Dialog.Backdrop />
          <Dialog.Popup>
            <Dialog.Title>
              {t("userManagement.deleteDialog.title")}
            </Dialog.Title>
            <p className={styles.deleteConfirmText}>
              {t("userManagement.deleteDialog.description", {
                name: selectedUser?.name,
              })}
            </p>
            <div className={styles.deleteConfirmActions}>
              <Dialog.Close className={styles.cancelButton}>
                {t("common.cancel")}
              </Dialog.Close>
              <Button className={styles.deleteButton} onClick={handleDelete}>
                {t("userManagement.delete")}
              </Button>
            </div>
          </Dialog.Popup>
        </Dialog.Portal>
      </Dialog.Root>
    </div>
  );
}
