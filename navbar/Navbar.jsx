import { Link, useLocation, useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { SearchContext } from "../src/SearchContext";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { search, setSearch } = useContext(SearchContext);

  const [currentUser, setCurrentUser] = useState(null);
  const [showUserDetails, setShowUserDetails] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);

  const cartItems = useSelector((state) => state.cart.items);
  const wishlistItems = useSelector((state) => state.wishlist?.items || []);

  const cartCount = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );

  const cartPrice = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const wishlistCount = wishlistItems.length;

  useEffect(() => {
    const savedUser = JSON.parse(localStorage.getItem("currentUser"));

    setCurrentUser(savedUser);
    setMobileMenu(false);
    setShowUserDetails(false);
  }, [location.pathname]);

  const handleLogout = () => {
    localStorage.removeItem("currentUser");
    setCurrentUser(null);
    setShowUserDetails(false);
    navigate("/login");
  };

  const navLink =
    "block rounded-xl px-3 py-2 text-sm font-semibold text-slate-200 transition duration-300 hover:bg-white/10 hover:text-cyan-300";

  const activeLink = (path) =>
    `${navLink} ${
      location.pathname === path
        ? "bg-cyan-500/20 text-cyan-300 shadow-lg shadow-cyan-500/10"
        : ""
    }`;

  const navItems = [
    { path: "/", label: "Home", icon: "🏠" },
    { path: "/shop", label: "Shop", icon: "🛍️" },
  ];

  return (
    <nav className="sticky top-0 z-40 border-b border-white/10 bg-slate-950/85 px-4 py-3 text-white shadow-xl shadow-black/20 backdrop-blur-xl md:px-8">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-3">
        <Link to="/" className="group flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-400 via-blue-500 to-purple-600 text-xl shadow-lg shadow-cyan-500/30 transition duration-300 group-hover:scale-110 group-hover:rotate-3">
            🛍️
          </div>

          <div>
            <h1 className="bg-gradient-to-r from-cyan-200 via-blue-200 to-purple-300 bg-clip-text text-xl font-bold text-transparent">
              SnapStore
            </h1>

            <p className="hidden text-xs text-slate-400 sm:block">
              Shop smarter, live better
            </p>
          </div>
        </Link>

        <ul className="hidden items-center gap-1 rounded-2xl border border-white/10 bg-white/5 p-1 md:flex">
          {navItems.map((item) => (
            <li key={item.path}>
              <Link to={item.path} className={activeLink(item.path)}>
                {item.label}
              </Link>
            </li>
          ))}

          <li>
            <Link
              to="/wishlist"
              className={`${activeLink("/wishlist")} relative`}
            >
              ❤️ Wishlist

              {wishlistCount > 0 && (
                <span className="absolute -right-2 -top-2 flex h-5 min-w-5 items-center justify-center rounded-full bg-gradient-to-r from-pink-500 to-red-500 px-1 text-xs font-bold text-white shadow-lg shadow-pink-500/40">
                  {wishlistCount > 99 ? "99+" : wishlistCount}
                </span>
              )}
            </Link>
          </li>

          <li>
            <Link
              to="/cart"
              className={`${activeLink("/cart")} relative flex items-center gap-2`}
            >
              <span>🛒 Cart</span>

              <span className="hidden text-xs text-slate-400 lg:block">
                ₹{cartPrice}
              </span>

              {cartCount > 0 && (
                <span className="absolute -right-2 -top-2 flex h-5 min-w-5 items-center justify-center rounded-full bg-gradient-to-r from-pink-500 to-red-500 px-1 text-xs font-bold text-white shadow-lg shadow-pink-500/40">
                  {cartCount > 99 ? "99+" : cartCount}
                </span>
              )}
            </Link>
          </li>
        </ul>

        <div className="flex items-center gap-2 sm:gap-3">
          <div className="hidden items-center rounded-xl border border-white/15 bg-white/10 px-3 py-2 transition focus-within:border-cyan-400/60 focus-within:ring-2 focus-within:ring-cyan-400/20 sm:flex">
            <span className="mr-2 text-sm">🔎</span>

            <input
              type="search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search products..."
              className="w-28 bg-transparent text-sm text-white outline-none placeholder:text-slate-400 lg:w-48"
            />
          </div>

          <Link
            to="/wishlist"
            className="relative rounded-xl border border-white/15 bg-white/10 px-3 py-2 text-sm transition hover:bg-white/20 md:hidden"
          >
            ❤️

            {wishlistCount > 0 && (
              <span className="absolute -right-2 -top-2 flex h-5 min-w-5 items-center justify-center rounded-full bg-pink-500 px-1 text-xs font-bold text-white">
                {wishlistCount > 99 ? "99+" : wishlistCount}
              </span>
            )}
          </Link>

          <Link
            to="/cart"
            className="relative rounded-xl border border-white/15 bg-white/10 px-3 py-2 text-sm transition hover:bg-white/20 md:hidden"
          >
            🛒

            {cartCount > 0 && (
              <span className="absolute -right-2 -top-2 flex h-5 min-w-5 items-center justify-center rounded-full bg-pink-500 px-1 text-xs font-bold text-white">
                {cartCount > 99 ? "99+" : cartCount}
              </span>
            )}
          </Link>

          {currentUser ? (
            <div className="relative">
              <button
                type="button"
                onClick={() => setShowUserDetails((prev) => !prev)}
                className="flex items-center gap-2 rounded-xl border border-cyan-300/20 bg-gradient-to-r from-cyan-500/90 to-blue-600/90 px-3 py-2 text-sm font-semibold text-white shadow-lg shadow-cyan-500/20 transition duration-300 hover:scale-105 hover:from-cyan-400 hover:to-purple-500"
              >
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white/20 text-xs font-bold">
                  {currentUser.name?.charAt(0).toUpperCase()}
                </span>

                <span className="hidden max-w-24 truncate sm:block">
                  {currentUser.name}
                </span>

                <span className="text-xs">▼</span>
              </button>

              {showUserDetails && (
                <div className="absolute right-0 top-14 z-50 w-72 overflow-hidden rounded-2xl border border-white/15 bg-slate-950/95 shadow-2xl shadow-black/50 backdrop-blur-xl">
                  <div className="bg-gradient-to-r from-cyan-500/20 via-blue-500/20 to-purple-500/20 p-5">
                    <div className="flex items-center gap-3">
                      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-cyan-400 to-blue-600 text-lg font-bold text-white shadow-lg">
                        {currentUser.name?.charAt(0).toUpperCase()}
                      </div>

                      <div className="min-w-0">
                        <h2 className="truncate text-lg font-bold text-white">
                          {currentUser.name}
                        </h2>

                        <p className="text-xs text-cyan-200">
                          Logged in account
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3 p-5">
                    <div className="rounded-xl border border-white/10 bg-white/5 p-3">
                      <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                        Email
                      </p>

                      <p className="mt-1 break-words text-sm text-slate-200">
                        {currentUser.email}
                      </p>
                    </div>

                    <div className="rounded-xl border border-white/10 bg-white/5 p-3">
                      <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                        Phone
                      </p>

                      <p className="mt-1 text-sm text-slate-200">
                        {currentUser.tel || "Not added"}
                      </p>
                    </div>

                    <Link
                      to="/wishlist"
                      onClick={() => setShowUserDetails(false)}
                      className="block rounded-xl border border-pink-300/20 bg-pink-500/10 px-4 py-2.5 text-center text-sm font-semibold text-pink-200 transition hover:bg-pink-500/20"
                    >
                      ❤️ My Wishlist ({wishlistCount})
                    </Link>

                    <Link
                      to="/cart"
                      onClick={() => setShowUserDetails(false)}
                      className="block rounded-xl border border-cyan-300/20 bg-cyan-500/10 px-4 py-2.5 text-center text-sm font-semibold text-cyan-200 transition hover:bg-cyan-500/20"
                    >
                      🛒 View My Cart ({cartCount})
                    </Link>
                  <Link
  to="/orders"
  onClick={() => setShowUserDetails(false)}
  className="block rounded-xl border border-purple-300/20 bg-purple-500/10 px-4 py-2.5 text-center text-sm font-semibold text-purple-200 transition hover:bg-purple-500/20"
>
  📦 My Orders
</Link>
                    <button
                      type="button"
                      onClick={handleLogout}
                      className="w-full rounded-xl bg-gradient-to-r from-red-500 to-pink-600 py-2.5 font-semibold text-white shadow-lg shadow-pink-500/20 transition duration-300 hover:scale-[1.02] hover:from-red-400 hover:to-pink-500"
                    >
                      Logout →
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <Link
              to="/login"
              className="rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-cyan-500/20 transition duration-300 hover:scale-105 hover:from-cyan-400 hover:to-purple-500"
            >
              Login
            </Link>
          )}

          <button
            type="button"
            onClick={() => setMobileMenu((prev) => !prev)}
            className="rounded-xl border border-white/15 bg-white/10 px-3 py-2 text-lg text-white transition hover:bg-white/20 md:hidden"
          >
            {mobileMenu ? "✕" : "☰"}
          </button>
        </div>
      </div>

      {mobileMenu && (
        <div className="mx-auto mt-3 max-w-7xl rounded-2xl border border-white/15 bg-slate-950/95 p-3 shadow-xl backdrop-blur-xl md:hidden">
          <div className="mb-3 flex items-center rounded-xl border border-white/10 bg-white/5 px-3 py-2">
            <span className="mr-2">🔎</span>

            <input
              type="search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search products..."
              className="w-full bg-transparent text-sm text-white outline-none placeholder:text-slate-400"
            />
          </div>

          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              onClick={() => setMobileMenu(false)}
              className={`${activeLink(item.path)} mt-1`}
            >
              {item.icon} {item.label}
            </Link>
          ))}

          <Link
            to="/wishlist"
            onClick={() => setMobileMenu(false)}
            className={`${activeLink("/wishlist")} mt-1 flex items-center justify-between`}
          >
            <span>❤️ Wishlist</span>

            <span className="rounded-full bg-pink-500 px-2 py-0.5 text-xs font-bold text-white">
              {wishlistCount}
            </span>
          </Link>

          <Link
            to="/cart"
            onClick={() => setMobileMenu(false)}
            className={`${activeLink("/cart")} mt-1 flex items-center justify-between`}
          >
            <span>🛒 Cart</span>

            <span className="rounded-full bg-pink-500 px-2 py-0.5 text-xs font-bold text-white">
              {cartCount}
            </span>
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;