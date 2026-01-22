import React from "react";
import { Skeleton } from "@case-study/ui";
import styles from "../../Dashboard.module.css";

export const DashboardSkeleton: React.FC = () => {
  return (
    <>
      <div className={styles.statsGrid}>
        <Skeleton height="100px" borderRadius="0.75rem" count={4} />
      </div>

      <section className={styles.recentSection}>
        <Skeleton width="180px" height="1.5rem" />
        <div className={styles.tableWrapper} style={{ marginTop: "1rem" }}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th colSpan={6} style={{ padding: 0 }}>
                  <Skeleton height="40px" />
                </th>
              </tr>
            </thead>
            <tbody>
              {Array.from({ length: 5 }).map((_, i) => (
                <tr key={i}>
                  <td colSpan={6}>
                    <Skeleton height="2.5rem" />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </>
  );
};
