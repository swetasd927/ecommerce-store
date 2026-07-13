import type { MouseEvent } from "react";
import { Link } from "react-router-dom";
import { message } from "antd";
import { HeartOutlined, HeartFilled, MinusOutlined, PlusOutlined } from "@ant-design/icons";

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
  const { items, addItem, updateQuantity } = useCart();
  const { isWishlisted, toggleWishlist } = useWishlist();
  const wishlisted = isWishlisted(product.id);
  const quantityInCart = items.find((item) => item.product.id === product.id)?.quantity ?? 0;

  const handleAddToCart = (e: MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem(product, 1);
    message.success(`Added "${product.title}" to cart`);
  };

  const stepQuantity = (e: MouseEvent, delta: number) => {
    e.preventDefault();
    e.stopPropagation();
    const next = quantityInCart + delta;
    if (next < 1) return;
    updateQuantity(product.id, next);
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
      <div className="relative h-56 w-full shrink-0 bg-white p-5 dark:bg-gray-950 sm:h-60">
        {product.rating.rate >= 4.5 && (
          <span className="absolute left-3 top-3 z-10 rounded-full bg-accent-500 px-2 py-0.5 text-xs font-semibold text-white">
            Top Rated
          </span>
        )}

        <button
          type="button"
          onClick={handleToggleWishlist}
          aria-label={wishlisted ? "Remove from wishlist" : "Add to wishlist"}
          aria-pressed={wishlisted}
          className="absolute right-3 top-3 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-white/90 text-base text-ink-600 shadow-sm transition-colors hover:text-accent-500 dark:bg-gray-900/90 dark:text-ink-400"
        >
          {wishlisted ? <HeartFilled className="text-accent-500" /> : <HeartOutlined />}
        </button>

        <ProductImage src={product.image} alt={product.title} />
      </div>

      <div className="flex h-36 flex-col gap-1.5 border-t border-gray-100 p-4 dark:border-gray-800">
        <h2 className="line-clamp-2 text-sm font-medium leading-5 text-ink-900 dark:text-ink-dark">
          {product.title}
        </h2>

        <ProductRating rate={product.rating.rate} count={product.rating.count} />

        <div className="mt-auto flex items-center justify-between gap-2">
          <p className="text-lg font-bold text-ink-900 dark:text-ink-dark">
            ${product.price.toFixed(2)}
          </p>

          <div className="flex items-center gap-2">
            {quantityInCart > 0 ? (
              <div className="flex h-9 items-center overflow-hidden rounded-full border border-gray-200 dark:border-gray-700">
                <button
                  type="button"
                  onClick={(e) => stepQuantity(e, -1)}
                  disabled={quantityInCart <= 1}
                  aria-label="Decrease quantity"
                  className="flex h-full w-8 items-center justify-center text-ink-600 transition-colors hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-40 dark:text-ink-400 dark:hover:bg-gray-800"
                >
                  <MinusOutlined className="text-xs" />
                </button>

                <span className="w-6 text-center text-sm font-medium text-ink-900 dark:text-ink-dark">
                  {quantityInCart}
                </span>

                <button
                  type="button"
                  onClick={(e) => stepQuantity(e, 1)}
                  aria-label="Increase quantity"
                  className="flex h-full w-8 items-center justify-center text-ink-600 transition-colors hover:bg-gray-100 dark:text-ink-400 dark:hover:bg-gray-800"
                >
                  <PlusOutlined className="text-xs" />
                </button>
              </div>
            ) : (
              <AddToCartButton label="Add to cart" onClick={handleAddToCart} />
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}

export default ProductCard;