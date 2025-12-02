"use client";

import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu, X, ChevronDown, User, LogOut, Settings } from "lucide-react";

export default function Navbar() {
  const username = localStorage.getItem("username");
  const navigate = useNavigate();
  const [isQuizDropdownOpen, setIsQuizDropdownOpen] = useState(false);
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("username");
    navigate("/login");
  };

  useEffect(() => {
    const closeDropdowns = (e) => {
      if (!e.target.closest(".quiz-dropdown")) setIsQuizDropdownOpen(false);
      if (!e.target.closest(".user-dropdown")) setIsUserDropdownOpen(false);
    };
    document.addEventListener("click", closeDropdowns);
    return () => document.removeEventListener("click", closeDropdowns);
  }, []);

  const quizItems = [
    { name: "Football Quiz", path: "/football" },
    { name: "History Quiz", path: "/history" },
    { name: "Educational Quiz", path: "/educational" },
 
  ];

  return (
    <nav className="bg-white/90 backdrop-blur-sm border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-3 flex justify-between items-center">
        
        <Link to="/" className="flex items-center space-x-2 hover:opacity-80 transition-opacity">
          <div className="w-8 h-8 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">ED</span>
          </div>
          <h1 className="text-xl font-bold text-gray-900">
            <span className="text-purple-600">ED</span>-Games
          </h1>
        </Link>

      
        <div className="hidden md:flex items-center space-x-8">
        
          <div className="flex items-center space-x-6">
            <Link
              to="/"
              className="text-gray-700 hover:text-purple-600 transition-colors duration-200 font-medium"
            >
              Home
            </Link>

         
            <div className="relative quiz-dropdown">
              <button
                onClick={() => setIsQuizDropdownOpen(!isQuizDropdownOpen)}
                className="flex items-center gap-1 text-gray-700 hover:text-purple-600 transition-colors duration-200 font-medium focus:outline-none"
              >
                Quizzes
                <ChevronDown
                  size={16}
                  className={`transition-transform duration-200 ${
                    isQuizDropdownOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {isQuizDropdownOpen && (
                <div className="absolute top-full left-0 mt-2 w-56 bg-white rounded-xl shadow-lg border border-gray-100 py-2 animate-fade-in-up z-50">
                  <div className="px-3 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wide border-b border-gray-100">
                    Available Quizzes
                  </div>
                  {quizItems.map((item) => (
                    <Link
                      key={item.name}
                      to={item.path}
                      onClick={() => setIsQuizDropdownOpen(false)}
                      className="flex items-center px-4 py-3 text-gray-700 hover:bg-purple-50 hover:text-purple-700 transition-colors duration-150 group"
                    >
                      <div className="w-2 h-2 bg-purple-500 rounded-full mr-3 group-hover:scale-125 transition-transform"></div>
                      {item.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <Link
              to="/leaderboard"
              className="text-gray-700 hover:text-purple-600 transition-colors duration-200 font-medium"
            >
              Leaderboard
            </Link>

            <Link
              to="/progress"
              className="text-gray-700 hover:text-purple-600 transition-colors duration-200 font-medium"
            >
              Progress
            </Link>
          </div>

         
          <Link
            to="/game"
            className="px-6 py-2 bg-gradient-to-r from-yellow-400 to-orange-500 text-white rounded-lg font-semibold shadow-md hover:scale-105 hover:shadow-lg transition-all duration-200"
          >
            🎮 Play Game
          </Link>

       
          {username ? (
            <div className="flex items-center space-x-4">

              <div className="relative user-dropdown">
                <button
                  onClick={() => setIsUserDropdownOpen(!isUserDropdownOpen)}
                  className="flex items-center space-x-3 px-4 py-2 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors duration-200 border border-gray-200"
                >
                  <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                    {username.charAt(0).toUpperCase()}
                  </div>
                  <div className="flex items-center space-x-1">
                    <span className="font-medium text-gray-700">{username}</span>
                    <ChevronDown
                      size={16}
                      className={`text-gray-500 transition-transform duration-200 ${
                        isUserDropdownOpen ? "rotate-180" : ""
                      }`}
                    />
                  </div>
                </button>

                {isUserDropdownOpen && (
                  <div className="absolute top-full right-0 mt-2 w-48 bg-white rounded-xl shadow-lg border border-gray-100 py-2 animate-fade-in-up z-50">
                    <div className="px-3 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wide border-b border-gray-100">
                      Account
                    </div>
                    <Link
                      to="/profile"
                      onClick={() => setIsUserDropdownOpen(false)}
                      className="flex items-center px-4 py-3 text-gray-700 hover:bg-purple-50 hover:text-purple-700 transition-colors duration-150"
                    >
                      <User size={16} className="mr-3" />
                      Profile
                    </Link>
                    <Link
                      to="/settings"
                      onClick={() => setIsUserDropdownOpen(false)}
                      className="flex items-center px-4 py-3 text-gray-700 hover:bg-purple-50 hover:text-purple-700 transition-colors duration-150"
                    >
                      <Settings size={16} className="mr-3" />
                      Settings
                    </Link>
                    <div className="border-t border-gray-100 my-1"></div>
                    <button
                      onClick={() => {
                        setIsUserDropdownOpen(false);
                        handleLogout();
                      }}
                      className="flex items-center w-full px-4 py-3 text-red-600 hover:bg-red-50 transition-colors duration-150"
                    >
                      <LogOut size={16} className="mr-3" />
                      Logout
                    </button>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="flex items-center space-x-3">
              <Link
                to="/login"
                className="px-6 py-2 text-gray-700 hover:text-purple-600 font-medium transition-colors duration-200"
              >
                Login
              </Link>
              <Link
                to="/signup"
                className="px-6 py-2 bg-purple-600 text-white rounded-lg font-medium hover:bg-purple-700 hover:scale-105 transition-all duration-200 shadow-md"
              >
                Sign Up
              </Link>
            </div>
          )}
        </div>

       
        <button
          className="md:hidden p-2 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors duration-200"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      
      {isMobileMenuOpen && (
        <div className="md:hidden border-t border-gray-100 bg-white/95 backdrop-blur-sm">
          <div className="px-6 py-4 space-y-1">
            {/* Mobile Navigation Links */}
            <Link
              to="/"
              onClick={() => setIsMobileMenuOpen(false)}
              className="flex items-center px-4 py-3 text-gray-700 hover:bg-purple-50 hover:text-purple-700 rounded-lg transition-colors duration-200 font-medium"
            >
              Home
            </Link>

            {/* Mobile Quizzes Dropdown */}
            <details className="group">
              <summary className="flex justify-between items-center px-4 py-3 text-gray-700 hover:bg-purple-50 hover:text-purple-700 rounded-lg cursor-pointer transition-colors duration-200 font-medium list-none">
                <span>Quizzes</span>
                <ChevronDown
                  size={16}
                  className="transition-transform group-open:rotate-180"
                />
              </summary>
              <div className="ml-4 mt-1 space-y-1">
                {quizItems.map((item) => (
                  <Link
                    key={item.name}
                    to={item.path}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex items-center px-4 py-3 text-gray-600 hover:bg-purple-50 hover:text-purple-700 rounded-lg transition-colors duration-200"
                  >
                    <div className="w-1.5 h-1.5 bg-purple-400 rounded-full mr-3"></div>
                    {item.name}
                  </Link>
                ))}
              </div>
            </details>

            <Link
              to="/leaderboard"
              onClick={() => setIsMobileMenuOpen(false)}
              className="flex items-center px-4 py-3 text-gray-700 hover:bg-purple-50 hover:text-purple-700 rounded-lg transition-colors duration-200 font-medium"
            >
              Leaderboard
            </Link>

            <Link
              to="/progress"
              onClick={() => setIsMobileMenuOpen(false)}
              className="flex items-center px-4 py-3 text-gray-700 hover:bg-purple-50 hover:text-purple-700 rounded-lg transition-colors duration-200 font-medium"
            >
              Progress
            </Link>

        
            <Link
              to="/game"
              onClick={() => setIsMobileMenuOpen(false)}
              className="flex items-center justify-center px-4 py-3 bg-gradient-to-r from-yellow-400 to-orange-500 text-white rounded-lg font-semibold shadow-md hover:scale-105 transition-all duration-200 mx-4 my-2"
            >
              🎮 Play Game
            </Link>

           
            <div className="border-t border-gray-200 mt-4 pt-4">
              {username ? (
                <div className="space-y-2">
                  <div className="flex items-center px-4 py-3 bg-gray-50 rounded-lg">
                    <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white font-semibold text-sm mr-3">
                      {username.charAt(0).toUpperCase()}
                    </div>
                    <span className="font-medium text-gray-700">{username}</span>
                  </div>
                  <Link
                    to="/profile"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex items-center px-4 py-3 text-gray-700 hover:bg-purple-50 hover:text-purple-700 rounded-lg transition-colors duration-200"
                  >
                    <User size={16} className="mr-3" />
                    Profile
                  </Link>
                  <Link
                    to="/settings"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex items-center px-4 py-3 text-gray-700 hover:bg-purple-50 hover:text-purple-700 rounded-lg transition-colors duration-200"
                  >
                    <Settings size={16} className="mr-3" />
                    Settings
                  </Link>
                  <button
                    onClick={() => {
                      setIsMobileMenuOpen(false);
                      handleLogout();
                    }}
                    className="flex items-center w-full px-4 py-3 text-red-600 hover:bg-red-50 rounded-lg transition-colors duration-200"
                  >
                    <LogOut size={16} className="mr-3" />
                    Logout
                  </button>
                </div>
              ) : (
                <div className="flex flex-col space-y-2 px-4">
                  <Link
                    to="/login"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="px-4 py-3 text-center text-gray-700 hover:bg-gray-50 rounded-lg transition-colors duration-200 font-medium border border-gray-200"
                  >
                    Login
                  </Link>
                  <Link
                    to="/signup"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="px-4 py-3 text-center bg-purple-600 text-white rounded-lg font-medium hover:bg-purple-700 transition-colors duration-200 shadow-md"
                  >
                    Sign Up
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}