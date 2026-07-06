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

      <section className="relative px-6 pb-20 pt-24 md:pb-28 md:pt-32">
        <div className="mx-auto max-w-6xl">
          <div className="overflow-hidden rounded-3xl border border-white/15 bg-white/10 p-8 shadow-2xl shadow-black/40 backdrop-blur-xl md:p-16">
            <div className="mx-auto max-w-3xl text-center">
              <div className="mx-auto mb-7 flex h-20 w-20 items-center justify-center rounded-3xl bg-gradient-to-br from-cyan-400 via-blue-500 to-purple-600 text-4xl shadow-xl shadow-cyan-500/30">
                🛍️
              </div>

              <p className="mb-4 text-sm font-semibold uppercase tracking-[0.25em] text-cyan-300">
                Your Everyday Store
              </p>

              <h1 className="bg-gradient-to-r from-cyan-100 via-blue-100 to-purple-200 bg-clip-text text-4xl font-bold leading-tight text-transparent sm:text-5xl md:text-6xl">
                Welcome to Sanjeev Store
              </h1>

              <p className="mx-auto mt-6 max-w-2xl text-base leading-7 text-slate-300 sm:text-lg">
                Discover useful products, great value, and a smooth shopping
                experience in one place.
              </p>

              <div className="mt-9 flex flex-col justify-center gap-4 sm:flex-row">
                <Link
                  to="/shop"
                  className="rounded-xl bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600 px-8 py-3 font-bold text-white shadow-lg shadow-cyan-500/25 transition duration-300 hover:scale-105 hover:from-cyan-400 hover:to-purple-500"
                >
                  Shop Now →
                </Link>

                <a
                  href="#about"
                  className="rounded-xl border border-white/20 bg-white/10 px-8 py-3 font-bold text-slate-100 transition duration-300 hover:scale-105 hover:bg-white/20"
                >
                  Learn More
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="about" className="relative px-6 py-12 md:py-16">
        <div className="mx-auto max-w-4xl text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-cyan-300">
            Why choose us
          </p>

          <h2 className="mt-3 text-3xl font-bold text-white md:text-4xl">
            Shopping made simple
          </h2>

          <p className="mt-5 text-lg leading-8 text-slate-300">
            We focus on a clean shopping experience, helpful product browsing,
            and quality items at affordable prices.
          </p>
        </div>
      </section>

      <section className="relative mx-auto max-w-6xl px-6 py-10 md:py-14">
        <div className="grid gap-6 md:grid-cols-3">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="group rounded-2xl border border-white/15 bg-white/10 p-8 text-center shadow-xl shadow-black/20 backdrop-blur-xl transition duration-300 hover:-translate-y-2 hover:border-cyan-300/30 hover:bg-white/15"
            >
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-400/20 to-purple-500/20 text-4xl transition duration-300 group-hover:scale-110">
                {feature.icon}
              </div>

              <h3 className="mt-6 text-2xl font-bold text-white">
                {feature.title}
              </h3>

              <p className="mt-3 leading-7 text-slate-300">{feature.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="relative px-6 pb-24 pt-16">
        <div className="mx-auto max-w-6xl overflow-hidden rounded-3xl border border-white/15 bg-gradient-to-r from-cyan-500/15 via-blue-500/15 to-purple-500/15 p-8 text-center shadow-2xl shadow-black/30 backdrop-blur-xl md:p-14">
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-cyan-200">
            Start exploring
          </p>

          <h2 className="mt-3 text-3xl font-bold text-white md:text-4xl">
            Ready to start shopping?
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-lg text-slate-300">
            Browse the latest products and find something you will love.
          </p>

          <Link
            to="/shop"
            className="mt-8 inline-block rounded-xl bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600 px-8 py-3 font-bold text-white shadow-lg shadow-cyan-500/25 transition duration-300 hover:scale-105 hover:from-cyan-400 hover:to-purple-500"
          >
            Explore Products →
          </Link>
        </div>
      </section>
    </div>
  );
}

export default Home;