import { Link } from "react-router-dom";
import { HeartOutlined } from "@ant-design/icons";

import { useProducts } from "../hooks/useProducts";
import { useWishlist } from "../hooks/useWishlist";
import ProductGrid from "../components/product/ProductGrid";
import ProductSkeletonGrid from "../components/product/ProductSkeletonGrid";
import Button from "../components/ui/Button";

function Wishlist() {
  const { data: products, isLoading } = useProducts();
  const { productIds } = useWishlist();

  const savedProducts = (products ?? []).filter((product) =>
    productIds.includes(product.id),
  );

  return (
    <div className="mx-auto max-w-7xl p-4 sm:p-8">
      <h1 className="font-display mb-2 text-2xl font-extrabold text-ink-900 dark:text-ink-dark sm:text-3xl">
        Wishlist
      </h1>
      <p className="mb-6 text-sm text-ink-600 dark:text-ink-400">
        {savedProducts.length > 0
          ? `${savedProducts.length} saved product${savedProducts.length === 1 ? "" : "s"}`
          : "Products you save will show up here."}
      </p>

      {isLoading ? (
        <ProductSkeletonGrid />
      ) : savedProducts.length > 0 ? (
        <ProductGrid products={savedProducts} />
      ) : (
        <div className="flex flex-col items-center gap-3 rounded-xl border border-dashed border-gray-300 bg-white py-16 text-center dark:border-gray-700 dark:bg-gray-900">
          <HeartOutlined className="text-3xl text-ink-400" />
          <p className="text-sm font-medium text-ink-900 dark:text-ink-dark">
            Your wishlist is empty
          </p>
          <p className="max-w-xs text-sm text-ink-600 dark:text-ink-400">
            Tap the heart icon on any product to save it here for later.
          </p>
          <Link to="/">
            <Button variant="primary" className="mt-2">
              Browse products
            </Button>
          </Link>
        </div>
      )}
    </div>
  );
}

export default Wishlist;