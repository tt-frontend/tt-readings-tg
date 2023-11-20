import { createEvent, createStore, sample } from "effector";
import { createGate } from "effector-react";
import {
  individualDevicesCreateReadingsMutation,
  individualDevicesQuery,
} from "./inputReadingsService.api";
import {
  CreateReadingsRequestPayload,
  SetReadingPayload,
} from "./inputReadingsService.types";
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

    return devices?.reduce(
      (acc, elem) => ({
        ...acc,
        [elem.id]: {
          value1: elem.currentReading?.value1,
          value2: elem.currentReading?.value2,
        },
      }),
      {}
    );
  })
  .on(setReadingPayloadField, (prev, data) => {
    return {
      ...prev,
      [data.id]: {
        ...(prev[data.id] || {}),
        ...data.values,
      },
    };
  });

sample({
  clock: [
    IndividualDevicesGate.open,
    individualDevicesCreateReadingsMutation.finished.finally,
  ],
  target: individualDevicesQuery.start,
});

sample({
  source: $createReadingsPayload,
  clock: handleSubmitReadings,
  target: individualDevicesCreateReadingsMutation.start,
});

individualDevicesCreateReadingsMutation.finished.finally.watch(() =>
  message.success("Показания успешно занесены")
);

export const inputReadingsService = {
  inputs: { setReadingPayloadField, handleSubmitReadings },
  outputs: { $createReadingsPayload },
  gates: { IndividualDevicesGate },
};
