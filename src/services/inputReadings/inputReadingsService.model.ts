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

const handleSubmitReadings = createEvent();

const $createReadingsPayload = createStore<CreateReadingsRequestPayload>({})
  .on(individualDevicesQuery.finished.success, (prev, data) => {
    if (!data) return prev;

    const {
      result: { devices },
    } = data;

    if (!devices) return prev;

    return getDevicesReadings(devices);
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
  });

sample({
  clock: [
    IndividualDevicesGate.open,
    individualDevicesCreateReadingsMutation.finished.finally,
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

individualDevicesCreateReadingsMutation.finished.finally.watch(() =>
  message.success("Показания успешно занесены")
);

export const inputReadingsService = {
  inputs: { setReadingPayloadField, handleSubmitReadings },
  outputs: {
    $createReadingsPayload,
    $readingsValidation,
    $deltaReadingsPayload,
  },
  gates: { IndividualDevicesGate },
};
