import { createBrowserRouter } from "react-router-dom";
import HomePage from "../pages/HomePage/page";
import Layout from "../layouts/Layout";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
    //   {
    //     path: "game/:gameId",
    //     element: <div>Game Board Component Here</div>,
    //   },
    ],
  },
]);