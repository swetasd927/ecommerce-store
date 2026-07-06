import type { Product } from "../../types/Product";
import {Link} from "react-router-dom"; 

type ProductCardProps = {
  product: Product;
};

function ProductCard({
  product,
}: ProductCardProps) {
  return (
    <Link 
    to = {`/product/${product.id}`}
    >
    <div
      className="
      border
      rounded-lg
      p-4
      hover: shadow-lg
      transition
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
    </Link>
  );
}

export default ProductCard;