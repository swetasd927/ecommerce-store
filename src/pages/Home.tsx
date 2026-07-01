import { useProducts } from "../hooks/useProducts";

function Home() {
  const {
    data,
    isLoading,
    error,
  } = useProducts();

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  if (error) {
    return <h1>Something went wrong</h1>;
  }

  return (
    <div className="p-6">

      <h1 className="text-3xl font-bold mb-6">
        Products
      </h1>

      <div className="space-y-4">
        {data?.map((product) => (
          <div
            key={product.id}
            className="border p-4 rounded"
          >
            <h2>
              {product.title}
            </h2>

            <p>
              ${product.price}
            </p>
          </div>
        ))}
      </div>

    </div>
  );
}

export default Home;