// import { Link } from "react-router-dom";
// import { Button, Empty } from "antd";
// import { ArrowLeftOutlined } from "@ant-design/icons";
// import { useCart } from "../hooks/useCart";

// import CartItem from "../components/cart/cartItem";

// function Cart() {
//   const { items, totalItems, totalPrice, clearCart } = useCart();

//   if (items.length === 0) {
//     return (
//       <div className="flex flex-col items-center justify-center gap-6 p-16">
//         <Empty description="Your cart is empty" />
//         <Link to="/">
//           <Button type="primary" icon={<ArrowLeftOutlined />}>
//             Continue Shopping
//           </Button>
//         </Link>
//       </div>
//     );
//   }

//   return (
//     <div className="mx-auto max-w-3xl p-6">
//       <div className="mb-6 flex items-center justify-between">
//         <h1 className="text-3xl font-bold">Your Cart</h1>
//         <span className="text-sm text-gray-500">
//           {totalItems} {totalItems === 1 ? "item" : "items"}
//         </span>
//       </div>

//       <div className="rounded-lg border border-gray-200 bg-white px-4">
//         {items.map((item) => (
//           <CartItem key={item.product.id} item={item} />
//         ))}
//       </div>

//       <div className="mt-6 flex items-center justify-between gap-4">
//         <Button onClick={clearCart}>Clear Cart</Button>

//         <div className="text-right">
//           <p className="text-sm text-gray-500">Total</p>
//           <p className="text-2xl font-bold">${totalPrice.toFixed(2)}</p>
//         </div>
//       </div>

//       <div className="mt-4 flex justify-end">
//         <Button type="primary" size="large" disabled>
//           Checkout (coming soon)
//         </Button>
//       </div>
//     </div>
//   );
// }

// export default Cart;


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
    <div className="mx-auto max-w-6xl p-4 sm:p-6">
      <h1 className="font-display mb-6 text-2xl font-extrabold text-ink-900 sm:text-3xl">
        Your Cart
      </h1>

      <div className="flex flex-col gap-6 lg:flex-row lg:items-start">
        {/* Line items */}
        <div className="flex-1 rounded-xl border border-gray-200 bg-white px-5">
          {items.map((item) => (
            <CartItem key={item.product.id} item={item} />
          ))}
        </div>

        {/* Sticky order summary */}
        <div className="w-full flex-shrink-0 lg:sticky lg:top-24 lg:w-80">
          <div className="rounded-xl border border-gray-200 bg-white p-5">
            <h2 className="font-display text-base font-bold uppercase tracking-wide text-ink-600">
              Order Summary
            </h2>

            <div className="mt-4 flex justify-between text-sm text-ink-600">
              <span>
                Subtotal ({totalItems} {totalItems === 1 ? "item" : "items"})
              </span>
              <span>${totalPrice.toFixed(2)}</span>
            </div>

            <div className="mt-2 flex justify-between text-sm text-ink-600">
              <span>Delivery</span>
              <span className="font-medium text-brand-600">Free</span>
            </div>

            <div className="mt-4 flex justify-between border-t border-gray-100 pt-4 text-lg font-bold text-ink-900">
              <span>Total</span>
              <span>${totalPrice.toFixed(2)}</span>
            </div>

            <Button type="primary" size="large" block disabled className="mt-5">
              Checkout (coming soon)
            </Button>

            <Button block className="mt-2" onClick={clearCart}>
              Clear Cart
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cart;