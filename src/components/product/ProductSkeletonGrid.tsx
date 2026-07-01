import ProductSkeleton from "../ui/ProductSkeleton";

function ProductSkeletonGrid() {
  return (
    <div
      className="
      grid
      grid-cols-1
      md:grid-cols-3
      gap-6
      "
    >
      {Array.from({
        length: 6,
      }).map((_, index) => (
        <ProductSkeleton
          key={index}
        />
      ))}
    </div>
  );
}

export default ProductSkeletonGrid;

