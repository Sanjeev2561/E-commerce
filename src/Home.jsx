import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-cyan-950 to-slate-900 text-white">
      <section className="px-6 py-24">
        <div className="max-w-5xl mx-auto text-center">

          <div className="border border-white/20 bg-white/10 backdrop-blur-md rounded-3xl shadow-2xl px-8 py-16">
            <div className="text-6xl mb-5">🛍️</div>

            <h1 className="text-5xl md:text-6xl font-bold">
              Welcome to Sanjeev Store
            </h1>

            <p className="mt-5 text-lg md:text-xl text-gray-300">
              Find the best products at affordable prices.
            </p>

            <Link to="/shop">
              <button className="mt-8 bg-gradient-to-r from-cyan-500 to-blue-600 px-8 py-3 rounded-xl font-bold text-white shadow-lg transition hover:scale-105 hover:from-cyan-400 hover:to-blue-500">
                Shop Now →
              </button>
            </Link>
          </div>

        </div>
      </section>

      <section className="max-w-5xl mx-auto px-6 py-10 text-center">
        <h2 className="text-4xl font-bold">
          About Our Store
        </h2>

        <p className="mt-4 text-gray-300 text-lg">
          We offer quality products with secure payment, fast delivery,
          and excellent customer support.
        </p>
      </section>

      {/* Features */}
      <section className="max-w-5xl mx-auto px-6 py-10">
        <div className="grid md:grid-cols-3 gap-6">

          <div className="border border-white/20 bg-white/10 backdrop-blur-md rounded-2xl p-8 text-center shadow-xl transition hover:-translate-y-2 hover:bg-white/20">
            <div className="text-5xl">🚚</div>
            <h3 className="font-bold text-2xl mt-4">
              Free Delivery
            </h3>
            <p className="text-gray-300 mt-3">
              Fast shipping on every order.
            </p>
          </div>

          <div className="border border-white/20 bg-white/10 backdrop-blur-md rounded-2xl p-8 text-center shadow-xl transition hover:-translate-y-2 hover:bg-white/20">
            <div className="text-5xl">🔒</div>
            <h3 className="font-bold text-2xl mt-4">
              Secure Payment
            </h3>
            <p className="text-gray-300 mt-3">
              Safe and trusted payment methods.
            </p>
          </div>

          <div className="border border-white/20 bg-white/10 backdrop-blur-md rounded-2xl p-8 text-center shadow-xl transition hover:-translate-y-2 hover:bg-white/20">
            <div className="text-5xl">⭐</div>
            <h3 className="font-bold text-2xl mt-4">
              Best Quality
            </h3>
            <p className="text-gray-300 mt-3">
              Top-quality products for everyone.
            </p>
          </div>

        </div>
      </section>

      {/* Bottom CTA */}
      <section className="px-6 py-20">
        <div className="max-w-5xl mx-auto border border-white/20 bg-white/10 backdrop-blur-md rounded-3xl py-14 text-center shadow-2xl">
          <h2 className="text-4xl font-bold">
            Ready to Start Shopping?
          </h2>

          <p className="mt-4 text-gray-300 text-lg">
            Browse our latest products and find your favorite.
          </p>

          <Link to="/shop">
            <button className="mt-8 bg-gradient-to-r from-cyan-500 to-blue-600 px-8 py-3 rounded-xl font-bold shadow-lg transition hover:scale-105 hover:from-cyan-400 hover:to-blue-500">
              Explore Products →
            </button>
          </Link>
        </div>
      </section>

    </div>
  );
}

export default Home;