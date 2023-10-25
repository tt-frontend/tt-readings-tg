import { createEffect, createEvent, createStore, sample } from "effector";
import { loginUser } from "./authService.api";
import { LoginResponse } from "@/api/types";
import { AxiosError } from "axios";

const handleSecretRecieved = createEvent<string>();

const fetchAuthTokenFx = createEffect<string, LoginResponse, AxiosError>(
  loginUser
);

const $authToken = createStore<null | string>(null).on(
  fetchAuthTokenFx.doneData,
  (_, { token }) => token
);

sample({
  clock: handleSecretRecieved,
  target: fetchAuthTokenFx,
});

fetchAuthTokenFx.failData.watch((e) => {
  const isForbidden = e.response?.status === 403;

  if (isForbidden) Telegram.WebApp.sendData(JSON.stringify({ Command: 1 }));
});

const handleTokenRecieved = fetchAuthTokenFx.doneData;

export const authService = {
  inputs: { handleSecretRecieved, handleTokenRecieved },
  outputs: { $authToken },
};
