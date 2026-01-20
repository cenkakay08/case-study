import { useEffect, useState, useMemo } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { fetchTasksAsync } from "@/store/slices/taskSlice";
import { Badge } from "@/components/Badge/Badge";
import * as Select from "@/components/Select/Select";
import { TaskDetailDialog } from "@/components/Dialogs/TaskDetailDialog/TaskDetailDialog";
import styles from "./MyRequests.module.css";
import { useTranslation } from "react-i18next";
import { formatDate } from "@/utils/date";

export default function MyRequests() {
  const { t, i18n } = useTranslation();
  const dispatch = useAppDispatch();
  const { tasks, isLoading } = useAppSelector((state) => state.tasks);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const STATUS_FILTERS = [
    { value: "all", label: t("status.all") },
    { value: "pending", label: t("status.pending") },
    { value: "approved", label: t("status.approved") },
    { value: "rejected", label: t("status.rejected") },
  ];

  useEffect(() => {
    const promise = dispatch(fetchTasksAsync());
    return () => {
      promise.abort();
    };
  }, [dispatch]);

  const filteredTasks = useMemo(() => {
    return tasks.filter((task) => {
      const matchesSearch =
        task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        task.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus =
        statusFilter === "all" || task.status === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [tasks, searchTerm, statusFilter]);

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.title}>{t("myRequests.title")}</h1>
        <p className={styles.subtitle}>{t("myRequests.subtitle")}</p>
      </header>

      <div className={styles.controls}>
        <div className={styles.searchWrapper}>
          <input
            type="text"
            placeholder={t("myRequests.searchPlaceholder")}
            className={styles.searchInput}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className={styles.filters}>
          <Select.Root
            value={statusFilter}
            onValueChange={(val) => setStatusFilter(val ?? "all")}
          >
            <Select.Trigger style={{ minWidth: "12rem" }}>
              <Select.Value
                placeholder={t("myRequests.statusFilterPlaceholder")}
              >
                {STATUS_FILTERS.find((f) => f.value === statusFilter)?.label}
              </Select.Value>
              <Select.Icon>
                <Select.ChevronUpDownIcon />
              </Select.Icon>
            </Select.Trigger>
            <Select.Portal>
              <Select.Positioner sideOffset={8}>
                <Select.Popup>
                  <Select.List>
                    {STATUS_FILTERS.map((f) => (
                      <Select.Item key={f.value} value={f.value}>
                        <Select.ItemText>{f.label}</Select.ItemText>
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

      <div className={styles.tableContainer}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>{t("myRequests.table.request")}</th>
              <th>{t("myRequests.table.category")}</th>
              <th>{t("myRequests.table.priority")}</th>
              <th>{t("myRequests.table.status")}</th>
              <th>{t("myRequests.table.date")}</th>
              <th className={styles.stickyColumn}>
                {t("myRequests.table.actions")}
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredTasks.length > 0 ? (
              filteredTasks.map((task) => (
                <tr key={task.id}>
                  <td>
                    <span className={styles.taskTitle}>{task.title}</span>
                    <span className={styles.taskCategory}>
                      {t(`categories.${task.category}`)}
                    </span>
                  </td>
                  <td>{t(`categories.${task.category}`)}</td>
                  <td>
                    <Badge type={task.priority}>
                      {t(`priorities.${task.priority}`)}
                    </Badge>
                  </td>
                  <td>
                    <Badge type={task.status}>
                      {t(`status.${task.status}`)}
                    </Badge>
                  </td>
                  <td>{formatDate(task.createdAt, i18n.language)}</td>
                  <td className={styles.stickyColumn}>
                    <TaskDetailDialog task={task} />
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6} className={styles.emptyState}>
                  {isLoading
                    ? t("common.loading")
                    : t("dashboard.noRecentRequests")}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
