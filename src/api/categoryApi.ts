import axios from "axios";

export async function fetchCategories(): Promise<string[]> {
  const response = await axios.get(
    "https://fakestoreapi.com/products/categories"
  );

  return response.data;
}