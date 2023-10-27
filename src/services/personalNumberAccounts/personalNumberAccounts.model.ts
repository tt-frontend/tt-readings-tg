import { HomeownerAccountListResponse } from "@/api/types";
import { createEffect, createEvent, createStore, sample } from "effector";
import { getPersonalNumbers } from "./personalNumberAccounts.api";
import { authService } from "../authService";
import { addPersonalAccountNumberService } from "../addPersonalAccountNumber/addPersonalAccountNumber.model";

const fetchPersonalNumbersFx = createEffect<
  void,
  HomeownerAccountListResponse[]
>(getPersonalNumbers);

const handleSelectHomeownerAccount = createEvent<string>();

const $personalNumbers = createStore<HomeownerAccountListResponse[] | null>(
  null
).on(fetchPersonalNumbersFx.doneData, (_, data) => data);

const $isLoading = fetchPersonalNumbersFx.pending;

const $selectedHomeownerAccountId = createStore<string | null>(null);

sample({
  clock: authService.outputs.$isAuth,
  filter: Boolean,
  target: fetchPersonalNumbersFx,
});

sample({
  clock: addPersonalAccountNumberService.inputs.handleSuccessLink,
  target: fetchPersonalNumbersFx,
});

export const personalNumbersAcccountsService = {
  inputs: { handleSelectHomeownerAccount },
  outputs: { $personalNumbers, $isLoading, $selectedHomeownerAccountId },
};
