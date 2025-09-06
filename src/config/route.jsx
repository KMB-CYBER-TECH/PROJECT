import { createBrowserRouter } from "react-router-dom";
import RootLayout from "../layout/RootLayout";

import Quiz_view from "../Component/Utils/Quiz/Quiz_view";
import Upload_view from "../Component/Utils/UploadNotes/Upload_view";
import Leader_view from "../Component/Utils/LeaderBoard/Leader_view";
import Progress_view from "../Component/Utils/Progress/Progress_view";
import Question_view from "../Component/Utils/Question/Question_view";
import Dash_view from "../Component/Utils/DashBoard/Dash_view";
import Home from "../Component/Pages/Home";
import Login from "../Component/Pages/Login";
import Signup from "../Component/Pages/Signup";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        path: "home",
        element: <Home />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "signup",
        element: <Signup />,
      },
      {
        path: "dashboard",
        element: <Dash_view />,
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
        path: "upload",
        element: <Upload_view />,
      },
      {
        path: "question",
        element: <Question_view />,
      },
    ],
  },
]);
