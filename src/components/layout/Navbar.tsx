// import { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { Button, Drawer, Avatar, Dropdown, Badge } from "antd";
// import type { MenuProps } from "antd";
// import {
//   ShoppingCartOutlined,
//   UserOutlined,
//   LogoutOutlined,
//   MenuOutlined,
// } from "@ant-design/icons";

// import { useAuth } from "../../hooks/useAuth";
// import { useCart } from "../../hooks/useCart";
// import { cn } from "../../lib/cn";

// interface NavLinkItem {
//   label: string;
//   to: string;
// }

// const NAV_LINKS: NavLinkItem[] = [
//   { label: "Home", to: "/" },
//   { label: "Cart", to: "/cart" },
// ];

// function Navbar() {
//   const { user, logout } = useAuth();
//   const { totalItems } = useCart();
//   const navigate = useNavigate();
//   const [mobileOpen, setMobileOpen] = useState(false);

//   const handleLogout = () => {
//     logout();
//     navigate("/login", { replace: true });
//   };

//   const userMenuItems: MenuProps["items"] = [
//     {
//       key: "logout",
//       label: "Logout",
//       icon: <LogoutOutlined />,
//       onClick: handleLogout,
//     },
//   ];

//   return (
//     <header className="sticky top-0 z-50 border-b border-gray-200 bg-white/95 backdrop-blur">
//       <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
//         {/* Logo / title */}
//         <Link
//           to="/"
//           className="flex items-center gap-2 text-lg font-bold text-blue-600 hover:text-blue-700"
//         >
//           <ShoppingCartOutlined className="text-xl" />
//           <span>E-Shop</span>
//         </Link>

//         {/* Desktop nav links */}
//         <div className="hidden items-center gap-8 md:flex">
//           {NAV_LINKS.map((link) => (
//             <Link
//               key={link.to}
//               to={link.to}
//               className={cn(
//                 "text-sm font-medium text-gray-700 transition-colors hover:text-blue-600",
//               )}
//             >
//               {link.to === "/cart" ? (
//                 <Badge count={totalItems} size="small" offset={[8, 0]}>
//                   {link.label}
//                 </Badge>
//               ) : (
//                 link.label
//               )}
//             </Link>
//           ))}
//         </div>

//         {/* Desktop user area */}
//         <div className="hidden items-center gap-4 md:flex">
//           {user && (
//             <Dropdown menu={{ items: userMenuItems }} placement="bottomRight">
//               <button className="flex items-center gap-2 rounded-full px-2 py-1 text-sm font-medium text-gray-700 hover:bg-gray-100">
//                 <Avatar size="small" icon={<UserOutlined />} />
//                 <span>{user.username}</span>
//               </button>
//             </Dropdown>
//           )}
//           <Button danger icon={<LogoutOutlined />} onClick={handleLogout}>
//             Logout
//           </Button>
//         </div>

//         {/* Mobile menu trigger */}
//         <button
//           type="button"
//           aria-label="Open menu"
//           className="flex items-center justify-center rounded-md p-2 text-gray-700 hover:bg-gray-100 md:hidden"
//           onClick={() => setMobileOpen(true)}
//         >
//           <MenuOutlined className="text-xl" />
//         </button>
//       </nav>

//       {/* Mobile drawer */}
//       <Drawer
//         title="Menu"
//         placement="right"
//         open={mobileOpen}
//         onClose={() => setMobileOpen(false)}
//         width={280}
//       >
//         <div className="flex flex-col gap-1">
//           {user && (
//             <div className="mb-4 flex items-center gap-3 rounded-md bg-gray-50 p-3">
//               <Avatar icon={<UserOutlined />} />
//               <span className="font-medium text-gray-800">
//                 {user.username}
//               </span>
//             </div>
//           )}

//           {NAV_LINKS.map((link) => (
//             <Link
//               key={link.to}
//               to={link.to}
//               onClick={() => setMobileOpen(false)}
//               className="rounded-md px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100"
//             >
//               {link.to === "/cart" ? (
//                 <Badge count={totalItems} size="small" offset={[8, 0]}>
//                   {link.label}
//                 </Badge>
//               ) : (
//                 link.label
//               )}
//             </Link>
//           ))}

