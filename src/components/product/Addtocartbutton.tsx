import type { MouseEvent } from "react";
import { ShoppingCartOutlined, PlusOutlined } from "@ant-design/icons";

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
      className="relative flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-brand-500 text-white transition-colors hover:bg-brand-600"
    >
      <ShoppingCartOutlined className="text-base" />

      <span className="absolute -bottom-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-white text-brand-600 shadow-sm ring-2 ring-brand-500">
        <PlusOutlined className="text-[8px]" />
      </span>
    </button>
  );
}

export default AddToCartButton;