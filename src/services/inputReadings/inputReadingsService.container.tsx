import { useUnit } from "effector-react";
import { InputReadingsPage } from "./InputReadingsPage/InputReadingsPage";
import {
  individualDevicesCreateReadingsMutation,
  individualDevicesQuery,
} from "./inputReadingsService.api";
import { inputReadingsService } from "./inputReadingsService.model";
import { useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { ConfirmExitFromReadingsPage } from "./ConfirmExitFromReadingsPage";

const {
  inputs,
  outputs,
  gates: { IndividualDevicesGate },
} = inputReadingsService;

export const InputReadingsContainer = () => {
  const { data: individualDevicesReadingsData, pending: isLoadingDevices } =
    useUnit(individualDevicesQuery);

  const { pending: isCreateReadingsLoading, error: saveReadingError } = useUnit(
    individualDevicesCreateReadingsMutation
  );

  const {
    setReadingPayloadField,
    createReadingsPayload,
    handleSubmitReadings,
    validationResult,
    deltaReadingsPayload,
    isShowConfirmPage,
  } = useUnit({
    createReadingsPayload: outputs.$createReadingsPayload,
    validationResult: outputs.$readingsValidation,
    setReadingPayloadField: inputs.setReadingPayloadField,
    handleSubmitReadings: inputs.handleSubmitReadings,
    deltaReadingsPayload: outputs.$deltaReadingsPayload,
    isShowConfirmPage: outputs.$isShowConfirmPage,
    setIsShowConfirmPage: inputs.setIsShowConfirmPage,
    clearReadingsPayload: inputs.clearReadingsPayload,
  });

  const isExistDeltaReadings = useMemo(
    () => Boolean(Object.entries(deltaReadingsPayload).length),
    [deltaReadingsPayload]
  );

  const navigate = useNavigate();

  // const handleBack = useCallback(() => {
  //   setIsShowConfirmPage(true);
  // }, [setIsShowConfirmPage]);

  // useEffect(() => {
  //   return () => {
  //     clearReadingsPayload();
  //     setIsShowConfirmPage(false);
  //   };
  // }, [clearReadingsPayload, setIsShowConfirmPage]);

  // const isDeltaExist = useMemo(
  //   () => Boolean(Object.entries(deltaReadingsPayload).length),
  //   [deltaReadingsPayload]
  // );

  // useHandleBackButton(isDeltaExist ? handleBack : null);

  useEffect(() => {
    return individualDevicesCreateReadingsMutation.finished.success.watch(() =>
      navigate("/inputReadings/successfulReadings")
    ).unsubscribe;
  }, [navigate]);

  return (
    <>
      <IndividualDevicesGate />
      {isShowConfirmPage && <ConfirmExitFromReadingsPage />}
      {!isShowConfirmPage && (
        <InputReadingsPage
          individualDevicesList={individualDevicesReadingsData?.devices || []}
          isLoadingDevices={isLoadingDevices}
          createReadingsPayload={createReadingsPayload}
          setReadingPayloadField={setReadingPayloadField}
          isCreateReadingsLoading={isCreateReadingsLoading}
          handleSubmitReadings={handleSubmitReadings}
          validationResult={validationResult}
          isExistDeltaReadings={isExistDeltaReadings}
          saveReadingError={saveReadingError}
        />
      )}
    </>
  );
};
