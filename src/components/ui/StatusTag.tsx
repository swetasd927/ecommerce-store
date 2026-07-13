import type { ReactNode } from "react";

import { cn } from "../../lib/cn";
import type { StatusKind } from "../../lib/statusUtils";

const STATUS_CLASS: Record<StatusKind, string> = {
  success: "status-success",
  danger: "status-danger",
  warning: "status-warning",
  neutral: "status-neutral",
};

const STATUS_DOT: Record<StatusKind, string> = {
  success: "bg-success-500",
  danger: "bg-danger-500",
  warning: "bg-warning-500",
  neutral: "bg-neutral-500",
};

export interface StatusTagProps {
  status: StatusKind;
  children: ReactNode;
}

function StatusTag({ status, children }: StatusTagProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium",
        STATUS_CLASS[status],
      )}
    >
      <span className={cn("h-1.5 w-1.5 rounded-full", STATUS_DOT[status])} />
      {children}
    </span>
  );
}

export default StatusTag;