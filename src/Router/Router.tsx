import { useEffect, useMemo } from "react";
import { useNavigate, useRoutes, useSearchParams } from "react-router-dom";
import { getRoutes } from "./Routes.constants";
import { useUnit } from "effector-react";
import { authService } from "@/services/authService";
import { useBackButton } from "@/services/backButton/backButtonService.hook";
import { DEFAULT_TOKEN } from "@/services/authService/authService.model";

export const Router = () => {
  useBackButton();

  const { isAuth, setAuthToken } = useUnit({
    isAuth: authService.outputs.$isAuth,
    setAuthToken: authService.inputs.setAuthToken,
  });

  const navigate = useNavigate();

  const [params] = useSearchParams();

  useEffect(() => {
    if (DEFAULT_TOKEN) {
      setAuthToken(DEFAULT_TOKEN);

      return;
    }

    if (!isAuth) navigate(`/limb`);
  }, [navigate, params, isAuth, setAuthToken]);

  const routes = useMemo(() => getRoutes(), []);

  const router = useRoutes(routes);

  return router;
};
