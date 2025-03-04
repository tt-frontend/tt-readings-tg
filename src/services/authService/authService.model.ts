import { createEffect, createEvent, createStore, sample } from "effector";
import { loginUser } from "./authService.api";
import { LoginResponse } from "@/api/types";
import { AxiosError } from "axios";

const handleSecretRecieved = createEvent<string>();

const fetchAuthTokenFx = createEffect<string, LoginResponse, AxiosError>(
  loginUser
);

const setAuthToken = createEvent<string>();

export const DEFAULT_TOKEN =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJUZ1VzZXJJZCI6IjE3NjcyNDIwNzMiLCJUZ1VzZXJJZEludGVybmFsIjoiMGYzNmY5ZjctNzlmOC00ZTRiLTlhYzQtMThmNGI1MGIxMjYzIiwiVGdBdXRoRmxhZyI6InRydWUiLCJuYmYiOjE3NDEwOTE1NzYsImV4cCI6MTc0MTEwNTk3NiwiaWF0IjoxNzQxMDkxNTc2fQ.WSVD4JRMnPCK3gPAk-QPIc21z-2SxY9UO0bpu-OPkUs";

const $authToken = createStore<null | string>(null)
  .on(fetchAuthTokenFx.doneData, (_, data) => {
    return data.token;
  })
  .on(setAuthToken, (_, token) => token);

sample({
  source: $authToken,
  clock: handleSecretRecieved,
  filter: (token, telegramUserInitData) =>
    !token && Boolean(telegramUserInitData),
  fn: (_, telegramUserInitData) => telegramUserInitData,
  target: fetchAuthTokenFx,
});

fetchAuthTokenFx.failData.watch((e) => {
  const isForbidden = e.response?.status === 403 || e.response?.status === 401;

  if (isForbidden) Telegram.WebApp.close();
});

const $isAuth = $authToken.map(Boolean);

export const authService = {
  inputs: { handleSecretRecieved, setAuthToken },
  outputs: { $authToken, $isAuth },
};
