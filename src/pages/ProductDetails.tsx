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
          <div className="skeleton-tile aspect-square rounded-xl" />
          <div className="flex flex-col gap-3">
            <div className="skeleton-block h-4 w-1/4 rounded" />
            <div className="skeleton-block h-8 w-3/4 rounded" />
            <div className="skeleton-block h-4 w-1/3 rounded" />
            <div className="skeleton-block mt-4 h-4 w-full rounded" />
            <div className="skeleton-block h-4 w-5/6 rounded" />
            <div className="skeleton-block mt-4 h-8 w-24 rounded" />
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return <h1 className="text-ink-primary p-8 text-xl">Error loading product</h1>;
  }

  if (!product) {
    return <h1 className="text-ink-primary p-8 text-xl">Product not found</h1>;
  }

  const handleAddToCart = () => {
    addItem(product, quantity);
    message.success(`Added ${quantity} x "${product.title}" to cart`);
  };

  return (
    <div className="mx-auto max-w-5xl p-4 sm:p-8">
      <Link
        to="/"
        className="text-ink-secondary mb-6 inline-flex items-center gap-1 text-sm font-medium hover:text-brand-600 dark:hover:text-brand-500"
      >
        <LeftOutlined className="text-xs" /> Back to products
      </Link>

      <div className="surface-card border-surface grid gap-8 rounded-xl border p-6 md:grid-cols-2 md:p-8">
        <div className="surface-inset flex aspect-square items-center justify-center rounded-lg p-8">
          <img
            src={product.image}
            alt={product.title}
            className="h-full w-full object-contain"
          />
        </div>

        <div className="flex flex-col">
          <span className="text-brand-accent text-xs font-semibold uppercase tracking-wide">
            {product.category}
          </span>

          <h1 className="text-ink-primary font-display mt-2 text-2xl font-bold sm:text-3xl">
            {product.title}
          </h1>

          <div className="mt-2 flex items-center gap-2">
            <Rate disabled allowHalf defaultValue={product.rating.rate} className="!text-sm !text-accent-500" />
            <span className="text-sm text-ink-400">
              {product.rating.rate} ({product.rating.count} ratings)
            </span>
          </div>

          <p className="text-ink-primary mt-4 text-3xl font-bold">
            ${product.price.toFixed(2)}
          </p>

          <p className="text-ink-secondary mt-4 text-sm leading-relaxed">
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


// //trying to add everything


//for product detail page, if i want to make it realistic

// import { useState } from "react";
// import { Link, useParams } from "react-router-dom";
// import { Button, InputNumber, Rate, message } from "antd";
// import { ShoppingCartOutlined, LeftOutlined } from "@ant-design/icons";

// import { useProduct } from "../hooks/useProduct";
// import { useCart } from "../hooks/useCart";
// import RelatedProducts from "../components/product/RelatedProducts";

// function ProductDetails() {
//   const { id } = useParams();
//   const { addItem } = useCart();
//   const [quantity, setQuantity] = useState(1);

//   const { data: product, isLoading, error } = useProduct(id ?? "");

//   if (isLoading) {
//     return (
//       <div className="mx-auto max-w-5xl animate-pulse p-6 sm:p-8">
//         <div className="grid gap-8 md:grid-cols-2">
//           <div className="skeleton-tile aspect-square rounded-xl" />
//           <div className="flex flex-col gap-3">
//             <div className="skeleton-block h-4 w-1/4 rounded" />
//             <div className="skeleton-block h-8 w-3/4 rounded" />
//             <div className="skeleton-block h-4 w-1/3 rounded" />
//             <div className="skeleton-block mt-4 h-4 w-full rounded" />
//             <div className="skeleton-block h-4 w-5/6 rounded" />
//             <div className="skeleton-block mt-4 h-8 w-24 rounded" />
//           </div>
//         </div>
//       </div>
//     );
//   }

//   if (error) {
//     return <h1 className="text-ink-primary p-8 text-xl">Error loading product</h1>;
//   }

//   if (!product) {
//     return <h1 className="text-ink-primary p-8 text-xl">Product not found</h1>;
//   }

//   const handleAddToCart = () => {
//     addItem(product, quantity);
//     message.success(`Added ${quantity} x "${product.title}" to cart`);
//   };

//   return (
//     <div className="mx-auto max-w-5xl p-4 sm:p-8">
//       <Link
//         to="/"
//         className="text-ink-secondary mb-6 inline-flex items-center gap-1 text-sm font-medium hover:text-brand-600 dark:hover:text-brand-500"
//       >
//         <LeftOutlined className="text-xs" /> Back to products
//       </Link>

//       <div className="surface-card border-surface grid gap-8 rounded-xl border p-6 md:grid-cols-2 md:p-8">
//         <div className="surface-inset flex aspect-square items-center justify-center rounded-lg p-8">
//           <img
//             src={product.image}
//             alt={product.title}
//             className="h-full w-full object-contain"
//           />
//         </div>

//         <div className="flex flex-col">
//           <span className="text-brand-accent text-xs font-semibold uppercase tracking-wide">
//             {product.category}
//           </span>

//           <h1 className="text-ink-primary font-display mt-2 text-2xl font-bold sm:text-3xl">
//             {product.title}
//           </h1>

//           <div className="mt-2 flex items-center gap-2">
//             <Rate disabled allowHalf defaultValue={product.rating.rate} className="!text-sm !text-accent-500" />
//             <span className="text-sm text-ink-400">
//               {product.rating.rate} ({product.rating.count} ratings)
//             </span>
//           </div>

//           <p className="text-ink-primary mt-4 text-3xl font-bold">
//             ${product.price.toFixed(2)}
//           </p>

//           <p className="text-ink-secondary mt-4 text-sm leading-relaxed">
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

//       <RelatedProducts category={product.category} currentProductId={product.id} />
//     </div>
//   );
// }

// export default ProductDetails;