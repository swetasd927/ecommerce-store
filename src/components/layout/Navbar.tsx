import { useEffect, useRef, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Drawer, Avatar, Badge, Input, Dropdown, Button, Modal } from "antd";
import type { MenuProps } from "antd";
import {
  ShoppingCartOutlined,
  UserOutlined,
  LogoutOutlined,
  MenuOutlined,
  SearchOutlined,
  BulbOutlined,
  BulbFilled,
  DownOutlined,
} from "@ant-design/icons";

import { useAuth } from "../../hooks/useAuth";
import { useCart } from "../../hooks/useCart";
import { useTheme } from "../../hooks/useTheme";
import { cn } from "../../lib/cn";

import { Popover } from "antd";
import { SettingOutlined } from "@ant-design/icons";
import ThemeCustomizer from "../../settings/themeCustomizer";

const SEARCH_DEBOUNCE_MS = 400;

function Navbar() {
  const { user, logout } = useAuth();
  const { totalItems } = useCart();
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  const initialQuery = new URLSearchParams(location.search).get("q") ?? "";
  const [query, setQuery] = useState(initialQuery);
  const searchTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleSearchChange = (value: string) => {
    setQuery(value);

    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current);
    }

    searchTimeoutRef.current = setTimeout(() => {
      const trimmed = value.trim();
      const params = new URLSearchParams(
        location.pathname === "/" ? location.search : "",
      );

      if (trimmed) {
        params.set("q", trimmed);
      } else {
        params.delete("q");
      }

      navigate({ pathname: "/", search: params.toString() }, { replace: true });
    }, SEARCH_DEBOUNCE_MS);
  };

  useEffect(() => {
    return () => {
      if (searchTimeoutRef.current) {
        clearTimeout(searchTimeoutRef.current);
      }
    };
  }, []);

  const handleLogout = () => {
  Modal.confirm({
    title: "Log out?",
    content: "Are you sure you want to log out of your account?",
    okText: "Yes, Logout",
    cancelText: "Cancel",
    centered: true,
    okButtonProps: {
      danger: true,
    },
    onOk: () => {
      logout();
      navigate("/login", { replace: true });
    },
  });
};

  const isCartActive = location.pathname === "/cart";

  const accountMenuItems: MenuProps["items"] = [
    {
      key: "profile",
      label: "Profile",
      icon: <UserOutlined />,
      onClick: () => navigate("/profile"),
    },
    { type: "divider" },
    {
      key: "logout",
      label: "Logout",
      icon: <LogoutOutlined />,
      danger: true,
      onClick: handleLogout,
    },
  ];

  return (
    <header className="surface-header border-surface sticky top-0 z-50 border-b backdrop-blur">
      <nav className="mx-auto flex h-16 max-w-[95%] items-center px-2">
        {/* Left: logo, pinned to the far left */}
        <Link
          to="/"
          className="flex shrink-0 items-center gap-2 font-display text-lg font-extrabold text-brand-600 hover:text-brand-700"
        >
          <ShoppingCartOutlined className="text-xl" />
          <span>E-Shop</span>
        </Link>

        {/* Center: search bar, grows to fill the space between logo and icons */}
        <div className="hidden flex-1 justify-center px-8 md:flex">
          <div className="w-full max-w-4xl">
            <Input
              value={query}
              onChange={(e) => handleSearchChange(e.target.value)}
              placeholder="Search for products, brands and more"
              prefix={<SearchOutlined className="text-gray-400" />}
              allowClear
              className="rounded-full!"
            />
          </div>
        </div>

        <div className="flex-1 md:hidden" />

        {/* Right: theme toggle, cart, account - icon-only, pinned right */}
        <div className="hidden shrink-0 items-center gap-6 md:flex">
          <button
            type="button"
            onClick={toggleTheme}
            aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
            className="icon-btn"
          >
            {theme === "light" ? <BulbOutlined /> : <BulbFilled />}
          </button>

          <Link
            to="/cart"
            aria-label="Cart"
            className={cn(
              "icon-btn",
              isCartActive &&
                "bg-brand-50 text-brand-600 dark:bg-brand-500/10 dark:text-brand-500",
            )}
          >
            <Badge count={totalItems} size="small" offset={[2, -2]}>
              <ShoppingCartOutlined />
            </Badge>
          </Link>

          {user && (
            <Dropdown
              menu={{ items: accountMenuItems }}
              trigger={["hover"]}
              placement="bottomRight"
            >
              <button
                type="button"
                aria-label="Account menu"
                className="icon-btn w-auto! gap-3 px-2"
              >
                <Avatar size="small" icon={<UserOutlined />} />
                <DownOutlined className="text-xs" />
              </button>
            </Dropdown>
          )}
        </div>

        {/* Mobile menu trigger */}
        <button
          type="button"
          aria-label="Open menu"
          className="flex shrink-0 items-center justify-center rounded-md p-2 text-ink-600 hover:bg-gray-100 dark:text-ink-400 dark:hover:bg-gray-800 md:hidden"
          onClick={() => setMobileOpen(true)}
        >
          <MenuOutlined className="text-xl" />
        </button>
      </nav>

      {/* Mobile search (below the bar, always visible on small screens) */}
      <div className="border-t border-gray-100 px-4 py-2 dark:border-gray-800 md:hidden">
        <Input
          value={query}
          onChange={(e) => handleSearchChange(e.target.value)}
          placeholder="Search products"
          prefix={<SearchOutlined className="text-gray-400" />}
          allowClear
          className="rounded-full!"
        />
      </div>

      {/* Mobile drawer */}
      <Drawer
        title="Menu"
        placement="right"
        open={mobileOpen}
        onClose={() => setMobileOpen(false)}
        width={280}
      >
        <div className="flex flex-col gap-1">
          {user && (
            <div className="mb-4 flex items-center gap-3 rounded-md bg-gray-50 p-3 dark:bg-gray-800">
              <Avatar icon={<UserOutlined />} />
              <span className="font-medium text-ink-900 dark:text-ink-dark">
                {user.username}
              </span>
            </div>
          )}

          <Link
            to="/"
            onClick={() => setMobileOpen(false)}
            className={cn(
              "rounded-md px-3 py-2 text-sm font-medium",
              location.pathname === "/"
                ? "bg-brand-50 text-brand-600"
                : "text-ink-600 hover:bg-gray-100 dark:text-ink-400 dark:hover:bg-gray-800",
            )}
          >
            Home
          </Link>

          <Link
            to="/cart"
            onClick={() => setMobileOpen(false)}
            className={cn(
              "flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium",
              isCartActive
                ? "bg-brand-50 text-brand-600"
                : "text-ink-600 hover:bg-gray-100 dark:text-ink-400 dark:hover:bg-gray-800",
            )}
          >
            <Badge count={totalItems} size="small" offset={[6, -2]}>
              Cart
            </Badge>
          </Link>

          <button
            type="button"
            onClick={() => {
              navigate("/profile");
              setMobileOpen(false);
            }}
            className="flex items-center gap-3 rounded-md px-3 py-2 text-left text-sm font-medium text-ink-600 hover:bg-gray-100 dark:text-ink-400 dark:hover:bg-gray-800"
          >
            <UserOutlined /> Profile
          </button>

          <Popover
            content={<ThemeCustomizer />}
            trigger="click"
            placement="bottomRight"
            arrow={false}
          >
            <button
              type="button"
              aria-label="Customize theme"
              className="icon-btn"
            >
              <SettingOutlined />
            </button>
          </Popover>

          <button
            type="button"
            onClick={toggleTheme}
            className="mt-2 flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium text-ink-600 hover:bg-gray-100 dark:text-ink-400 dark:hover:bg-gray-800"
          >
            {theme === "light" ? <BulbOutlined /> : <BulbFilled />}
            {theme === "light" ? "Dark mode" : "Light mode"}
          </button>

          <Button
            danger
            block
            icon={<LogoutOutlined />}
            className="mt-4"
            onClick={() => {
              setMobileOpen(false);
              handleLogout();
            }}
          >
            Logout
          </Button>
        </div>
      </Drawer>
    </header>
  );
}

export default Navbar;
