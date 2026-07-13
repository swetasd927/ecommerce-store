import { motion } from "framer-motion";

import type { Product } from "../../types/Product";
import ProductCard from "./ProductCard";
import { staggerContainer, fadeUp, cardHover } from "../../lib/motion";

type ProductGridProps = {
  products: Product[];
};

function ProductGrid({ products }: ProductGridProps) {
  return (
    <motion.div
      className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 lg:gap-5"
      variants={staggerContainer}
      initial="hidden"
      animate="visible"
    >
      {products.map((product) => (
        <motion.div key={product.id} variants={fadeUp} {...cardHover}>
          <ProductCard product={product} />
        </motion.div>
      ))}
    </motion.div>
  );
}

export default ProductGrid;