import { useMemo } from "react";
import { useRoutes, useSearchParams } from "react-router-dom";
import { getRoutes } from "./Routes.constants";
import { useBackButton } from "@/hooks/useBackButton";

export const Router = () => {
  useBackButton();

  const params = useSearchParams();

  console.log(params);

  const routes = useMemo(() => getRoutes(), []);

  const router = useRoutes(routes);

  return router;
};
