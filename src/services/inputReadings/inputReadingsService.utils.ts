import {
  ConsumptionRateResponse,
  EIndividualDeviceRateType,
  EResourceTypeConsumptionRateResponseDictionaryItem,
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
        value1: elem.currentReading?.value1 ?? null,
        value2: elem.currentReading?.value2 ?? null,
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

const checkPrevMore = (
  currentValue: number,
  prevValue: number
): ReadingValidation | null => {
  const diff = currentValue - prevValue;

  if (diff >= 0) return null;

  return {
    message: "Показания меньше, чем за предыдущий месяц",
    type: "critical",
  };
};

const checkBitDepth = (
  value: number,
  bitDepth: number | null
): ReadingValidation | null => {
  if (!bitDepth) return null;

  const isNumber = !Number.isNaN(value);
  const wholePartLength = String(value.toFixed()).length;

  const isCorrect = isNumber && wholePartLength <= bitDepth;

  if (isCorrect) return null;

  return {
    message: `Показание должно иметь не более ${bitDepth} знаков до запятой`,
    type: "critical",
  };
};

const checkConsumtion = (
  currentValue: number,
  prevValue: number,
  consumtionRate: ConsumptionRateResponse | null
): ReadingValidation | null => {
  const diff = currentValue - prevValue;

  if (!consumtionRate?.maximumConsumptionRate) return null;

  if (diff <= consumtionRate.maximumConsumptionRate) return null;

  return {
    message: "Расход значительно больше среднего",
    type: "warning",
  };
};

export const validateReading = (
  deviceData: IndividualDeviceForReadingResponse,
  currentValue?: number | null,
  prevValue?: number | null,
  consumptionRates?: EResourceTypeConsumptionRateResponseDictionaryItem[] | null
): ReadingValidation | null => {
  if (!(typeof currentValue === "number") || !prevValue) return null;

  const consumtionRate =
    consumptionRates?.find((elem) => elem.key === deviceData.resource)?.value ??
    null;

  const validationStack = [
    checkPrevMore(currentValue, prevValue),
    checkBitDepth(currentValue, deviceData.bitDepth),
    checkConsumtion(currentValue, prevValue, consumtionRate),
  ];

  const validation = validationStack.find(Boolean);

  return validation || null;
};

export const validateReadings = (
  readings: ReadingValues,
  deviceData: IndividualDeviceForReadingResponse,
  consumptionRates?: EResourceTypeConsumptionRateResponseDictionaryItem[] | null
): ReadingsValidationResult => {
  return {
    [EIndividualDeviceRateType.OneZone]: validateReading(
      deviceData,
      readings.value1,
      deviceData.previousReading?.value1,
      consumptionRates
    ),
    [EIndividualDeviceRateType.TwoZone]: validateReading(
      deviceData,
      readings.value2,
      deviceData.previousReading?.value2,
      consumptionRates
    ),
    [EIndividualDeviceRateType.ThreeZone]: null,
  };
};
