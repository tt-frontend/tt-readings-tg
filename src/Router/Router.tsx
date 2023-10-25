import { useEffect, useMemo } from "react";
import { useNavigate, useRoutes, useSearchParams } from "react-router-dom";
import { getRoutes } from "./Routes.constants";
import { useBackButton } from "@/hooks/useBackButton";

export const Router = () => {
  useBackButton();

  const navigate = useNavigate();

  const [params] = useSearchParams();

  useEffect(() => {
    navigate(`/limb?token=${params.get("token")}`);
  }, [navigate, params]);

  const routes = useMemo(() => getRoutes(), []);

  const router = useRoutes(routes);

  return router;
};
