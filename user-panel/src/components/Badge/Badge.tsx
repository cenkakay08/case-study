import React from "react";
import styles from "./Badge.module.css";

export type BadgeType =
  | "low"
  | "normal"
  | "high"
  | "urgent"
  | "pending"
  | "approved"
  | "rejected";

interface BadgeProps {
  type: BadgeType;
  children: React.ReactNode;
}

export const Badge: React.FC<BadgeProps> = ({ type, children }) => {
  return <span className={`${styles.badge} ${styles[type]}`}>{children}</span>;
};
