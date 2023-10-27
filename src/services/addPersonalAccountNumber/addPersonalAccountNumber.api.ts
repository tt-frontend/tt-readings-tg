import { HomeownerAccountResponse } from "@/api/types";
import { FindHomeownerAccountRequest } from "./addPersonalAccountNumber.types";
import { api } from "@/api";

export const findHomeownerAccount = (
  params: FindHomeownerAccountRequest
): Promise<HomeownerAccountResponse | null> =>
  api.get("HomeownerAccounts/Find", { params });
