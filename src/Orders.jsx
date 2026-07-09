import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const Orders = () => {
  const navigate = useNavigate();

  const [orders, setOrders] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const savedUser = JSON.parse(localStorage.getItem("currentUser"));
    const savedOrders = JSON.parse(localStorage.getItem("orders")) || [];

    setCurrentUser(savedUser);
    setOrders(savedOrders);
  }, []);

  // If user is not logged in, send them to Login page
  if (!currentUser) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-950 via-cyan-950 to-slate-900 px-4 text-white">
        <div className="w-full max-w-md rounded-3xl border border-white/15 bg-white/10 p-8 text-center shadow-2xl backdrop-blur-xl">
          <div className="text-6xl">🔐</div>

          <h1 className="mt-5 text-3xl font-bold">Login Required</h1>

          <p className="mt-3 text-slate-300">
            Please login to see your orders.
          </p>

          <Link
            to="/login"
            className="mt-7 inline-block rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 px-6 py-3 font-bold text-white transition hover:scale-105"
          >
            Login Now →
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-slate-950 via-cyan-950 to-slate-900 px-4 py-10 text-white md:px-8">
      <div className="pointer-events-none absolute -left-40 -top-40 h-96 w-96 rounded-full bg-cyan-500/20 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-40 -right-40 h-96 w-96 rounded-full bg-purple-500/20 blur-3xl" />

      <div className="relative mx-auto max-w-5xl">
        <div className="mb-10 text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-cyan-300">
            My Account
          </p>

          <h1 className="mt-3 text-4xl font-bold md:text-5xl">
            My Orders 📦
          </h1>

          <p className="mt-3 text-slate-300">
            Hello, {currentUser.name}. Here are your placed orders.
          </p>
        </div>

        {orders.length === 0 ? (
          <div className="rounded-3xl border border-white/15 bg-white/10 p-10 text-center shadow-xl backdrop-blur-xl">
            <div className="text-6xl">📭</div>

            <h2 className="mt-5 text-2xl font-bold">No Orders Yet</h2>

            <p className="mt-3 text-slate-300">
              Your completed orders will appear here.
            </p>

            <button
              type="button"
              onClick={() => navigate("/shop")}
              className="mt-7 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 px-6 py-3 font-bold text-white transition hover:scale-105"
            >
              Start Shopping →
            </button>
          </div>
        ) : (
          <div className="space-y-6">
            {orders.map((order) => (
              <div
                key={order.id}
                className="overflow-hidden rounded-3xl border border-white/15 bg-white/10 shadow-xl backdrop-blur-xl"
              >
                <div className="flex flex-col justify-between gap-4 border-b border-white/10 bg-gradient-to-r from-cyan-500/10 via-blue-500/10 to-purple-500/10 p-5 sm:flex-row sm:items-center">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wider text-cyan-300">
                      Order ID
                    </p>

                    <h2 className="mt-1 font-bold text-white">{order.id}</h2>

                    <p className="mt-1 text-sm text-slate-300">{order.date}</p>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="rounded-full border border-emerald-300/30 bg-emerald-500/15 px-4 py-2 text-sm font-bold text-emerald-300">
                      ✓ {order.status}
                    </span>

                    <span className="rounded-full border border-cyan-300/30 bg-cyan-500/15 px-4 py-2 text-sm font-semibold capitalize text-cyan-200">
                      {order.paymentMethod}
                    </span>
                  </div>
                </div>

                <div className="p-5">
                  <div className="space-y-4">
                    {order.items.map((item) => (
                      <div
                        key={item.id}
                        className="flex items-center gap-4 rounded-2xl border border-white/10 bg-white/5 p-3"
                      >
                        <img
                          src={item.thumbnail || item.images?.[0]}
                          alt={item.title}
                          className="h-16 w-16 rounded-xl bg-white object-cover"
                        />

                        <div className="min-w-0 flex-1">
                          <h3 className="truncate font-bold text-white">
                            {item.title}
                          </h3>

                          <p className="mt-1 text-sm text-slate-400">
                            Quantity: {item.quantity}
                          </p>
                        </div>

                        <p className="text-right font-bold text-emerald-400">
                          ₹{(item.price * item.quantity).toFixed(2)}
                        </p>
                      </div>
                    ))}
                  </div>

                  <div className="mt-6 grid gap-4 border-t border-white/10 pt-5 sm:grid-cols-2">
                    <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                      <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                        Delivery To
                      </p>

                      <p className="mt-2 font-semibold text-white">
                        {order.customer.name}
                      </p>

                      <p className="mt-1 text-sm leading-6 text-slate-300">
                        {order.customer.address}, {order.customer.city} -{" "}
                        {order.customer.pincode}
                      </p>

                      <p className="mt-1 text-sm text-slate-400">
                        {order.customer.phone}
                      </p>
                    </div>

                    <div className="rounded-2xl border border-cyan-300/20 bg-cyan-500/10 p-4 sm:text-right">
                      <p className="text-xs font-semibold uppercase tracking-wider text-cyan-200">
                        Order Total
                      </p>

                      <p className="mt-2 text-3xl font-bold text-emerald-400">
                        ₹{Number(order.total).toFixed(2)}
                      </p>

                      <p className="mt-2 text-sm text-slate-300">
                        {order.items.length} product
                        {order.items.length !== 1 ? "s" : ""}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Orders;