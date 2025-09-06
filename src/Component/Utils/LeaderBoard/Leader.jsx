import React from 'react';

export default function Leader() {
  // Dummy data for now
  const users = [
    { name: "Kemfon", points: 120 },
    { name: "Caleb", points: 110 },
    { name: "Victor", points: 95 },
    { name: "Ada", points: 90 },
    { name: "James", points: 85 },
  ];

  return (
    <div className="max-w-lg mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4 text-center">🏆 Leaderboard</h2>
      <ul className="space-y-3">
        {users.sort((a, b) => b.points - a.points).map((user, index) => (
          <li key={index} className="bg-white shadow p-4 rounded-xl flex justify-between items-center">
            <span className="font-semibold">{index + 1}. {user.name}</span>
            <span className="text-blue-600 font-bold">{user.points} pts</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
