import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Input, message } from "antd";
import {
  UserOutlined,
  MailOutlined,
  LogoutOutlined,
  ShoppingOutlined,
  HeartOutlined,
} from "@ant-design/icons";

import { useAuth } from "../hooks/useAuth";
import Button from "../components/ui/Button";

const DISPLAY_NAME_KEY = "profile_display_name";

interface ProfileFormValues {
  displayName: string;
  email: string;
}

function Profile() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [form] = Form.useForm<ProfileFormValues>();
  const [saving, setSaving] = useState(false);

  const initialDisplayName =
    localStorage.getItem(DISPLAY_NAME_KEY) || user?.username || "";

  const initials = initialDisplayName.slice(0, 2).toUpperCase();

  const handleSave = (values: ProfileFormValues) => {
    setSaving(true);
    localStorage.setItem(DISPLAY_NAME_KEY, values.displayName.trim());
    setTimeout(() => {
      setSaving(false);
      message.success("Profile updated");
    }, 500);
  };

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="mx-auto max-w-3xl p-4 sm:p-8">
      <h1 className="font-display mb-6 text-2xl font-extrabold text-ink-900 dark:text-ink-dark sm:text-3xl">
        Profile
      </h1>

      <div className="flex flex-col gap-6">
        {/* Identity card */}
        <div className="flex items-center gap-4 rounded-xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-gray-900">
          <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-brand-500 text-xl font-bold text-white">
            {initials || <UserOutlined />}
          </div>
          <div>
            <p className="text-lg font-bold text-ink-900 dark:text-ink-dark">
              {initialDisplayName || "Your Account"}
            </p>
            <p className="text-sm text-ink-600 dark:text-ink-400">
              @{user?.username}
            </p>
          </div>
        </div>

        {/* Quick links */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <button
            onClick={() => navigate("/checkout")}
            className="flex items-center gap-3 rounded-xl border border-gray-200 bg-white p-4 text-left transition-colors hover:border-brand-500 dark:border-gray-800 dark:bg-gray-900 dark:hover:border-brand-500"
          >
            <ShoppingOutlined className="text-xl text-brand-500" />
            <div>
              <p className="text-sm font-semibold text-ink-900 dark:text-ink-dark">
                Orders
              </p>
              <p className="text-xs text-ink-600 dark:text-ink-400">
                View your recent orders
              </p>
            </div>
          </button>

          <button
            onClick={() => navigate("/wishlist")}
            className="flex items-center gap-3 rounded-xl border border-gray-200 bg-white p-4 text-left transition-colors hover:border-brand-500 dark:border-gray-800 dark:bg-gray-900 dark:hover:border-brand-500"
          >
            <HeartOutlined className="text-xl text-brand-500" />
            <div>
              <p className="text-sm font-semibold text-ink-900 dark:text-ink-dark">
                Wishlist
              </p>
              <p className="text-xs text-ink-600 dark:text-ink-400">
                Products you've saved
              </p>
            </div>
          </button>
        </div>

        {/* Edit profile form */}
        <div className="rounded-xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-gray-900">
          <h2 className="mb-4 text-base font-bold text-ink-900 dark:text-ink-dark">
            Edit profile
          </h2>

          <Form
            form={form}
            layout="vertical"
            initialValues={{ displayName: initialDisplayName, email: "" }}
            onFinish={handleSave}
          >
            <Form.Item
              label="Display name"
              name="displayName"
              rules={[
                { required: true, message: "Please enter a display name" },
              ]}
            >
              <Input
                prefix={<UserOutlined className="text-ink-400" />}
                placeholder="Jane Doe"
              />
            </Form.Item>

            <Form.Item
              label="Email"
              name="email"
              rules={[{ type: "email", message: "Enter a valid email" }]}
            >
              <Input
                prefix={<MailOutlined className="text-ink-400" />}
                placeholder="you@example.com"
              />
            </Form.Item>

            <Button type="submit" variant="primary" disabled={saving}>
              {saving ? "Saving…" : "Save changes"}
            </Button>
          </Form>
        </div>

        {/* Logout */}
        <div className="flex justify-end">
          <Button variant="outline" onClick={handleLogout} className="gap-2">
            <LogoutOutlined /> Log out
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Profile;
