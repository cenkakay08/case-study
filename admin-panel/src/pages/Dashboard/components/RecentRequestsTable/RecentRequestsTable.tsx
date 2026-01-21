import React from "react";
import { useTranslation } from "react-i18next";
import { Badge } from "@case-study/ui";
import { formatDate } from "@/utils/date";
import type { Task } from "@/api/tasks/taskController";
import styles from "./RecentRequestsTable.module.css";

interface RecentRequestsTableProps {
  tasks: Task[];
}

export const RecentRequestsTable: React.FC<RecentRequestsTableProps> = ({
  tasks,
}) => {
  const { t, i18n } = useTranslation();

  return (
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
            {tasks.map((task) => (
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
            {tasks.length === 0 && (
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
  );
};
