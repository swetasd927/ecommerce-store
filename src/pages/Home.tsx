import { useState } from "react";

import ProductGrid from "../components/product/ProductGrid";
import ProductSkeletonGrid from "../components/product/ProductSkeletonGrid";
import CategoryFilter from "../components/product/CategoryFilter";
import { useProducts } from "../hooks/useProduct";
import { useCategories } from "../hooks/useCategories";

function Home() {
  const [selectedCategory, setSelectedCategory] =
    useState("");

  const [currentPage, setCurrentPage] =
    useState(1);

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
    );
  }

  if (error) {
    return (
      <h1>
        Error loading products
      </h1>
    );
  }

  const filteredProducts =
    selectedCategory
      ? products?.filter(
          (product) =>
            product.category ===
            selectedCategory
        )
      : products;

  const ITEMS_PER_PAGE = 6;

  const totalPages =
    Math.ceil(
      (filteredProducts?.length ?? 0) /
      ITEMS_PER_PAGE
    );

  const start =
    (currentPage - 1) *
    ITEMS_PER_PAGE;

  const paginatedProducts =
    filteredProducts?.slice(
      start,
      start + ITEMS_PER_PAGE
    );

  return (
    <div className="p-6">

      <h1
        className="
        text-3xl
        font-bold
        mb-6
        "
      >
        Products
      </h1>

      <CategoryFilter
        categories={categories ?? []}
        selected={selectedCategory}
        onSelect={(category) => {
          setSelectedCategory(category);
          setCurrentPage(1);
        }}
      />

      <ProductGrid
        products={
          paginatedProducts ?? []
        }
      />

      <div
        className="
        flex
        gap-2
        mt-8
        flex-wrap
        "
      >

        {Array.from({
          length: totalPages,
        }).map((_, index) => (

          <button
            key={index}
            onClick={() =>
              setCurrentPage(
                index + 1
              )
            }
            className={`
            px-4
            py-2
            border
            rounded

            ${
              currentPage ===
              index + 1
                ? "bg-black text-white"
                : ""
            }
            `}
          >
            {index + 1}
          </button>

        ))}

      </div>

    </div>
  );
}

export default Home;