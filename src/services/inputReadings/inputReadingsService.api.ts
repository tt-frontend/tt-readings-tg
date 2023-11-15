import { api } from "@/api";
import { IndividualDeviceListItemResponse } from "@/api/types";
import { createQuery } from "@farfetched/core";

export const individualDevicesQuery = createQuery<
  void,
  IndividualDeviceListItemResponse[]
>({
  handler: () => api.get("IndividualDevices"),
});
