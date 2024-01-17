import { combine, createEvent, createStore, sample } from "effector";
import { createGate } from "effector-react";
import {
  individualDevicesCreateReadingsMutation,
  individualDevicesQuery,
} from "./inputReadingsService.api";
import {
  CreateReadingsRequestPayload,
  ReadingsValidationData,
  SetReadingPayload,
} from "./inputReadingsService.types";
import {
  getDeltaReadings,
  getDevicesMap,
  getDevicesReadings,
  validateReadings,
} from "./inputReadingsService.utils";
import { message } from "antd";

const IndividualDevicesGate = createGate();

const setReadingPayloadField = createEvent<SetReadingPayload>();
const clearReadingsPayload = createEvent();
const handleSubmitReadings = createEvent();

const setIsShowConfirmPage = createEvent<boolean>();

const $createReadingsPayload = createStore<CreateReadingsRequestPayload>({})
  .on(individualDevicesQuery.finished.success, (prev, data) => {
    if (!data) return prev;

    const {
      result: { devices },
    } = data;

    if (!devices) return prev;

    return { ...getDevicesReadings(devices), ...prev };
  })
  .on(setReadingPayloadField, (prev, data) => {
    const res = {
      ...prev,
      [data.id]: {
        ...(prev[data.id] || {}),
        ...data.values,
      },
    };

    return res;
  })
  .reset(clearReadingsPayload);

const $isShowConfirmPage = createStore(false);

sample({
  clock: individualDevicesQuery.finished.success,
  target: individualDevicesCreateReadingsMutation.reset,
});

sample({
  clock: [
    IndividualDevicesGate.open,
    individualDevicesCreateReadingsMutation.finished.success,
  ],
  target: individualDevicesQuery.start,
});

const $deltaReadingsPayload = combine(
  $createReadingsPayload,
  individualDevicesQuery.$data,
  (payload, devicesResponse) => ({ payload, devicesResponse })
).map(({ payload, devicesResponse }) =>
  getDeltaReadings(payload, devicesResponse)
);

sample({
  source: $deltaReadingsPayload,
  clock: handleSubmitReadings,
  filter: (data) => Boolean(data.length),
  target: individualDevicesCreateReadingsMutation.start,
});

sample({
  clock: individualDevicesCreateReadingsMutation.finished.success,
  target: clearReadingsPayload,
});

const $readingsValidation = combine(
  $deltaReadingsPayload,
  individualDevicesQuery.$data,
  (deltaReadings, devicesResponse) => ({ deltaReadings, devicesResponse })
).map(({ deltaReadings, devicesResponse }): ReadingsValidationData => {
  const devicesDataMap = getDevicesMap(devicesResponse);
  const consumptionRates = devicesResponse?.consumptionRates;

  return deltaReadings.reduce((acc, { id, readings }) => {
    const deviceData = devicesDataMap[id];

    const validationResult = validateReadings(
      readings,
      deviceData,
      consumptionRates
    );

    if (validationResult) return { ...acc, [id]: validationResult };

    return acc;
  }, {});
});

individualDevicesCreateReadingsMutation.finished.success.watch(() =>
  message.success("Показания успешно занесены")
);

individualDevicesCreateReadingsMutation.finished.failure.watch(console.log);

individualDevicesCreateReadingsMutation.$error.watch(console.log);

export const inputReadingsService = {
  inputs: {
    setReadingPayloadField,
    handleSubmitReadings,
    clearReadingsPayload,
    setIsShowConfirmPage,
  },
  outputs: {
    $createReadingsPayload,
    $readingsValidation,
    $deltaReadingsPayload,
    $isShowConfirmPage,
  },
  gates: { IndividualDevicesGate },
};
