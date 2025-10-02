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

    // Animate XP points
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
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-indigo-900 to-black p-6">
      <div className="max-w-6xl mx-auto space-y-12">
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-indigo-700 to-purple-700 rounded-3xl p-10 text-white shadow-2xl flex flex-col md:flex-row items-center justify-between border border-white/10">
          <div>
            <h1 className="text-4xl md:text-5xl font-extrabold drop-shadow-lg">
              Welcome back, {userEmail || "Player"} 🎉
            </h1>
            <p className="mt-3 text-lg text-indigo-200">
              Level up your skills, earn XP, and climb the leaderboard 🚀
            </p>
            <button
              onClick={() => navigate("/quiz")}
              className="mt-6 bg-yellow-400 hover:bg-yellow-500 text-black font-bold px-8 py-3 rounded-xl shadow-lg hover:scale-105 transform transition-all duration-300"
            >
              ▶ Start Today’s Quiz
            </button>
          </div>
          <img
            src="https://illustrations.popsy.co/gray/student.svg"
            alt="Learning"
            className="w-52 md:w-72 mt-8 md:mt-0 drop-shadow-xl"
          />
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-yellow-400/20 backdrop-blur-md border border-yellow-300/30 rounded-2xl p-6 text-center shadow-lg hover:scale-105 transition">
            <p className="text-lg font-semibold text-yellow-300">Your Points</p>
            <p className="text-5xl font-extrabold text-yellow-400 mt-2">
              {points} XP
            </p>
          </div>
          <div className="bg-green-400/20 backdrop-blur-md border border-green-300/30 rounded-2xl p-6 shadow-lg hover:scale-105 transition">
            <p className="text-lg font-semibold text-green-300">Progress</p>
            <div className="w-full bg-gray-800 rounded-full h-4 mt-3">
              <div
                className="bg-green-400 h-4 rounded-full transition-all"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
            <p className="text-sm text-green-200 mt-2">{progress}% completed</p>
          </div>
          <div className="bg-pink-400/20 backdrop-blur-md border border-pink-300/30 rounded-2xl p-6 text-center shadow-lg hover:scale-105 transition">
            <p className="text-lg font-semibold text-pink-300">Rank</p>
            <p className="text-5xl font-extrabold text-pink-400 mt-2">#12</p>
          </div>
        </div>

        {/* Achievements */}
        <div>
          <h2 className="text-3xl font-bold text-white mb-6 drop-shadow">
            🏅 Achievements
          </h2>
          <div className="flex space-x-6">
            <div className="bg-purple-500/20 backdrop-blur-lg p-6 rounded-2xl text-center shadow-lg w-28 hover:scale-110 transition cursor-pointer border border-purple-400/40">
              <span className="text-4xl">🔥</span>
              <p className="text-sm font-medium text-purple-200 mt-2">Streak</p>
            </div>
            <div className="bg-blue-500/20 backdrop-blur-lg p-6 rounded-2xl text-center shadow-lg w-28 hover:scale-110 transition cursor-pointer border border-blue-400/40">
              <span className="text-4xl">🎯</span>
              <p className="text-sm font-medium text-blue-200 mt-2">Accuracy</p>
            </div>
            <div className="bg-pink-500/20 backdrop-blur-lg p-6 rounded-2xl text-center shadow-lg w-28 hover:scale-110 transition cursor-pointer border border-pink-400/40">
              <span className="text-4xl">🏆</span>
              <p className="text-sm font-medium text-pink-200 mt-2">Top 10</p>
            </div>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h2 className="text-3xl font-bold text-white mb-6 drop-shadow">
            🚀 Quick Links
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <button
              onClick={() => navigate("/quiz")}
              className="bg-gradient-to-r from-yellow-400 to-orange-400 hover:from-yellow-300 hover:to-orange-300 p-6 rounded-2xl shadow-lg text-black font-bold flex flex-col items-center hover:scale-105 transform transition"
            >
              📝 Quizzes
              <span className="text-sm mt-2">Test your knowledge</span>
            </button>
            <button
              onClick={() => navigate("/leaderboard")}
              className="bg-gradient-to-r from-green-400 to-emerald-500 hover:from-green-300 hover:to-emerald-400 p-6 rounded-2xl shadow-lg text-black font-bold flex flex-col items-center hover:scale-105 transform transition"
            >
              🏆 Leaderboard
              <span className="text-sm mt-2">Compete with others</span>
            </button>
            <button
              onClick={() => navigate("/progress")}
              className="bg-gradient-to-r from-pink-400 to-fuchsia-500 hover:from-pink-300 hover:to-fuchsia-400 p-6 rounded-2xl shadow-lg text-black font-bold flex flex-col items-center hover:scale-105 transform transition"
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
