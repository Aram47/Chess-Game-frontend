import { createBrowserRouter } from "react-router-dom";
import HomePage from "../pages/HomePage/page";
import Layout from "../layouts/Layout";
import AnalyzePage from "../pages/Analyze/page";
import ClassesPage from "../pages/Classes/page";
import ProfileDashboard from "../pages/Profile/page";
import PlayPage from "../pages/PlayPage/page";

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
        path: "/analyze",
        element: <AnalyzePage />,
      },
      {
        path: "/classes",
        element: <ClassesPage />,
      },
      {
        path: "/profile",
        element: <ProfileDashboard />,
      },
    ],
  },
]);
