import type { MouseEvent } from "react";
import { Link } from "react-router-dom";
import { message } from "antd";

import type { Product } from "../../types/Product";
import { useCart } from "../../hooks/useCart";
import ProductImage from "./ProductImage";
import ProductRating from "./ProductRating";
import AddToCartButton from "./Addtocartbutton";

type ProductCardProps = {
  product: Product;
};

function ProductCard({ product }: ProductCardProps) {
  const { addItem } = useCart();

  // Stop the click from bubbling up to the wrapping <Link>, otherwise
  // "Add to Cart" would also navigate to the product details page.
  const handleAddToCart = (e: MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem(product, 1);
    message.success(`Added "${product.title}" to cart`);
  };

  return (
    <Link to={`/product/${product.id}`} className="product-card group">
      <ProductImage
        src={product.image}
        alt={product.title}
        topRated={product.rating.rate >= 4.5}
        overlay={
          <AddToCartButton
            label={`Add ${product.title} to cart`}
            onClick={handleAddToCart}
          />
        }
      />

      <div className="product-card-body">
        <h2 className="product-card-title">{product.title}</h2>

        <ProductRating rate={product.rating.rate} count={product.rating.count} />

        <div className="product-card-footer">
          <p className="product-price">${product.price.toFixed(2)}</p>
        </div>
      </div>
    </Link>
  );
}

export default ProductCard;