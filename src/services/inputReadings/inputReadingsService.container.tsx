import { useUnit } from "effector-react";
import { InputReadingsPage } from "./InputReadingsPage/InputReadingsPage";
import { individualDevicesQuery } from "./inputReadingsService.api";
import { inputReadingsService } from "./inputReadingsService.model";

const {
  inputs,
  outputs,
  gates: { IndividualDevicesGate },
} = inputReadingsService;

export const InputReadingsContainer = () => {
  const { data: individualDevicesReadingsData, pending: isLoadingDevices } =
    useUnit(individualDevicesQuery);

  const { setReadingPayloadField, createReadingsPayload } = useUnit({
    setReadingPayloadField: inputs.setReadingPayloadField,
    createReadingsPayload: outputs.$createReadingsPayload,
  });

  return (
    <>
      <IndividualDevicesGate />
      <InputReadingsPage
        individualDevicesList={individualDevicesReadingsData?.devices || []}
        isLoadingDevices={isLoadingDevices}
        createReadingsPayload={createReadingsPayload}
        setReadingPayloadField={setReadingPayloadField}
      />
    </>
  );
};
