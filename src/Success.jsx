import { Link, useLocation, useNavigate } from "react-router-dom";

const Success = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const order = location.state?.order;

  if (!order) {
    navigate("/shop");
    return null;
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-950 via-cyan-950 to-slate-900 px-4 py-10 text-white">
      <div className="w-full max-w-xl rounded-3xl border border-white/15 bg-white/10 p-8 text-center shadow-2xl backdrop-blur-xl md:p-12">
        <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-emerald-500/20 text-6xl">
          ✓
        </div>

        <p className="mt-7 text-sm font-semibold uppercase tracking-[0.25em] text-emerald-300">
          Order Confirmed
        </p>

        <h1 className="mt-3 text-4xl font-bold">
          Payment Successful! 🎉
        </h1>

        <p className="mt-4 text-slate-300">
          Thank you, {order.customer.name}. Your order has been placed
          successfully.
        </p>

        <div className="mt-7 rounded-2xl border border-white/10 bg-white/5 p-5 text-left">
          <div className="flex justify-between gap-4">
            <span className="text-slate-400">Order ID</span>
            <span className="font-semibold text-cyan-300">{order.id}</span>
          </div>

          <div className="mt-4 flex justify-between gap-4">
            <span className="text-slate-400">Payment</span>
            <span className="font-semibold capitalize">{order.paymentMethod}</span>
          </div>

          <div className="mt-4 flex justify-between gap-4">
            <span className="text-slate-400">Total Paid</span>
            <span className="font-bold text-emerald-400">
              ₹{order.total.toFixed(2)}
            </span>
          </div>

          <div className="mt-4 flex justify-between gap-4">
            <span className="text-slate-400">Status</span>
            <span className="font-semibold text-emerald-300">
              {order.status}
            </span>
          </div>
        </div>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
          <Link
            to="/shop"
            className="rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 px-6 py-3 font-bold text-white transition hover:scale-105"
          >
            Continue Shopping →
          </Link>

          <Link
            to="/orders"
            className="rounded-xl border border-white/20 bg-white/10 px-6 py-3 font-bold text-white transition hover:bg-white/20"
          >
            View Orders
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Success;