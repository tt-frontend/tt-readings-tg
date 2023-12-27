import { api } from "@/api";
import { GetAllForReadingAddedResponce } from "@/api/types";
import { createQuery } from "@farfetched/core";
import { ReadingValues, SaveReadingError } from "./inputReadingsService.types";
import { createEffect } from "effector";

export const individualDevicesQuery = createQuery<
  void,
  GetAllForReadingAddedResponce
>({
  handler: () => api.get("IndividualDevices/ForReadingAdding"),
});

export const individualDevicesCreateReadingsMutation = createQuery({
  effect: createEffect<
    { id: number; readings: ReadingValues }[],
    void,
    SaveReadingError
  >((payloadsList) => {
    return Promise.all(
      payloadsList.map(async ({ id, readings }) => {
        try {
          return await api.post(`IndividualDevices/${id}`, readings);
        } catch (error) {
          throw { error, deviceId: id };
        }
      })
    ) as unknown as Promise<void>;
  }),
});
