import { sample } from "effector";
import { createGate } from "effector-react";
import { individualDevicesQuery } from "./inputReadingsService.api";

const IndividualDevicesGate = createGate();

sample({
  clock: IndividualDevicesGate.open,
  target: individualDevicesQuery.start,
});

export const inputReadingsService = {
  gates: { IndividualDevicesGate },
};
