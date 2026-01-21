import { useEffect, useState, useMemo } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { fetchTasksAsync } from "@/store/slices/taskSlice";
import { Badge, Select, Dialog } from "@case-study/ui";
import type { Task } from "@/api/tasks/taskController";
import styles from "./AllRequests.module.css";
import { useTranslation } from "react-i18next";
import { formatDate } from "@/utils/date";
import { TASK_STATUS } from "@/api/tasks/taskController";

const ITEMS_PER_PAGE = 10;

export default function AllRequests() {
  const { t, i18n } = useTranslation();
  const dispatch = useAppDispatch();
  const { tasks, isLoading } = useAppSelector((state) => state.tasks);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [priorityFilter, setPriorityFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);

  // Detail dialog state
  const [detailDialogOpen, setDetailDialogOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);

  const STATUS_FILTERS = [
    { value: "all", label: t("status.all") },
    { value: TASK_STATUS.PENDING, label: t("status.pending") },
    { value: TASK_STATUS.APPROVED, label: t("status.approved") },
    { value: TASK_STATUS.REJECTED, label: t("status.rejected") },
  ];

  const PRIORITY_FILTERS = [
    { value: "all", label: t("filters.allPriorities") },
    { value: "urgent", label: t("priorities.urgent") },
    { value: "high", label: t("priorities.high") },
    { value: "normal", label: t("priorities.normal") },
    { value: "low", label: t("priorities.low") },
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
        task.createdBy.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus =
        statusFilter === "all" || task.status === statusFilter;
      const matchesPriority =
        priorityFilter === "all" || task.priority === priorityFilter;
      return matchesSearch && matchesStatus && matchesPriority;
    });
  }, [tasks, searchTerm, statusFilter, priorityFilter]);

  // Pagination
  const totalPages = Math.ceil(filteredTasks.length / ITEMS_PER_PAGE);
  const paginatedTasks = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredTasks.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [filteredTasks, currentPage]);

  // Reset to first page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, statusFilter, priorityFilter]);

  const handleViewDetail = (task: Task) => {
    setSelectedTask(task);
    setDetailDialogOpen(true);
  };

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.title}>{t("allRequests.title")}</h1>
        <p className={styles.subtitle}>{t("allRequests.subtitle")}</p>
      </header>

      <div className={styles.controls}>
        <div className={styles.searchWrapper}>
          <input
            type="text"
            placeholder={t("allRequests.searchPlaceholder")}
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
            <Select.Trigger style={{ minWidth: "10rem" }}>
              <Select.Value>
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
        </div>
      </div>

      <div className={styles.tableContainer}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>{t("requests.table.title")}</th>
              <th>{t("requests.table.owner")}</th>
              <th>{t("requests.table.priority")}</th>
              <th>{t("requests.table.status")}</th>
              <th>{t("requests.table.date")}</th>
              <th className={styles.stickyColumn}>
                {t("requests.table.actions")}
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
                  <td>
                    <Badge type={task.status}>
                      {t(`status.${task.status}`)}
                    </Badge>
                  </td>
                  <td>{formatDate(task.createdAt, i18n.language)}</td>
                  <td className={styles.stickyColumn}>
                    <button
                      className={styles.viewButton}
                      onClick={() => handleViewDetail(task)}
                    >
                      {t("allRequests.viewDetail")}
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6} className={styles.emptyState}>
                  {isLoading
                    ? t("common.loading")
                    : t("allRequests.noRequests")}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {totalPages > 1 && (
        <div className={styles.pagination}>
          <button
            className={styles.pageButton}
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            disabled={currentPage === 1}
          >
            {t("pagination.previous")}
          </button>
          <span className={styles.pageInfo}>
            {t("pagination.pageInfo", {
              current: currentPage,
              total: totalPages,
            })}
          </span>
          <button
            className={styles.pageButton}
            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
          >
            {t("pagination.next")}
          </button>
        </div>
      )}

      {/* Detail Dialog */}
      <Dialog.Root open={detailDialogOpen} onOpenChange={setDetailDialogOpen}>
        <Dialog.Portal>
          <Dialog.Backdrop />
          <Dialog.Popup>
            <Dialog.Title>{selectedTask?.title}</Dialog.Title>
            <Dialog.Description>
              {t("allRequests.detailDialog.description")}
            </Dialog.Description>
            {selectedTask && (
              <div className={styles.detailGrid}>
                <div className={styles.detailRow}>
                  <span className={styles.detailLabel}>
                    {t("requests.table.owner")}:
                  </span>
                  <span className={styles.detailValue}>
                    {selectedTask.createdBy}
                  </span>
                </div>
                <div className={styles.detailRow}>
                  <span className={styles.detailLabel}>
                    {t("requests.table.category")}:
                  </span>
                  <span className={styles.detailValue}>
                    {t(`categories.${selectedTask.category}`)}
                  </span>
                </div>
                <div className={styles.detailRow}>
                  <span className={styles.detailLabel}>
                    {t("requests.table.priority")}:
                  </span>
                  <Badge type={selectedTask.priority}>
                    {t(`priorities.${selectedTask.priority}`)}
                  </Badge>
                </div>
                <div className={styles.detailRow}>
                  <span className={styles.detailLabel}>
                    {t("requests.table.status")}:
                  </span>
                  <Badge type={selectedTask.status}>
                    {t(`status.${selectedTask.status}`)}
                  </Badge>
                </div>
                <div className={styles.detailRow}>
                  <span className={styles.detailLabel}>
                    {t("requests.table.date")}:
                  </span>
                  <span className={styles.detailValue}>
                    {formatDate(selectedTask.createdAt, i18n.language)}
                  </span>
                </div>
                <div className={styles.detailRow}>
                  <span className={styles.detailLabel}>
                    {t("allRequests.detailDialog.descriptionLabel")}:
                  </span>
                  <span className={styles.detailValue}>
                    {selectedTask.description}
                  </span>
                </div>
                {selectedTask.status === "rejected" &&
                  selectedTask.rejectionReason && (
                    <div>
                      <span className={styles.detailLabel}>
                        {t("allRequests.detailDialog.rejectionReason")}:
                      </span>
                      <div className={styles.rejectionReason}>
                        {selectedTask.rejectionReason}
                      </div>
                    </div>
                  )}
              </div>
            )}
            <div
              style={{
                display: "flex",
                justifyContent: "flex-end",
                marginTop: "1.5rem",
              }}
            >
              <Dialog.Close>
                <button className={styles.pageButton}>
                  {t("common.close")}
                </button>
              </Dialog.Close>
            </div>
          </Dialog.Popup>
        </Dialog.Portal>
      </Dialog.Root>
    </div>
  );
}
