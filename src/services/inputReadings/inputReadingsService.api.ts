import { api } from "@/api";
import { GetAllForReadingAddedResponce } from "@/api/types";
import { createQuery } from "@farfetched/core";
import { CreateReadingsRequestPayload } from "./inputReadingsService.types";

export const individualDevicesQuery = createQuery<
  void,
  GetAllForReadingAddedResponce
>({
  handler: () => api.get("IndividualDevices/ForReadingAdding"),
});

export const individualDevicesCreateReadingsMutation = createQuery<
  CreateReadingsRequestPayload,
  void
>({
  handler: (data) => {
    const payloadsList = Object.entries(data);

    return Promise.all(
      payloadsList.map(([id, values]) =>
        api.post(`IndividualDevices/${id}`, values)
      )
    ) as unknown as Promise<void>;
  },
});
