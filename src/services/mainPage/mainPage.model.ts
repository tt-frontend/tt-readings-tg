import { sample } from "effector";
import { createGate } from "effector-react";
import { individualDevicesQuery } from "../apartmentProfile/apartmentProfileService.api";
import { personalNumbersAcccountsService } from "../personalNumberAccounts/personalNumberAccounts.model";
import { notificationsQuery } from "./mainPage.api";

const MainPageGate = createGate();

sample({
  clock: MainPageGate.open,
  target: individualDevicesQuery.start,
});

sample({
  source: personalNumbersAcccountsService.outputs.$selectedHomeownerAccountId,
  clock: [
    MainPageGate.open,
    personalNumbersAcccountsService.outputs.$selectedHomeownerAccountId.updates,
  ],
  filter: Boolean,
  target: notificationsQuery.start,
});

export const mainPageService = { gates: { MainPageGate } };
