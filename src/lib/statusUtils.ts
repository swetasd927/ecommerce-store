export type StatusKind = "success" | "danger" | "warning" | "neutral";

export function paymentStatusToKind(paymentStatus: string): StatusKind {
  const normalized = paymentStatus.toLowerCase();
  if (["paid", "completed", "delivered", "success"].includes(normalized)) return "success";
  if (["failed", "cancelled", "canceled", "declined", "refused"].includes(normalized)) return "danger";
  if (["pending", "processing", "awaiting"].includes(normalized)) return "warning";
  return "neutral";
}