// import { useSearchParams } from "react-router-dom";

// import ProductGrid from "../components/product/ProductGrid";
// import ProductSkeletonGrid from "../components/product/ProductSkeletonGrid";
// import CategoryFilter from "../components/product/CategoryFilter";
// import { useProducts } from "../hooks/useProducts";
// import { useCategories } from "../hooks/useCategories";

// function Home() {
//   const [searchParams, setSearchParams] = useSearchParams();

//   const selectedCategory = searchParams.get("category") ?? "";

//   const currentPage = Number(searchParams.get("page")) || 1;

//   const { data: products, isLoading, error } = useProducts();

//   const { data: categories } = useCategories();

//   if (isLoading) {
//     return (
//       <div className="p-6">
//         <ProductSkeletonGrid />
//       </div>
//     );
//   }

//   if (error) {
//     return <h1>Error loading products</h1>;
//   }

//   const filteredProducts = selectedCategory
//     ? products?.filter((product) => product.category === selectedCategory)
//     : products;

//   const ITEMS_PER_PAGE = 6;

//   const totalPages = Math.ceil(
//     (filteredProducts?.length ?? 0) / ITEMS_PER_PAGE,
//   );

//   const start = (currentPage - 1) * ITEMS_PER_PAGE;

//   const paginatedProducts = filteredProducts?.slice(
//     start,
//     start + ITEMS_PER_PAGE,
//   );

//   return (
//     <div className="p-6">
//       <h1
//         className="
//         text-3xl
//         font-bold
//         mb-6
//         "
//       >
//         Products
//       </h1>

//       <CategoryFilter
//         categories={categories ?? []}
//         selected={selectedCategory}
//         onSelect={(category) => {
//           setSearchParams({
//             category,
//             page: "1",
//           });
//         }}
//       />

//       <ProductGrid products={paginatedProducts ?? []} />

//       <div
//         className="
//         flex
//         gap-2
//         mt-8
//         flex-wrap
//         "
//       >
//         {Array.from({
//           length: totalPages,
//         }).map((_, index) => (
//           <button
//             key={index}
//             onClick={() =>
//               setSearchParams({
//                 category: selectedCategory,
//                 page: String(index + 1),
//               })
//             }
//             className={`
//             px-4
//             py-2
//             border
//             rounded

//             ${currentPage === index + 1 ? "bg-black text-white" : ""}
//             `}
//           >
//             {index + 1}
//           </button>
//         ))}
//       </div>
//     </div>
//   );
// }

// export default Home;


import { useSearchParams } from "react-router-dom";

import ProductGrid from "../components/product/ProductGrid";
import ProductSkeletonGrid from "../components/product/ProductSkeletonGrid";
import CategoryFilter from "../components/product/CategoryFilter";
import { useProducts } from "../hooks/useProducts";
import { useCategories } from "../hooks/useCategories";
import { cn } from "../lib/cn";

const ITEMS_PER_PAGE = 8;

function Home() {
  const [searchParams, setSearchParams] = useSearchParams();

  const selectedCategory = searchParams.get("category") ?? "";
  const searchQuery = searchParams.get("q") ?? "";
  const currentPage = Number(searchParams.get("page")) || 1;

  const { data: products, isLoading, error } = useProducts();
  const { data: categories } = useCategories();

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
        <h1 className="text-xl font-semibold text-ink-900">
          Something went wrong loading products
        </h1>
        <p className="mt-1 text-ink-600">Please refresh and try again.</p>
      </div>
    );
  }

  const categoryFiltered = selectedCategory
    ? products?.filter((product) => product.category === selectedCategory)
    : products;

  const searchFiltered = searchQuery
    ? categoryFiltered?.filter((product) =>
        product.title.toLowerCase().includes(searchQuery.toLowerCase()),
      )
    : categoryFiltered;

  const totalPages = Math.max(
    1,
    Math.ceil((searchFiltered?.length ?? 0) / ITEMS_PER_PAGE),
  );
  const safePage = Math.min(currentPage, totalPages);
  const start = (safePage - 1) * ITEMS_PER_PAGE;

  const paginatedProducts = searchFiltered?.slice(start, start + ITEMS_PER_PAGE);

  const goToPage = (page: number) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", String(page));
    setSearchParams(params);
  };

  return (
    <div className="mx-auto max-w-7xl p-4 sm:p-6">
      <div className="mb-6">
        <h1 className="font-display text-2xl font-extrabold text-ink-900 sm:text-3xl">
          {searchQuery ? `Results for "${searchQuery}"` : "All Products"}
        </h1>
        <p className="mt-1 text-sm text-ink-600">
          {searchFiltered?.length ?? 0} products available
        </p>
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

      {paginatedProducts && paginatedProducts.length === 0 ? (
        <div className="rounded-xl border border-dashed border-gray-300 bg-white py-16 text-center">
          <p className="text-ink-600">No products match your filters.</p>
        </div>
      ) : (
        <ProductGrid products={paginatedProducts ?? []} />
      )}

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
                    : "border-gray-200 bg-white text-ink-600 hover:border-brand-500 hover:text-brand-600",
                )}
              >
                {page}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default Home;