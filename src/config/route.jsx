import { createBrowserRouter } from "react-router-dom";
import RootLayout from "../layout/RootLayout";

import Quiz_view from "../Component/Utils/Quiz/Quiz_view";
import Leader_view from "../Component/Utils/LeaderBoard/Leader_view";
import Progress_view from "../Component/Utils/Progress/Progress_view";
import Dash_view from "../Component/Utils/DashBoard/Dash_view";
import GameComp_view from "../Component/Utils/GameComp/GameComp_view";
import Home from "../Component/Pages/Home";
import Login from "../Component/Pages/Login";
import Signup from "../Component/Pages/Signup";
import Educational from "../Component/Utils/Quiz/educational";
// import History from "../Component/Utils/Quiz/history";
// import Football from "../Component/Utils/Quiz/football";

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
        path: "Game",
        element: <GameComp_view />,
      },
      {
        path: "educational",
        element: <Educational />,
      },
      // {
      //   path: 'history',
      //   element: <Educational />
      // }
      // {
      //   path: 'football',
      //   element: <Educational />
      // }
    ],
  },
]);
