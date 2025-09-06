import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const navigate = useNavigate();
  const username = localStorage.getItem("username");

  // Redirect to login if user is not logged in
  useEffect(() => {
    if (!username) {
      navigate("/login");
    }
  }, [navigate, username]);

  // Dummy stats (you can later replace with real data)
  const stats = {
    points: 120,
    tasksCompleted: 5,
    streak: 3
  };

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">
        Welcome back, <span className="text-blue-600">{username}</span> 👋
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <div className="bg-green-100 p-4 rounded-xl text-center shadow">
          <p className="text-lg font-semibold">Points</p>
          <p className="text-3xl">{stats.points}</p>
        </div>
        <div className="bg-yellow-100 p-4 rounded-xl text-center shadow">
          <p className="text-lg font-semibold">Tasks Done</p>
          <p className="text-3xl">{stats.tasksCompleted}</p>
        </div>
        <div className="bg-blue-100 p-4 rounded-xl text-center shadow">
          <p className="text-lg font-semibold">Streak</p>
          <p className="text-3xl">{stats.streak} 🔥</p>
        </div>
      </div>
    </div>
  );
}
