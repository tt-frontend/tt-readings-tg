import { useUnit } from "effector-react";
import { authService } from "../authService";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useEffect } from "react";
import { personalNumbersAcccountsService } from "../personalNumberAccounts/personalNumberAccounts.model";
import { Skeleton } from "antd";

export const LimbContainer = () => {
  const { handleSecretRecieved, personalNumbers } = useUnit({
    handleSecretRecieved: authService.inputs.handleSecretRecieved,
    personalNumbers: personalNumbersAcccountsService.outputs.$personalNumbers,
  });

  const [params] = useSearchParams();

  const navigate = useNavigate();

  useEffect(() => {
    const telegramUserInitData = Telegram.WebApp.initData;

    if (telegramUserInitData) handleSecretRecieved(telegramUserInitData);
  }, [handleSecretRecieved, params]);

  useEffect(() => {
    if (!personalNumbers) return;

    if (personalNumbers.length === 0) {
      navigate("/addPersonalAccountNumberInitial");

      return;
    }

    navigate("/");
  }, [navigate, personalNumbers]);

  return <Skeleton active />;
};
