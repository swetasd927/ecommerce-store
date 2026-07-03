import { useParams } from "react-router-dom";

import { useProduct } from "../hooks/useProduct";

function ProductDetails() {
  const { id } = useParams();

  const {
    data: product,
    isLoading,
    error,
  } = useProduct(id ?? "");

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  if (error) {
    return <h1>Error loading product</h1>;
  }

  if (!product) {
    return <h1>Product not found</h1>;
  }

  return (
    <div className="p-8">
      <img
        src={product.image}
        alt={product.title}
        className="h-72 mx-auto object-contain"
      />

      <h1 className="text-3xl font-bold mt-6">
        {product.title}
      </h1>

      <p className="mt-4">
        {product.description}
      </p>

      <p className="text-2xl font-bold mt-6">
        ${product.price}
      </p>
    </div>
  );
}

export default ProductDetails;