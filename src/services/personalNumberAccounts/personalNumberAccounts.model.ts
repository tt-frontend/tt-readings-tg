import { HomeownerAccountListResponse } from "@/api/types";
import { createEffect, createStore, sample } from "effector";
import { getPersonalNumbers } from "./personalNumberAccounts.api";
import { authService } from "../authService";

const fetchPersonalNumbersFx = createEffect<
  void,
  HomeownerAccountListResponse[]
>(getPersonalNumbers);

const $personalNumbers = createStore<HomeownerAccountListResponse[] | null>(
  null
).on(fetchPersonalNumbersFx.doneData, (_, data) => data);

const $isLoading = fetchPersonalNumbersFx.pending;

sample({
  source: authService.outputs.$authToken,
  target: fetchPersonalNumbersFx,
});

export const personalNumbersAcccountsService = {
  outputs: { $personalNumbers, $isLoading },
};
