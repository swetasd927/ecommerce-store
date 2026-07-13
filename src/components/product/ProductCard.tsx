import type { MouseEvent } from "react";
import { Link } from "react-router-dom";
import { message } from "antd";

import type { Product } from "../../types/Product";
import { useCart } from "../../hooks/useCart";
import ProductImage from "./ProductImage";
import ProductRating from "./ProductRating";
import AddToCartButton from "./Addtocartbutton";

type ProductCardProps = {
  product: Product;
};

function ProductCard({ product }: ProductCardProps) {
  const { addItem } = useCart();

  const handleAddToCart = (e: MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem(product, 1);
    message.success(`Added "${product.title}" to cart`);
  };

  return (
    <Link
      to={`/product/${product.id}`}
      className="group flex flex-col overflow-hidden rounded-xl border border-gray-200 bg-white transition-shadow hover:shadow-lg dark:border-gray-800 dark:bg-gray-900 dark:hover:shadow-black/30"
    >
      <div className="relative flex h-60 items-center justify-center bg-white p-6 dark:bg-gray-950">
        <ProductImage src={product.image} alt={product.title} topRated={product.rating.rate >= 4.5} />
      </div>

      <div className="flex h-40 flex-col gap-1.5 border-t border-gray-100 p-4 dark:border-gray-800">
        <h2 className="line-clamp-2 text-sm font-medium text-ink-900 dark:text-ink-dark">
          {product.title}
        </h2>

        <ProductRating rate={product.rating.rate} count={product.rating.count} />

        <div className="mt-auto flex items-center justify-between gap-2">
          <p className="text-lg font-bold text-ink-900 dark:text-ink-dark">
            ${product.price.toFixed(2)}
          </p>
          <AddToCartButton label="Add to cart" onClick={handleAddToCart} />
        </div>
      </div>
    </Link>
  );
}

export default ProductCard;