import { createBrowserRouter } from "react-router-dom";
import HomePage from "../pages/HomePage/page";
import Layout from "../layouts/Layout";
import { ChessAnalysisUI } from "../pages/Analyze/page";
import ClassesPage from "../pages/Classes/page";
import ProfileDashboard from "../pages/Profile/page";
import PlayPage from "../pages/PlayPage/page";
import AuthCallback from "../context/AuthCallback";
import { ChessGamePage } from "../components/game/Game";
import ProblemsPage from "../pages/Problems/Page";
import SolveProblem from "../components/problems/solve-problem/SolveProblem";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "/play",
        element: <PlayPage />,
      },
      {
        path: "/play/game",
        element: <ChessGamePage />,
      },
      {
        path: "/analyze",
        element: <ChessAnalysisUI />,
      },
      {
        path: "/classes",
        element: <ClassesPage />,
      },
      {
        path: "/profile",
        element: <ProfileDashboard />,
      },
      {
        path: "/auth/callback",
        element: <AuthCallback />,
      },
      {
        path: "/problems",
        element: <ProblemsPage />,
      },
      {
        path: "/problems/id",
        element: <SolveProblem />,
      },

      //   {
      //     path: "/play/bot",
      //     element: <ChessBotGamePage />,
      //   },
      //   {
      //     path: "/play/game/bot?color=black&level=3",
      //     element: <ChessBotGamePage />,
      //   },
    ],
  },
]);
