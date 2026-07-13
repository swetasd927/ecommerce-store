import type { ReactNode } from "react";
import { notification } from "antd";
import {
  CheckCircleFilled,
  CloseCircleFilled,
  ExclamationCircleFilled,
  InfoCircleFilled,
  CloseOutlined,
} from "@ant-design/icons";

type ToastType = "success" | "error" | "warning" | "info";

const ICONS: Record<ToastType, ReactNode> = {
  success: <CheckCircleFilled />,
  error: <CloseCircleFilled />,
  warning: <ExclamationCircleFilled />,
  info: <InfoCircleFilled />,
};

function show(type: ToastType, content: ReactNode) {
  notification.open({
    message: content,
    icon: ICONS[type],
    closeIcon: <CloseOutlined />,
    placement: "top",
    duration: 3,
    showProgress: true,
    pauseOnHover: true,
    className: `app-toast app-toast-${type}`,
  });
}

export const toast = {
  success: (content: ReactNode) => show("success", content),
  error: (content: ReactNode) => show("error", content),
  warning: (content: ReactNode) => show("warning", content),
  info: (content: ReactNode) => show("info", content),
};