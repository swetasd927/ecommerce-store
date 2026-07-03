import { api } from "./axios";
import type { Product } from "../types/product";

export async function fetchProducts(): Promise<Product[]> {
  const response = await api.get("/products");

  return response.data;
}

export async function fetchProduct(
  id: string
): Promise<Product> {
  const response = await api.get(
    `/products/${id}`
  );

  return response.data;
}