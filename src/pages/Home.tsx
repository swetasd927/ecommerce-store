// import { useSearchParams } from "react-router-dom";

// import ProductGrid from "../components/product/ProductGrid";
// import ProductSkeletonGrid from "../components/product/ProductSkeletonGrid";
// import CategoryFilter from "../components/product/CategoryFilter";
// import { useProducts } from "../hooks/useProducts";
// import { useCategories } from "../hooks/useCategories";
// import { cn } from "../lib/cn";

// const ITEMS_PER_PAGE = 8;

// function Home() {
//   const [searchParams, setSearchParams] = useSearchParams();

//   const selectedCategory = searchParams.get("category") ?? "";
//   const searchQuery = searchParams.get("q") ?? "";
//   const currentPage = Number(searchParams.get("page")) || 1;

//   const { data: products, isLoading, error } = useProducts();
//   const { data: categories } = useCategories();

//   if (isLoading) {
//     return (
//       <div className="mx-auto max-w-7xl p-4 sm:p-6">
//         <ProductSkeletonGrid />
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="mx-auto max-w-7xl p-6">
//         <h1 className="text-xl font-semibold text-ink-900">
//           Something went wrong loading products
//         </h1>
//         <p className="mt-1 text-ink-600">Please refresh and try again.</p>
//       </div>
//     );
//   }

//   const categoryFiltered = selectedCategory
//     ? products?.filter((product) => product.category === selectedCategory)
//     : products;

//   const searchFiltered = searchQuery
//     ? categoryFiltered?.filter((product) =>
//         product.title.toLowerCase().includes(searchQuery.toLowerCase()),
//       )
//     : categoryFiltered;

//   const totalPages = Math.max(
//     1,
//     Math.ceil((searchFiltered?.length ?? 0) / ITEMS_PER_PAGE),
//   );
//   const safePage = Math.min(currentPage, totalPages);
//   const start = (safePage - 1) * ITEMS_PER_PAGE;

//   const paginatedProducts = searchFiltered?.slice(start, start + ITEMS_PER_PAGE);

//   const goToPage = (page: number) => {
//     const params = new URLSearchParams(searchParams);
//     params.set("page", String(page));
//     setSearchParams(params);
//   };

//   return (
//     <div className="mx-auto max-w-7xl p-4 sm:p-6">
//       <div className="mb-6">
//         <h1 className="font-display text-2xl font-extrabold text-ink-900 sm:text-3xl">
//           {searchQuery ? `Results for "${searchQuery}"` : "All Products"}
//         </h1>
//         <p className="mt-1 text-sm text-ink-600">
//           {searchFiltered?.length ?? 0} products available
//         </p>
//       </div>

//       <CategoryFilter
//         categories={categories ?? []}
//         selected={selectedCategory}
//         onSelect={(category) => {
//           const params = new URLSearchParams(searchParams);
//           if (category) {
//             params.set("category", category);
//           } else {
//             params.delete("category");
//           }
//           params.set("page", "1");
//           setSearchParams(params);
//         }}
//       />

//       {paginatedProducts && paginatedProducts.length === 0 ? (
//         <div className="rounded-xl border border-dashed border-gray-300 bg-white py-16 text-center">
//           <p className="text-ink-600">No products match your filters.</p>
//         </div>
//       ) : (
//         <ProductGrid products={paginatedProducts ?? []} />
//       )}

//       {totalPages > 1 && (
//         <div className="mt-8 flex flex-wrap justify-center gap-2">
//           {Array.from({ length: totalPages }).map((_, index) => {
//             const page = index + 1;
//             return (
//               <button
//                 key={page}
//                 onClick={() => goToPage(page)}
//                 className={cn(
//                   "h-9 w-9 rounded-full border text-sm font-medium transition-colors",
//                   safePage === page
//                     ? "border-brand-500 bg-brand-500 text-white"
//                     : "border-gray-200 bg-white text-ink-600 hover:border-brand-500 hover:text-brand-600",
//                 )}
//               >
//                 {page}
//               </button>
//             );
//           })}
//         </div>
//       )}
//     </div>
//   );
// }

// export default Home;

import { useEffect, useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Segmented, Select } from "antd";

import ProductGrid from "../components/product/ProductGrid";
import ProductSkeletonGrid from "../components/product/ProductSkeletonGrid";
import CategoryFilter from "../components/product/CategoryFilter";
import { useProducts } from "../hooks/useProducts";
import { useCategories } from "../hooks/useCategories";
import { cn } from "../lib/cn";
import type { Product } from "../types/Product";

const ITEMS_PER_PAGE = 8;
const INFINITE_SCROLL_BATCH = 8;

type SortOption = "default" | "price-asc" | "price-desc" | "rating-desc";

