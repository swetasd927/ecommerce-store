import { useState } from "react";
import { Form, Input, message } from "antd";
import { MailOutlined, PhoneOutlined, EnvironmentOutlined } from "@ant-design/icons";

import Button from "../components/ui/Button";

interface ContactFormValues {
  name: string;
  email: string;
  message: string;
}

function Contact() {
  const [form] = Form.useForm<ContactFormValues>();
  const [submitting, setSubmitting] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSubmit = () => {
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      setSent(true);
      form.resetFields();
      message.success("Message sent! We'll get back to you soon.");
    }, 700);
  };

  return (
    <div className="mx-auto max-w-4xl p-4 sm:p-8">
      <h1 className="font-display mb-2 text-2xl font-extrabold text-ink-900 dark:text-ink-dark sm:text-3xl">
        Contact Us
      </h1>
      <p className="mb-6 text-sm text-ink-600 dark:text-ink-400">
        Have a question about an order, a product, or anything else? Send us a
        message and we'll get back to you.
      </p>

      <div className="flex flex-col gap-6 lg:flex-row lg:items-start">
        <div className="flex-1 rounded-xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-gray-900">
          {sent ? (
            <div className="flex flex-col items-center gap-2 py-10 text-center">
              <h2 className="text-lg font-bold text-ink-900 dark:text-ink-dark">
                Thanks for reaching out!
              </h2>
              <p className="text-sm text-ink-600 dark:text-ink-400">
                We've received your message and will reply within 1-2 business days.
              </p>
              <Button variant="outline" className="mt-4" onClick={() => setSent(false)}>
                Send another message
              </Button>
            </div>
          ) : (
            <Form form={form} layout="vertical" onFinish={handleSubmit}>
              <Form.Item
                label="Full name"
                name="name"
                rules={[{ required: true, message: "Please enter your name" }]}
              >
                <Input placeholder="Jane Doe" />
              </Form.Item>

              <Form.Item
                label="Email"
                name="email"
                rules={[
                  { required: true, message: "Please enter your email" },
                  { type: "email", message: "Enter a valid email" },
                ]}
              >
                <Input placeholder="you@example.com" />
              </Form.Item>

              <Form.Item
                label="Message"
                name="message"
                rules={[{ required: true, message: "Please enter a message" }]}
              >
                <Input.TextArea rows={5} placeholder="How can we help?" />
              </Form.Item>

              <Button
                type="submit"
                variant="primary"
                size="lg"
                fullWidth
                disabled={submitting}
                className="mt-2"
              >
                {submitting ? "Sending…" : "Send Message"}
              </Button>
            </Form>
          )}
        </div>

        <div className="w-full shrink-0 lg:sticky lg:top-24 lg:w-72">
          <div className="rounded-xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-gray-900">
            <h2 className="font-display text-base font-bold uppercase tracking-wide text-ink-600 dark:text-ink-400">
              Get in touch
            </h2>

            <div className="mt-4 flex flex-col gap-4 text-sm text-ink-600 dark:text-ink-400">
              <div className="flex items-start gap-3">
                <MailOutlined className="mt-0.5 text-brand-500" />
                <div>
                  <p className="font-medium text-ink-900 dark:text-ink-dark">Email</p>
                  <p>support@e-shop.com</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <PhoneOutlined className="mt-0.5 text-brand-500" />
                <div>
                  <p className="font-medium text-ink-900 dark:text-ink-dark">Phone</p>
                  <p>+1 (555) 123-4567</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <EnvironmentOutlined className="mt-0.5 text-brand-500" />
                <div>
                  <p className="font-medium text-ink-900 dark:text-ink-dark">Address</p>
                  <p>123 Market Street, San Francisco, CA</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Contact;