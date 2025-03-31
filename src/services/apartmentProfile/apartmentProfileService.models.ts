import { sample } from "effector";
import { createGate } from "effector-react";
import { individualDevicesQuery } from "./apartmentProfileService.api";

const ApartmentProfileGate = createGate();

sample({
  clock: ApartmentProfileGate.open,
  target: individualDevicesQuery.start,
});

export const apartmentProfileService = {
  inputs: {},
  outputs: {},
  gates: { ApartmentProfileGate },
};
