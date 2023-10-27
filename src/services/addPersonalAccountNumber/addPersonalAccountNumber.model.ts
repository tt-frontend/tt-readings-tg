import { createEffect, createEvent, createStore, sample } from "effector";
import { findHomeownerAccount } from "./addPersonalAccountNumber.api";
import { FindHomeownerAccountRequest } from "./addPersonalAccountNumber.types";
import { HomeownerAccountResponse } from "@/api/types";
import { EffectFailDataAxiosError } from "@/types";
import { createGate } from "effector-react";
import { message } from "antd";

const handleFindAccount = createEvent<FindHomeownerAccountRequest>();

const AddPersonalAccountNumberGate = createGate();

const findHomeownerAccountFx = createEffect<
  FindHomeownerAccountRequest,
  HomeownerAccountResponse | null,
  EffectFailDataAxiosError
>(findHomeownerAccount);

const $homeownerAccount = createStore<HomeownerAccountResponse | null>(null)
  .on(findHomeownerAccountFx.doneData, (_, data) => data)
  .reset(AddPersonalAccountNumberGate.close);

sample({
  clock: handleFindAccount,
  target: findHomeownerAccountFx,
});

const $isLoading = findHomeownerAccountFx.pending;

findHomeownerAccountFx.failData.watch((e) => {
  message.error(e.response.data.error.Message);
});

export const addPersonalAccountNumberService = {
  inputs: { handleFindAccount },
  outputs: { $homeownerAccount, $isLoading },
  gates: { AddPersonalAccountNumberGate },
};
