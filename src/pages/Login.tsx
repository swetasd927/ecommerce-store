import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Button, Card, Form, Input, Tabs, Typography } from "antd";
import { UserOutlined, MailOutlined, LockOutlined } from "@ant-design/icons";
import { useLogin, useSignup } from "../hooks/useAuth";
import type { LoginCredentials, SignupPayload } from "../types/Auth";

const { Title, Text } = Typography;

interface SignupFormValues {
  firstname: string;
  lastname: string;
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

function Login() {
  const [activeTab, setActiveTab] = useState<"signin" | "signup">("signin");
  const navigate = useNavigate();
  const location = useLocation();

  const loginMutation = useLogin();
  const signupMutation = useSignup();
  const [signupForm] = Form.useForm<SignupFormValues>();

  const from = (location.state as { from?: Location })?.from?.pathname ?? "/";

  const handleLogin = (values: LoginCredentials) => {
    loginMutation.mutate(values, {
      onSuccess: () => navigate(from, { replace: true }),
    });
  };

  const handleSignup = (values: SignupFormValues) => {
    const payload: SignupPayload = {
      username: values.username,
      email: values.email,
      password: values.password,
      name: {
        firstname: values.firstname,
        lastname: values.lastname,
      },
    };

    signupMutation.mutate(payload, {
      onSuccess: () => {
        signupForm.resetFields();
        setActiveTab("signin");
      },
    });
  };

  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center p-6">
      <div className="grid md:grid-cols-2 max-w-4xl w-full bg-white rounded-2xl shadow-xl overflow-hidden">
        <div className="bg-blue-600 p-12 flex flex-col justify-center text-white">
          <Title level={2} style={{ color: "white" }}>
            E-Commerce Store
          </Title>
          <Text style={{ color: "rgba(255,255,255,0.9)", fontSize: 18 }}>
            Discover thousands of amazing products at the best prices.
          </Text>
        </div>

        <div className="p-10">
          <Card variant="borderless">
            <Tabs
              activeKey={activeTab}
              onChange={(key) => setActiveTab(key as "signin" | "signup")}
              centered
              items={[
                {
                  key: "signin",
                  label: "Sign In",
                  children: (
                    <Form layout="vertical" onFinish={handleLogin}>
                      <Form.Item
                        label="Username"
                        name="username"
                        rules={[
                          { required: true, message: "Please enter your username" },
                        ]}
                      >
                        <Input prefix={<UserOutlined />} placeholder="Enter username" />
                      </Form.Item>

                      <Form.Item
                        label="Password"
                        name="password"
                        rules={[
                          { required: true, message: "Please enter your password" },
                        ]}
                      >
                        <Input.Password prefix={<LockOutlined />} placeholder="Enter password" />
                      </Form.Item>

                      <Button
                        htmlType="submit"
                        type="primary"
                        block
                        loading={loginMutation.isPending}
                      >
                        Login
                      </Button>
                    </Form>
                  ),
                },
                {
                  key: "signup",
                  label: "Sign Up",
                  children: (
                    <Form form={signupForm} layout="vertical" onFinish={handleSignup}>
                      <Form.Item
                        label="First Name"
                        name="firstname"
                        rules={[
                          { required: true, message: "Please enter your first name" },
                          { pattern: /^[A-Za-z]+$/, message: "Only letters are allowed" },
                        ]}
                      >
                        <Input prefix={<UserOutlined />} placeholder="John" />
                      </Form.Item>

                      <Form.Item
                        label="Last Name"
                        name="lastname"
                        rules={[
                          { required: true, message: "Please enter your last name" },
                          { pattern: /^[A-Za-z]+$/, message: "Only letters are allowed" },
                        ]}
                      >
                        <Input prefix={<UserOutlined />} placeholder="Doe" />
                      </Form.Item>

                      <Form.Item
                        label="Username"
                        name="username"
                        rules={[
                          { required: true, message: "Please choose a username" },
                          { min: 4, message: "Username must be at least 4 characters" },
                        ]}
                      >
                        <Input prefix={<UserOutlined />} placeholder="Choose a username" />
                      </Form.Item>

                      <Form.Item
                        label="Email"
                        name="email"
                        rules={[
                          { required: true, message: "Please enter your email" },
                          { type: "email", message: "Enter a valid email" },
                        ]}
                      >
                        <Input prefix={<MailOutlined />} placeholder="you@example.com" />
                      </Form.Item>

                      <Form.Item
                        label="Password"
                        name="password"
                        rules={[
                          { required: true, message: "Please choose a password" },
                          { min: 6, message: "Password must be at least 6 characters" },
                        ]}
                      >
                        <Input.Password prefix={<LockOutlined />} placeholder="Choose a password" />
                      </Form.Item>

                      <Form.Item
                        label="Confirm Password"
                        name="confirmPassword"
                        dependencies={["password"]}
                        rules={[
                          { required: true, message: "Please confirm your password" },
                          ({ getFieldValue }) => ({
                            validator(_, value) {
                              if (!value || getFieldValue("password") === value) {
                                return Promise.resolve();
                              }
                              return Promise.reject(new Error("Passwords do not match"));
                            },
                          }),
                        ]}
                      >
                        <Input.Password prefix={<LockOutlined />} placeholder="Re-enter password" />
                      </Form.Item>

                      <Button
                        htmlType="submit"
                        type="primary"
                        block
                        loading={signupMutation.isPending}
                      >
                        Create Account
                      </Button>
                    </Form>
                  ),
                },
              ]}
            />
          </Card>
        </div>
      </div>
    </div>
  );
}

export default Login;