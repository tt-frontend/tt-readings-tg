import { api } from "@/api";
import { GetAllForReadingAddedResponce } from "@/api/types";
import { createQuery } from "@farfetched/core";
import { ReadingValues } from "./inputReadingsService.types";

export const individualDevicesQuery = createQuery<
  void,
  GetAllForReadingAddedResponce
>({
  handler: () => api.get("IndividualDevices/ForReadingAdding"),
});

export const individualDevicesCreateReadingsMutation = createQuery<
  { id: number; readings: ReadingValues }[],
  void
>({
  handler: (payloadsList) => {
    return Promise.all(
      payloadsList.map(({ id, readings }) =>
        api.post(`IndividualDevices/${id}`, readings)
      )
    ) as unknown as Promise<void>;
  },
});
