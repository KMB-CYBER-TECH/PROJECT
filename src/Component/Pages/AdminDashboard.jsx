import React from "react";
import {
  BookOpenIcon,
  UsersIcon,
  FolderIcon,
  ChartBarIcon,
  StarIcon,
  TrophyIcon,
  ArrowRightIcon,
  PlusCircleIcon,
  PencilSquareIcon,
} from "@heroicons/react/24/outline";


const ChartPlaceholder = ({ title }) => (
  <div className="p-6 bg-white rounded-xl shadow-lg border border-gray-100 h-96 flex items-center justify-center">
    <div className="text-center text-gray-400">
      <ChartBarIcon className="w-12 h-12 mx-auto text-indigo-300 mb-2" />
      <p className="font-semibold">{title}</p>
      <p className="text-sm">System-Wide Data Visualization Area</p>
    </div>
  </div>
);


const MetricCard = ({
  name,
  value,
  icon: Icon,
  colorClass,
  iconColor,
  progress,
  subtitle,
}) => (
  <div
    className={`p-6 rounded-2xl shadow-xl transition duration-300 transform hover:scale-[1.02] ${colorClass} relative overflow-hidden`}
  >
    <Icon
      className={`w-16 h-16 absolute top-4 right-4 opacity-10 ${iconColor}`}
    />
    <p className="text-sm font-light opacity-80">{name}</p>
    <p className="text-4xl font-extrabold tracking-tight mt-1">{value}</p>
    <p className="text-xs font-medium opacity-70 mt-1">{subtitle}</p>
    <div className="w-full bg-white bg-opacity-30 rounded-full h-1.5 mt-4">
      <div
        className="bg-white rounded-full h-1.5"
        style={{ width: `${progress}%` }}
        title={`${progress}% Progress`}
      ></div>
    </div>
  </div>
);

export default function AdminDashboard() {
  const stats = [
    {
      name: "Total Quizzes",
      value: "25",
      icon: BookOpenIcon,
      colorClass: "bg-indigo-600 text-white",
      iconColor: "text-indigo-200",
      progress: 80,
      subtitle: "80% of target set",
    },
    {
      name: "Active Students",
      value: "300",
      icon: UsersIcon,
      colorClass: "bg-green-600 text-white",
      iconColor: "text-green-200",
      progress: 95,
      subtitle: "Highest engagement this month",
    },
    {
      name: "Content Assets",
      value: "50",
      icon: FolderIcon,
      colorClass: "bg-amber-600 text-white",
      iconColor: "text-amber-200",
      progress: 50,
      subtitle: "Halfway to content goal",
    },
  ];

  const adminLevel = 5;
  const nextLevelTarget = 1000;
  const currentScore = 750;

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="p-5 md:p-8 lg:p-10 bg-white border-b border-gray-200 shadow-md">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl md:text-4xl font-extrabold text-gray-800">
              Admin Panel 🕹️
            </h1>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto p-5 md:p-8 lg:p-10">
       
        <div className="flex flex-col lg:flex-row items-center justify-between mb-8 space-y-4 lg:space-y-0 lg:space-x-8">
       
          <a
            href="/manage" 
            className="w-full lg:w-auto px-8 py-4 bg-indigo-600 text-white font-bold text-lg rounded-xl shadow-lg hover:bg-indigo-700 transition duration-300 flex items-center justify-center space-x-2 transform hover:-translate-y-1"
          >
            <UsersIcon className="w-6 h-6" />
            <span>Manage Students</span>
            <ArrowRightIcon className="w-5 h-5 ml-2" />
          </a>
        </div>

       
        <h2 className="text-2xl font-bold text-gray-800 mb-6 border-b pb-3">
          Operational Status
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {stats.map((stat) => (
            <MetricCard
              key={stat.name}
              name={stat.name}
              value={stat.value}
              icon={stat.icon}
              colorClass={stat.colorClass}
              iconColor={stat.iconColor}
              progress={stat.progress}
              subtitle={stat.subtitle}
            />
          ))}
        </div>
      </main>
    </div>
  );
}
