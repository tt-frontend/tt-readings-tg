import { HomeownerAccountResponse } from "@/api/types";
import {
   AddAccRequest,
   FindHomeownerAccountRequest,
} from "./addPersonalAccountNumber.types";
import { api } from "@/api";

export const findHomeownerAccount = (
   params: FindHomeownerAccountRequest
): Promise<HomeownerAccountResponse | null> =>
   api.get("HomeownerAccounts/Find", { params });

export const linkHomeownerAccount = (payload: AddAccRequest) => {
   return api.post(`HomeownerAccounts/Link`, null, { params: payload });
};
