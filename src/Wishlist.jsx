import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  clearWishlist,
  removeFromWishlist,
} from "./slice/wishlistSlice";
import { addToCart } from "./slice/cartslice";

const Wishlist = () => {
  const dispatch = useDispatch();

  const wishlistItems = useSelector((state) => state.wishlist.items);

  if (wishlistItems.length === 0) {
    return (
      <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-gradient-to-br from-slate-950 via-cyan-950 to-slate-900 px-6 text-white">
        <div className="absolute -left-32 -top-32 h-96 w-96 rounded-full bg-cyan-500/20 blur-3xl" />
        <div className="absolute -bottom-32 -right-32 h-96 w-96 rounded-full bg-purple-500/20 blur-3xl" />

        <div className="relative max-w-md rounded-3xl border border-white/15 bg-white/10 p-10 text-center shadow-2xl backdrop-blur-xl">
          <div className="text-6xl">💔</div>

          <h1 className="mt-5 text-3xl font-bold">Your Wishlist Is Empty</h1>

          <p className="mt-3 text-slate-300">
            Save products you love by clicking the heart button.
          </p>

          <Link
            to="/shop"
            className="mt-7 inline-block rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 px-6 py-3 font-bold text-white transition hover:scale-105"
          >
            Browse Products →
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-slate-950 via-cyan-950 to-slate-900 px-6 py-12 text-white">
      <div className="pointer-events-none absolute -left-40 -top-40 h-96 w-96 rounded-full bg-cyan-500/20 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-40 -right-40 h-96 w-96 rounded-full bg-purple-500/20 blur-3xl" />

      <div className="relative mx-auto max-w-7xl">
        <div className="flex flex-col items-center justify-between gap-5 sm:flex-row">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-pink-300">
              Saved Products
            </p>

            <h1 className="mt-2 text-4xl font-bold">My Wishlist ❤️</h1>

            <p className="mt-2 text-slate-300">
              {wishlistItems.length} saved product
              {wishlistItems.length !== 1 ? "s" : ""}
            </p>
          </div>

          <button
            type="button"
            onClick={() => dispatch(clearWishlist())}
            className="rounded-xl border border-red-400/30 bg-red-500/10 px-5 py-2.5 font-semibold text-red-200 transition hover:bg-red-500 hover:text-white"
          >
            Clear Wishlist
          </button>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-7 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {wishlistItems.map((item) => (
            <div
              key={item.id}
              className="group overflow-hidden rounded-2xl border border-white/15 bg-white/10 shadow-xl shadow-black/20 backdrop-blur-xl transition hover:-translate-y-2 hover:bg-white/15"
            >
              <Link to={`/detail/${item.id}`} className="block">
                <div className="h-60 overflow-hidden bg-white">
                  <img
                    src={item.thumbnail || item.images?.[0]}
                    alt={item.title}
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-110"
                  />
                </div>
              </Link>

              <div className="p-5">
                <p className="truncate text-sm font-semibold text-cyan-300">
                  {item.brand || "Premium Brand"}
                </p>

                <h2 className="mt-2 truncate text-xl font-bold">
                  {item.title}
                </h2>

                <p className="mt-3 text-2xl font-bold text-emerald-400">
                  ₹{item.price}
                </p>

                <div className="mt-5 grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => dispatch(addToCart(item))}
                    className="rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 py-2.5 text-sm font-bold text-white transition hover:scale-105"
                  >
                    Add to Cart
                  </button>

                  <button
                    type="button"
                    onClick={() => dispatch(removeFromWishlist(item.id))}
                    className="rounded-xl border border-pink-400/30 bg-pink-500/10 py-2.5 text-sm font-bold text-pink-200 transition hover:bg-pink-500 hover:text-white"
                  >
                    Remove
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Wishlist;