import { sample } from "effector";
import { createGate } from "effector-react";
import { deviceQuery } from "./deviceProfileService.api";

const DeviceGate = createGate<{ deviceId: number }>();

sample({
  clock: DeviceGate.open,
  fn: ({ deviceId }) => deviceId,
  target: deviceQuery.start,
});

export const deviceProfileService = {
  inputs: {},
  outputs: {},
  gates: { DeviceGate },
};
