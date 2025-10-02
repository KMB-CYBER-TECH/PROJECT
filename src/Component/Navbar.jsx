"use client";

import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const username = localStorage.getItem("username");
  const navigate = useNavigate();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("username");
    navigate("/login");
  };

  return (
    <>
      {/* Modern Navbar */}
      <nav className="bg-white border-b border-gray-100 sticky top-0 z-50 backdrop-blur-sm bg-white/95">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-br from-purple-600 to-pink-600 rounded-lg flex items-center justify-center">
              <svg
                className="w-5 h-5 text-white"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M12 2L2 7v10c0 5.55 3.84 9.95 9 11 5.16-1.05 9-5.45 9-11V7l-10-5z" />
              </svg>
            </div>
            <h1 className="text-xl font-bold text-gray-900">
              <span className="text-purple-600">ED</span>
              <span className="text-gray-900">-Games</span>
            </h1>
          </div>

          {/* Navigation Links */}
          <ul className="hidden md:flex items-center space-x-8 font-medium text-gray-600">
            <li>
              <Link
                to="/"
                className="hover:text-purple-600 transition-colors duration-200 relative group"
              >
                Home
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-purple-600 transition-all duration-200 group-hover:w-full"></span>
              </Link>
            </li>

            {/* Dropdown */}
            <li
              className="relative"
              onMouseEnter={() => setIsDropdownOpen(true)}
              onMouseLeave={() => setIsDropdownOpen(false)}
            >
              <button className="flex items-center space-x-1 hover:text-purple-600 transition-colors duration-200">
                <span>Quizzes</span>
                <svg
                  className={`w-4 h-4 transition-transform duration-200 ${
                    isDropdownOpen ? "rotate-180" : ""
                  }`}
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {isDropdownOpen && (
                <div className="absolute top-full mt-2 left-0 w-56 bg-white rounded-xl shadow-lg border border-gray-100 py-2 animate-in fade-in slide-in-from-top-2 duration-200">
                  <Link
                    to="/quiz/football"
                    className="block px-4 py-3 text-gray-700 hover:bg-purple-50 hover:text-purple-600 transition-colors duration-150"
                  >
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                        <svg
                          className="w-4 h-4 text-green-600"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <circle cx="12" cy="12" r="10" />
                        </svg>
                      </div>
                      <span>Football Quiz</span>
                    </div>
                  </Link>
                  <Link
                    to="/quiz/history"
                    className="block px-4 py-3 text-gray-700 hover:bg-purple-50 hover:text-purple-600 transition-colors duration-150"
                  >
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                        <svg
                          className="w-4 h-4 text-blue-600"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                        </svg>
                      </div>
                      <span>History Quiz</span>
                    </div>
                  </Link>
                  <Link
                    to="/educational"
                    className="block px-4 py-3 text-gray-700 hover:bg-purple-50 hover:text-purple-600 transition-colors duration-150"
                  >
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                        <svg
                          className="w-4 h-4 text-purple-600"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M12 3L1 9l4 2.18v6L12 21l7-3.82v-6l2-1.09V17h2V9L12 3zm6.82 6L12 12.72 5.18 9 12 5.28 18.82 9zM17 15.99l-5 2.73-5-2.73v-3.72L12 15l5-2.73v3.72z" />
                        </svg>
                      </div>
                      <span>Educational Quiz</span>
                    </div>
                  </Link>
                </div>
              )}
            </li>

            <li>
              <Link
                to="/leaderboard"
                className="hover:text-purple-600 transition-colors duration-200 relative group"
              >
                Leaderboard
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-purple-600 transition-all duration-200 group-hover:w-full"></span>
              </Link>
            </li>
            <li>
              <Link
                to="/progress"
                className="hover:text-purple-600 transition-colors duration-200 relative group"
              >
                Progress
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-purple-600 transition-all duration-200 group-hover:w-full"></span>
              </Link>
            </li>

            {/* Play Game Button */}
            <li>
              <Link
                to="/game"
                className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-yellow-400 to-orange-500 text-white font-semibold shadow-lg hover:shadow-xl hover:scale-105 transform transition-all duration-200 flex items-center space-x-2"
              >
                <svg
                  className="w-4 h-4"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M8 5v14l11-7z" />
                </svg>
                <span>Play Game</span>
              </Link>
            </li>
          </ul>

          {/* Auth Section */}
          <div>
            {username ? (
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2 px-3 py-2 bg-gray-50 rounded-lg">
                  <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                    {username.charAt(0).toUpperCase()}
                  </div>
                  <span className="font-medium text-gray-700">{username}</span>
                </div>
                <button
                  onClick={handleLogout}
                  className="px-4 py-2 bg-red-500 text-white rounded-lg font-medium hover:bg-red-600 hover:scale-105 transform transition-all duration-200 shadow-md"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex space-x-3">
                <Link
                  to="/login"
                  className="px-4 py-2 text-gray-700 font-medium hover:text-purple-600 transition-colors duration-200"
                >
                  Log in
                </Link>
                <Link
                  to="/signup"
                  className="px-6 py-2 bg-gray-900 text-white rounded-lg font-medium hover:bg-gray-800 hover:scale-105 transform transition-all duration-200 shadow-md"
                >
                  Sign up
                </Link>
              </div>
            )}
          </div>
        </div>
      </nav>
    </>
  );
}
