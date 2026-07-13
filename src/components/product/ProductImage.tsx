type ProductImageProps = {
  src: string;
  alt: string;
  topRated?: boolean;
};

function ProductImage({ src, alt, topRated }: ProductImageProps) {
  return (
    <div className="relative h-full w-full">
      {topRated && (
      <span className="absolute left-3 top-0 z-10 inline-flex items-center justify-center rounded-full bg-accent-500 px-2.5 py-1 text-xs font-semibold text-white">
  Top Rated
</span>
      )}

      <div className="flex h-full w-full items-center justify-center">
        <img
          src={src}
          alt={alt}
          className="max-h-[75%] max-w-[75%] object-contain transition-transform duration-300 group-hover:scale-110"
          loading="lazy"
        />
      </div>
    </div>
  );
}

export default ProductImage;
