import ProductSkeleton from "../ui/ProductSkeleton";

function ProductSkeletonGrid() {
  return (
    <div className="grid grid-cols-2 items-stretch gap-3 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 lg:gap-4">
      {Array.from({ length: 10 }).map((_, index) => (
        <ProductSkeleton key={index} />
      ))}
    </div>
  );
}

export default ProductSkeletonGrid;

