import { Link, useLocation, useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { SearchContext } from "../src/SearchContext";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { search, setSearch } = useContext(SearchContext);

  const [currentUser, setCurrentUser] = useState(null);
  const [showUserDetails, setShowUserDetails] = useState(false);

  useEffect(() => {
    const savedUser = JSON.parse(localStorage.getItem("currentUser"));
    setCurrentUser(savedUser);
  }, [location.pathname]);

  const handleLogout = () => {
    localStorage.removeItem("currentUser");
    setCurrentUser(null);
    setShowUserDetails(false);
    navigate("/login");
  };

  const cartcount=JSON.parse(localStorage.getItem("cart"))
  console.log("udygd",cartcount)
const total=cartcount.length
console.log("th",total)
  const navLinkClass =
    "rounded-lg px-3 py-2 text-sm font-medium text-slate-200 transition duration-300 hover:bg-white/10 hover:text-cyan-300";

  return (
    <nav className="sticky top-0 z-40 border-b border-white/10 bg-slate-950/85 px-4 py-3 text-white shadow-xl shadow-black/20 backdrop-blur-xl md:px-8">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4">
        <Link to="/" className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-400 via-blue-500 to-purple-600 text-xl shadow-lg shadow-cyan-500/30">
            🛍️
          </div>

          <div>
            <h1 className="bg-gradient-to-r from-cyan-200 via-blue-200 to-purple-300 bg-clip-text text-xl font-bold text-transparent">
              MERN App
            </h1>
            <p className="hidden text-xs text-slate-400 sm:block">
              Shop smarter
            </p>
          </div>
        </Link>

        <ul className="hidden items-center gap-2 md:flex">
          <li>
            <Link to="/" className={navLinkClass}>
              Home
            </Link>
          </li>

          <li>
            <Link to="/shop" className={navLinkClass}>
              Shop
            </Link>
          </li>

          <li>
            <Link to="/Cart" className={`${navLinkClass} relative`}>
              🛒Cart
              <span className="absolute bg-red-500 rounded-2xl w-3 text-center top-0">{total}</span>
            </Link>
          </li>
        </ul>

        <div className="flex items-center gap-3">
          <div className="hidden items-center rounded-xl border border-white/15 bg-white/10 px-3 py-2 transition focus-within:border-cyan-400/60 focus-within:ring-2 focus-within:ring-cyan-400/20 sm:flex">
            <span className="mr-2 text-sm">🔎</span>

            <input
              type="search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search products..."
              className="w-36 bg-transparent text-sm text-white outline-none placeholder:text-slate-400 lg:w-52"
            />
          </div>

          {currentUser ? (
            <div className="relative">
              <button
                type="button"
                onClick={() => setShowUserDetails((prev) => !prev)}
                className="flex items-center gap-2 rounded-xl border border-cyan-300/20 bg-gradient-to-r from-cyan-500/90 to-blue-600/90 px-3 py-2 text-sm font-semibold text-white shadow-lg shadow-cyan-500/20 transition duration-300 hover:scale-105 hover:from-cyan-400 hover:to-purple-500"
              >
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white/20 text-xs">
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
                      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-cyan-400 to-blue-600 text-lg font-bold text-white">
                        {currentUser.name?.charAt(0).toUpperCase()}
                      </div>

                      <div className="min-w-0">
                        <h2 className="truncate text-lg font-bold text-white">
                          {currentUser.name}
                        </h2>
                        <p className="text-xs text-cyan-200">My Account</p>
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
                        {currentUser.tel}
                      </p>
                    </div>

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
        </div>
      </div>
    </nav>
  );
};

export default Navbar;