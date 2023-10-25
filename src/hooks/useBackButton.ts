import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export function useBackButton() {
  const location = useLocation();
  const navigate = useNavigate();

  const backButton = Telegram.WebApp.BackButton;

  useEffect(() => {
    if (!["/", "/limb"].includes(location.pathname)) {
      backButton.show();
    } else {
      backButton.hide();
    }
  }, [location.pathname, backButton]);

  useEffect(() => {
    backButton.onClick(() => navigate(-1));
  }, [backButton, navigate]);
}
