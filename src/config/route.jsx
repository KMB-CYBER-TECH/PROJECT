import { createBrowserRouter } from "react-router-dom";
import RootLayout from "../layout/RootLayout";

import Quiz_view from "../Component/Utils/Quiz/Quiz_view";
import Leader_view from "../Component/Utils/LeaderBoard/Leader_view";
import Manage_view from "../Component/Utils/Manage/Manage_view";
import Progress_view from "../Component/Utils/Progress/Progress_view";
import GameComp_view from "../Component/Utils/GameComp/GameComp_view";
import History_view from "../Component/Utils/Historyy/History_view";
import Ball_view from "../Component/Utils/Football/Ball_view";

import Login from "../Component/Pages/Login";
import Signup from "../Component/Pages/Signup";
import StudentDashboard from "../Component/Pages/StudentDashboard";
import AdminDashboard from "../Component/Pages/AdminDashboard";

import Educational from "../Component/Utils/Quiz/educational";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "signup",
        element: <Signup />,
      },
      {
        path: "student/dashboard",
        element: <StudentDashboard />,
      },
      {
        path: "admin/dashboard",
        element: <AdminDashboard />,
      },
      {
        path: "quiz",
        element: <Quiz_view />,
      },
      {
        path: "leaderboard",
        element: <Leader_view />,
      },
      {
        path: "progress",
        element: <Progress_view />,
      },
      {
        path: "game",
        element: <GameComp_view />,
      },
      {
        path: "educational",
        element: <Educational />,
      },
      {
        path: "history",
        element: <History_view />,
      },
      {
        path: "football",
        element: <Ball_view />,
      },
      {
        path: "manage",
        element: <Manage_view />,
      },
    ],
  },
]);
