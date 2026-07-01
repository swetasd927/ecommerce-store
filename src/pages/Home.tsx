import { useState } from "react";
import { useProducts } from "../hooks/useProducts";
import ProductGrid from "../components/product/ProductGrid";
import ProductSkeletonGrid from "../components/product/ProductSkeletonGrid";
import CategoryFilter from "../components/product/CategoryFilter";
import { useCategories } from "../hooks/useCategories";

function Home() {
  
  const [selectedCategory, setSelectedCategory] = useState("");
  const {
    data: products,
    isLoading,
    error,
  } = useProducts();

    const {
    data: categories,
  } = useCategories();

  if (isLoading) {
    return (
      <div className="p-6">
        <ProductSkeletonGrid />
      </div>
    )
  }

  if (error) {
    return <h1>Error loading products</h1>;
  }

    const filteredProducts =
    selectedCategory
      ? products?.filter(
          (product) =>
            product.category ===
            selectedCategory
        )
      : products;


  return (
    <div className="p-6">

      <h1 className="text-3xl font-bold mb-6">
        Products
      </h1>


          <CategoryFilter
        categories={categories ?? []}
        selected={selectedCategory}
        onSelect={setSelectedCategory}
      />
       <ProductGrid
        products = {filteredProducts ?? []
        }
      />


    </div>
  );
}

export default Home;