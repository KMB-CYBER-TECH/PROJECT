import React from "react";
import { Link } from "react-router-dom";

export default function Hero() {
  return (
    <>
      
      <section className="bg-gradient-to-br from-purple-600 via-purple-700 to-indigo-800 text-white py-24 relative overflow-hidden">
        
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-10 w-64 h-64 bg-white/5 rounded-full blur-3xl animate-float"></div>
          <div className="absolute bottom-1/4 right-10 w-80 h-80 bg-pink-400/10 rounded-full blur-3xl animate-float delay-2000"></div>
          <div className="absolute top-1/2 left-1/3 w-48 h-48 bg-blue-400/10 rounded-full blur-3xl animate-float delay-1000"></div>
        </div>

        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center relative z-10">
    
          <div className="space-y-8">
            <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-md px-4 py-2 rounded-full text-sm font-medium border border-white/20">
              <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
              <span>Made for all</span>
            </div>
            
            <h1 className="text-5xl lg:text-6xl font-bold leading-tight">
              Learning Made{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-pink-300">
                Fun & Rewarding
              </span>
            </h1>
            
            <p className="text-xl text-purple-100 leading-relaxed max-w-lg">
              Transform your education journey with interactive games, real-time progress tracking, and achievements that make every lesson count.
            </p>

           
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/login?role=student">
                <button className="group px-8 py-4 bg-white text-purple-600 font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 flex items-center space-x-2">
                  <span>🎓 Start Learning</span>
                  <span className="group-hover:translate-x-1 transition-transform">→</span>
                </button>
              </Link>

              <Link to="/login?role=admin/dashboard">
                <button className="px-8 py-4 bg-transparent text-white font-semibold rounded-xl border-2 border-white/30 hover:border-white/50 hover:bg-white/10 transition-all duration-300">
                  ⚙️ Admin Dashboard
                </button>
              </Link>
            </div>

          
            <div className="flex items-center space-x-8 pt-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-yellow-300">95%</div>
                <div className="text-sm text-purple-200">Completion Rate</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-300">10K+</div>
                <div className="text-sm text-purple-200">Active Students</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-300">4.8/5</div>
                <div className="text-sm text-purple-200">Student Rating</div>
              </div>
            </div>
          </div>

      
          <div className="flex justify-center lg:justify-end">
            <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 shadow-2xl border border-white/20 max-w-md w-full transform hover:scale-105 transition-transform duration-300">
              <div className="flex items-center justify-between mb-8">
                <h3 className="text-xl font-semibold text-white">Live Progress</h3>
                <div className="px-3 py-1 bg-green-500/20 text-green-300 text-sm font-medium rounded-full border border-green-400/30">
                  Live
                </div>
              </div>

      
              <div className="space-y-6">
                {[
                  { label: "Course Completion", value: 78, color: "bg-yellow-400" },
                  { label: "Quiz Mastery", value: 92, color: "bg-green-400" },
                  { label: "Game Levels", value: 65, color: "bg-blue-400" },
                  { label: "Achievements", value: 45, color: "bg-pink-400" }
                ].map((item, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-purple-100">{item.label}</span>
                      <span className="text-white font-semibold">{item.value}%</span>
                    </div>
                    <div className="h-2 bg-white/20 rounded-full overflow-hidden">
                      <div 
                        className={`h-full rounded-full ${item.color} transition-all duration-1000 ease-out`}
                        style={{ width: `${item.value}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>

              
              <div className="mt-8 p-4 bg-gradient-to-r from-purple-500/30 to-pink-500/30 rounded-xl border border-white/20">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-yellow-400 rounded-full flex items-center justify-center">
                    <span className="text-lg">🏆</span>
                  </div>
                  <div>
                    <div className="text-white font-semibold">Top Performer</div>
                    <div className="text-purple-200 text-sm">You're in the top 10%</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Learn Smarter, Achieve More
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Experience education reimagined with game-based learning designed for Nigerian curriculum standards.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: "🎯",
                title: "Smart Goals",
                description: "Personalized learning paths with AI-powered recommendations and progress tracking."
              },
              {
                icon: "🎮",
                title: "Interactive Games",
                description: "Engaging educational games that make complex topics easy to understand and remember."
              },
              {
                icon: "📊",
                title: "Live Analytics",
                description: "Real-time progress insights and performance analytics to guide your learning journey."
              },
              {
                icon: "🏆",
                title: "Achievement System",
                description: "Earn badges, points, and recognition for your accomplishments and milestones."
              },
              {
                icon: "🤝",
                title: "Peer Collaboration",
                description: "Learn together with classmates through group challenges and collaborative activities."
              },
              {
                icon: "📚",
                title: "Curriculum Aligned",
                description: "Content specifically designed to match Nigerian educational standards and requirements."
              }
            ].map((feature, index) => (
              <div 
                key={index}
                className="group bg-gradient-to-br from-gray-50 to-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-gray-100"
              >
                <div className="text-3xl mb-4 transform group-hover:scale-110 transition-transform duration-300">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}