import React from "react";
import { Skeleton } from "@case-study/ui";
import statsStyles from "../StatsOverview/StatsOverview.module.css";
import priorityStyles from "../PriorityDistribution/PriorityDistribution.module.css";
import recentStyles from "../RecentTasksTable/RecentTasksTable.module.css";

export const DashboardSkeleton: React.FC = () => {
  return (
    <>
      <div className={statsStyles.statsGrid}>
        <Skeleton height="110px" borderRadius="0.75rem" count={3} />
      </div>

      <section className={priorityStyles.prioritySection}>
        <Skeleton width="200px" height="1.25rem" />
        <div
          className={priorityStyles.priorityGrid}
          style={{ marginTop: "1.5rem" }}
        >
          <Skeleton height="85px" borderRadius="0.5rem" count={4} />
        </div>
      </section>

      <section className={recentStyles.recentSection}>
        <Skeleton width="180px" height="1.25rem" />
        <div style={{ marginTop: "1.5rem" }}>
          <Skeleton height="40px" count={6} />
        </div>
      </section>
    </>
  );
};
