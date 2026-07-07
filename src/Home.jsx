import { Link } from "react-router-dom";

function Home() {
  const features = [
    {
      icon: "🚚",
      title: "Fast Delivery",
      text: "Quick and reliable delivery straight to your doorstep.",
    },
    {
      icon: "🔒",
      title: "Secure Shopping",
      text: "Your account and shopping experience stay protected.",
    },
    {
      icon: "⭐",
      title: "Best Quality",
      text: "Explore products selected for quality and value.",
    },
  ];

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-slate-950 via-cyan-950 to-slate-900 text-white">
      <div className="pointer-events-none absolute -left-40 -top-40 h-96 w-96 rounded-full bg-cyan-500/20 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-40 -right-40 h-96 w-96 rounded-full bg-purple-500/20 blur-3xl" />
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-80 w-80 -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-500/10 blur-3xl" />

     <section className="relative mx-auto max-w-6xl px-6 py-14">
  <div className="text-center">
    <p className="text-sm font-semibold uppercase tracking-[0.25em] text-cyan-300">
      Find your favorites
    </p>

    <h2 className="mt-3 text-3xl font-bold text-white md:text-4xl">
      Shop by Category
    </h2>

    <p className="mt-4 text-slate-300">
      Explore products from popular categories.
    </p>
  </div>

  <div className="mt-10 grid grid-cols-2 gap-5 md:grid-cols-4">
    <Link
      to="/shop"
      className="group rounded-2xl border border-white/15 bg-white/10 p-6 text-center backdrop-blur-xl transition hover:-translate-y-2 hover:border-cyan-300/40 hover:bg-white/15"
    >
      <div className="text-4xl transition group-hover:scale-110">💄</div>
      <h3 className="mt-4 font-bold text-white">Beauty</h3>
      <p className="mt-2 text-sm text-slate-300">Makeup and skincare</p>
    </Link>

    <Link
      to="/shop"
      className="group rounded-2xl border border-white/15 bg-white/10 p-6 text-center backdrop-blur-xl transition hover:-translate-y-2 hover:border-cyan-300/40 hover:bg-white/15"
    >
      <div className="text-4xl transition group-hover:scale-110">💻</div>
      <h3 className="mt-4 font-bold text-white">Electronics</h3>
      <p className="mt-2 text-sm text-slate-300">Tech for everyday use</p>
    </Link>

    <Link
      to="/shop"
      className="group rounded-2xl border border-white/15 bg-white/10 p-6 text-center backdrop-blur-xl transition hover:-translate-y-2 hover:border-cyan-300/40 hover:bg-white/15"
    >
      <div className="text-4xl transition group-hover:scale-110">👕</div>
      <h3 className="mt-4 font-bold text-white">Fashion</h3>
      <p className="mt-2 text-sm text-slate-300">Clothing and accessories</p>
    </Link>

    <Link
      to="/shop"
      className="group rounded-2xl border border-white/15 bg-white/10 p-6 text-center backdrop-blur-xl transition hover:-translate-y-2 hover:border-cyan-300/40 hover:bg-white/15"
    >
      <div className="text-4xl transition group-hover:scale-110">🪑</div>
      <h3 className="mt-4 font-bold text-white">Furniture</h3>
      <p className="mt-2 text-sm text-slate-300">Make your home better</p>
    </Link>
  </div>
</section>

<section className="relative mx-auto max-w-6xl px-6 py-14">
  <div className="rounded-3xl border border-white/15 bg-white/10 p-8 shadow-xl shadow-black/20 backdrop-blur-xl md:p-12">
    <div className="text-center">
      <p className="text-sm font-semibold uppercase tracking-[0.25em] text-cyan-300">
        Simple shopping
      </p>

      <h2 className="mt-3 text-3xl font-bold text-white md:text-4xl">
        How It Works
      </h2>
    </div>

    <div className="mt-10 grid gap-8 md:grid-cols-3">
      <div className="text-center">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 text-xl font-bold">
          1
        </div>
        <h3 className="mt-5 text-xl font-bold text-white">Browse Products</h3>
        <p className="mt-3 text-slate-300">
          Search products and choose a category you like.
        </p>
      </div>

      <div className="text-center">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 text-xl font-bold">
          2
        </div>
        <h3 className="mt-5 text-xl font-bold text-white">Add to Cart</h3>
        <p className="mt-3 text-slate-300">
          Add your favorite products to your shopping cart.
        </p>
      </div>

      <div className="text-center">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 text-xl font-bold">
          3
        </div>
        <h3 className="mt-5 text-xl font-bold text-white">Enjoy Shopping</h3>
        <p className="mt-3 text-slate-300">
          Review your order and enjoy a smooth shopping experience.
        </p>
      </div>
    </div>
  </div>
</section>

<section className="relative mx-auto max-w-6xl px-6 py-14">
  <div className="text-center">
    <p className="text-sm font-semibold uppercase tracking-[0.25em] text-cyan-300">
      Customer feedback
    </p>

    <h2 className="mt-3 text-3xl font-bold text-white md:text-4xl">
      What Shoppers Say
    </h2>
  </div>

  <div className="mt-10 grid gap-6 md:grid-cols-3">
    <div className="rounded-2xl border border-white/15 bg-white/10 p-7 backdrop-blur-xl">
      <p className="text-yellow-300">★★★★★</p>
      <p className="mt-4 leading-7 text-slate-300">
        “The product browsing experience is clean and very easy to use.”
      </p>
      <p className="mt-5 font-bold text-cyan-200">— Rahul</p>
    </div>

    <div className="rounded-2xl border border-white/15 bg-white/10 p-7 backdrop-blur-xl">
      <p className="text-yellow-300">★★★★★</p>
      <p className="mt-4 leading-7 text-slate-300">
        “I found products quickly using the category and search filters.”
      </p>
      <p className="mt-5 font-bold text-cyan-200">— Priya</p>
    </div>

    <div className="rounded-2xl border border-white/15 bg-white/10 p-7 backdrop-blur-xl">
      <p className="text-yellow-300">★★★★★</p>
      <p className="mt-4 leading-7 text-slate-300">
        “The cart design and product cards look modern and easy to understand.”
      </p>
      <p className="mt-5 font-bold text-cyan-200">— Aman</p>
    </div>
  </div>
</section>

<section className="relative mx-auto max-w-6xl px-6 py-14">
  <div className="rounded-3xl border border-cyan-300/20 bg-gradient-to-r from-cyan-500/15 via-blue-500/15 to-purple-500/15 p-8 text-center shadow-xl backdrop-blur-xl md:p-12">
    <h2 className="text-3xl font-bold text-white">
      Get Updates on New Products
    </h2>

    <p className="mx-auto mt-4 max-w-xl text-slate-300">
      Join our newsletter for product updates and special offers.
    </p>

    <form
      onSubmit={(e) => {
        e.preventDefault();
        alert("Thanks for subscribing! 🎉");
      }}
      className="mx-auto mt-7 flex max-w-xl flex-col gap-3 sm:flex-row"
    >
      <input
        type="email"
        required
        placeholder="Enter your email address"
        className="flex-1 rounded-xl border border-white/20 bg-white/10 px-4 py-3 text-white placeholder:text-slate-400 outline-none focus:border-cyan-300 focus:ring-2 focus:ring-cyan-400/30"
      />

      <button
        type="submit"
        className="rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 px-6 py-3 font-bold text-white transition hover:scale-105 hover:from-cyan-400 hover:to-purple-500"
      >
        Subscribe
      </button>
    </form>
  </div>
</section>
    </div>
  );
}

export default Home;