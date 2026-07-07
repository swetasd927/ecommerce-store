// import type { Product } from "../../types/Product";
// import ProductCard from "./ProductCard";

// type ProductGridProps = {
//   products: Product[];
// };

// function ProductGrid({
//   products,
// }: ProductGridProps) {
//   return (
//     <div
//       className="
//       grid
//       grid-cols-1
//       md:grid-cols-3
//       gap-6
//       "
//     >
//       {products.map((product) => (
//         <ProductCard
//           key={product.id}
//           product={product}
//         />
//       ))}
//     </div>
//   );
// }

// export default ProductGrid;

import type { Product } from "../../types/Product";
import ProductCard from "./ProductCard";

type ProductGridProps = {
  products: Product[];
};

function ProductGrid({ products }: ProductGridProps) {
  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 lg:gap-5">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}

export default ProductGrid;