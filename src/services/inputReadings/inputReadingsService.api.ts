import { api } from "@/api";
import { GetAllForReadingAddedResponce } from "@/api/types";
import { createQuery } from "@farfetched/core";

export const individualDevicesQuery = createQuery<
  void,
  GetAllForReadingAddedResponce
>({
  handler: () => api.get("IndividualDevices/ForReadingAdding"),
});
