import { useProducts } from "../hooks/useProducts";
import ProductGrid from "../components/product/ProductGrid";
import ProductSkeletonGrid from "../components/product/ProductSkeletonGrid";

function Home() {
  const {
    data,
    isLoading,
    error,
  } = useProducts();

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

  return (
    <div className="p-6">

      <h1 className="text-3xl font-bold mb-6">
        Products
      </h1>

       <ProductGrid
        products={data ?? []}
      />


    </div>
  );
}

export default Home;