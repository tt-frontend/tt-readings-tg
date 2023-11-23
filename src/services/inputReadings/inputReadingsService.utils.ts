import {
  EIndividualDeviceRateType,
  GetAllForReadingAddedResponce,
  IndividualDeviceForReadingResponse,
} from "@/api/types";
import {
  CreateReadingsRequestPayload,
  ReadingValidation,
  ReadingValues,
  ReadingsValidationResult,
} from "./inputReadingsService.types";

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

export const getDeltaReadings = (
  payload: CreateReadingsRequestPayload,
  devicesResponse: GetAllForReadingAddedResponce | null
) => {
  const devices = getDevicesReadings(devicesResponse?.devices || []);

  const payloadsList = Object.entries(payload).map(([id, readings]) => ({
    id: Number(id),
    readings,
  }));

  if (!devices) return [];

  return payloadsList.filter((readingPayloadItem) => {
    const initialPayload = devices[readingPayloadItem.id];

    if (!initialPayload) return false;

    return (
      JSON.stringify(initialPayload) !==
      JSON.stringify(readingPayloadItem.readings)
    );
  });
};

export const getDevicesMap = (
  devicesResponse?: GetAllForReadingAddedResponce | null
) => {
  return (devicesResponse?.devices || []).reduce(
    (acc, elem) => ({ ...acc, [elem.id]: elem }),
    {} as { [deviceId: number]: IndividualDeviceForReadingResponse }
  );
};

export const validateReading = (
  currentValue?: number | null,
  prevValue?: number | null
): ReadingValidation | null => {
  if (!currentValue || !prevValue) return null;

  const diff = currentValue - prevValue;

  if (diff < 0)
    return {
      message: "Показания меньше, чем за предыдущий месяц",
      type: "critical",
    };

  return null;
};

export const validateReadings = (
  readings: ReadingValues,
  deviceData: IndividualDeviceForReadingResponse
): ReadingsValidationResult => {
  return {
    [EIndividualDeviceRateType.OneZone]: validateReading(
      readings.value1,
      deviceData.previousReading?.value1
    ),
    [EIndividualDeviceRateType.TwoZone]: validateReading(
      readings.value2,
      deviceData.previousReading?.value2
    ),
    [EIndividualDeviceRateType.ThreeZone]: null,
  };
};
