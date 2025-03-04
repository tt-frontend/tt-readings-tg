import { api } from "@/api";
import { IndividualDeviceResponse } from "@/api/types";
import { createQuery } from "@farfetched/core";

export const deviceQuery = createQuery<number, IndividualDeviceResponse>({
  handler: (deviceId) => api.get(`/IndividualDevices/${deviceId}`),
});
