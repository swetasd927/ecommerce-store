import { useEffect, useRef, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Button, Drawer, Avatar, Badge, Input } from "antd";
import {
  ShoppingCartOutlined,
  UserOutlined,
  LogoutOutlined,
  SettingOutlined,
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
    logout();
    navigate("/login", { replace: true });
  };

  const isActive = (to: string) => location.pathname === to;

  return (
    <header className="surface-header border-surface sticky top-0 z-50 border-b backdrop-blur">
      <nav className="mx-auto flex h-16 max-w-7xl items-center px-4 sm:px-6 lg:px-8">
        {/* Left: logo, pinned to the far left */}
        <Link
          to="/"
          className="flex flex-shrink-0 items-center gap-2 font-display text-lg font-extrabold text-brand-600 hover:text-brand-700"
        >
          <ShoppingCartOutlined className="text-xl" />
          <span>E-Shop</span>
        </Link>

        {/* Center: search bar, grows to fill the space between logo and nav */}
        <div className="hidden flex-1 justify-center px-8 md:flex">
          <div className="w-full max-w-md">
            <Input
              value={query}
              onChange={(e) => handleSearchChange(e.target.value)}
              placeholder="Search for products, brands and more"
              prefix={<SearchOutlined className="text-gray-400" />}
              allowClear
              className="!rounded-full"
            />
          </div>
        </div>

        <div className="flex-1 md:hidden" />

        {/* Right: nav links, theme toggle, account, logout - grouped and pinned right */}
        <div className="hidden flex-shrink-0 items-center gap-1 md:flex">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={cn(
                "rounded-full px-3 py-1.5 text-sm font-medium transition-colors",
                isActive(link.to)
                  ? "bg-brand-50 text-brand-600 dark:bg-brand-500/10 dark:text-brand-500"
                  : "text-ink-600 hover:bg-gray-100 dark:text-ink-400 dark:hover:bg-gray-800",
              )}
            >
              {link.to === "/cart" ? (
                <Badge count={totalItems} size="small" offset={[8, -2]}>
                  {link.label}
                </Badge>
              ) : (
                link.label
              )}
            </Link>
          ))}

          <button
            type="button"
            onClick={toggleTheme}
            aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
            className="ml-1 flex h-9 w-9 items-center justify-center rounded-full text-lg text-ink-600 transition-colors hover:bg-gray-100 dark:text-ink-400 dark:hover:bg-gray-800"
          >
            {theme === "light" ? <BulbOutlined /> : <BulbFilled />}
          </button>

          {/* divider between nav/theme group and account group */}
          <span className="border-surface mx-2 h-6 w-px border-l" aria-hidden="true" />

          {user && (
            <span className="flex items-center gap-2 rounded-full px-2 py-1 text-sm font-medium text-ink-600 dark:text-ink-400">
              <Avatar size="small" icon={<UserOutlined />} />
              <span className="max-w-[9rem] truncate">{user.username}</span>
            </span>
          )}

          <Button
            icon={<LogoutOutlined />}
            onClick={handleLogout}
            className="!ml-1 !rounded-full !border-gray-200 !text-ink-600 hover:!border-accent-500 hover:!text-accent-600 dark:!border-gray-700 dark:!text-ink-400"
          >
            Logout
          </Button>
        </div>

        {/* Mobile menu trigger */}
        <button
          type="button"
          aria-label="Open menu"
          className="flex flex-shrink-0 items-center justify-center rounded-md p-2 text-ink-600 hover:bg-gray-100 dark:text-ink-400 dark:hover:bg-gray-800 md:hidden"
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
          className="!rounded-full"
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
              <span className="font-medium text-ink-900 dark:text-ink-dark">{user.username}</span>
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
              message.info("Profile page");
              setMobileOpen(false);
            }}
            className="flex items-center gap-3 rounded-md px-3 py-2 text-left text-sm font-medium text-ink-600 hover:bg-gray-100 dark:text-ink-400 dark:hover:bg-gray-800"
          >
            <UserOutlined /> Profile
          </button>

          <button
            type="button"
            onClick={() => {
              message.info("Settings page");
              setMobileOpen(false);
            }}
            className="flex items-center gap-2 rounded-md px-3 py-2 text-left text-sm font-medium text-ink-600 hover:bg-gray-100 dark:text-ink-400 dark:hover:bg-gray-800"
          >
            <SettingOutlined /> Settings
          </button>

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