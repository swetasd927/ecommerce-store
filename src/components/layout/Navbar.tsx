import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button, Drawer, Avatar, Dropdown, Badge } from "antd";
import type { MenuProps } from "antd";
import {
  ShoppingCartOutlined,
  UserOutlined,
  LogoutOutlined,
  MenuOutlined,
} from "@ant-design/icons";

import { useAuth } from "../../hooks/useAuth";
import { useCart } from "../../hooks/useCart";
import { cn } from "../../lib/cn";

interface NavLinkItem {
  label: string;
  to: string;
}

const NAV_LINKS: NavLinkItem[] = [
  { label: "Home", to: "/" },
  { label: "Cart", to: "/cart" },
];

function Navbar() {
  const { user, logout } = useAuth();
  const { totalItems } = useCart();
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/login", { replace: true });
  };

  const userMenuItems: MenuProps["items"] = [
    {
      key: "logout",
      label: "Logout",
      icon: <LogoutOutlined />,
      onClick: handleLogout,
    },
  ];

  return (
    <header className="sticky top-0 z-50 border-b border-gray-200 bg-white/95 backdrop-blur">
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo / title */}
        <Link
          to="/"
          className="flex items-center gap-2 text-lg font-bold text-blue-600 hover:text-blue-700"
        >
          <ShoppingCartOutlined className="text-xl" />
          <span>E-Shop</span>
        </Link>

        {/* Desktop nav links */}
        <div className="hidden items-center gap-8 md:flex">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={cn(
                "text-sm font-medium text-gray-700 transition-colors hover:text-blue-600",
              )}
            >
              {link.to === "/cart" ? (
                <Badge count={totalItems} size="small" offset={[8, 0]}>
                  {link.label}
                </Badge>
              ) : (
                link.label
              )}
            </Link>
          ))}
        </div>

        {/* Desktop user area */}
        <div className="hidden items-center gap-4 md:flex">
          {user && (
            <Dropdown menu={{ items: userMenuItems }} placement="bottomRight">
              <button className="flex items-center gap-2 rounded-full px-2 py-1 text-sm font-medium text-gray-700 hover:bg-gray-100">
                <Avatar size="small" icon={<UserOutlined />} />
                <span>{user.username}</span>
              </button>
            </Dropdown>
          )}
          <Button danger icon={<LogoutOutlined />} onClick={handleLogout}>
            Logout
          </Button>
        </div>

        {/* Mobile menu trigger */}
        <button
          type="button"
          aria-label="Open menu"
          className="flex items-center justify-center rounded-md p-2 text-gray-700 hover:bg-gray-100 md:hidden"
          onClick={() => setMobileOpen(true)}
        >
          <MenuOutlined className="text-xl" />
        </button>
      </nav>

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
            <div className="mb-4 flex items-center gap-3 rounded-md bg-gray-50 p-3">
              <Avatar icon={<UserOutlined />} />
              <span className="font-medium text-gray-800">
                {user.username}
              </span>
            </div>
          )}

          {NAV_LINKS.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              onClick={() => setMobileOpen(false)}
              className="rounded-md px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100"
            >
              {link.to === "/cart" ? (
                <Badge count={totalItems} size="small" offset={[8, 0]}>
                  {link.label}
                </Badge>
              ) : (
                link.label
              )}
            </Link>
          ))}

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