import { api } from "./axios";
import type { CartItem } from "../types/Cart";

export interface ApiCartProduct {
  productId: number;
  quantity: number;
}

export interface ApiCart {
  id: number;
  userId: number;
  date: string;
  products: ApiCartProduct[];
}

const DEMO_USER_ID = 1;

function toApiProducts(items: CartItem[]): ApiCartProduct[] {
  return items.map((item) => ({
    productId: item.product.id,
    quantity: item.quantity,
  }));
}

export async function createCart(items: CartItem[]): Promise<ApiCart> {
  const response = await api.post<ApiCart>("/carts", {
    userId: DEMO_USER_ID,
    date: new Date().toISOString(),
    products: toApiProducts(items),
  });
  return response.data;
}

export async function updateCart(
  cartId: number,
  items: CartItem[],
): Promise<ApiCart> {
  const response = await api.put<ApiCart>(`/carts/${cartId}`, {
    userId: DEMO_USER_ID,
    date: new Date().toISOString(),
    products: toApiProducts(items),
  });
  return response.data;
}

export async function deleteCart(cartId: number): Promise<void> {
  await api.delete(`/carts/${cartId}`);
}

export async function fetchCart(cartId: number): Promise<ApiCart> {
  const response = await api.get<ApiCart>(`/carts/${cartId}`);
  return response.data;
}