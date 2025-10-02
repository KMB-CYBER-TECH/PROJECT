import React from "react";

export default function TestimonialsAndFooter() {
  const testimonials = [
    {
      name: "Hilmi Gabi",
      school: "Baze University",
      xp: "2850 XP",
      quote:
        "ED-Games transformed how I study. The gamification keeps me motivated and I've improved my grades significantly!",
      
      initial: "G",
    },
    {
      name: "Emeka Nwankwo",
      school: "Ahmadu Bello University",
      xp: "3200 XP",
      quote:
        "The competitive element with my classmates makes learning fun. I never miss my daily streak now!",
      
      initial: "E",
    },
    {
      name: "Fatima Hassan",
      school: "Baze University",
      xp: "2650 XP",
      quote:
        "Perfect for our Nigerian curriculum. The platform understands our educational system perfectly.",
      
      initial: "F",
    },
  ];

  return (
    <div className="bg-gray-50">
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-gray-900">
            What Students Are Saying
          </h2>
          <p className="mt-2 text-gray-600">
            Join thousands of Nigerian students who have transformed their
            learning experience
          </p>

          <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-xl shadow-sm border text-left"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="bg-red-500 text-white w-10 h-10 flex items-center justify-center rounded-full font-bold">
                      {t.initial}
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">{t.name}</h3>
                      <p className="text-sm text-gray-500">{t.school}</p>
                    </div>
                  </div>
                  <span className="bg-red-600 text-white text-xs font-bold px-3 py-1 rounded-full">
                    {t.xp}
                  </span>
                </div>
                <p className="mt-4 italic text-gray-700">"{t.quote}"</p>
                <div className="flex mt-3 text-yellow-400">
                  {"★".repeat(t.stars)}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <footer className="bg-gray-100 py-10">
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-8 text-gray-700">
          <div>
            <h3 className="flex items-center gap-2 text-lg font-bold text-red-600">
              <span>🏆</span> ED-Games
            </h3>
            <p className="mt-2 text-sm">
              Empowering Nigerian students through gamified learning
              experiences.
            </p>
          </div>

          <div>
            <h4 className="font-semibold mb-2 ml-50">Platform</h4>
            <ul className="space-y-1 text-sm ml-50">
              <li>Courses</li>
              <li>Quizzes</li>
              <li>Games</li>
              <li>Leaderboard</li>
            </ul>
          </div>
        </div>

        <div className="mt-8 text-center text-gray-500 text-sm">
          ED-Games. by kmbbassey@gmail.com. Made with ❤️ for Nigerian students.
        </div>
      </footer>
    </div>
  );
}
