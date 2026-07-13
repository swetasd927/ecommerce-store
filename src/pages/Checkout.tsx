import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Input, Result, message } from "antd";

import { useCart } from "../hooks/useCart";
import Button from "../components/ui/Button";

interface CheckoutFormValues {
  fullName: string;
  email: string;
  address: string;
  city: string;
  postalCode: string;
  cardNumber: string;
  expiry: string;
  cvc: string;
}

function Checkout() {
  const { items, totalPrice, clearCart } = useCart();
  const navigate = useNavigate();
  const [form] = Form.useForm<CheckoutFormValues>();
  const [placed, setPlaced] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (items.length === 0 && !placed) {
      navigate("/cart", { replace: true });
    }
  }, [items.length, placed, navigate]);

  if (items.length === 0 && !placed) {
    return null;
  }

  const handleSubmit = () => {
    setSubmitting(true);
    // No real payment processor here - this just validates the form and
    // simulates placing the order.
    setTimeout(() => {
      setSubmitting(false);
      setPlaced(true);
      clearCart();
      message.success("Order placed successfully!");
    }, 700);
  };

  if (placed) {
    return (
      <div className="mx-auto max-w-2xl p-4 sm:p-8">
        <Result
          status="success"
          title="Your order is confirmed!"
          subTitle="This is a demo checkout - no payment was actually processed."
          extra={
            <Button variant="primary" onClick={() => navigate("/")}>
              Continue Shopping
            </Button>
          }
        />
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-4xl p-4 sm:p-8">
      <h1 className="font-display mb-6 text-2xl font-extrabold text-ink-900 dark:text-ink-dark sm:text-3xl">
        Checkout
      </h1>

      <div className="flex flex-col gap-6 lg:flex-row lg:items-start">
        <div className="flex-1 rounded-xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-gray-900">
          <Form form={form} layout="vertical" onFinish={handleSubmit}>
            <h2 className="mb-3 text-sm font-bold uppercase tracking-wide text-ink-600 dark:text-ink-400">
              Shipping details
            </h2>

            <Form.Item
              label="Full name"
              name="fullName"
              rules={[{ required: true, message: "Please enter your full name" }]}
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
              label="Address"
              name="address"
              rules={[{ required: true, message: "Please enter your address" }]}
            >
              <Input placeholder="123 Main Street" />
            </Form.Item>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <Form.Item
                label="City"
                name="city"
                rules={[{ required: true, message: "Required" }]}
              >
                <Input placeholder="City" />
              </Form.Item>

              <Form.Item
                label="Postal code"
                name="postalCode"
                rules={[
                  { required: true, message: "Required" },
                  { pattern: /^[A-Za-z0-9\- ]{3,10}$/, message: "Invalid postal code" },
                ]}
              >
                <Input placeholder="00000" />
              </Form.Item>
            </div>

            <h2 className="mb-3 mt-6 text-sm font-bold uppercase tracking-wide text-ink-600 dark:text-ink-400">
              Payment details
            </h2>

            <Form.Item
              label="Card number"
              name="cardNumber"
              rules={[
                { required: true, message: "Please enter your card number" },
                { pattern: /^\d{16}$/, message: "Card number must be 16 digits" },
              ]}
            >
              <Input placeholder="4242 4242 4242 4242" maxLength={16} />
            </Form.Item>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <Form.Item
                label="Expiry (MM/YY)"
                name="expiry"
                rules={[
                  { required: true, message: "Required" },
                  { pattern: /^(0[1-9]|1[0-2])\/\d{2}$/, message: "Use MM/YY format" },
                ]}
              >
                <Input placeholder="MM/YY" maxLength={5} />
              </Form.Item>

              <Form.Item
                label="CVC"
                name="cvc"
                rules={[
                  { required: true, message: "Required" },
                  { pattern: /^\d{3,4}$/, message: "Invalid CVC" },
                ]}
              >
                <Input placeholder="123" maxLength={4} />
              </Form.Item>
            </div>

            <Button
              type="submit"
              variant="primary"
              size="lg"
              fullWidth
              disabled={submitting}
              className="mt-2"
            >
              {submitting ? "Placing order…" : `Place Order · $${totalPrice.toFixed(2)}`}
            </Button>
          </Form>
        </div>

        <div className="w-full shrink-0 lg:sticky lg:top-24 lg:w-80">
          <div className="rounded-xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-gray-900">
            <h2 className="font-display text-base font-bold uppercase tracking-wide text-ink-600 dark:text-ink-400">
              Order Summary
            </h2>

            <div className="mt-4 flex flex-col gap-3">
              {items.map((item) => (
                <div
                  key={item.product.id}
                  className="flex justify-between text-sm text-ink-600 dark:text-ink-400"
                >
                  <span className="line-clamp-1 pr-2">
                    {item.product.title}  {item.quantity}
                  </span>
                  <span className="shrink-0 font-medium text-ink-900 dark:text-ink-dark">
                    ${(item.product.price * item.quantity).toFixed(2)}
                  </span>
                </div>
              ))}
            </div>

            <div className="mt-4 flex justify-between border-t border-gray-100 pt-4 text-lg font-bold text-ink-900 dark:border-gray-800 dark:text-ink-dark">
              <span>Total</span>
              <span>${totalPrice.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Checkout;