//           <Button
//             danger
//             block
//             icon={<LogoutOutlined />}
//             className="mt-4"
//             onClick={() => {
//               setMobileOpen(false);
//               handleLogout();
//             }}
//           >
//             Logout
//           </Button>
//         </div>
//       </Drawer>
//     </header>
//   );
// }

// export default Navbar;


import { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Button, Drawer, Avatar, Dropdown, Badge, Input } from "antd";
import type { MenuProps } from "antd";
import {
  ShoppingCartOutlined,
  UserOutlined,
  LogoutOutlined,
  MenuOutlined,
  SearchOutlined,
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

const SEARCH_DEBOUNCE_MS = 400;

function Navbar() {
  const { user, logout } = useAuth();
  const { totalItems } = useCart();
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  const initialQuery = new URLSearchParams(location.search).get("q") ?? "";
  const [query, setQuery] = useState(initialQuery);

  // Debounced push of the search term into the URL. Home reads `q` from
  // the URL and filters products by title, so the store owns the search
  // state rather than duplicating it in local component state.
  useEffect(() => {
    const trimmed = query.trim();
    const timer = setTimeout(() => {
      const params = new URLSearchParams(
        location.pathname === "/" ? location.search : "",
      );

      if (trimmed) {
        params.set("q", trimmed);
      } else {
        params.delete("q");
      }

      navigate({ pathname: "/", search: params.toString() }, { replace: true });
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, SEARCH_DEBOUNCE_MS);

    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query]);

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

  const isActive = (to: string) => location.pathname === to;

  return (
    <header className="sticky top-0 z-50 border-b border-gray-200 bg-white/95 backdrop-blur">
      <nav className="mx-auto flex h-16 max-w-7xl items-center gap-4 px-4 sm:px-6 lg:px-8">
        {/* Logo / title */}
        <Link
          to="/"
          className="flex flex-shrink-0 items-center gap-2 font-display text-lg font-extrabold text-brand-600 hover:text-brand-700"
        >
          <ShoppingCartOutlined className="text-xl" />
          <span>E-Shop</span>
        </Link>

        {/* Search bar */}
        <div className="hidden max-w-md flex-1 md:block">
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search for products, brands and more"
            prefix={<SearchOutlined className="text-gray-400" />}
            allowClear
            className="!rounded-full"
          />
        </div>

        <div className="flex-1 md:hidden" />

        {/* Desktop nav links */}
        <div className="hidden items-center gap-2 md:flex">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={cn(
                "rounded-full px-3 py-1.5 text-sm font-medium transition-colors",
                isActive(link.to)
                  ? "bg-brand-50 text-brand-600"
                  : "text-ink-600 hover:bg-gray-100",
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
        </div>

        {/* Desktop user area */}
        <div className="hidden items-center gap-3 md:flex">
          {user && (
            <Dropdown menu={{ items: userMenuItems }} placement="bottomRight">
              <button className="flex items-center gap-2 rounded-full px-2 py-1 text-sm font-medium text-ink-600 hover:bg-gray-100">
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
          className="flex flex-shrink-0 items-center justify-center rounded-md p-2 text-ink-600 hover:bg-gray-100 md:hidden"
          onClick={() => setMobileOpen(true)}
        >
          <MenuOutlined className="text-xl" />
        </button>
      </nav>

      {/* Mobile search (below the bar, always visible on small screens) */}
      <div className="border-t border-gray-100 px-4 py-2 md:hidden">
        <Input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
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
            <div className="mb-4 flex items-center gap-3 rounded-md bg-gray-50 p-3">
              <Avatar icon={<UserOutlined />} />
              <span className="font-medium text-ink-900">{user.username}</span>
            </div>
          )}

          {NAV_LINKS.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              onClick={() => setMobileOpen(false)}
              className={cn(
                "rounded-md px-3 py-2 text-sm font-medium",
                isActive(link.to)
                  ? "bg-brand-50 text-brand-600"
                  : "text-ink-600 hover:bg-gray-100",
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