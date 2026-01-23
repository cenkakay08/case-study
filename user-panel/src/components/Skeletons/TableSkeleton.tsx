import React from "react";
import { Skeleton } from "@case-study/ui";

interface TableSkeletonProps {
  columns: number;
  rows?: number;
}

export const TableSkeleton: React.FC<TableSkeletonProps> = ({
  columns,
  rows = 5,
}) => {
  return (
    <>
      {Array.from({ length: rows }).map((_, rowIndex) => (
        <tr key={rowIndex}>
          {Array.from({ length: columns }).map((_, colIndex) => (
            <td key={colIndex}>
              <Skeleton height="1.25rem" width="80%" />
            </td>
          ))}
        </tr>
      ))}
    </>
  );
};
