import React, { useEffect, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { useAppSelector, useAppDispatch } from "@/store/hooks";
import { fetchTasksAsync } from "@/store/slices/taskSlice";
import {
  TASK_STATUS,
  TASK_PRIORITY,
  type Task,
} from "@/api/tasks/taskController";
import styles from "./Dashboard.module.css";
import { isToday } from "@/utils/date";
import { StatsOverview } from "./components/StatsOverview/StatsOverview";
import { PriorityDistribution } from "./components/PriorityDistribution/PriorityDistribution";
import { DashboardSkeleton } from "./components/DashboardSkeleton/DashboardSkeleton";
import { RecentTasksTable } from "./components/RecentTasksTable/RecentTasksTable";

const Dashboard: React.FC = () => {
  const { t } = useTranslation();
  const { user } = useAppSelector((state) => state.auth);
  const { tasks, isLoading, error } = useAppSelector((state) => state.tasks);
  const dispatch = useAppDispatch();

  // Statistics calculations gathered in one place using reduce and useMemo
  const {
    pendingCount,
    todayApproved,
    todayRejected,
    priorityCounts,
    recentPendingTasks,
  } = useMemo(() => {
    const stats = tasks.reduce<{
      pendingCount: number;
      todayApproved: number;
      todayRejected: number;
      pendingTasks: Task[];
      priorityCounts: {
        [TASK_PRIORITY.URGENT]: number;
        [TASK_PRIORITY.HIGH]: number;
        [TASK_PRIORITY.NORMAL]: number;
        [TASK_PRIORITY.LOW]: number;
      };
    }>(
      (acc, task) => {
        const isTaskToday = isToday(task.createdAt);

        if (task.status === TASK_STATUS.PENDING) {
          acc.pendingCount++;
          acc.pendingTasks.push(task);
          acc.priorityCounts[
            task.priority as keyof typeof acc.priorityCounts
          ]++;
        } else if (isTaskToday) {
          if (task.status === TASK_STATUS.APPROVED) acc.todayApproved++;
          if (task.status === TASK_STATUS.REJECTED) acc.todayRejected++;
        }

        return acc;
      },
      {
        pendingCount: 0,
        todayApproved: 0,
        todayRejected: 0,
        pendingTasks: [],
        priorityCounts: {
          [TASK_PRIORITY.URGENT]: 0,
          [TASK_PRIORITY.HIGH]: 0,
          [TASK_PRIORITY.NORMAL]: 0,
          [TASK_PRIORITY.LOW]: 0,
        },
      },
    );

    const sortedPending = [...stats.pendingTasks]
      .sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
      )
      .slice(0, 10);

    return {
      pendingCount: stats.pendingCount,
      todayApproved: stats.todayApproved,
      todayRejected: stats.todayRejected,
      priorityCounts: stats.priorityCounts,
      recentPendingTasks: sortedPending,
    };
  }, [tasks]);

  useEffect(() => {
    const promise = dispatch(fetchTasksAsync());

    return () => {
      promise.abort();
    };
  }, [dispatch]);

  return (
    <div className={styles.dashboardContainer}>
      <header className={styles.welcomeSection}>
        <h1>{t("common.dashboard")}</h1>
        <p>{t("dashboard.welcome", { name: user?.name })}</p>
      </header>
      {isLoading ? (
        <DashboardSkeleton />
      ) : (
        <>
          {error && <div className={styles.error}>{t(error)}</div>}
          <StatsOverview
            pendingCount={pendingCount}
            todayApproved={todayApproved}
            todayRejected={todayRejected}
          />
          <PriorityDistribution priorityCounts={priorityCounts} />
          <RecentTasksTable tasks={recentPendingTasks} />
        </>
      )}
    </div>
  );
};

export default Dashboard;
