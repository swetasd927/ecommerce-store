import type { ReactNode } from "react";
import { ConfigProvider, theme as antdTheme } from "antd";

import { useTheme } from "../hooks/useTheme";

function AntdThemeBridge({ children }: { children: ReactNode }) {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  return (
    <ConfigProvider
      theme={{
        algorithm: isDark ? antdTheme.darkAlgorithm : antdTheme.defaultAlgorithm,
        token: {
          colorPrimary: "#2541b2",
          borderRadius: 8,
          colorBgContainer: isDark ? "#111827" : "#ffffff",
          colorBgElevated: isDark ? "#111827" : "#ffffff",
          colorBgLayout: isDark ? "#0b0f19" : "#f4f5f7",
        },
      }}
    >
      {children}
    </ConfigProvider>
  );
}

export default AntdThemeBridge;