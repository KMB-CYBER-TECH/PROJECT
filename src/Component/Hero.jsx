import React from "react";

export default function Hero() {
  return (
    <>
     
      <section className="bg-gradient-to-br from-purple-600 via-purple-700 to-pink-600 text-white py-20 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-32 h-32 bg-white/10 rounded-full blur-xl animate-pulse"></div>
          <div className="absolute bottom-20 right-10 w-40 h-40 bg-pink-300/20 rounded-full blur-2xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/3 w-24 h-24 bg-yellow-300/20 rounded-full blur-xl animate-pulse delay-500"></div>
        </div>

        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10">
          <div>
            <div className="inline-flex items-center space-x-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-medium mb-6">
              <svg
                className="w-4 h-4 text-green-300"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
              </svg>
              <span>Made for Nigerian Students</span>
            </div>

            <h1 className="text-5xl lg:text-6xl font-bold leading-tight mb-6">
              Get to know your{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-pink-300">
                students
              </span>{" "}
              with learning worth engaging
            </h1>

            <p className="text-xl text-purple-100 mb-8 leading-relaxed">
              Collect all the data you need to{" "}
              <span className="font-semibold text-white">
                understand students
              </span>{" "}
             with gamified learinng designed 
            </p>

            <div className="flex flex-col  sm:flex-row gap-4">
              <button className="px-8 py-4 bg-white text-purple-600 font-semibold rounded-xl shadow-lg hover:shadow-xl hover:scale-105 transform transition-all duration-200">
              Get started it's free
              </button>
              <button className="px-8 py-4 bg-transparent border-2 border-white/30 backdrop-blur-sm rounded-xl hover:bg-white/10 transition-all duration-200">
                Learn More
              </button>
            </div>
          </div>

         
          <div className="flex justify-center lg:justify-end">
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 shadow-2xl border border-white/20 max-w-md w-full">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-white">
                  Learning Progress
                </h3>
                <div className="px-3 py-1 bg-green-500 text-white text-sm font-medium rounded-full">
                  +150%
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex justify-between text-sm text-purple-100">
                  <span>1,500</span>
                  <span>Quiz Completion Rate</span>
                </div>
                <div className="flex justify-between text-sm text-purple-100">
                  <span>1,000</span>
                  <span>Student Engagement</span>
                </div>
                <div className="flex justify-between text-sm text-purple-100">
                  <span>500</span>
                  <span>Learning Achievements</span>
                </div>
                <div className="flex justify-between text-sm text-purple-100">
                  <span>100</span>
                  <span>Course Completions</span>
                </div>
              </div>

              <div className="mt-6 h-32 bg-gradient-to-br from-purple-400/30 to-pink-400/30 rounded-lg relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-pulse"></div>
                <svg
                  className="absolute bottom-4 right-4 w-8 h-8 text-white/60"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M8 5v14l11-7z" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Everything You Need to Succeed
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our platform combines the best of gamification with proven
              educational methods tailored for Nigerian students.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border border-gray-100">
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                Goal Setting
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Set personalized learning goals and track your progress with
                smart milestones and achievements.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border border-gray-100">
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                Educational Games
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Engage with interactive mini-games designed to reinforce your
                learning and make studying fun.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border border-gray-100">
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                Quizzes & Assessments
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Test your knowledge with adaptive quizzes that adjust to your
                skill level and learning pace.
              </p>
            </div>

            {/* Leaderboards */}
            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border border-gray-100">
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                Leaderboards & Rewards
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Compete with peers and earn badges, points, and recognition for
                your learning achievements.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
