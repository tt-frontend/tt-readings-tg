import { sample } from "effector";
import { createGate } from "effector-react";
import { individualDevicesQuery } from "../apartmentProfile/apartmentProfileService.api";

const MainPageGate = createGate();

sample({
  clock: MainPageGate.open,
  target: individualDevicesQuery.start,
});

export const mainPageService = { gates: { MainPageGate } };
