import { HomeownerAccountResponse } from "@/api/types";
import { FindHomeownerAccountRequest } from "./addPersonalAccountNumber.types";
import { api } from "@/api";
import { message } from "antd";

export const findHomeownerAccount = (
  params: FindHomeownerAccountRequest
): Promise<HomeownerAccountResponse | null> =>
  api.get("HomeownerAccounts/Find", { params });

export const linkHomeownerAccount = (accId: string) => {
  message.warning(accId);
  return api.post(`HomeownerAccounts/Link?accId=${accId}`, null);
};
