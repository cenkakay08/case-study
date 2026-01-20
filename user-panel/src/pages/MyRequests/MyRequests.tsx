import { useEffect, useState, useMemo } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { fetchTasksAsync } from "@/store/slices/taskSlice";
import { Badge } from "@/components/Badge/Badge";
import * as Select from "@/components/Select/Select";
import styles from "./MyRequests.module.css";

const STATUS_FILTERS = [
  { value: "all", label: "Tüm Durumlar" },
  { value: "pending", label: "Bekleyenler" },
  { value: "approved", label: "Onaylananlar" },
  { value: "rejected", label: "Reddedilenler" },
];

export default function MyRequests() {
  const dispatch = useAppDispatch();
  const { tasks, isLoading } = useAppSelector((state) => state.tasks);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

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

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("tr-TR", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.title}>Taleplerim</h1>
        <p className={styles.subtitle}>
          Oluşturduğunuz taleplerin güncel durumunu buradan takip edebilirsiniz
        </p>
      </header>

      <div className={styles.controls}>
        <div className={styles.searchWrapper}>
          <input
            type="text"
            placeholder="Talep ara..."
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
              <Select.Value placeholder="Durum Filtresi">
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
              <th>Talep</th>
              <th>Kategori</th>
              <th>Öncelik</th>
              <th>Durum</th>
              <th>Tarih</th>
            </tr>
          </thead>
          <tbody>
            {filteredTasks.length > 0 ? (
              filteredTasks.map((task) => (
                <tr key={task.id}>
                  <td>
                    <span className={styles.taskTitle}>{task.title}</span>
                    <span className={styles.taskCategory}>{task.category}</span>
                  </td>
                  <td>{task.category}</td>
                  <td>
                    <Badge type={task.priority}>{task.priority}</Badge>
                  </td>
                  <td>
                    <Badge type={task.status}>{task.status}</Badge>
                  </td>
                  <td>{formatDate(task.createdAt)}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className={styles.emptyState}>
                  {isLoading ? "Yükleniyor..." : "Talep bulunamadı."}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
