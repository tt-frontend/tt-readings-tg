import { Layout } from "@/components/Layout/Layout";
import { AddConfigContainer } from "@/services/addConfig";
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
      {
        path: "/addConfig",
        element: <AddConfigContainer />,
      },
    ],
  },
];
