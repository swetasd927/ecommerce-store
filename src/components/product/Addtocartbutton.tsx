import type { MouseEvent } from "react";
import { ShoppingCartOutlined } from "@ant-design/icons";

type AddToCartButtonProps = {
  label: string;
  onClick: (e: MouseEvent) => void;
};

function AddToCartButton({ label, onClick }: AddToCartButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-brand-500 text-white transition-colors hover:bg-brand-600"
    >
      <ShoppingCartOutlined />
    </button>
  );
}

export default AddToCartButton;