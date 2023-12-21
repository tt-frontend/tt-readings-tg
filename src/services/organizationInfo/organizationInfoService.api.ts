import { api } from "@/api";
import { ManagementFirmInfoResponse } from "@/api/types";
import { createQuery } from "@farfetched/core";

export const managementFirmDataQuery = createQuery<
  string,
  ManagementFirmInfoResponse
>({
  handler: (accId: string) =>
    api.get(`HomeownerAccounts/${accId}/ManagementFirmInfo`),
});
