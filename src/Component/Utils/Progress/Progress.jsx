// src/Component/Utils/Progress/Progress_view.jsx
import React, { useEffect, useState } from "react";

export default function Progress_view() {
  const [userEmail, setUserEmail] = useState("");
  const [xp, setXp] = useState(0);
  const [level, setLevel] = useState(1);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Simulate fetching from localStorage (or later from backend)
    const lastUser = localStorage.getItem("lastUser");
    if (lastUser) setUserEmail(lastUser);

    // Example: pretend we stored xp in localStorage
    const storedXp = parseInt(localStorage.getItem("xp") || "0", 10);
    const newXp = storedXp || 320; // default XP

    setXp(newXp);
    setLevel(Math.floor(newXp / 100)); // every 100 XP = new level
    setProgress(newXp % 100); // % towards next level
  }, []);

  return (
    <div className=" bg-gradient-to-br from-black via-indigo-900 to-purple-900 text-white p-6">
      <div className="max-w-5=xl mx-auto space-y-10">
        {/* Header */}
        <div className="bg-gradient-to-r from-indigo-700 to-purple-700 rounded-3xl p-10 shadow-2xl border border-white/10">
          <h1 className="text-4xl font-extrabold">🚀 Progress Dashboard</h1>
          <p className="mt-2 text-indigo-200">
            Track your journey, {userEmail || "Player"}.
          </p>
        </div>

        {/* XP + Level */}
        <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl p-8 shadow-lg border border-pink-300/30">
          <h2 className="text-2xl font-bold">⭐ Level {level}</h2>
          <p className="mt-2">Total XP: {xp}</p>
          <div className="w-full bg-gray-800 rounded-full h-6 mt-4">
            <div
              className="bg-yellow-400 h-6 rounded-full transition-all duration-500"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          <p className="text-sm mt-2 text-yellow-200">
            {progress}% to next level
          </p>
        </div>

        {/* Achievements */}
        <div>
          <h2 className="text-2xl font-bold mb-4">🏅 Badges Earned</h2>
          <div className="flex space-x-6">
            <div className="bg-purple-500/20 border border-purple-300/30 p-6 rounded-2xl w-28 text-center shadow-lg hover:scale-105 transition">
              <span className="text-4xl">🔥</span>
              <p className="text-sm mt-2">5 Day Streak</p>
            </div>
            <div className="bg-green-500/20 border border-green-300/30 p-6 rounded-2xl w-28 text-center shadow-lg hover:scale-105 transition">
              <span className="text-4xl">🎯</span>
              <p className="text-sm mt-2">Accuracy 80%</p>
            </div>
            <div className="bg-yellow-500/20 border border-yellow-300/30 p-6 rounded-2xl w-28 text-center shadow-lg hover:scale-105 transition">
              <span className="text-4xl">🏆</span>
              <p className="text-sm mt-2">Top 10 Rank</p>
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div>
          <h2 className="text-2xl font-bold mb-4">📊 Recent Activity</h2>
          <ul className="space-y-3">
            <li className="bg-white/10 rounded-xl p-4 shadow hover:scale-105 transition">
              ✅ Completed “Math Quiz 1” – +50 XP
            </li>
            <li className="bg-white/10 rounded-xl p-4 shadow hover:scale-105 transition">
              📝 Attempted “Science Quiz 2” – +30 XP
            </li>
            <li className="bg-white/10 rounded-xl p-4 shadow hover:scale-105 transition">
              🏆 Reached Top 15 on Leaderboard
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
