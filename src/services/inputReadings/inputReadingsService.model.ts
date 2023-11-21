import { combine, createEvent, createStore, sample } from "effector";
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
import { getDevicesReadings } from "./inputReadingsService.utils";

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

sample({
  source: combine(
    $createReadingsPayload,
    individualDevicesQuery.$data,
    (payload, devicesResponse) => ({ payload, devicesResponse })
  ),
  clock: handleSubmitReadings,
  fn: ({ payload, devicesResponse }) => {
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
  },
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
