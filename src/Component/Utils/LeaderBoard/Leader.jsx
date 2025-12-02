import React, { useState } from "react";
import { Trophy, Crown, Medal, TrendingUp, Zap, Star } from "lucide-react";

export default function Leader() {
  const [hoveredIndex, setHoveredIndex] = useState(null);

  const users = [
    { name: "Kemfon", points: 120, streak: 12, level: 15 },
    { name: "Caleb", points: 110, streak: 8, level: 14 },
    { name: "Victor", points: 95, streak: 5, level: 12 },
    { name: "Ada", points: 90, streak: 7, level: 11 },
    { name: "James", points: 85, streak: 3, level: 10 },
    { name: "Sarah", points: 78, streak: 6, level: 9 },
    { name: "Michael", points: 72, streak: 4, level: 9 },
  ];

  const sortedUsers = [...users].sort((a, b) => b.points - a.points);
  const maxPoints = sortedUsers[0].points;

  const getRankIcon = (index) => {
    switch (index) {
      case 0:
        return <Crown className="w-8 h-8 text-yellow-400" />;
      case 1:
        return <Medal className="w-7 h-7 text-gray-300" />;
      case 2:
        return <Medal className="w-6 h-6 text-amber-700" />;
      default:
        return null;
    }
  };

  const getPodiumHeight = (index) => {
    switch (index) {
      case 0:
        return "h-48";
      case 1:
        return "h-36";
      case 2:
        return "h-28";
      default:
        return "h-0";
    }
  };

  const getRankStyle = (index) => {
    switch (index) {
      case 0:
        return "bg-yellow-400/10 border-yellow-400/40";
      case 1:
        return "bg-gray-300/10 border-gray-300/40";
      case 2:
        return "bg-amber-700/10 border-amber-700/40";
      default:
        return "bg-white/5 border-white/10 hover:border-white/20";
    }
  };

  const getInitials = (name) =>
    name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();

  const topThree = sortedUsers.slice(0, 3);
  const restOfUsers = sortedUsers.slice(3);

  const podiumOrder = [topThree[1], topThree[0], topThree[2]];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-indigo-900 to-black py-12 px-4 text-white">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16 space-y-4">
          <div className="inline-flex items-center gap-3 mb-4">
            <Trophy className="w-12 h-12 text-yellow-400" />
          </div>
          <h1 className="text-5xl font-extrabold"> Leaderboard</h1>
          <p className="text-indigo-200 text-lg">
            Compete, climb, and conquer the ranks
          </p>
        </div>

        <div className="flex items-end justify-center gap-4 mb-16">
          {podiumOrder.map((user, displayIndex) => {
            if (!user) return null;
            const actualIndex = sortedUsers.findIndex(
              (u) => u.name === user.name
            );
            const isFirst = actualIndex === 0;
            const podiumPosition =
              displayIndex === 1 ? 0 : displayIndex === 0 ? 1 : 2;

            return (
              <div
                key={user.name}
                className={`flex flex-col items-center ${
                  isFirst
                    ? "order-2"
                    : displayIndex === 0
                    ? "order-1"
                    : "order-3"
                }`}
              >
                <div
                  className={`relative mb-4 p-6 rounded-2xl border-2 shadow-lg backdrop-blur-md ${getRankStyle(
                    actualIndex
                  )} ${isFirst ? "scale-110" : ""} transition-all duration-300`}
                >
                  <div className="absolute -top-5 left-1/2 -translate-x-1/2">
                    {getRankIcon(actualIndex)}
                  </div>

                  <div
                    className={`w-20 h-20 mx-auto mt-6 rounded-full flex items-center justify-center text-2xl font-bold text-black ${
                      actualIndex === 0
                        ? "bg-yellow-400"
                        : actualIndex === 1
                        ? "bg-gray-300"
                        : "bg-amber-700"
                    }`}
                  >
                    {getInitials(user.name)}
                  </div>

                  <h3 className="text-xl font-bold mt-3">{user.name}</h3>
                  <p className="text-3xl font-extrabold mt-1 text-yellow-300">
                    {user.points} XP
                  </p>

                  <div className="flex justify-center gap-4 mt-4 border-t border-white/20 pt-3 text-sm">
                    <div className="flex items-center gap-1">
                      <Zap className="w-4 h-4 text-yellow-400" /> {user.streak}
                    </div>
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 text-yellow-400" /> Lv{" "}
                      {user.level}
                    </div>
                  </div>
                </div>

                <div
                  className={`w-48 ${getPodiumHeight(
                    podiumPosition
                  )} rounded-t-xl bg-gradient-to-b from-yellow-400/30 to-yellow-400/10 flex items-center justify-center`}
                >
                  <span className="text-5xl font-bold text-white/20">
                    {actualIndex + 1}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        <div className="max-w-3xl mx-auto space-y-3">
          {restOfUsers.map((user, idx) => {
            const actualIndex = sortedUsers.findIndex(
              (u) => u.name === user.name
            );
            const isHovered = hoveredIndex === actualIndex;

            return (
              <div
                key={user.name}
                onMouseEnter={() => setHoveredIndex(actualIndex)}
                onMouseLeave={() => setHoveredIndex(null)}
                className={`p-5 rounded-xl border backdrop-blur-md ${getRankStyle(
                  actualIndex
                )} transition-all duration-300 hover:scale-[1.02]`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
                      <span className="font-bold">{actualIndex + 1}</span>
                    </div>
                    <div className="flex flex-col">
                      <p className="font-semibold">{user.name}</p>
                      <div className="w-40 bg-white/10 h-2 rounded-full mt-1">
                        <div
                          className="h-full bg-yellow-400 rounded-full transition-all"
                          style={{
                            width: `${(user.points / maxPoints) * 100}%`,
                          }}
                        ></div>
                      </div>
                    </div>
                  </div>

                  <div className="text-right">
                    <p className="text-xl font-bold text-yellow-400">
                      {user.points}
                    </p>
                    <p className="text-xs text-gray-400">XP</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-12 text-center">
          <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-yellow-400/10 border border-yellow-400/30">
            <Zap className="w-5 h-5 text-yellow-400" />
            <span className="font-semibold text-yellow-200">
              Keep grinding to reach the top!
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
