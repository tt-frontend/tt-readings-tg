import { api } from "@/api";
import {
   HomeownerAccountListResponse,
   HomeownerAccountResponse,
} from "@/api/types";

export const getPersonalNumbers = (): Promise<HomeownerAccountListResponse[]> =>
   api.get("HomeownerAccounts");

export const getHomeownerAccount = (
   accId: string
): Promise<HomeownerAccountResponse> => api.get(`HomeownerAccounts/${accId}`);

export const deleteHomeownerAccount = (accId: string): Promise<void> =>
   api.delete("HomeownerAccounts/Link", { params: { accId } });
