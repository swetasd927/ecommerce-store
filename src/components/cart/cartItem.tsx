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
    <div className="flex items-center gap-4 border-b border-gray-200 py-4 last:border-b-0">
      <img
        src={product.image}
        alt={product.title}
        className="h-20 w-20 flex-shrink-0 object-contain"
      />

      <div className="min-w-0 flex-1">
        <p className="truncate font-medium text-gray-800">{product.title}</p>
        <p className="text-sm text-gray-500">${product.price.toFixed(2)}</p>
      </div>

      <InputNumber
        min={1}
        max={99}
        value={quantity}
        onChange={(value) => updateQuantity(product.id, value ?? 1)}
        aria-label={`Quantity for ${product.title}`}
      />

      <p className="w-20 flex-shrink-0 text-right font-semibold">
        ${(product.price * quantity).toFixed(2)}
      </p>

      <Button
        danger
        type="text"
        icon={<DeleteOutlined />}
        onClick={() => removeItem(product.id)}
        aria-label={`Remove ${product.title} from cart`}
      />
    </div>
  );
}

export default CartItem;