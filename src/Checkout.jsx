import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { clearCart } from "./slice/cartslice";

const inputClass =
  "rounded-xl border border-white/15 bg-white/10 px-4 py-3 text-white outline-none placeholder:text-slate-400 focus:border-cyan-400";

const contactFields = [
  { name: "name", type: "text", placeholder: "Full Name" },
  { name: "email", type: "email", placeholder: "Email Address" },
  { name: "phone", type: "tel", placeholder: "Phone Number", full: true },
];

const addressFields = [
  { name: "address", type: "text", placeholder: "House / Street Address", full: true },
  { name: "city", type: "text", placeholder: "City" },
  { name: "pincode", type: "text", placeholder: "Pincode" },
];

const cardFields = [
  { name: "cardName", type: "text", placeholder: "Name on Card", full: true },
  { name: "cardNumber", type: "text", placeholder: "Card Number (Demo)", full: true, maxLength: 16 },
  { name: "expiry", type: "text", placeholder: "MM/YY" },
  { name: "cvv", type: "password", placeholder: "CVV", maxLength: 3 },
];

const paymentMethods = [
  { id: "card", label: "💳 Card" },
  { id: "upi", label: "📱 UPI" },
  { id: "cod", label: "💵 Cash on Delivery" },
];

const steps = ["Cart", "Details", "Payment"];

const Field = ({ field, value, onChange }) => (
  <input
    type={field.type}
    name={field.name}
    value={value}
    onChange={onChange}
    placeholder={field.placeholder}
    required
    maxLength={field.maxLength}
    className={`${inputClass} ${field.full ? "sm:col-span-2" : ""}`}
  />
);

