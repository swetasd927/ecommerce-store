import type { MouseEvent } from "react";
import { ShoppingCartOutlined } from "@ant-design/icons";

type AddToCartButtonProps = {
  label: string;
  onClick: (e: MouseEvent) => void;
};

function AddToCartButton({ label, onClick }: AddToCartButtonProps) {
  return (
    <button type="button" onClick={onClick} className="product-card-cta-btn" aria-label={label}>
      <ShoppingCartOutlined />
      Add to Cart
    </button>
  );
}

export default AddToCartButton;