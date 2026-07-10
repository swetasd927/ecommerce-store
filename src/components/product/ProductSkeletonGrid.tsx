import ProductSkeleton from "../ui/ProductSkeleton";

type ProductSkeletonGridProps = {
  count?: number;
};

function ProductSkeletonGrid({ count = 10 }: ProductSkeletonGridProps) {
  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 lg:gap-5">
      {Array.from({ length: count }).map((_, index) => (
        <ProductSkeleton key={index} />
      ))}
    </div>
  );
}

export default ProductSkeletonGrid;