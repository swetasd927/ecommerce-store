import { useNavigate } from "react-router-dom";
import { useLogin } from "../hooks/useLogin";

import {
  Button,
  Card,
  Form,
  Input,
  Tabs,
  Typography,
  message,
} from "antd";

import {
  UserOutlined,
  MailOutlined,
  LockOutlined,
} from "@ant-design/icons";

const { Title, Text } = Typography;

function Login() {
  const [messageApi, contextHolder] =
    message.useMessage();

    const navigate = useNavigate();

const { mutate, isPending } = useLogin();

const handleLogin = (values: {
  username: string;
  password: string;
}) => {
  mutate(values, {
    onSuccess: (data) => {
      localStorage.setItem("token", data.token);

      messageApi.success("Login Successful!");

      navigate("/home");
    },

    onError: () => {
      messageApi.error(
        "Invalid username or password."
      );
    },
  });
};

  const handleSignup = () => {
    messageApi.info(
      "Registration is unavailable because FakeStore API only supports login."
    );
  };

  return (
    <>
      {contextHolder}

      <div className="min-h-screen bg-slate-100 flex items-center justify-center p-6">

        <div className="grid md:grid-cols-2 max-w-6xl w-full bg-white rounded-2xl shadow-xl overflow-hidden">

          {/* Left Section */}

          <div className="bg-blue-600 p-12 flex flex-col justify-center text-white">

            <Title
              level={2}
              style={{ color: "white" }}
            >
              E-Commerce Store
            </Title>

            <Text
              style={{
                color: "rgba(255,255,255,0.9)",
                fontSize: 18,
              }}
            >
              Discover thousands of amazing
              products at the best prices.
            </Text>

          </div>

          {/* Right Section */}

          <div className="p-10">

            <Card variant="borderless">

              <Tabs
                defaultActiveKey="signin"
                centered
                items={[
                  {
                    key: "signin",
                    label: "Sign In",

                    children: (

                      <Form
                        layout="vertical"
                        onFinish={handleLogin}
                      >

                        <Form.Item
                          label="Username"
                          name="username"
                          rules={[
                            {
                              required: true,
                              message:
                                "Please enter your username",
                            },
                            {
                              min: 4,
                              message:
                                "Username must be at least 4 characters",
                            },
                            {
                              pattern:
                                /^[A-Za-z0-9_]+$/,
                              message:
                                "Only letters, numbers and underscore are allowed",
                            },
                          ]}
                        >
                          <Input
                            prefix={<UserOutlined />}
                            placeholder="mor_2314"
                          />
                        </Form.Item>

                        <Form.Item
                          label="Password"
                          name="password"
                          rules={[
                            {
                              required: true,
                              message:
                                "Please enter your password",
                            },
                            {
                              min: 6,
                              message:
                                "Password must be at least 6 characters",
                            },
                          ]}
                        >
                          <Input.Password
                            prefix={<LockOutlined />}
                            placeholder="********"
                          />
                        </Form.Item>

                        <Button
  htmlType="submit"
  type="primary"
  block
  loading={isPending}
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

                      <Form
                        layout="vertical"
                        onFinish={handleSignup}
                      >

                        <Form.Item
                          label="Full Name"
                          name="name"
                          rules={[
                            {
                              required: true,
                              message:
                                "Please enter your full name",
                            },
                            {
                              min: 3,
                              message:
                                "Name must be at least 3 characters",
                            },
                            {
                              pattern:
                                /^[A-Za-z ]+$/,
                              message:
                                "Name should contain only letters",
                            },
                          ]}
                        >
                          <Input
                            prefix={<UserOutlined />}
                            placeholder="John Doe"
                          />
                        </Form.Item>

                        <Form.Item
                          label="Email"
                          name="email"
                          rules={[
                            {
                              required: true,
                              message:
                                "Please enter your email",
                            },
                            {
                              type: "email",
                              message:
                                "Please enter a valid email",
                            },
                          ]}
                        >
                          <Input
                            prefix={<MailOutlined />}
                            placeholder="john@example.com"
                          />
                        </Form.Item>

                        <Form.Item
                          label="Password"
                          name="password"
                          rules={[
                            {
                              required: true,
                              message:
                                "Please enter a password",
                            },
                            {
                              min: 8,
                              message:
                                "Password must be at least 8 characters",
                            },
                            {
                              pattern:
                                /^(?=.*[A-Za-z])(?=.*\d).+$/,
                              message:
                                "Password must contain at least one letter and one number",
                            },
                          ]}
                        >
                          <Input.Password
                            prefix={<LockOutlined />}
                            placeholder="********"
                          />
                        </Form.Item>

                        <Form.Item
                          label="Confirm Password"
                          name="confirmPassword"
                          dependencies={[
                            "password",
                          ]}
                          rules={[
                            {
                              required: true,
                              message:
                                "Please confirm your password",
                            },
                            ({
                              getFieldValue,
                            }) => ({
                              validator(
                                _,
                                value
                              ) {
                                if (
                                  !value ||
                                  getFieldValue(
                                    "password"
                                  ) === value
                                ) {
                                  return Promise.resolve();
                                }

                                return Promise.reject(
                                  new Error(
                                    "Passwords do not match"
                                  )
                                );
                              },
                            }),
                          ]}
                        >
                          <Input.Password
                            prefix={<LockOutlined />}
                            placeholder="********"
                          />
                        </Form.Item>

                        <Button
                          htmlType="submit"
                          type="primary"
                          block
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
    </>
  );
}

export default Login;