import { useDispatch, useSelector } from "react-redux";
import { clearCart, decreaseQuantity, increaseQuantity, removeFromCart } from "./slice/cartslice";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const cartItems = useSelector((state) => state.cart.items);
  // console.log("duyg",cartItems)
  
  const dispatch = useDispatch();
  const navigate = useNavigate();

const total = cartItems.reduce(
  (sum, item) => sum + item.price * item.quantity,
  0
);
const totalPrice = total.toFixed(2);

  if (cartItems.length === 0) {
    return (
      <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-gradient-to-br from-slate-950 via-cyan-950 to-slate-900 px-4 text-white">
        <div className="pointer-events-none absolute -left-32 -top-32 h-96 w-96 rounded-full bg-cyan-500/20 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-32 -right-32 h-96 w-96 rounded-full bg-purple-500/20 blur-3xl" />

        <div className="relative w-full max-w-md rounded-3xl border border-white/15 bg-white/10 p-10 text-center shadow-2xl shadow-black/40 backdrop-blur-xl">
          <div className="text-6xl">🛒</div>

          <h1 className="mt-5 text-3xl font-bold">Your Cart is Empty</h1>

          <p className="mt-3 text-slate-300">
            Add products from the shop and they will appear here.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-slate-950 via-cyan-950 to-slate-900 px-4 py-10 text-white">
      <div className="pointer-events-none absolute -left-40 -top-40 h-96 w-96 rounded-full bg-cyan-500/20 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-40 -right-40 h-96 w-96 rounded-full bg-purple-500/20 blur-3xl" />
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-80 w-80 -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-500/10 blur-3xl" />

      <div className="relative mx-auto max-w-5xl">
        <div className="mb-8 flex flex-col items-center justify-between gap-4 sm:flex-row">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-cyan-300">
              Your Order
            </p>

            <h1 className="mt-2 text-4xl font-bold">Shopping Cart</h1>

            <p className="mt-2 text-slate-300">
              {cartItems.length} item{cartItems.length !== 1 ? "s" : ""} in
              your cart
            </p>
          </div>

          <button
            type="button"
            onClick={() => dispatch(clearCart())}
            className="rounded-xl border border-red-300/30 bg-red-500/10 px-5 py-3 font-semibold text-red-200 transition hover:scale-105 hover:bg-red-500/20"
          >
            Clear Cart
          </button>
        </div>

        <div className="space-y-5">
          {cartItems.map((item) => (
            <div
              key={item.id}
              className="group flex flex-col gap-5 rounded-2xl border border-white/15 bg-white/10 p-5 shadow-xl shadow-black/20 backdrop-blur-xl transition duration-300 hover:border-cyan-300/30 hover:bg-white/15 sm:flex-row sm:items-center"
            >
              <div className="h-28 w-full overflow-hidden rounded-xl bg-white sm:w-28">
                <img
                  src={item.thumbnail || item.images?.[0]}
                  alt={item.title}
                  className="h-full w-full object-cover transition duration-500 group-hover:scale-110"
                />
              </div>

              <div className="min-w-0 flex-1">
                <p className="text-sm font-semibold text-cyan-300">
                  {item.brand || "Premium Brand"}
                </p>

                <h2 className="mt-1 truncate text-xl font-bold text-white">
                  {item.title}
                </h2>

                <p className="mt-2 line-clamp-2 text-sm text-slate-300">
                  {item.description}
                </p>

                {/* <button
                  type="button"
                  onClick={() => dispatch(removeFromCart(item.id))}
                  className="mt-4 text-sm font-semibold text-red-300 transition hover:text-red-100 hover:underline"
                >
                  Remove item
                </button>
                  <button
                  type="button"
                  onClick={() => dispatch(increaseQuantity(item.id))}
                  className="mt-4 text-sm font-semibold text-red-300 transition hover:text-red-100 hover:underline"
                >
                 +
                </button>
                <span>{}</span>
                  <button
                  type="button"
                  onClick={() => dispatch(decreaseQuantity(item.id))}
                  className="mt-4 text-sm font-semibold text-red-300 transition hover:text-red-100 hover:underline"
                >
                  -
                </button> */}
                <div className="mt-4 flex items-center gap-4">
  <button
    type="button"
    onClick={() => dispatch(removeFromCart(item.id))}
    className="text-sm font-semibold text-red-300 hover:text-red-100 hover:underline"
  >
    Remove
  </button>

  <button
    type="button"
    onClick={() => dispatch(decreaseQuantity(item.id))}
    className="flex h-8 w-8 items-center justify-center rounded-md bg-red-500 text-lg font-bold"
  >
    -
  </button>

  <span className="text-lg font-bold">
    {item.quantity}
  </span>

  <button
    type="button"
    onClick={() => dispatch(increaseQuantity(item.id))}
    className="flex h-8 w-8 items-center justify-center rounded-md bg-green-500 text-lg font-bold"
  >
    +
  </button>
</div>
              </div>

              <div className="border-t border-white/10 pt-4 text-left sm:border-l sm:border-t-0 sm:pl-6 sm:pt-0 sm:text-right">
                <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                  Price
                </p>

                <p className="mt-1 text-2xl font-bold text-emerald-400">
  ₹{(item.price * item.quantity).toFixed(2)}
</p>

<p className="text-sm text-slate-400">
  ₹{item.price} × {item.quantity}
</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 rounded-3xl border border-white/15 bg-white/10 p-6 shadow-2xl shadow-black/30 backdrop-blur-xl">
          <div className="flex items-center justify-between border-b border-white/10 pb-5">
            <span className="text-lg text-slate-300">Subtotal</span>
            <span className="text-xl font-bold text-white">₹total.toFixed(2)</span>
          </div>

          <div className="flex items-center justify-between py-5">
            <h2 className="text-2xl font-bold">Total</h2>
            <p className="bg-gradient-to-r from-cyan-300 to-emerald-300 bg-clip-text text-3xl font-bold text-transparent">
             ₹{totalPrice}
            </p>
          </div>

          <button
  type="button"
  onClick={() => navigate("/checkout")}
  className="w-full rounded-xl bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600 py-3 font-bold text-white shadow-lg shadow-cyan-500/25 transition duration-300 hover:scale-[1.02] hover:from-cyan-400 hover:to-purple-500"
>
  Proceed to Checkout →
</button>
        </div>
      </div>
    </div>
  );
};

export default Cart;