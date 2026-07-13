import { createContext, useEffect, useState } from "react";
import type { ReactNode } from "react";

interface WishlistContextType {
  productIds: number[];
  isWishlisted: (productId: number) => boolean;
  toggleWishlist: (productId: number) => void;
}

// eslint-disable-next-line react-refresh/only-export-components
export const WishlistContext = createContext<WishlistContextType | undefined>(
  undefined,
);

const WISHLIST_STORAGE_KEY = "wishlist_product_ids";

function readStoredWishlist(): number[] {
  try {
    const raw = localStorage.getItem(WISHLIST_STORAGE_KEY);
    return raw ? (JSON.parse(raw) as number[]) : [];
  } catch {
    return [];
  }
}

function WishlistProvider({ children }: { children: ReactNode }) {
  // Same approach as CartContext: localStorage is the source of truth,
  // read synchronously so the wishlist is already correct on first paint.
  const [productIds, setProductIds] = useState<number[]>(() =>
    readStoredWishlist(),
  );

  useEffect(() => {
    localStorage.setItem(WISHLIST_STORAGE_KEY, JSON.stringify(productIds));
  }, [productIds]);

  const isWishlisted = (productId: number) => productIds.includes(productId);

  const toggleWishlist = (productId: number) => {
    setProductIds((prev) =>
      prev.includes(productId)
        ? prev.filter((id) => id !== productId)
        : [...prev, productId],
    );
  };

  return (
    <WishlistContext.Provider
      value={{ productIds, isWishlisted, toggleWishlist }}
    >
      {children}
    </WishlistContext.Provider>
  );
}

export default WishlistProvider;