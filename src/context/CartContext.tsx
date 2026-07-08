import { createContext, useEffect, useRef, useState } from "react";
import type { ReactNode } from "react";
import type { Product } from "../types/Product";
import type { CartContextType, CartItem } from "../types/Cart";
import { createCart, updateCart } from "../api/CartApi";

// eslint-disable-next-line react-refresh/only-export-components
export const CartContext = createContext<CartContextType | undefined>(
  undefined,
);

const CART_STORAGE_KEY = "cart_items";

function readStoredCart(): CartItem[] {
  try {
    const raw = localStorage.getItem(CART_STORAGE_KEY);
    return raw ? (JSON.parse(raw) as CartItem[]) : [];
  } catch {
    return [];
  }
}

function CartProvider({ children }: { children: ReactNode }) {
  // localStorage is the real source of truth - read synchronously so the
  // cart is already there on first paint, even on a hard refresh.
  const [items, setItems] = useState<CartItem[]>(() => readStoredCart());

  // In-memory only. FakeStoreAPI doesn't really persist writes server-side
  // anyway, so there's no point saving this across refreshes - each session
  // just creates one cart on the API and reuses its id for the rest of the
  // session.
  const apiCartId = useRef<number | null>(null);

  useEffect(() => {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));

    // Best-effort mirror to FakeStoreAPI so the app is actually using the
    // Carts endpoint. Fire-and-forget: if it fails, the cart on screen is
    // unaffected because localStorage already has the real data.
    const sync = apiCartId.current
      ? updateCart(apiCartId.current, items)
      : createCart(items).then((cart) => {
          apiCartId.current = cart.id;
        });

    sync.catch(() => {
      // Ignored on purpose - see comment above.
    });
  }, [items]);

  const addItem = (product: Product, quantity = 1) => {
    setItems((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);

      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item,
        );
      }

      return [...prev, { product, quantity }];
    });
  };

  const removeItem = (productId: number) => {
    setItems((prev) => prev.filter((item) => item.product.id !== productId));
  };

  const updateQuantity = (productId: number, quantity: number) => {
    if (quantity <= 0) {
      removeItem(productId);
      return;
    }

    setItems((prev) =>
      prev.map((item) =>
        item.product.id === productId ? { ...item, quantity } : item,
      ),
    );
  };

  const clearCart = () => setItems([]);

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = items.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0,
  );

  return (
    <CartContext.Provider
      value={{
        items,
        totalItems,
        totalPrice,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export default CartProvider;