import type { ReactNode } from "react";

type ProductImageProps = {
  src: string;
  alt: string;
  topRated?: boolean;
  /** Rendered as a hover-reveal overlay pinned to the bottom of the image, e.g. an AddToCartButton */
  overlay?: ReactNode;
};

function ProductImage({ src, alt, topRated, overlay }: ProductImageProps) {
  return (
    <div className="product-card-image-wrap">
      {topRated && <span className="product-card-badge">Top Rated</span>}
      <img src={src} alt={alt} className="product-card-image group-hover:scale-105" loading="lazy" />
      {overlay && (
        <div className="product-card-cta-wrap group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:translate-y-0 group-focus-within:opacity-100">
          {overlay}
        </div>
      )}
    </div>
  );
}

export default ProductImage;