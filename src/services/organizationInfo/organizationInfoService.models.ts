import { sample } from "effector";
import { createGate } from "effector-react";
import { managementFirmDataQuery } from "./organizationInfoService.api";
import { personalNumbersAcccountsService } from "../personalNumberAccounts/personalNumberAccounts.model";

const ManagementFirmGate = createGate();

sample({
  source: personalNumbersAcccountsService.outputs.$selectedHomeownerAccountId,
  clock: ManagementFirmGate.open,
  filter: Boolean,
  target: managementFirmDataQuery.start,
});

export const organizationInfoService = {
  inputs: {},
  outputs: {},
  gates: { ManagementFirmGate },
};
