// import { useProducts } from "../../hooks/useProducts";
// import ProductGrid from "./ProductGrid";
// import ProductSkeletonGrid from "./ProductSkeletonGrid";

// type RelatedProductsProps = {
//   category: string;
//   currentProductId: number;
//   limit?: number;
// };

// const DEFAULT_LIMIT = 5;

// function RelatedProducts({ category, currentProductId, limit = DEFAULT_LIMIT }: RelatedProductsProps) {
//   // Reuses the already-cached ["products"] query from useProducts() -
//   // React Query dedupes this, so browsing Home then a product detail
//   // page doesn't trigger a second network request.
//   const { data: products, isLoading } = useProducts();

//   const related = products
//     ?.filter((p) => p.category === category && p.id !== currentProductId)
//     .slice(0, limit);

//   if (isLoading) {
//     return (
//       <div className="mt-10">
//         <h2 className="text-ink-primary font-display mb-4 text-xl font-bold">
//           You may also like
//         </h2>
//         <ProductSkeletonGrid count={limit} />
//       </div>
//     );
//   }

//   if (!related || related.length === 0) {
//     return null;
//   }

//   return (
//     <div className="mt-10">
//       <h2 className="text-ink-primary font-display mb-4 text-xl font-bold">
//         You may also like
//       </h2>
//       <ProductGrid products={related} />
//     </div>
//   );
// }

// export default RelatedProducts;