function ProductSkeleton() {
  return (
    <div className="surface-card border-surface animate-pulse overflow-hidden rounded-xl border">
      <div className="skeleton-tile aspect-square" />

      <div className="border-surface flex flex-col gap-2 border-t p-4">
        <div className="skeleton-block h-3.5 w-full rounded" />
        <div className="skeleton-block h-3.5 w-2/3 rounded" />
        <div className="skeleton-block h-3 w-1/3 rounded" />
        <div className="skeleton-block mt-1 h-5 w-1/2 rounded" />
      </div>
    </div>
  );
}

export default ProductSkeleton;