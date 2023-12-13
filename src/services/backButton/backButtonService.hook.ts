import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { excludedRoutes } from "./backButtonService.constants";
import { backButtonService } from "./backButtonService.model";
import { useUnit } from "effector-react";

const { inputs, outputs } = backButtonService;

export function useBackButton() {
  const { handleBack, confirmMessage } = useUnit({
    handleBack: inputs.handleBack,
    confirmMessage: outputs.$confirmMessage,
  });

  const location = useLocation();
  const navigate = useNavigate();

  const backButton = Telegram.WebApp.BackButton;

  useEffect(() => {
    if (!excludedRoutes.includes(location.pathname)) {
      backButton.show();
    } else {
      backButton.hide();
    }
  }, [location.pathname, backButton]);

  useEffect(() => {
    const cb = () => {
      console.log("go - back");
      navigate(-1);
    };

    return inputs.goBack.watch(cb).unsubscribe;
  }, [confirmMessage, navigate]);

  useEffect(() => {
    backButton.onClick(handleBack);
  }, [backButton, handleBack]);
}

// handleSubmitReadings.watch(() =>
//   Telegram.WebApp.showConfirm(
//     "Показания не сохранены. Вы хотите покинуть страничку?",
//     console.log
//   )
// );
