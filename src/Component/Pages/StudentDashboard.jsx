import React from 'react';

export default function StudentDashboard() {
  return (
    <div className="min-h-screen bg-gray-100 font-sans p-8">
      
      <header className="flex justify-between items-center mb-8 border-b border-gray-300 pb-4">
        <h1 className="text-3xl font-semibold text-blue-700 flex items-center">
          🎓 Student Dashboard
        </h1>
        <div className="flex items-center space-x-4">
          <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition">
            Notifications
          </button>
          <img
            src="https://via.placeholder.com/50"
            alt="Profile"
            className="w-12 h-12 rounded-full border-2 border-gray-300"
          />
        </div>
      </header>

     
      <section className="bg-white rounded-lg shadow-md p-6 mb-8">
        <h2 className="text-2xl font-semibold text-gray-800 mb-2">Welcome back, Student!</h2>
        <p className="text-gray-600">Ready to continue your learning journey?</p>
      </section>

    
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
       
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">My Courses</h3>
          <ul className="space-y-4">
            {[
              { title: 'Math Basics', progress: 75 },
              { title: 'English Literature', progress: 50 },
              { title: 'Computer Science', progress: 40 },
            ].map((course, index) => (
              <li key={index} className="bg-gray-50 rounded-lg p-4 shadow-sm">
                <div className="flex justify-between items-center mb-2">
                  <span className="font-semibold text-gray-700">{course.title}</span>
                  <span className="text-sm text-gray-500">{course.progress}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div
                    className="bg-blue-600 h-3 rounded-full"
                    style={{ width: `${course.progress}%` }}
                  ></div>
                </div>
              </li>
            ))}
          </ul>
        </div>

        
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Upcoming Assignments</h3>
          <ul className="space-y-4">
            {[
              { subject: 'Math', title: 'Algebra Homework', due: 'Tomorrow' },
              { subject: 'English', title: 'Essay Draft', due: 'In 3 days' },
              { subject: 'Computer Science', title: 'Project Submission', due: 'Next Week' },
            ].map((assignment, index) => (
              <li key={index} className="bg-gray-50 rounded-lg p-4 shadow-sm">
                <div className="flex justify-between items-center mb-2">
                  <span className="font-semibold text-gray-700">{assignment.subject}</span>
                  <span className="text-sm text-gray-500">{assignment.due}</span>
                </div>
                <p className="text-gray-600">{assignment.title}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>

    
      <footer className="mt-8 text-center text-gray-500 text-sm">
        &copy; 2024 Your Educational Platform. All rights reserved.
      </footer>
    </div>
  );
}