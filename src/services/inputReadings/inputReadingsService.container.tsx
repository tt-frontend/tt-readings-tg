import { useUnit } from "effector-react";
import { InputReadingsPage } from "./InputReadingsPage/InputReadingsPage";
import { individualDevicesQuery } from "./inputReadingsService.api";
import { inputReadingsService } from "./inputReadingsService.model";

const {
  gates: { IndividualDevicesGate },
} = inputReadingsService;

export const InputReadingsContainer = () => {
  const { data: individualDevicesReadingsData, pending: isLoadingDevices } =
    useUnit(individualDevicesQuery);

  return (
    <>
      <IndividualDevicesGate />
      <InputReadingsPage
        individualDevicesList={individualDevicesReadingsData?.devices || []}
        isLoadingDevices={isLoadingDevices}
      />
    </>
  );
};
