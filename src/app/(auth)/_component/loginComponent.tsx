"use client";

import React from "react";
import {
  EyeInvisibleOutlined,
  EyeTwoTone,
  MailOutlined,
  LockOutlined,
  ArrowRightOutlined,
} from "@ant-design/icons";
import { Card, Form, Input, Button, Typography, Checkbox } from "antd";
import { useRouter } from "next/navigation";

const { Title, Text } = Typography;

interface LoginData {
  email: string;
  password: string;
  remember?: boolean;
}

interface LoginProps {
  onSubmit: (data: LoginData) => void;
  isLoading?: boolean;
}

export const LoginComponent: React.FC<LoginProps> = ({
  onSubmit,
  isLoading = false,
}) => {
  const [form] = Form.useForm();

  const handleFinish = (values: LoginData) => {
    onSubmit(values);
  };

  const router = useRouter();

  return (
    <div className="max-h-screen flex items-center justify-center ">
      <Card className="w-full max-w-3xl shadow-xl rounded-2xl ">
        <div className="text-center mb-6">
          <Title
            level={3}
            className="bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent font-bold"
          >
            Welcome Back
          </Title>
          <Text type="secondary">Sign in to continue your Study Planner</Text>
        </div>

        <Form
          form={form}
          layout="vertical"
          onFinish={handleFinish}
          autoComplete="off"
        >
          <Form.Item
            name="email"
            rules={[
              { required: true, message: "Please enter your email" },
              { type: "email", message: "Please enter a valid email" },
            ]}
          >
            <Input prefix={<MailOutlined />} placeholder="Email" size="large" />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[{ required: true, message: "Please enter your password" }]}
          >
            <Input.Password
              prefix={<LockOutlined />}
              placeholder="Password"
              size="large"
              iconRender={(visible) =>
                visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
              }
            />
          </Form.Item>

          <div className="flex items-center justify-between mb-4">
            <Form.Item name="remember" valuePropName="checked" noStyle>
              <Checkbox>Remember me</Checkbox>
            </Form.Item>
            <a
              href="#"
              className="text-purple-400 hover:text-purple-300 text-sm"
            >
              Forgot password?
            </a>
          </div>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              block
              size="large"
              className="bg-gradient-to-r from-purple-500 to-pink-600 flex items-center justify-center gap-2"
              loading={isLoading}
            >
              {!isLoading && (
                <>
                  Sign In <ArrowRightOutlined />
                </>
              )}
              {isLoading && "Signing In..."}
            </Button>
          </Form.Item>
        </Form>

        <div className="mt-6 text-center">
          <Text type="secondary" className="text-sm">
            Don’t have an account?{" "}
            <button
              className="text-purple-400 hover:text-purple-300 font-medium"
              onClick={() => {
                router.push("/register");
              }}
            >
              Create one
            </button>
          </Text>
        </div>
      </Card>
    </div>
  );
};
