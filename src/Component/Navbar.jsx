import React from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const username = localStorage.getItem("username");
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("username");
    navigate("/login");
  };

  return (
    <nav className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-md">
      <div className="max-w-7xl mx-auto px-6 py-3 flex justify-between items-center">
        {/* Logo */}
        <h1 className="text-2xl font-extrabold tracking-wide">
          <span className="text-yellow-300">ED</span>-Games
        </h1>

        {/* Links */}
        <ul className="hidden md:flex space-x-8 font-semibold">
          <li>
            <Link to="/" className="hover:text-yellow-300 transition">
              Home
            </Link>
          </li>
          <li>
            <Link to="/dashboard" className="hover:text-yellow-300 transition">
              Dashboard
            </Link>
          </li>
          <li>
            <Link to="/quiz" className="hover:text-yellow-300 transition">
              Quiz
            </Link>
          </li>
          <li>
            <Link
              to="/leaderboard"
              className="hover:text-yellow-300 transition"
            >
              Leaderboard
            </Link>
          </li>
          <li>
            <Link to="/progress" className="hover:text-yellow-300 transition">
              Progress
            </Link>
          </li>
        </ul>

        {/* Auth Section */}
        <div>
          {username ? (
            <div className="flex items-center space-x-4">
              <span className="font-medium">👋 {username}</span>
              <button
                onClick={handleLogout}
                className="bg-red-500 px-4 py-1.5 rounded-lg text-sm hover:bg-red-600 transition shadow"
              >
                Logout
              </button>
            </div>
          ) : (
            <div className="flex space-x-3">
              <Link
                to="/login"
                className="bg-white text-indigo-600 font-semibold px-4 py-1.5 rounded-lg text-sm hover:bg-gray-100 transition shadow"
              >
                Login
              </Link>
              <Link
                to="/signup"
                className="bg-green-500 text-white font-semibold px-4 py-1.5 rounded-lg text-sm hover:bg-green-600 transition shadow"
              >
                Signup
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
