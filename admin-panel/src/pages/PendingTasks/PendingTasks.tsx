import { useEffect, useState, useMemo } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { fetchTasksAsync } from "@/store/slices/taskSlice";
import { Badge, Button, Select } from "@case-study/ui";
import styles from "./PendingTasks.module.css";
import { useTranslation } from "react-i18next";
import { formatDate } from "@/utils/date";
import { TASK_STATUS } from "@/api/tasks/taskController";
import { TaskApproveConfirmDialog } from "@/components/Dialogs/TaskApproveConfirmDialog/TaskApproveConfirmDialog";
import { TaskRejectConfirmDialog } from "@/components/Dialogs/TaskRejectConfirmDialog/TaskRejectConfirmDialog";

const ITEMS_PER_PAGE = 10;

export default function PendingTasks() {
  const { t, i18n } = useTranslation();
  const dispatch = useAppDispatch();
  const { tasks, isLoading } = useAppSelector((state) => state.tasks);
  const [searchTerm, setSearchTerm] = useState("");
  const [priorityFilter, setPriorityFilter] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);

  const PRIORITY_FILTERS = [
    { value: "all", label: t("filters.allPriorities") },
    { value: "urgent", label: t("priorities.urgent") },
    { value: "high", label: t("priorities.high") },
    { value: "normal", label: t("priorities.normal") },
    { value: "low", label: t("priorities.low") },
  ];

  const CATEGORY_FILTERS = [
    { value: "all", label: t("filters.allCategories") },
    { value: "technical_support", label: t("categories.technical_support") },
    { value: "leave_request", label: t("categories.leave_request") },
    { value: "purchase", label: t("categories.purchase") },
    { value: "other", label: t("categories.other") },
  ];

  useEffect(() => {
    const promise = dispatch(fetchTasksAsync());
    return () => {
      promise.abort();
    };
  }, [dispatch]);

  // Filter only pending tasks
  const pendingTasks = useMemo(() => {
    return tasks.filter((task) => task.status === TASK_STATUS.PENDING);
  }, [tasks]);

  const filteredTasks = useMemo(() => {
    return pendingTasks.filter((task) => {
      const matchesSearch =
        task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        task.createdBy.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesPriority =
        priorityFilter === "all" || task.priority === priorityFilter;
      const matchesCategory =
        categoryFilter === "all" || task.category === categoryFilter;
      return matchesSearch && matchesPriority && matchesCategory;
    });
  }, [pendingTasks, searchTerm, priorityFilter, categoryFilter]);

  // Pagination
  const totalPages = Math.ceil(filteredTasks.length / ITEMS_PER_PAGE);
  const paginatedTasks = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredTasks.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [filteredTasks, currentPage]);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, priorityFilter, categoryFilter]);

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.title}>{t("pendingTasks.title")}</h1>
        <p className={styles.subtitle}>{t("pendingTasks.subtitle")}</p>
      </header>

      <div className={styles.controls}>
        <div className={styles.searchWrapper}>
          <input
            type="text"
            placeholder={t("pendingTasks.searchPlaceholder")}
            className={styles.searchInput}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className={styles.filters}>
          <Select.Root
            value={priorityFilter}
            onValueChange={(val) => setPriorityFilter(val ?? "all")}
          >
            <Select.Trigger style={{ minWidth: "10rem" }}>
              <Select.Value>
                {
                  PRIORITY_FILTERS.find((f) => f.value === priorityFilter)
                    ?.label
                }
              </Select.Value>
              <Select.Icon>
                <Select.ChevronUpDownIcon />
              </Select.Icon>
            </Select.Trigger>
            <Select.Portal>
              <Select.Positioner sideOffset={8}>
                <Select.Popup>
                  <Select.List>
                    {PRIORITY_FILTERS.map((f) => (
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

          <Select.Root
            value={categoryFilter}
            onValueChange={(val) => setCategoryFilter(val ?? "all")}
          >
            <Select.Trigger style={{ minWidth: "10rem" }}>
              <Select.Value>
                {
                  CATEGORY_FILTERS.find((f) => f.value === categoryFilter)
                    ?.label
                }
              </Select.Value>
              <Select.Icon>
                <Select.ChevronUpDownIcon />
              </Select.Icon>
            </Select.Trigger>
            <Select.Portal>
              <Select.Positioner sideOffset={8}>
                <Select.Popup>
                  <Select.List>
                    {CATEGORY_FILTERS.map((f) => (
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
              <th>{t("tasks.table.title")}</th>
              <th>{t("tasks.table.owner")}</th>
              <th>{t("tasks.table.priority")}</th>
              <th>{t("tasks.table.date")}</th>
              <th className={styles.stickyColumn}>
                {t("tasks.table.actions")}
              </th>
            </tr>
          </thead>
          <tbody>
            {paginatedTasks.length > 0 ? (
              paginatedTasks.map((task) => (
                <tr key={task.id}>
                  <td>
                    <span className={styles.taskTitle}>{task.title}</span>
                    <span className={styles.taskDescription}>
                      {task.description}
                    </span>
                  </td>
                  <td>{task.createdBy}</td>
                  <td>
                    <Badge type={task.priority}>
                      {t(`priorities.${task.priority}`)}
                    </Badge>
                  </td>
                  <td>{formatDate(task.createdAt, i18n.language)}</td>
                  <td className={styles.stickyColumn}>
                    <div className={styles.actionButtons}>
                      <TaskApproveConfirmDialog task={task} />
                      <TaskRejectConfirmDialog task={task} />
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className={styles.emptyState}>
                  {isLoading ? t("common.loading") : t("pendingTasks.noTasks")}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {totalPages > 1 && (
        <div className={styles.pagination}>
          <Button
            className={styles.pageButton}
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            disabled={currentPage === 1}
          >
            {t("pagination.previous")}
          </Button>
          <span className={styles.pageInfo}>
            {t("pagination.pageInfo", {
              current: currentPage,
              total: totalPages,
            })}
          </span>
          <Button
            className={styles.pageButton}
            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
          >
            {t("pagination.next")}
          </Button>
        </div>
      )}
    </div>
  );
}
