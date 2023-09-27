import { Layout } from "@/components/Layout";
import { MainPageContainer } from "@/services/mainPage";
import { RouteObject } from "react-router-dom";

export const getRoutes = (): RouteObject[] => [
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <MainPageContainer />,
      },
    ],
  },
];
