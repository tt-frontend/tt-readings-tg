import { message } from "antd";
import { createGate } from "effector-react";
import {
  combine,
  createEffect,
  createEvent,
  createStore,
  sample,
} from "effector";
import { EffectFailDataAxiosError } from "@/types";
import { HomeownerAccountResponse } from "@/api/types";
import {
  findHomeownerAccount,
  linkHomeownerAccount,
} from "./addPersonalAccountNumber.api";
import { FindHomeownerAccountRequest } from "./addPersonalAccountNumber.types";

const handleFindAccount = createEvent<FindHomeownerAccountRequest>();
const handleLinkAccount = createEvent<string>();

const AddPersonalAccountNumberGate = createGate();

const findHomeownerAccountFx = createEffect<
  FindHomeownerAccountRequest,
  HomeownerAccountResponse | null,
  EffectFailDataAxiosError
>(findHomeownerAccount);

const linkHomeownerAccountFx = createEffect(linkHomeownerAccount);

const $homeownerAccount = createStore<HomeownerAccountResponse | null>(null)
  .on(findHomeownerAccountFx.doneData, (_, data) => data)
  .reset(AddPersonalAccountNumberGate.close);

sample({
  clock: handleFindAccount,
  target: findHomeownerAccountFx,
});

sample({
  clock: handleLinkAccount,
  target: linkHomeownerAccountFx,
});

const $isLoading = combine(
  findHomeownerAccountFx.pending,
  linkHomeownerAccountFx.pending,
  (...list) => list.some(Boolean)
);

findHomeownerAccountFx.failData.watch((e) => {
  message.error(e.response.data.error.Message);
});

const handleSuccessLink = linkHomeownerAccountFx.doneData;

handleSuccessLink.watch(() => message.success("Лицевой счет добавлен!"));

export const addPersonalAccountNumberService = {
  inputs: { handleFindAccount, handleLinkAccount, handleSuccessLink },
  outputs: { $homeownerAccount, $isLoading },
  gates: { AddPersonalAccountNumberGate },
};
