import { useEffect, useMemo } from "react";
import { useNavigate, useRoutes, useSearchParams } from "react-router-dom";
import { getRoutes } from "./Routes.constants";
import { useUnit } from "effector-react";
import { authService } from "@/services/authService";
import { useBackButton } from "@/services/backButton/backButtonService.hook";

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
