import type { MouseEvent } from "react";
import { Link } from "react-router-dom";
import { message } from "antd";
import { HeartOutlined, HeartFilled } from "@ant-design/icons";

import type { Product } from "../../types/Product";
import { useCart } from "../../hooks/useCart";
import { useWishlist } from "../../hooks/useWishlist";
import ProductImage from "./ProductImage";
import ProductRating from "./ProductRating";
import AddToCartButton from "./Addtocartbutton";

type ProductCardProps = {
  product: Product;
};

function ProductCard({ product }: ProductCardProps) {
  const { addItem } = useCart();
  const { isWishlisted, toggleWishlist } = useWishlist();
  const wishlisted = isWishlisted(product.id);

  const handleAddToCart = (e: MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem(product, 1);
    message.success(`Added "${product.title}" to cart`);
  };

  const handleToggleWishlist = (e: MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(product.id);
    message.success(
      wishlisted ? `Removed "${product.title}" from wishlist` : `Saved "${product.title}" to wishlist`,
    );
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

        <button
          type="button"
          onClick={handleToggleWishlist}
          aria-label={wishlisted ? "Remove from wishlist" : "Add to wishlist"}
          aria-pressed={wishlisted}
          className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-white/90 text-base text-ink-600 shadow-sm transition-colors hover:text-accent-500 dark:bg-gray-900/90 dark:text-ink-400"
        >
          {wishlisted ? (
            <HeartFilled className="text-accent-500" />
          ) : (
            <HeartOutlined />
          )}
        </button>

        <ProductImage src={product.image} alt={product.title} />
      </div>

      <div className="flex flex-col gap-1.5 border-t border-gray-100 p-4 dark:border-gray-800">
        <h2 className="line-clamp-2 min-h-10 text-sm font-medium text-ink-900 dark:text-ink-dark">
          {product.title}
        </h2>

        <ProductRating rate={product.rating.rate} count={product.rating.count} />

        <div className="mt-3 flex items-center justify-between gap-2">
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