const SORT_OPTIONS: { value: SortOption; label: string }[] = [
  { value: "default", label: "Default" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
  { value: "rating-desc", label: "Rating: High to Low" },
];

function sortProducts(products: Product[], sort: SortOption): Product[] {
  const sorted = [...products];
  switch (sort) {
    case "price-asc":
      return sorted.sort((a, b) => a.price - b.price);
    case "price-desc":
      return sorted.sort((a, b) => b.price - a.price);
    case "rating-desc":
      return sorted.sort((a, b) => b.rating.rate - a.rating.rate);
    default:
      return sorted;
  }
}

function Home() {
  const [searchParams, setSearchParams] = useSearchParams();

  const selectedCategory = searchParams.get("category") ?? "";
  const searchQuery = searchParams.get("q") ?? "";
  const currentPage = Number(searchParams.get("page")) || 1;
  const sort = (searchParams.get("sort") as SortOption) || "default";
  const viewMode = searchParams.get("view") === "infinite" ? "infinite" : "pages";

  const { data: products, isLoading, error } = useProducts();
  const { data: categories } = useCategories();

  // Key that changes whenever filters/sort/view-mode change. Instead of
  // resetting `visibleCount` in an effect (which causes an extra render
  // pass), we compare this against its previous render value and adjust
  // state directly during render - React bails out of the render whenever
  // state changes this way, without committing an intermediate frame.
  
  const filterKey = `${selectedCategory}|${searchQuery}|${sort}|${viewMode}`;
  const [prevFilterKey, setPrevFilterKey] = useState(filterKey);
  const [visibleCount, setVisibleCount] = useState(INFINITE_SCROLL_BATCH);
  const sentinelRef = useRef<HTMLDivElement | null>(null);

  if (filterKey !== prevFilterKey) {
    setPrevFilterKey(filterKey);
    setVisibleCount(INFINITE_SCROLL_BATCH);
  }

  const categoryFiltered = selectedCategory
    ? products?.filter((product) => product.category === selectedCategory)
    : products;

  const searchFiltered = searchQuery
    ? categoryFiltered?.filter((product) =>
        product.title.toLowerCase().includes(searchQuery.toLowerCase()),
      )
    : categoryFiltered;

  const sortedProducts = searchFiltered
    ? sortProducts(searchFiltered, sort)
    : searchFiltered;

  useEffect(() => {
    if (viewMode !== "infinite") return;
    const node = sentinelRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          setVisibleCount((prev) => prev + INFINITE_SCROLL_BATCH);
        }
      },
      { rootMargin: "200px" },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [viewMode, sortedProducts?.length]);

  if (isLoading) {
    return (
      <div className="mx-auto max-w-7xl p-4 sm:p-6">
        <ProductSkeletonGrid />
      </div>
    );
  }

  if (error) {
    return (
      <div className="mx-auto max-w-7xl p-6">
        <h1 className="text-xl font-semibold text-ink-900 dark:text-ink-dark">
          Something went wrong loading products
        </h1>
        <p className="mt-1 text-ink-600 dark:text-ink-400">
          Please refresh and try again.
        </p>
      </div>
    );
  }

  const totalPages = Math.max(
    1,
    Math.ceil((sortedProducts?.length ?? 0) / ITEMS_PER_PAGE),
  );
  const safePage = Math.min(currentPage, totalPages);
  const start = (safePage - 1) * ITEMS_PER_PAGE;

  const paginatedProducts = sortedProducts?.slice(start, start + ITEMS_PER_PAGE);
  const infiniteProducts = sortedProducts?.slice(0, visibleCount);
  const hasMoreInfinite = (sortedProducts?.length ?? 0) > visibleCount;

  const updateParam = (key: string, value: string | null) => {
    const params = new URLSearchParams(searchParams);
    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    setSearchParams(params);
  };

  const goToPage = (page: number) => updateParam("page", String(page));

  return (
    <div className="mx-auto max-w-7xl p-4 sm:p-6">
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="font-display text-2xl font-extrabold text-ink-900 dark:text-ink-dark sm:text-3xl">
            {searchQuery ? `Results for "${searchQuery}"` : "All Products"}
          </h1>
          <p className="mt-1 text-sm text-ink-600 dark:text-ink-400">
            {sortedProducts?.length ?? 0} products available
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <Select<SortOption>
            value={sort}
            className="w-full sm:w-52"
            options={SORT_OPTIONS}
            onChange={(value) => updateParam("sort", value === "default" ? null : value)}
          />

          <Segmented
            value={viewMode}
            onChange={(value) => updateParam("view", value === "pages" ? null : String(value))}
            options={[
              { label: "Pages", value: "pages" },
              { label: "Infinite Scroll", value: "infinite" },
            ]}
          />
        </div>
      </div>

      <CategoryFilter
        categories={categories ?? []}
        selected={selectedCategory}
        onSelect={(category) => {
          const params = new URLSearchParams(searchParams);
          if (category) {
            params.set("category", category);
          } else {
            params.delete("category");
          }
          params.set("page", "1");
          setSearchParams(params);
        }}
      />

      {sortedProducts && sortedProducts.length === 0 ? (
        <div className="rounded-xl border border-dashed border-gray-300 bg-white py-16 text-center dark:border-gray-700 dark:bg-gray-900">
          <p className="text-ink-600 dark:text-ink-400">No products match your filters.</p>
        </div>
      ) : viewMode === "infinite" ? (
        <>
          <ProductGrid products={infiniteProducts ?? []} />

          <div ref={sentinelRef} className="mt-6 flex justify-center py-4">
            {hasMoreInfinite ? (
              <span className="text-sm text-ink-400">Loading more products…</span>
            ) : (
              <span className="text-sm text-ink-400">You've reached the end.</span>
            )}
          </div>
        </>
      ) : (
        <>
          <ProductGrid products={paginatedProducts ?? []} />

          {totalPages > 1 && (
            <div className="mt-8 flex flex-wrap justify-center gap-2">
              {Array.from({ length: totalPages }).map((_, index) => {
                const page = index + 1;
                return (
                  <button
                    key={page}
                    onClick={() => goToPage(page)}
                    className={cn(
                      "h-9 w-9 rounded-full border text-sm font-medium transition-colors",
                      safePage === page
                        ? "border-brand-500 bg-brand-500 text-white"
                        : "border-gray-200 bg-white text-ink-600 hover:border-brand-500 hover:text-brand-600 dark:border-gray-700 dark:bg-gray-900 dark:text-ink-dark dark:hover:border-brand-500 dark:hover:text-brand-500",
                    )}
                  >
                    {page}
                  </button>
                );
              })}
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default Home;