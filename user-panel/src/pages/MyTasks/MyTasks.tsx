import { useEffect, useState, useMemo } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { fetchTasksAsync } from "@/store/slices/taskSlice";
import { Badge, Select } from "@case-study/ui";
import { TaskDetailDialog } from "../../components/Dialogs/TaskDetailDialog/TaskDetailDialog";
import styles from "./MyTasks.module.css";
import { useTranslation } from "react-i18next";
import { formatDate } from "@/utils/date";
import { TableSkeleton } from "@/components/Skeletons/TableSkeleton";
import { TASK_STATUS } from "@/api/tasks/taskController";

const STATUS_FILTERS = [
  { value: "all", labelKey: "status.all" },
  { value: TASK_STATUS.PENDING, labelKey: "status.pending" },
  { value: TASK_STATUS.APPROVED, labelKey: "status.approved" },
  { value: TASK_STATUS.REJECTED, labelKey: "status.rejected" },
];

export default function MyTasks() {
  const { t, i18n } = useTranslation();
  const dispatch = useAppDispatch();
  const { tasks, isLoading } = useAppSelector((state) => state.tasks);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

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

  useEffect(() => {
    const promise = dispatch(fetchTasksAsync());
    return () => {
      promise.abort();
    };
  }, [dispatch]);

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.title}>{t("myTasks.title")}</h1>
        <p className={styles.subtitle}>{t("myTasks.subtitle")}</p>
      </header>

      <div className={styles.controls}>
        <input
          type="text"
          placeholder={t("myTasks.searchPlaceholder")}
          className={styles.searchInput}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <div className={styles.filters}>
          <Select.Root
            value={statusFilter}
            onValueChange={(val) => setStatusFilter(val ?? "all")}
          >
            <Select.Trigger style={{ minWidth: "12rem" }}>
              <Select.Value placeholder={t("myTasks.statusFilterPlaceholder")}>
                {t(
                  STATUS_FILTERS.find((f) => f.value === statusFilter)
                    ?.labelKey ?? "",
                )}
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
                        <Select.ItemText>{t(f.labelKey)}</Select.ItemText>
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
              <th>{t("myTasks.table.task")}</th>
              <th>{t("myTasks.table.category")}</th>
              <th>{t("myTasks.table.priority")}</th>
              <th>{t("myTasks.table.status")}</th>
              <th>{t("myTasks.table.date")}</th>
              <th className={styles.stickyColumn}>
                {t("myTasks.table.actions")}
              </th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <TableSkeleton columns={6} rows={10} />
            ) : filteredTasks.length > 0 ? (
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
                  {t("dashboard.noRecentTasks")}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
