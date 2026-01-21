import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useAppSelector, useAppDispatch } from "@/store/hooks";
import { fetchTasksAsync } from "@/store/slices/taskSlice";
import { Badge } from "@case-study/ui";
import styles from "./Dashboard.module.css";
import { formatDate, isToday } from "@/utils/date";

const Dashboard: React.FC = () => {
  const { t, i18n } = useTranslation();
  const { user } = useAppSelector((state) => state.auth);
  const { tasks, isLoading, error } = useAppSelector((state) => state.tasks);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const promise = dispatch(fetchTasksAsync());

    return () => {
      promise.abort();
    };
  }, [dispatch]);

  // Statistics calculations - Admin sees all tasks
  const pendingTasks = tasks.filter((t) => t.status === "pending");
  const pendingCount = pendingTasks.length;

  // Today's stats
  const todayApproved = tasks.filter(
    (t) => t.status === "approved" && isToday(t.createdAt),
  ).length;
  const todayRejected = tasks.filter(
    (t) => t.status === "rejected" && isToday(t.createdAt),
  ).length;

  // Priority distribution
  const priorityCounts = {
    urgent: pendingTasks.filter((t) => t.priority === "urgent").length,
    high: pendingTasks.filter((t) => t.priority === "high").length,
    normal: pendingTasks.filter((t) => t.priority === "normal").length,
    low: pendingTasks.filter((t) => t.priority === "low").length,
  };

  // Recent pending tasks
  const recentPendingTasks = [...pendingTasks]
    .sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
    )
    .slice(0, 10);

  if (isLoading && tasks.length === 0) {
    return <div className={styles.loading}>{t("common.loading")}</div>;
  }

  return (
    <div className={styles.dashboardContainer}>
      <header className={styles.welcomeSection}>
        <h1>{t("common.dashboard")}</h1>
        <p>{t("dashboard.welcome", { name: user?.name })}</p>
      </header>

      {error && <div className={styles.error}>{t(error)}</div>}

      <div className={styles.statsGrid}>
        <div className={styles.statCard}>
          <span className={styles.statLabel}>
            {t("dashboard.totalPending")}
          </span>
          <span className={styles.statValue}>{pendingCount}</span>
        </div>
        <div className={styles.statCard}>
          <span className={styles.statLabel}>
            {t("dashboard.todayApproved")}
          </span>
          <span className={styles.statValue}>{todayApproved}</span>
        </div>
        <div className={styles.statCard}>
          <span className={styles.statLabel}>
            {t("dashboard.todayRejected")}
          </span>
          <span className={styles.statValue}>{todayRejected}</span>
        </div>
      </div>

      <section className={styles.prioritySection}>
        <h2>{t("dashboard.priorityDistribution")}</h2>
        <div className={styles.priorityGrid}>
          <div className={`${styles.priorityCard} ${styles.urgent}`}>
            <span className={styles.priorityCount}>
              {priorityCounts.urgent}
            </span>
            <span className={styles.priorityLabel}>
              {t("priorities.urgent")}
            </span>
          </div>
          <div className={`${styles.priorityCard} ${styles.high}`}>
            <span className={styles.priorityCount}>{priorityCounts.high}</span>
            <span className={styles.priorityLabel}>{t("priorities.high")}</span>
          </div>
          <div className={`${styles.priorityCard} ${styles.normal}`}>
            <span className={styles.priorityCount}>
              {priorityCounts.normal}
            </span>
            <span className={styles.priorityLabel}>
              {t("priorities.normal")}
            </span>
          </div>
          <div className={`${styles.priorityCard} ${styles.low}`}>
            <span className={styles.priorityCount}>{priorityCounts.low}</span>
            <span className={styles.priorityLabel}>{t("priorities.low")}</span>
          </div>
        </div>
      </section>

      <section className={styles.recentSection}>
        <h2>{t("dashboard.recentPending")}</h2>
        <div className={styles.tableWrapper}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>{t("requests.table.title")}</th>
                <th>{t("requests.table.owner")}</th>
                <th>{t("requests.table.category")}</th>
                <th>{t("requests.table.priority")}</th>
                <th>{t("requests.table.date")}</th>
              </tr>
            </thead>
            <tbody>
              {recentPendingTasks.map((task) => (
                <tr key={task.id}>
                  <td>{task.title}</td>
                  <td>{task.createdBy}</td>
                  <td>{t(`categories.${task.category}`)}</td>
                  <td>
                    <Badge type={task.priority}>
                      {t(`priorities.${task.priority}`)}
                    </Badge>
                  </td>
                  <td>{formatDate(task.createdAt, i18n.language)}</td>
                </tr>
              ))}
              {recentPendingTasks.length === 0 && (
                <tr>
                  <td colSpan={5} style={{ textAlign: "center" }}>
                    {t("dashboard.noPendingRequests")}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};

export default Dashboard;
