import { api } from "@/api";
import { NotificationsResponse } from "@/api/types";
import { createQuery } from "@farfetched/core";

export const notificationsQuery = createQuery<string, NotificationsResponse>({
  handler: (accId) => api.get(`HomeownerAccounts/${accId}/Notifications`),
});
