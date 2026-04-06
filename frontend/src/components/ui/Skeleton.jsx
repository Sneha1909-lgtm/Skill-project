import React from 'react';
import { twMerge } from 'tailwind-merge';

const Skeleton = ({ className, ...props }) => {
  return (
    <div
      className={twMerge(
        'animate-pulse rounded-xl bg-slate-200 dark:bg-white/5 shimmer',
        className
      )}
      {...props}
    />
  );
};

export const CardSkeleton = () => (
  <div className="p-6 rounded-2xl bg-white dark:bg-secondary border border-slate-200 dark:border-white/10 space-y-4">
    <div className="flex items-center gap-4">
      <Skeleton className="w-12 h-12 rounded-xl" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-24" />
        <Skeleton className="h-3 w-16" />
      </div>
    </div>
    <Skeleton className="h-10 w-full" />
    <div className="flex gap-2">
      <Skeleton className="h-8 flex-1" />
      <Skeleton className="h-8 flex-1" />
    </div>
  </div>
);

export const TableSkeleton = ({ rows = 5 }) => (
  <div className="w-full space-y-4">
    <Skeleton className="h-10 w-full rounded-xl" />
    {[...Array(rows)].map((_, i) => (
      <Skeleton key={i} className="h-16 w-full rounded-xl" />
    ))}
  </div>
);

export default Skeleton;
