import { useMemo } from "react";
import { useRoutes } from "react-router-dom";
import { getRoutes } from "./Routes.constants";
import { useBackButton } from "@/hooks/useBackButton";

export const Router = () => {
  useBackButton();

  const routes = useMemo(() => getRoutes(), []);

  const router = useRoutes(routes);

  return router;
};
