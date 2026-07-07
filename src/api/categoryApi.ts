import { api } from "./axios";

export async function fetchCategories(): Promise<string[]> {
  const response = await api.get(
   "/products/categories"
    );

  return response.data;
}