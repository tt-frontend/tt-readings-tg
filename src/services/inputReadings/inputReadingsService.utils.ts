import { IndividualDeviceForReadingResponse } from "@/api/types";
import { CreateReadingsRequestPayload } from "./inputReadingsService.types";

export const getDevicesReadings = (
  devices: IndividualDeviceForReadingResponse[]
): CreateReadingsRequestPayload => {
  return devices.reduce(
    (acc, elem) => ({
      ...acc,
      [elem.id]: {
        value1: elem.currentReading?.value1,
        value2: elem.currentReading?.value2,
      },
    }),
    {}
  );
};
