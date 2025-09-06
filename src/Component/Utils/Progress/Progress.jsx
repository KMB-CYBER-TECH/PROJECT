import React from 'react';

export default function Progress() {
  // Example user progress data
  const progress = {
    completedLectures: 12,
    completedQuizzes: 5,
    currentStreak: 4,
    totalPoints: 130
  };

  return (
    <div className="max-w-md mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4 text-center">📊 Progress Tracker</h2>

      <div className="space-y-4">
        <div className="bg-blue-100 p-4 rounded-xl shadow">
          <p className="text-lg font-medium">Lectures Completed</p>
          <p className="text-2xl font-bold">{progress.completedLectures}</p>
        </div>
        <div className="bg-green-100 p-4 rounded-xl shadow">
          <p className="text-lg font-medium">Quizzes Passed</p>
          <p className="text-2xl font-bold">{progress.completedQuizzes}</p>
        </div>
        <div className="bg-yellow-100 p-4 rounded-xl shadow">
          <p className="text-lg font-medium">Current Streak 🔥</p>
          <p className="text-2xl font-bold">{progress.currentStreak} days</p>
        </div>
        <div className="bg-purple-100 p-4 rounded-xl shadow">
          <p className="text-lg font-medium">Total Points</p>
          <p className="text-2xl font-bold">{progress.totalPoints}</p>
        </div>
      </div>
    </div>
  );
}
