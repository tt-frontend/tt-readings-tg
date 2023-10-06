import { RouteObject } from "react-router-dom";
import { Layout } from "@/components/Layout";
import { AddPersonalAccountNumberContainer } from "@/services/addPersonalAccountNumber";
import { InputReadingsContainer } from "@/services/inputReadings";
import { MainPageContainer } from "@/services/mainPage";

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
        path: "/inputReadings",
        element: <InputReadingsContainer />,
      },
      {
        path: "/addPersonalAccountNumber",
        element: <AddPersonalAccountNumberContainer />,
      },
    ],
  },
];
