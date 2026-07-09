import ProductSkeleton from "../ui/ProductSkeleton";

function ProductSkeletonGrid() {
  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 lg:gap-5">
      {Array.from({ length: 8 }).map((_, index) => (
        <ProductSkeleton key={index} />
      ))}
    </div>
  );
}

export default ProductSkeletonGrid;


// //for full
// //product detail page


// import ProductSkeleton from "../ui/ProductSkeleton";

// type ProductSkeletonGridProps = {
//   count?: number;
// };

// function ProductSkeletonGrid({ count = 8 }: ProductSkeletonGridProps) {
//   return (
//     <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 lg:gap-4">
//       {Array.from({ length: count }).map((_, index) => (
//         <ProductSkeleton key={index} />
//       ))}
//     </div>
//   );
// }

// export default ProductSkeletonGrid;