import { useUnit } from "effector-react";
import { InputReadingsPage } from "./InputReadingsPage/InputReadingsPage";
import {
  individualDevicesCreateReadingsMutation,
  individualDevicesQuery,
} from "./inputReadingsService.api";
import { inputReadingsService } from "./inputReadingsService.model";

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
  } = useUnit({
    createReadingsPayload: outputs.$createReadingsPayload,
    validationResult: outputs.$readingsValidation,
    setReadingPayloadField: inputs.setReadingPayloadField,
    handleSubmitReadings: inputs.handleSubmitReadings,
  });

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
      />
    </>
  );
};
