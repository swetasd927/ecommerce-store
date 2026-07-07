import { Button, InputNumber } from "antd";
import { DeleteOutlined } from "@ant-design/icons";

import type { CartItem as CartItemType } from "../../types/Cart";
import { useCart } from "../../hooks/useCart";

type CartItemProps = {
  item: CartItemType;
};

function CartItem({ item }: CartItemProps) {
  const { updateQuantity, removeItem } = useCart();
  const { product, quantity } = item;

  return (
    <div className="flex items-center gap-4 border-b border-gray-100 py-5 last:border-b-0">
      <div className="flex h-20 w-20 flex-shrink-0 items-center justify-center rounded-lg border border-gray-100 bg-white p-2">
        <img
          src={product.image}
          alt={product.title}
          className="h-full w-full object-contain"
        />
      </div>

      <div className="min-w-0 flex-1">
        <p className="line-clamp-2 text-sm font-medium text-ink-900">
          {product.title}
        </p>
        <p className="mt-1 text-sm text-ink-600">${product.price.toFixed(2)}</p>
      </div>

      <InputNumber
        min={1}
        max={99}
        value={quantity}
        onChange={(value) => updateQuantity(product.id, value ?? 1)}
        aria-label={`Quantity for ${product.title}`}
      />

      <p className="w-20 flex-shrink-0 text-right font-semibold text-ink-900">
        ${(product.price * quantity).toFixed(2)}
      </p>

      <Button
        type="text"
        icon={<DeleteOutlined className="text-ink-400 hover:text-accent-600" />}
        onClick={() => removeItem(product.id)}
        aria-label={`Remove ${product.title} from cart`}
      />
    </div>
  );
}

export default CartItem;