import { createBrowserRouter } from "react-router-dom";
import AboutPage from "../pages/AboutPage/page";
import Layout from "../layouts/Layout";
import AnalyzePage from "../pages/Analyze/page";
import ClassesPage from "../pages/Classes/page";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <AboutPage />,
      },
      {
        path: "/analyze",
        element: <AnalyzePage />,
      },
      {
        path: "/classes",
        element: <ClassesPage />,
      },
    ],
  },
]);