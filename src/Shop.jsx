import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { SearchContext } from "./SearchContext";

const Shop = () => {
  const { search } = useContext(SearchContext);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

 useEffect(() => {
  const fetchProducts = async () => {
    try {
      const response = await fetch(
        "https://dummyjson.com/products?limit=100&skip=0"
      );

      const result = await response.json();

      setData(result.products);
      console.log("Total products:", result.total);
      console.log("Loaded products:", result.products.length);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  fetchProducts();
}, []);
  const filterProducts = data.filter((item) =>
    `${item.title} ${item.description} ${item.brand} ${item.category}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  if (loading) {
    return (
      <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-gradient-to-br from-slate-950 via-cyan-950 to-slate-900">
        <div className="absolute -left-32 -top-32 h-96 w-96 rounded-full bg-cyan-500/20 blur-3xl" />
        <div className="absolute -bottom-32 -right-32 h-96 w-96 rounded-full bg-purple-500/20 blur-3xl" />

        <div className="relative rounded-2xl border border-white/15 bg-white/10 px-10 py-8 text-center shadow-2xl backdrop-blur-xl">
          <div className="mx-auto mb-4 h-10 w-10 animate-spin rounded-full border-4 border-cyan-300 border-t-transparent" />
          <h1 className="text-2xl font-bold text-white">
            Loading Products...
          </h1>
          <p className="mt-2 text-sm text-slate-300">
            Getting the best products for you
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-slate-950 via-cyan-950 to-slate-900 px-6 py-12 text-white">
      <div className="pointer-events-none absolute -left-40 -top-40 h-96 w-96 rounded-full bg-cyan-500/20 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-40 -right-40 h-96 w-96 rounded-full bg-purple-500/20 blur-3xl" />
      <div className="pointer-events-none absolute left-1/2 top-1/3 h-80 w-80 -translate-x-1/2 rounded-full bg-blue-500/10 blur-3xl" />

      <div className="relative mx-auto max-w-7xl">
        <div className="mb-10 text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-cyan-300">
            Browse Collection
          </p>

          <h1 className="mt-3 bg-gradient-to-r from-cyan-200 via-blue-200 to-purple-300 bg-clip-text text-4xl font-bold text-transparent md:text-5xl">
            Our Products
          </h1>

          <p className="mt-4 text-slate-300">
            {filterProducts.length} product
            {filterProducts.length !== 1 ? "s" : ""} found
          </p>
        </div>

        {filterProducts.length > 0 ? (
          <div className="grid grid-cols-1 gap-7 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {filterProducts.map((item) => (
              <div
                key={item.id}
                className="group overflow-hidden rounded-2xl border border-white/15 bg-white/10 shadow-xl shadow-black/20 backdrop-blur-xl transition duration-300 hover:-translate-y-2 hover:border-cyan-300/30 hover:bg-white/15 hover:shadow-2xl"
              >
                <Link to={`/detail/${item.id}`} className="block overflow-hidden">
                  <div className="relative h-64 overflow-hidden bg-white">
                    <img
                      src={item.thumbnail || item.images?.[0]}
                      alt={item.title}
                      className="h-full w-full object-cover transition duration-500 group-hover:scale-110"
                    />

                    <span className="absolute left-3 top-3 rounded-full bg-slate-950/75 px-3 py-1 text-xs font-semibold text-cyan-200 backdrop-blur-md">
                      {item.category}
                    </span>

                    {item.discountPercentage > 0 && (
                      <span className="absolute right-3 top-3 rounded-full bg-gradient-to-r from-pink-500 to-red-500 px-3 py-1 text-xs font-bold text-white shadow-lg">
                        -{Math.round(item.discountPercentage)}%
                      </span>
                    )}
                  </div>
                </Link>

                <div className="p-5">
                  <p className="truncate text-sm font-semibold text-cyan-300">
                    {item.brand || "Premium Brand"}
                  </p>

                  <h2 className="mt-2 truncate text-xl font-bold text-white">
                    {item.title}
                  </h2>

                  <div className="mt-3 flex items-center gap-2">
                    <span className="text-sm text-yellow-300">★</span>
                    <span className="text-sm font-medium text-slate-200">
                      {item.rating}
                    </span>
                    <span className="text-xs text-slate-400">
                      ({item.stock} left)
                    </span>
                  </div>

                  <div className="mt-5 flex items-end justify-between gap-3">
                    <div>
                      <p className="text-xs text-slate-400">Price</p>
                      <p className="text-2xl font-bold text-emerald-400">
                       ₹{item.price}
                      </p>
                    </div>

                    <Link
                      to={`/detail/${item.id}`}
                      className="rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 px-4 py-2 text-sm font-bold text-white shadow-lg shadow-cyan-500/20 transition duration-300 hover:scale-105 hover:from-cyan-400 hover:to-purple-500"
                    >
                      View →
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="rounded-3xl border border-white/15 bg-white/10 px-6 py-16 text-center shadow-xl backdrop-blur-xl">
            <div className="text-5xl">🔍</div>
            <h2 className="mt-5 text-2xl font-bold text-white">
              No Products Found
            </h2>
            <p className="mt-2 text-slate-300">
              Try searching with another product name or category.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Shop;