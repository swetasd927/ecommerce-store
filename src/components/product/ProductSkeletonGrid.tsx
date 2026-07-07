// import ProductSkeleton from "../ui/ProductSkeleton";

// function ProductSkeletonGrid() {
//   return (
//     <div
//       className="
//       grid
//       grid-cols-1
//       md:grid-cols-3
//       gap-6
//       "
//     >
//       {Array.from({
//         length: 6,
//       }).map((_, index) => (
//         <ProductSkeleton
//           key={index}
//         />
//       ))}
//     </div>
//   );
// }

// export default ProductSkeletonGrid;



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