import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const [userEmail, setUserEmail] = useState("");
  const [points, setPoints] = useState(0);
  const [progress, setProgress] = useState(45);
  const navigate = useNavigate();

  useEffect(() => {
    const lastUser = localStorage.getItem("lastUser");
    if (lastUser) {
      setUserEmail(lastUser);
    }

    // Animate points
    let current = 0;
    const target = 120;
    const interval = setInterval(() => {
      current += 5;
      if (current >= target) {
        clearInterval(interval);
        current = target;
      }
      setPoints(current);
    }, 80);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 to-indigo-700 p-6">
      <div className="max-w-6xl mx-auto space-y-10">
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl p-8 text-white shadow-xl flex flex-col md:flex-row items-center justify-between">
          <div>
            <h1 className="text-4xl font-extrabold">
              Welcome back, {userEmail || "Student"} 🎉
            </h1>
            <p className="mt-2 text-lg text-indigo-100">
              Keep learning, earn XP, and climb the leaderboard 🚀
            </p>
            <button
              onClick={() => navigate("/quiz")}
              className="mt-6 bg-yellow-400 hover:bg-yellow-500 text-black font-bold px-6 py-3 rounded-xl shadow-lg"
            >
              Start Today’s Quiz 📝
            </button>
          </div>
          <img
            src="https://illustrations.popsy.co/gray/student.svg"
            alt="Learning"
            className="w-48 md:w-64 mt-6 md:mt-0"
          />
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-yellow-100 rounded-xl p-6 text-center shadow-lg">
            <p className="text-lg font-semibold text-yellow-700">Your Points</p>
            <p className="text-4xl font-extrabold text-yellow-800 mt-2">
              {points} XP
            </p>
          </div>
          <div className="bg-green-100 rounded-xl p-6 shadow-lg">
            <p className="text-lg font-semibold text-green-700">Progress</p>
            <div className="w-full bg-gray-200 rounded-full h-4 mt-3">
              <div
                className="bg-green-500 h-4 rounded-full transition-all"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
            <p className="text-sm text-gray-600 mt-2">{progress}% completed</p>
          </div>
          <div className="bg-pink-100 rounded-xl p-6 text-center shadow-lg">
            <p className="text-lg font-semibold text-pink-700">Rank</p>
            <p className="text-4xl font-extrabold text-pink-800 mt-2">#12</p>
          </div>
        </div>

        {/* Achievements */}
        <div>
          <h2 className="text-2xl font-bold text-white mb-4">
            🏅 Achievements
          </h2>
          <div className="flex space-x-6">
            <div className="bg-purple-100 p-6 rounded-xl text-center shadow-lg w-28 hover:scale-105 transition">
              <span className="text-3xl">🔥</span>
              <p className="text-sm font-medium text-gray-700 mt-2">Streak</p>
            </div>
            <div className="bg-blue-100 p-6 rounded-xl text-center shadow-lg w-28 hover:scale-105 transition">
              <span className="text-3xl">🎯</span>
              <p className="text-sm font-medium text-gray-700 mt-2">Accuracy</p>
            </div>
            <div className="bg-pink-100 p-6 rounded-xl text-center shadow-lg w-28 hover:scale-105 transition">
              <span className="text-3xl">🏆</span>
              <p className="text-sm font-medium text-gray-700 mt-2">Top 10</p>
            </div>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h2 className="text-2xl font-bold text-white mb-4">🚀 Quick Links</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <button
              onClick={() => navigate("/quiz")}
              className="bg-white hover:bg-yellow-100 p-6 rounded-xl shadow-lg text-yellow-700 font-bold flex flex-col items-center"
            >
              📝 Quizzes
              <span className="text-sm mt-2">Test your knowledge</span>
            </button>
            <button
              onClick={() => navigate("/leaderboard")}
              className="bg-white hover:bg-green-100 p-6 rounded-xl shadow-lg text-green-700 font-bold flex flex-col items-center"
            >
              🏆 Leaderboard
              <span className="text-sm mt-2">Compete with others</span>
            </button>
            <button
              onClick={() => navigate("/progress")}
              className="bg-white hover:bg-pink-100 p-6 rounded-xl shadow-lg text-pink-700 font-bold flex flex-col items-center"
            >
              👤 Profile
              <span className="text-sm mt-2">Track your journey</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
