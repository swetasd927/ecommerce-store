import type { MouseEvent } from "react";
import { Link } from "react-router-dom";
import { Rate, Button, message } from "antd";
import { ShoppingCartOutlined } from "@ant-design/icons";

import type { Product } from "../../types/Product";
import { useCart } from "../../hooks/useCart";

type ProductCardProps = {
  product: Product;
};

function ProductCard({ product }: ProductCardProps) {
  const { addItem } = useCart();

  // Stop the click from bubbling up to the wrapping <Link>, otherwise
  // "Add to Cart" would also navigate to the product details page.
  const handleAddToCart = (e: MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem(product, 1);
    message.success(`Added "${product.title}" to cart`);
  };

  return (
    <Link
      to={`/product/${product.id}`}
      className="group flex flex-col overflow-hidden rounded-xl border border-gray-200 bg-white transition-all hover:-translate-y-0.5 hover:shadow-lg dark:border-gray-800 dark:bg-gray-900 dark:hover:shadow-black/30"
    >
      <div className="relative flex aspect-square items-center justify-center bg-white p-6 dark:bg-gray-950">
        {product.rating.rate >= 4.5 && (
          <span className="absolute left-3 top-3 rounded-full bg-accent-500 px-2 py-0.5 text-xs font-semibold text-white">
            Top Rated
          </span>
        )}
        <img
          src={product.image}
          alt={product.title}
          className="h-full w-full object-contain transition-transform duration-300 group-hover:scale-105"
        />
      </div>

      <div className="flex flex-1 flex-col gap-1.5 border-t border-gray-100 p-4 dark:border-gray-800">
        <h2 className="line-clamp-2 min-h-[2.5rem] text-sm font-medium text-ink-900 dark:text-ink-dark">
          {product.title}
        </h2>

        <div className="flex items-center gap-1.5">
          <Rate
            disabled
            allowHalf
            defaultValue={product.rating.rate}
            className="!text-xs !text-accent-500"
          />
          <span className="text-xs text-ink-400">({product.rating.count})</span>
        </div>

        <div className="mt-1 flex items-center justify-between gap-2">
          <p className="text-lg font-bold text-ink-900 dark:text-ink-dark">
            ${product.price.toFixed(2)}
          </p>

          <Button
            type="primary"
            size="small"
            icon={<ShoppingCartOutlined />}
            onClick={handleAddToCart}
            aria-label={`Add ${product.title} to cart`}
          >
            Add
          </Button>
        </div>
      </div>
    </Link>
  );
}

export default ProductCard;