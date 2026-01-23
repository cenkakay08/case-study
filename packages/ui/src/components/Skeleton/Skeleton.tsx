import React from "react";
import "./Skeleton.css";

interface SkeletonProps {
  width?: string | number;
  height?: string | number;
  borderRadius?: string | number;
  className?: string;
  count?: number;
}

export const Skeleton: React.FC<SkeletonProps> = ({
  width,
  height,
  borderRadius,
  className = "",
  count = 1,
}) => {
  const style: React.CSSProperties = {
    width: width,
    height: height,
    borderRadius: borderRadius,
  };

  const skeletons = Array.from({ length: count }).map((_, index) => (
    <div key={index} className={`ui-skeleton ${className}`} style={style} />
  ));

  return <>{skeletons}</>;
};
