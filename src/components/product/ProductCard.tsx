import type { Product } from "../../types/product";

type ProductCardProps = {
  product: Product;
};

function ProductCard({
  product,
}: ProductCardProps) {
  return (
    <div
      className="
      border
      rounded-lg
      p-4
      "
    >
      <img
        src={product.image}
        alt={product.title}
        className="
        h-40
        w-full
        object-contain
        "
      />

      <h2
        className="
        mt-4
        font-semibold
        "
      >
        {product.title}
      </h2>

      <p
        className="
        text-lg
        font-bold
        mt-2
        "
      >
        ${product.price}
      </p>
    </div>
  );
}

export default ProductCard;