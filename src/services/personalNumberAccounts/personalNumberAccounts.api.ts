import { HomeownerAccountListResponse } from "@/api/types";
import axios from "axios";

export const getPersonalNumbers = (): Promise<HomeownerAccountListResponse[]> =>
  axios.get("HomeownerAccounts");
