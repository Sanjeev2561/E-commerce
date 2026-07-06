import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { addToCart } from "./slice/cartslice";

function ProductDetail() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState("");

  const dispatch=useDispatch()
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);

        const response = await fetch(
          `https://dummyjson.com/products/${id}`
        );

        const result = await response.json();

        setData(result);
        setSelectedImage(result.thumbnail);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-cyan-950 to-slate-900 flex items-center justify-center">
        <h1 className="text-3xl font-bold text-white">
          Loading Product...
        </h1>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-cyan-950 to-slate-900 flex items-center justify-center">
        <h1 className="text-3xl font-bold text-red-300">
          Product Not Found 😢
        </h1>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-cyan-950 to-slate-900 px-6 py-12 text-white">
      <div className="max-w-6xl mx-auto rounded-3xl border border-white/20 bg-white/10 p-6 md:p-10 shadow-2xl backdrop-blur-md">

        <div className="grid md:grid-cols-2 gap-12">

          {/* Images */}
          <div className="flex gap-4">
            <div className="w-24 flex flex-col gap-3">
              {data.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(image)}
                  className={`overflow-hidden rounded-xl border transition ${
                    selectedImage === image
                      ? "border-cyan-400 ring-2 ring-cyan-400"
                      : "border-white/20 hover:border-cyan-300"
                  }`}
                >
                  <img
                    src={image}
                    alt={data.title}
                    className="w-full h-20 object-cover"
                  />
                </button>
              ))}
            </div>

            <div className="flex-1 rounded-2xl border border-white/20 bg-white/10 p-4 shadow-xl">
              <img
                src={selectedImage || data.thumbnail}
                alt={data.title}
                className="w-full h-96 object-contain rounded-xl"
              />
            </div>
          </div>

          {/* Product Details */}
          <div>
            <p className="text-cyan-300 font-semibold">
              {data.category}
            </p>

            <h1 className="mt-2 text-4xl font-bold md:text-5xl">
              {data.title}
            </h1>

            <p className="mt-4 text-xl text-yellow-300">
              ⭐ {data.rating}
            </p>

            <p className="mt-4 text-4xl font-bold text-green-400">
              ₹{data.price}
            </p>

            <div className="mt-6 space-y-2 text-gray-200">
              <p>
                <b className="text-white">Brand:</b> {data.brand}
              </p>

              <p>
                <b className="text-white">Category:</b> {data.category}
              </p>

              <p>
                <b className="text-white">Stock:</b> {data.stock}
              </p>

              <p>
                <b className="text-white">Discount:</b>{" "}
                {data.discountPercentage}%
              </p>
            </div>

            <p className="mt-6 leading-7 text-gray-300">
              {data.description}
            </p>

            {/* Cart Buttons */}
            <div className="flex flex-wrap gap-14 mt-8 px-13">
              <button onClick={()=>dispatch(addToCart(data))} className="rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 px-7 py-3 font-semibold text-white shadow-lg transition hover:scale-105 hover:from-cyan-400 hover:to-blue-500">
                ➕Add to Cart
              </button>

              <button className="rounded-xl border border-white/20 bg-white/10 px-7 py-3 font-semibold text-white transition hover:bg-white/20 hover:scale-105">
                🛒Buy Now
              </button>
            </div>

            <div className="flex flex-wrap gap-14 mt-8 pt-6 px-13 border-t border-white/20">
              <button
                onClick={() => navigate(`/detail/${Number(id) - 1}`)}
                disabled={Number(id) === 1}
                className="rounded-xl bg-white/10 border border-white/20 px-6 py-3 font-semibold text-white transition hover:bg-white/20 disabled:cursor-not-allowed disabled:opacity-40"
              >
                ⬅ Previous
              </button>

              <button
                onClick={() => navigate(`/detail/${Number(id) + 1}`)}
                disabled={Number(id) === 194}
                className="rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 px-6 py-3 font-semibold text-white shadow-lg transition hover:scale-105 hover:from-cyan-400 hover:to-blue-500 disabled:cursor-not-allowed disabled:opacity-40"
              >
                Next ➡
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;