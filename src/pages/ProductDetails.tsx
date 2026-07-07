import { useState } from "react";
import { useParams } from "react-router-dom";
import { Button, InputNumber, message } from "antd";
import { ShoppingCartOutlined } from "@ant-design/icons";

import { useProduct } from "../hooks/useProduct";
import { useCart } from "../hooks/useCart";

function ProductDetails() {
  const { id } = useParams();
  const { addItem } = useCart();
  const [quantity, setQuantity] = useState(1);

  const {
    data: product,
    isLoading,
    error,
  } = useProduct(id ?? "");

  if (isLoading) {
    return (
      <div className="mx-auto max-w-4xl animate-pulse p-8">
        <div className="mx-auto h-72 w-72 rounded-lg bg-gray-200" />
        <div className="mt-6 h-8 w-2/3 rounded bg-gray-200" />
        <div className="mt-4 h-4 w-full rounded bg-gray-200" />
        <div className="mt-2 h-4 w-5/6 rounded bg-gray-200" />
        <div className="mt-6 h-8 w-24 rounded bg-gray-200" />
      </div>
    );
  }

  if (error) {
    return <h1 className="p-8 text-xl">Error loading product</h1>;
  }

  if (!product) {
    return <h1 className="p-8 text-xl">Product not found</h1>;
  }

  const handleAddToCart = () => {
    addItem(product, quantity);
    message.success(`Added ${quantity} x "${product.title}" to cart`);
  };

  return (
    <div className="mx-auto max-w-4xl p-8">
      <img
        src={product.image}
        alt={product.title}
        className="h-72 mx-auto object-contain"
      />

      <h1 className="text-3xl font-bold mt-6">{product.title}</h1>

      <p className="mt-4 text-gray-600">{product.description}</p>

      <p className="text-2xl font-bold mt-6">${product.price}</p>

      <div className="mt-6 flex items-center gap-4">
        <InputNumber
          min={1}
          value={quantity}
          onChange={(value) => setQuantity(value ?? 1)}
          size="large"
        />
        <Button
          type="primary"
          size="large"
          icon={<ShoppingCartOutlined />}
          onClick={handleAddToCart}
        >
          Add to Cart
        </Button>
      </div>
    </div>
  );
}

export default ProductDetails;