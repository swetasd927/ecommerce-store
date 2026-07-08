// import { useState } from "react";
// import { Link, useParams } from "react-router-dom";
// import { Button, InputNumber, Rate, message } from "antd";
// import { ShoppingCartOutlined, LeftOutlined } from "@ant-design/icons";

// import { useProduct } from "../hooks/useProduct";
// import { useCart } from "../hooks/useCart";

// function ProductDetails() {
//   const { id } = useParams();
//   const { addItem } = useCart();
//   const [quantity, setQuantity] = useState(1);

//   const { data: product, isLoading, error } = useProduct(id ?? "");

//   if (isLoading) {
//     return (
//       <div className="mx-auto max-w-5xl animate-pulse p-6 sm:p-8">
//         <div className="grid gap-8 md:grid-cols-2">
//           <div className="aspect-square rounded-xl bg-gray-100" />
//           <div className="flex flex-col gap-3">
//             <div className="h-4 w-1/4 rounded bg-gray-200" />
//             <div className="h-8 w-3/4 rounded bg-gray-200" />
//             <div className="h-4 w-1/3 rounded bg-gray-200" />
//             <div className="mt-4 h-4 w-full rounded bg-gray-200" />
//             <div className="h-4 w-5/6 rounded bg-gray-200" />
//             <div className="mt-4 h-8 w-24 rounded bg-gray-200" />
//           </div>
//         </div>
//       </div>
//     );
//   }

//   if (error) {
//     return <h1 className="p-8 text-xl text-ink-900">Error loading product</h1>;
//   }

//   if (!product) {
//     return <h1 className="p-8 text-xl text-ink-900">Product not found</h1>;
//   }

//   const handleAddToCart = () => {
//     addItem(product, quantity);
//     message.success(`Added ${quantity} x "${product.title}" to cart`);
//   };

//   return (
//     <div className="mx-auto max-w-5xl p-4 sm:p-8">
//       <Link
//         to="/"
//         className="mb-6 inline-flex items-center gap-1 text-sm font-medium text-ink-600 hover:text-brand-600"
//       >
//         <LeftOutlined className="text-xs" /> Back to products
//       </Link>

//       <div className="grid gap-8 rounded-xl border border-gray-200 bg-white p-6 md:grid-cols-2 md:p-8">
//         <div className="flex aspect-square items-center justify-center rounded-lg bg-white p-8">
//           <img
//             src={product.image}
//             alt={product.title}
//             className="h-full w-full object-contain"
//           />
//         </div>

//         <div className="flex flex-col">
//           <span className="text-xs font-semibold uppercase tracking-wide text-brand-600">
//             {product.category}
//           </span>

//           <h1 className="font-display mt-2 text-2xl font-bold text-ink-900 sm:text-3xl">
//             {product.title}
//           </h1>

//           <div className="mt-2 flex items-center gap-2">
//             <Rate disabled allowHalf defaultValue={product.rating.rate} className="!text-sm !text-accent-500" />
//             <span className="text-sm text-ink-400">
//               {product.rating.rate} ({product.rating.count} ratings)
//             </span>
//           </div>

//           <p className="mt-4 text-3xl font-bold text-ink-900">
//             ${product.price.toFixed(2)}
//           </p>

//           <p className="mt-4 text-sm leading-relaxed text-ink-600">
//             {product.description}
//           </p>

//           <div className="mt-6 flex items-center gap-4">
//             <InputNumber
//               min={1}
//               max={99}
//               value={quantity}
//               onChange={(value) => setQuantity(value ?? 1)}
//               size="large"
//             />
//             <Button
//               type="primary"
//               size="large"
//               icon={<ShoppingCartOutlined />}
//               onClick={handleAddToCart}
//               className="flex-1"
//             >
//               Add to Cart
//             </Button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default ProductDetails;



import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Button, InputNumber, Rate, message } from "antd";
import { ShoppingCartOutlined, LeftOutlined } from "@ant-design/icons";

import { useProduct } from "../hooks/useProduct";
import { useCart } from "../hooks/useCart";

function ProductDetails() {
  const { id } = useParams();
  const { addItem } = useCart();
  const [quantity, setQuantity] = useState(1);

  const { data: product, isLoading, error } = useProduct(id ?? "");

  if (isLoading) {
    return (
      <div className="mx-auto max-w-5xl animate-pulse p-6 sm:p-8">
        <div className="grid gap-8 md:grid-cols-2">
          <div className="aspect-square rounded-xl bg-gray-100 dark:bg-gray-800" />
          <div className="flex flex-col gap-3">
            <div className="h-4 w-1/4 rounded bg-gray-200 dark:bg-gray-800" />
            <div className="h-8 w-3/4 rounded bg-gray-200 dark:bg-gray-800" />
            <div className="h-4 w-1/3 rounded bg-gray-200 dark:bg-gray-800" />
            <div className="mt-4 h-4 w-full rounded bg-gray-200 dark:bg-gray-800" />
            <div className="h-4 w-5/6 rounded bg-gray-200 dark:bg-gray-800" />
            <div className="mt-4 h-8 w-24 rounded bg-gray-200 dark:bg-gray-800" />
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return <h1 className="p-8 text-xl text-ink-900 dark:text-ink-dark">Error loading product</h1>;
  }

  if (!product) {
    return <h1 className="p-8 text-xl text-ink-900 dark:text-ink-dark">Product not found</h1>;
  }

  const handleAddToCart = () => {
    addItem(product, quantity);
    message.success(`Added ${quantity} x "${product.title}" to cart`);
  };

  return (
    <div className="mx-auto max-w-5xl p-4 sm:p-8">
      <Link
        to="/"
        className="mb-6 inline-flex items-center gap-1 text-sm font-medium text-ink-600 hover:text-brand-600 dark:text-ink-400 dark:hover:text-brand-500"
      >
        <LeftOutlined className="text-xs" /> Back to products
      </Link>

      <div className="grid gap-8 rounded-xl border border-gray-200 bg-white p-6 md:grid-cols-2 md:p-8 dark:border-gray-800 dark:bg-gray-900">
        <div className="flex aspect-square items-center justify-center rounded-lg bg-white p-8 dark:bg-gray-950">
          <img
            src={product.image}
            alt={product.title}
            className="h-full w-full object-contain"
          />
        </div>

        <div className="flex flex-col">
          <span className="text-xs font-semibold uppercase tracking-wide text-brand-600 dark:text-brand-500">
            {product.category}
          </span>

          <h1 className="font-display mt-2 text-2xl font-bold text-ink-900 sm:text-3xl dark:text-ink-dark">
            {product.title}
          </h1>

          <div className="mt-2 flex items-center gap-2">
            <Rate disabled allowHalf defaultValue={product.rating.rate} className="!text-sm !text-accent-500" />
            <span className="text-sm text-ink-400">
              {product.rating.rate} ({product.rating.count} ratings)
            </span>
          </div>

          <p className="mt-4 text-3xl font-bold text-ink-900 dark:text-ink-dark">
            ${product.price.toFixed(2)}
          </p>

          <p className="mt-4 text-sm leading-relaxed text-ink-600 dark:text-ink-400">
            {product.description}
          </p>

          <div className="mt-6 flex items-center gap-4">
            <InputNumber
              min={1}
              max={99}
              value={quantity}
              onChange={(value) => setQuantity(value ?? 1)}
              size="large"
            />
            <Button
              type="primary"
              size="large"
              icon={<ShoppingCartOutlined />}
              onClick={handleAddToCart}
              className="flex-1"
            >
              Add to Cart
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetails;