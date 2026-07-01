import type { Product } from "../../types/product";
import ProductCard from "./ProductCard";

type ProductGridProps = {
  products: Product[];
};

function ProductGrid({
  products,
}: ProductGridProps) {
  return (
    <div
      className="
      grid
      grid-cols-1
      md:grid-cols-3
      gap-6
      "
    >
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
        />
      ))}
    </div>
  );
}

export default ProductGrid;