import { useUnit } from "effector-react";
import { InputReadingsPage } from "./InputReadingsPage/InputReadingsPage";
import {
  individualDevicesCreateReadingsMutation,
  individualDevicesQuery,
} from "./inputReadingsService.api";
import { inputReadingsService } from "./inputReadingsService.model";
import { useMemo } from "react";

const {
  inputs,
  outputs,
  gates: { IndividualDevicesGate },
} = inputReadingsService;

export const InputReadingsContainer = () => {
  const { data: individualDevicesReadingsData, pending: isLoadingDevices } =
    useUnit(individualDevicesQuery);

  const { pending: isCreateReadingsLoading } = useUnit(
    individualDevicesCreateReadingsMutation
  );

  const {
    setReadingPayloadField,
    createReadingsPayload,
    handleSubmitReadings,
    validationResult,
    deltaReadingsPayload,
  } = useUnit({
    createReadingsPayload: outputs.$createReadingsPayload,
    validationResult: outputs.$readingsValidation,
    setReadingPayloadField: inputs.setReadingPayloadField,
    handleSubmitReadings: inputs.handleSubmitReadings,
    deltaReadingsPayload: outputs.$deltaReadingsPayload,
  });

  const isExistDeltaReadings = useMemo(
    () => Boolean(Object.entries(deltaReadingsPayload).length),
    [deltaReadingsPayload]
  );

  return (
    <>
      <IndividualDevicesGate />
      <InputReadingsPage
        individualDevicesList={individualDevicesReadingsData?.devices || []}
        isLoadingDevices={isLoadingDevices}
        createReadingsPayload={createReadingsPayload}
        setReadingPayloadField={setReadingPayloadField}
        isCreateReadingsLoading={isCreateReadingsLoading}
        handleSubmitReadings={handleSubmitReadings}
        validationResult={validationResult}
        isExistDeltaReadings={isExistDeltaReadings}
      />
    </>
  );
};