const Checkout = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);

  const [paymentMethod, setPaymentMethod] = useState("card");
  const [isPaying, setIsPaying] = useState(false);
  const [promo, setPromo] = useState("");
  const [promoApplied, setPromoApplied] = useState(false);

  const [formData, setFormData] = useState({
    name: "", email: "", phone: "", address: "", city: "", pincode: "",
    cardName: "", cardNumber: "", expiry: "", cvv: "",
  });

  const subtotal = cartItems.reduce((t, item) => t + item.price * item.quantity, 0);
  const discount = promoApplied ? subtotal * 0.1 : 0;
  const totalPrice = subtotal - discount;

  const handleChange = (e) =>
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const applyPromo = () => {
    if (promo.trim().toUpperCase() === "SAVE10") setPromoApplied(true);
    else alert("Invalid promo code");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (cartItems.length === 0) {
      alert("Your cart is empty.");
      navigate("/shop");
      return;
    }

    setIsPaying(true);
    setTimeout(() => {
      const order = {
        id: `ORD-${Date.now()}`,
        date: new Date().toLocaleString(),
        customer: formData,
        items: cartItems,
        total: totalPrice,
        paymentMethod,
        status: "Paid",
      };
      const oldOrders = JSON.parse(localStorage.getItem("orders")) || [];
      localStorage.setItem("orders", JSON.stringify([order, ...oldOrders]));
      dispatch(clearCart());
      navigate("/success", { state: { order } });
    }, 1500);
  };

  if (cartItems.length === 0 && !isPaying) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-950 via-cyan-950 to-slate-900 px-4 text-white">
        <div className="w-full max-w-md rounded-3xl border border-white/15 bg-white/10 p-8 text-center shadow-2xl backdrop-blur-xl">
          <div className="text-6xl">🛒</div>
          <h1 className="mt-5 text-3xl font-bold">Your Cart Is Empty</h1>
          <p className="mt-3 text-slate-300">Add products before going to checkout.</p>
          <button
            onClick={() => navigate("/shop")}
            className="mt-7 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 px-6 py-3 font-bold text-white transition hover:scale-105"
          >
            Browse Products →
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-cyan-950 to-slate-900 px-4 py-10 text-white md:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8 text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-cyan-300">Secure Checkout</p>
          <h1 className="mt-3 text-4xl font-bold md:text-5xl">Complete Your Order</h1>
          <p className="mt-3 text-slate-300">Fill in your details below — payment is processed instantly.</p>
        </div>

        {/* Step indicator */}
        <div className="mx-auto mb-10 flex max-w-md items-center justify-between">
          {steps.map((step, i) => (
            <div key={step} className="flex flex-1 items-center">
              <div className="flex flex-col items-center gap-1.5">
                <div
                  className={`flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold ${
                    i <= 1 ? "bg-gradient-to-r from-cyan-500 to-blue-600" : "border border-white/20 bg-white/10 text-slate-400"
                  }`}
                >
                  {i < 1 ? "✓" : i + 1}
                </div>
                <span className={`text-xs ${i <= 1 ? "text-cyan-300" : "text-slate-500"}`}>{step}</span>
              </div>
              {i < steps.length - 1 && (
                <div className={`mx-2 h-0.5 flex-1 ${i < 1 ? "bg-cyan-500" : "bg-white/10"}`} />
              )}
            </div>
          ))}
        </div>

        <form onSubmit={handleSubmit} className="grid gap-8 lg:grid-cols-[1.4fr_0.8fr]">
          <div className="space-y-7">
            <section className="rounded-3xl border border-white/15 bg-white/10 p-6 shadow-xl backdrop-blur-xl">
              <h2 className="text-2xl font-bold">👤 Contact Details</h2>
              <div className="mt-5 grid gap-4 sm:grid-cols-2">
                {contactFields.map((f) => (
                  <Field key={f.name} field={f} value={formData[f.name]} onChange={handleChange} />
                ))}
              </div>
            </section>

            <section className="rounded-3xl border border-white/15 bg-white/10 p-6 shadow-xl backdrop-blur-xl">
              <h2 className="text-2xl font-bold">📍 Delivery Address</h2>
              <div className="mt-5 grid gap-4 sm:grid-cols-2">
                {addressFields.map((f) => (
                  <Field key={f.name} field={f} value={formData[f.name]} onChange={handleChange} />
                ))}
              </div>
              <p className="mt-4 text-xs text-slate-400">📅 Estimated delivery: 3–5 business days</p>
            </section>

            <section className="rounded-3xl border border-white/15 bg-white/10 p-6 shadow-xl backdrop-blur-xl">
              <h2 className="text-2xl font-bold">💳 Payment Method</h2>
              <div className="mt-5 flex flex-wrap gap-3">
                {paymentMethods.map((m) => (
                  <button
                    key={m.id}
                    type="button"
                    onClick={() => setPaymentMethod(m.id)}
                    className={`rounded-xl px-5 py-3 font-semibold transition ${
                      paymentMethod === m.id
                        ? "bg-gradient-to-r from-cyan-500 to-blue-600 text-white"
                        : "border border-white/15 bg-white/5 text-slate-300 hover:bg-white/10"
                    }`}
                  >
                    {m.label}
                  </button>
                ))}
              </div>

              {paymentMethod === "card" && (
                <div className="mt-5 grid gap-4 sm:grid-cols-2">
                  {cardFields.map((f) => (
                    <Field key={f.name} field={f} value={formData[f.name]} onChange={handleChange} />
                  ))}
                </div>
              )}

              {paymentMethod === "upi" && (
                <input
                  type="text"
                  placeholder="Enter UPI ID (example@upi)"
                  required
                  className={`${inputClass} mt-5 w-full`}
                />
              )}

              {paymentMethod === "cod" && (
                <p className="mt-5 rounded-xl border border-emerald-400/20 bg-emerald-500/10 p-4 text-sm text-emerald-200">
                  You will pay when your order is delivered.
                </p>
              )}
            </section>
          </div>

          <aside className="h-fit rounded-3xl border border-white/15 bg-white/10 p-6 shadow-xl backdrop-blur-xl lg:sticky lg:top-24">
            <h2 className="text-2xl font-bold">Order Summary</h2>

            <div className="mt-5 max-h-64 space-y-3 overflow-y-auto pr-1">
              {cartItems.map((item) => (
                <div key={item.id} className="flex gap-3 rounded-xl border border-white/10 bg-white/5 p-3">
                  <img
                    src={item.thumbnail || item.images?.[0]}
                    alt={item.title}
                    className="h-14 w-14 rounded-lg bg-white object-cover"
                  />
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-semibold">{item.title}</p>
                    <p className="mt-1 text-xs text-slate-400">Qty: {item.quantity}</p>
                    <p className="mt-1 text-sm font-bold text-emerald-400">
                      ₹{(item.price * item.quantity).toFixed(2)}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Promo code */}
            <div className="mt-5 flex gap-2">
              <input
                type="text"
                value={promo}
                onChange={(e) => setPromo(e.target.value)}
                placeholder="Promo code"
                disabled={promoApplied}
                className={`${inputClass} flex-1 py-2.5 text-sm disabled:opacity-60`}
              />
              <button
                type="button"
                onClick={applyPromo}
                disabled={promoApplied}
                className="rounded-xl border border-cyan-300/20 bg-cyan-500/10 px-4 text-sm font-semibold text-cyan-200 transition hover:bg-cyan-500/20 disabled:opacity-60"
              >
                {promoApplied ? "Applied ✓" : "Apply"}
              </button>
            </div>

            <div className="mt-6 space-y-3 border-t border-white/15 pt-5 text-slate-300">
              <div className="flex justify-between">
                <span>Items ({cartItems.length})</span>
                <span>₹{subtotal.toFixed(2)}</span>
              </div>
              {promoApplied && (
                <div className="flex justify-between text-emerald-400">
                  <span>Discount (SAVE10)</span>
                  <span>-₹{discount.toFixed(2)}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span>Delivery</span>
                <span className="text-emerald-400">FREE</span>
              </div>
              <div className="flex justify-between border-t border-white/15 pt-4 text-xl font-bold text-white">
                <span>Total</span>
                <span className="text-emerald-400">₹{totalPrice.toFixed(2)}</span>
              </div>
            </div>

            <button
              type="submit"
              disabled={isPaying}
              className="mt-7 w-full rounded-xl bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600 py-3.5 font-bold text-white shadow-lg shadow-cyan-500/25 transition hover:scale-[1.02] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isPaying ? "Processing Payment..." : paymentMethod === "cod" ? "Place Order →" : `Pay ₹${totalPrice.toFixed(2)} →`}
            </button>

            <div className="mt-5 flex items-center justify-center gap-4 text-xs text-slate-400">
              <span>🔒 Secure</span>
              <span>↩️ Easy Returns</span>
              <span>✅ Verified</span>
            </div>
          </aside>
        </form>
      </div>
    </div>
  );
};

export default Checkout;