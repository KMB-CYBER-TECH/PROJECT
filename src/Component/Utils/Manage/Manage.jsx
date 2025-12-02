import React from 'react';
import { AcademicCapIcon, ChartBarIcon, ClockIcon, GlobeAltIcon, UserCircleIcon, XMarkIcon } from '@heroicons/react/24/outline'; 


const DetailedChartPlaceholder = ({ title, height = 'h-80' }) => (
    <div className={`p-6 bg-white rounded-xl shadow-lg border border-gray-100 ${height} flex flex-col items-center justify-center`}>
        <div className="text-center text-gray-400">
            <ChartBarIcon className="w-10 h-10 mx-auto text-indigo-400 mb-2" />
            <p className="font-semibold text-lg">{title}</p>
            <p className="text-sm">Individual Performance Trend Chart</p>
        </div>
    </div>
);

export default function StudentDetailView({ studentId = 123, studentName = "Jane Smith" }) {
    
    const studentData = {
        totalQuizzes: 15,
        averageScore: '88%',
        lastActivity: '2 hours ago',
        enrollmentDate: '2023-09-15',
        weakestTopic: 'Advanced Calculus',
        strongestTopic: 'Basic Algebra',
    };

    return (
        <div className="min-h-screen bg-gray-50"> 
            
           
            <header className="p-5 md:p-8 bg-white border-b border-gray-200 shadow-sm">
                <div className="max-w-7xl mx-auto">
                    <p className="text-sm text-gray-500 mb-2">
                        <a href="/manage-students" className="hover:text-indigo-600">Manage Students</a> / {studentName}
                    </p>
                    <div className="flex items-center justify-between">
                        <h1 className="text-3xl font-extrabold text-gray-800 flex items-center space-x-3">
                            <UserCircleIcon className="w-8 h-8 text-indigo-500" />
                            <span>{studentName}'s Profile</span>
                        </h1>
                        <button className="text-red-500 hover:text-red-700 p-2 rounded-full hover:bg-red-50 transition">
                            <XMarkIcon className="w-6 h-6" />
                        </button>
                    </div>
                </div>
            </header>

            
            <main className="max-w-7xl mx-auto p-5 md:p-8">
                
           
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
                    
                    <div className="bg-white p-5 rounded-xl shadow border border-indigo-100 flex items-center space-x-4">
                        <AcademicCapIcon className="w-8 h-8 text-indigo-500" />
                        <div>
                            <p className="text-sm text-gray-500">Average Score</p>
                            <p className="text-2xl font-bold text-gray-800">{studentData.averageScore}</p>
                        </div>
                    </div>

                    <div className="bg-white p-5 rounded-xl shadow border border-green-100 flex items-center space-x-4">
                        <ClockIcon className="w-8 h-8 text-green-500" />
                        <div>
                            <p className="text-sm text-gray-500">Last Activity</p>
                            <p className="text-2xl font-bold text-gray-800">{studentData.lastActivity}</p>
                        </div>
                    </div>
                    
                    <div className="bg-white p-5 rounded-xl shadow border border-red-100">
                        <p className="text-sm text-gray-500 flex items-center"><XMarkIcon className="w-5 h-5 mr-1 text-red-500" /> Weakest Topic</p>
                        <p className="text-xl font-semibold text-gray-800 mt-1">{studentData.weakestTopic}</p>
                    </div>
                    
                    <div className="bg-white p-5 rounded-xl shadow border border-yellow-100">
                        <p className="text-sm text-gray-500 flex items-center"><GlobeAltIcon className="w-5 h-5 mr-1 text-yellow-500" /> Strongest Topic</p>
                        <p className="text-xl font-semibold text-gray-800 mt-1">{studentData.strongestTopic}</p>
                    </div>
                </div>

             
                <h2 className="text-2xl font-bold text-gray-800 mb-6 border-b pb-3">Performance Trends & Detail</h2>
                
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                   
                    <div className="lg:col-span-2">
                        <DetailedChartPlaceholder 
                            title="Quiz Score History (Last 10 Attempts)" 
                            height="h-96" 
                        />
                    </div>
                    
                  
                    <div className="lg:col-span-1">
                        <DetailedChartPlaceholder 
                            title="Quiz Status Breakdown (Completed vs. Failed)" 
                            height="h-96" 
                        />
                    </div>
                </div>

               
                <h2 className="text-2xl font-bold text-gray-800 mt-12 mb-6 border-b pb-3">Recent Activity Log</h2>
                <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
                    <p className="text-gray-500 italic">
                        Table or list view of Jane Smith's last 5 submitted quizzes with scores, time taken, and submission date.
                    </p>
                    
                </div>

            </main>
        </div>
    );
}