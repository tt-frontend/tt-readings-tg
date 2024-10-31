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
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJUZ1VzZXJJZCI6IjE3NjcyNDIwNzMiLCJUZ1VzZXJJZEludGVybmFsIjoiMGYzNmY5ZjctNzlmOC00ZTRiLTlhYzQtMThmNGI1MGIxMjYzIiwiVGdBdXRoRmxhZyI6InRydWUiLCJuYmYiOjE3MzA0MDUxOTQsImV4cCI6MTczMDQxOTU5NCwiaWF0IjoxNzMwNDA1MTk0fQ._RW6UncGsbFsNdhvio0czeA_nlbV7FiPfg7Ah7xtSIo";

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
