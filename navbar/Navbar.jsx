import { Link, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { SearchContext } from "../src/SearchContext";

const Navbar = () => {
  const navigate = useNavigate();
  const { search, setSearch } = useContext(SearchContext);

  const [currentUser, setCurrentUser] = useState(
    JSON.parse(localStorage.getItem("currentUser"))
  );

  const [showUserDetails, setShowUserDetails] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("currentUser");
    setCurrentUser(null);
    setShowUserDetails(false);
    navigate("/login");
  };

  return (
    <nav className="relative flex items-center justify-between bg-gray-900 px-8 py-4 text-white">
      <Link
        to="/"
        className="text-2xl font-bold transition hover:text-orange-400"
      >
        MERN App
      </Link>

      <ul className="flex items-center gap-8 text-lg">
        <li>
          <Link to="/" className="transition hover:text-orange-400">
            Home
          </Link>
        </li>

        <li>
          <Link to="/shop" className="transition hover:text-orange-400">
            Shop
          </Link>
        </li>

        <li>
          <Link to="/counter" className="transition hover:text-orange-400">
            Counter
          </Link>
        </li>

        {currentUser ? (
          <li className="relative">
            <button
              onClick={() => setShowUserDetails(!showUserDetails)}
              className="rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600 px-4 py-2 font-semibold text-white transition hover:scale-105"
            >
              {currentUser.name} ▼
            </button>
i
            {showUserDetails && (
              <div className="absolute right-0 top-12 z-50 w-72 rounded-xl border border-white/20 bg-slate-900 p-5 shadow-2xl">
                <h2 className="border-b border-gray-700 pb-3 text-xl font-bold text-cyan-300">
                  User Details
                </h2>

                <p className="mt-4 break-words text-sm text-gray-300">
                  <span className="font-semibold text-white">Name: </span>
                  {currentUser.name}
                </p>

                <p className="mt-2 break-words text-sm text-gray-300">
                  <span className="font-semibold text-white">Email: </span>
                  {currentUser.email}
                </p>

                <p className="mt-2 text-sm text-gray-300">
                  <span className="font-semibold text-white">Phone: </span>
                  {currentUser.tel}
                </p>

                <button
                  onClick={handleLogout}
                  className="mt-5 w-full rounded-lg bg-gradient-to-r from-red-500 to-pink-600 py-2 font-semibold text-white transition hover:scale-105"
                >
                  Logout
                </button>
              </div>
            )}
          </li>
        ) : (
          <li>
            <Link
              to="/login"
              className="rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600 px-4 py-2 font-semibold text-white transition hover:scale-105"
            >
              Login
            </Link>
          </li>
        )}
      </ul>

      <input
        type="search"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="🔎 Search..."
        className="w-64 rounded-lg border border-gray-300 bg-white px-4 py-2 text-black outline-none focus:ring-2 focus:ring-cyan-400"
      />
    </nav>
  );
};

export default Navbar;