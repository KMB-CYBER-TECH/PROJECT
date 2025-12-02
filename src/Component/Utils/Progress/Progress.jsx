import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Trophy, TrendingUp, Target, Clock, Zap, Star, Award, ChevronRight } from "lucide-react";

export default function Progress() {
  const [userEmail, setUserEmail] = useState("");
  const [xp, setXp] = useState(0);
  const [level, setLevel] = useState(1);
  const [progress, setProgress] = useState(0);
  const [streak, setStreak] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const lastUser = localStorage.getItem("lastUser");
    if (lastUser) setUserEmail(lastUser);

    // Simulate stored data
    const storedXp = parseInt(localStorage.getItem("xp") || "250", 10);
    const storedStreak = parseInt(localStorage.getItem("streak") || "5", 10);
    
    setXp(storedXp);
    setStreak(storedStreak);
    setLevel(Math.floor(storedXp / 100) + 1);
    setProgress((storedXp % 100));
  }, []);

  const nextLevelXp = level * 100;
  const xpNeeded = nextLevelXp - xp;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white p-6">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header Section */}
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent mb-4">
            Your Progress
          </h1>
          <p className="text-xl text-gray-300">
            Level up your skills and track your journey
          </p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {/* Level Card */}
          <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-6 text-center hover:scale-105 transition-transform duration-300">
            <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-xl flex items-center justify-center mx-auto mb-3">
              <Trophy className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-white">Level {level}</h3>
            <p className="text-gray-400 text-sm">Current Rank</p>
          </div>

          {/* XP Card */}
          <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-6 text-center hover:scale-105 transition-transform duration-300">
            <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl flex items-center justify-center mx-auto mb-3">
              <TrendingUp className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-white">{xp}</h3>
            <p className="text-gray-400 text-sm">Total XP</p>
          </div>

          {/* Streak Card */}
          <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-6 text-center hover:scale-105 transition-transform duration-300">
            <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-red-500 rounded-xl flex items-center justify-center mx-auto mb-3">
              <Zap className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-white">{streak} days</h3>
            <p className="text-gray-400 text-sm">Current Streak</p>
          </div>

          {/* Progress Card */}
          <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-6 text-center hover:scale-105 transition-transform duration-300">
            <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-xl flex items-center justify-center mx-auto mb-3">
              <Target className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-white">{progress}%</h3>
            <p className="text-gray-400 text-sm">Level Progress</p>
          </div>
        </div>

        {/* Progress Bar Section */}
        <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-8">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-semibold">Level Progress</h3>
            <span className="text-cyan-400 font-bold">Level {level}</span>
          </div>
          
          <div className="space-y-4">
            <div className="flex justify-between text-sm text-gray-400">
              <span>{xp} XP</span>
              <span>{nextLevelXp} XP</span>
            </div>
            
            <div className="w-full bg-gray-700/50 rounded-full h-4">
              <div
                className="bg-gradient-to-r from-cyan-500 to-purple-500 h-4 rounded-full transition-all duration-1000 ease-out shadow-lg shadow-cyan-500/25"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
            
            <div className="text-center">
              <p className="text-gray-300">
                <span className="text-cyan-400 font-bold">{xpNeeded} XP</span> needed for next level
              </p>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <button
            onClick={() => navigate("/quiz")}
            className="bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-500 hover:to-cyan-500 p-8 rounded-2xl shadow-xl border border-white/10 group hover:scale-105 transition-all duration-300 text-left"
          >
            <div className="flex items-center justify-between">
              <div>
                <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center mb-4">
                  <Zap className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Start Quiz</h3>
                <p className="text-gray-200">Earn XP and level up your skills</p>
              </div>
              <ChevronRight className="w-6 h-6 text-white group-hover:translate-x-1 transition-transform" />
            </div>
          </button>

          <button
            onClick={() => navigate("/leaderboard")}
            className="bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-500 hover:to-red-500 p-8 rounded-2xl shadow-xl border border-white/10 group hover:scale-105 transition-all duration-300 text-left"
          >
            <div className="flex items-center justify-between">
              <div>
                <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center mb-4">
                  <Trophy className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Leaderboard</h3>
                <p className="text-gray-200">Compete with other players</p>
              </div>
              <ChevronRight className="w-6 h-6 text-white group-hover:translate-x-1 transition-transform" />
            </div>
          </button>
        </div>

        {/* Recent Achievements */}
        <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-8">
          <div className="flex items-center gap-3 mb-6">
            <Award className="w-6 h-6 text-cyan-400" />
            <h3 className="text-xl font-semibold">Recent Achievements</h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { icon: "🔥", title: "Hot Streak", desc: `${streak} day streak`, color: "from-orange-500 to-red-500" },
              { icon: "🎯", title: "Sharp Shooter", desc: "80% accuracy", color: "from-green-500 to-emerald-500" },
              { icon: "⚡", title: "Quick Learner", desc: "5 quizzes today", color: "from-purple-500 to-cyan-500" },
            ].map((achievement, idx) => (
              <div
                key={idx}
                className={`bg-gradient-to-r ${achievement.color} p-1 rounded-2xl hover:scale-105 transition-transform duration-300`}
              >
                <div className="bg-slate-900/90 rounded-xl p-6 text-center backdrop-blur-lg">
                  <span className="text-3xl mb-3 block">{achievement.icon}</span>
                  <h4 className="font-bold text-white mb-1">{achievement.title}</h4>
                  <p className="text-gray-300 text-sm">{achievement.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Activity Feed */}
        <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-8">
          <div className="flex items-center gap-3 mb-6">
            <Clock className="w-6 h-6 text-cyan-400" />
            <h3 className="text-xl font-semibold">Recent Activity</h3>
          </div>
          
          <div className="space-y-4">
            {[
              { action: "Completed Science Quiz", xp: 50, time: "2 hours ago" },
              { action: "Attempted History Challenge", xp: 30, time: "5 hours ago" },
              { action: "Reached Top 15", xp: 0, time: "1 day ago" },
            ].map((activity, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between p-4 bg-white/5 rounded-xl hover:bg-white/10 transition-colors duration-200 group"
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-cyan-500/20 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Star className="w-5 h-5 text-cyan-400" />
                  </div>
                  <div>
                    <p className="font-medium text-white">{activity.action}</p>
                    <p className="text-gray-400 text-sm">{activity.time}</p>
                  </div>
                </div>
                {activity.xp > 0 && (
                  <span className="bg-green-500/20 text-green-400 px-3 py-1 rounded-full text-sm font-medium">
                    +{activity.xp} XP
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}