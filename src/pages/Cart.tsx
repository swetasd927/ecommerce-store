import { Link } from "react-router-dom";
import { Button, Empty } from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { useCart } from "../hooks/useCart";

import CartItem from "../components/cart/cartItem";

function Cart() {
  const { items, totalItems, totalPrice, clearCart } = useCart();

  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center gap-6 p-16">
        <Empty description="Your cart is empty" />
        <Link to="/">
          <Button type="primary" icon={<ArrowLeftOutlined />}>
            Continue Shopping
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl p-6">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-3xl font-bold">Your Cart</h1>
        <span className="text-sm text-gray-500">
          {totalItems} {totalItems === 1 ? "item" : "items"}
        </span>
      </div>

      <div className="rounded-lg border border-gray-200 bg-white px-4">
        {items.map((item) => (
          <CartItem key={item.product.id} item={item} />
        ))}
      </div>

      <div className="mt-6 flex items-center justify-between gap-4">
        <Button onClick={clearCart}>Clear Cart</Button>

        <div className="text-right">
          <p className="text-sm text-gray-500">Total</p>
          <p className="text-2xl font-bold">${totalPrice.toFixed(2)}</p>
        </div>
      </div>

      <div className="mt-4 flex justify-end">
        <Button type="primary" size="large" disabled>
          Checkout (coming soon)
        </Button>
      </div>
    </div>
  );
}

export default Cart;