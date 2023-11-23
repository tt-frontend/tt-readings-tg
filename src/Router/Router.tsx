import { useEffect, useMemo } from "react";
import { useNavigate, useRoutes, useSearchParams } from "react-router-dom";
import { getRoutes } from "./Routes.constants";
import { useBackButton } from "@/hooks/useBackButton";
import { useUnit } from "effector-react";
import { authService } from "@/services/authService";

export const Router = () => {
  useBackButton();

  const isAuth = useUnit(authService.outputs.$isAuth);

  const navigate = useNavigate();

  const [params] = useSearchParams();

  useEffect(() => {
    if (!isAuth) navigate(`/limb`);
  }, [navigate, params, isAuth]);

  const routes = useMemo(() => getRoutes(), []);

  const router = useRoutes(routes);

  return router;
};
