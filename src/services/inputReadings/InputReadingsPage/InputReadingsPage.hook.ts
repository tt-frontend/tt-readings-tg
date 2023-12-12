import { useEffect } from "react";
import { ReadingsValidationData } from "../inputReadingsService.types";

export function useInputReadingButton(
  handleSubmitReadings: () => void,
  validationResult: ReadingsValidationData,
  isCreateReadingsLoading: boolean,
  isExistDeltaReadings: boolean
) {
  useEffect(() => {
    const btn = Telegram.WebApp.MainButton;
    btn.text = "Отправить";
    btn.color = "#007AFF";
    btn.show();
    btn.onClick(handleSubmitReadings);

    return () => {
      btn.hide();
      btn.offClick(handleSubmitReadings);
    };
  }, [handleSubmitReadings]);

  useEffect(() => {
    const validationList = Object.entries(validationResult);

    const isCritical = !!validationList.find(
      ([, res]) =>
        !![res.OneZone, res.TwoZone, res.ThreeZone].find(
          (elem) => elem?.type === "critical"
        )
    );

    const btn = Telegram.WebApp.MainButton;

    if (isCritical || !isExistDeltaReadings) {
      btn.disable();
      btn.color = "#cfcfcf";
    } else {
      btn.enable();
      btn.color = "#007AFF";
    }
  }, [validationResult, isExistDeltaReadings]);

  useEffect(() => {
    const btn = Telegram.WebApp.MainButton;

    if (isCreateReadingsLoading) {
      btn.showProgress(false);
    } else {
      btn.hideProgress();
    }

    return () => btn.hideProgress();
  }, [isCreateReadingsLoading]);
}
