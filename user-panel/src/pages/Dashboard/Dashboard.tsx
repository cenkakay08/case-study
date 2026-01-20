import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useAppSelector, useAppDispatch } from "@/store/hooks";
import { fetchTasksAsync } from "@/store/slices/taskSlice";
import { Badge } from "@/components/Badge/Badge";
import { TaskDetailDialog } from "@/components/Dialogs/TaskDetailDialog/TaskDetailDialog";
import styles from "./Dashboard.module.css";
import { formatDate } from "@/utils/date";

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

  // Statistics calculations
  const myTasks = tasks.filter((t) => t.createdBy === user?.id);
  const totalCount = myTasks.length;
  const pendingCount = myTasks.filter((t) => t.status === "pending").length;
  const approvedCount = myTasks.filter((t) => t.status === "approved").length;
  const rejectedCount = myTasks.filter((t) => t.status === "rejected").length;

  const recentTasks = [...myTasks]
    .sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
    )
    .slice(0, 5);

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
            {t("dashboard.totalRequests")}
          </span>
          <span className={styles.statValue}>{totalCount}</span>
        </div>
        <div className={styles.statCard}>
          <span className={styles.statLabel}>
            {t("dashboard.pendingRequests")}
          </span>
          <span className={styles.statValue}>{pendingCount}</span>
        </div>
        <div className={styles.statCard}>
          <span className={styles.statLabel}>
            {t("dashboard.approvedRequests")}
          </span>
          <span className={styles.statValue}>{approvedCount}</span>
        </div>
        <div className={styles.statCard}>
          <span className={styles.statLabel}>
            {t("dashboard.rejectedRequests")}
          </span>
          <span className={styles.statValue}>{rejectedCount}</span>
        </div>
      </div>

      <section className={styles.recentSection}>
        <h2>{t("dashboard.recentRequests")}</h2>
        <div className={styles.tableWrapper}>
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
              {recentTasks.map((task) => (
                <tr key={task.id}>
                  <td>{task.title}</td>
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
              ))}
              {recentTasks.length === 0 && (
                <tr>
                  <td colSpan={6} style={{ textAlign: "center" }}>
                    {t("dashboard.noRecentRequests")}
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
