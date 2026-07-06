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
        const response = await fetch("https://dummyjson.com/products");
        const result = await response.json();

        setData(result.products);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-cyan-950 to-slate-900 flex justify-center items-center">
        <h1 className="text-3xl font-bold text-white">
          Loading Products...
        </h1>
      </div>
    );
  }

  const filterProducts = data.filter((item) =>
    `${item.title} ${item.description} ${item.brand} ${item.category}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-cyan-950 to-slate-900 py-10 px-6">
      <h1 className="text-4xl font-bold text-center mb-10 bg-gradient-to-r from-cyan-300 to-purple-400 bg-clip-text text-transparent">
        Our Products
      </h1>

      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {filterProducts.length > 0 ? (
          filterProducts.map((item) => (
            <div
              key={item.id}
              className="overflow-hidden rounded-2xl border border-white/20 bg-white/10 shadow-xl backdrop-blur-md transition duration-300 hover:-translate-y-2 hover:bg-white/20 hover:shadow-2xl"
            >
              <Link to={`/detail/${item.id}`}>
                <img
                  src={item.images[0]}
                  alt={item.title}
                  className="w-full h-72 object-cover transition duration-300 hover:scale-105"
                />
              </Link>

              <div className="p-5">
                <h2 className="text-xl font-bold text-white truncate">
                  {item.title}
                </h2>

                <p className="text-cyan-300 font-semibold mt-2">
                  {item.brand}
                </p>

                <p className="text-green-400 text-2xl font-bold mt-4">
                  ${item.price}
                </p>

                <Link to={`/detail/${item.id}`}>
                  <button className="w-full mt-5 py-2.5 text-white font-semibold rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 hover:scale-105 transition duration-300">
                    View Product →
                  </button>
                </Link>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full border border-white/20 bg-white/10 backdrop-blur-md rounded-2xl py-12 text-center">
            <h2 className="text-2xl font-bold text-red-300">
              No Products Found 😢
            </h2>
          </div>
        )}
      </div>
    </div>
  );
};

export default Shop;