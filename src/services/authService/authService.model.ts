import { createEffect, createEvent, createStore, sample } from "effector";
import { loginUser } from "./authService.api";

const authToken = createStore<null | string>(null);

const handleSecretRecieved = createEvent<string>();

const fetchAuthTokenFx = createEffect(loginUser);

sample({
  clock: handleSecretRecieved,
  target: fetchAuthTokenFx,
});

export const authService = {
  outputs: { authToken },
};
