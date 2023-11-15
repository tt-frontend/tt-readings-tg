import { authService } from "@/services/authService";
import { personalNumbersAcccountsService } from "@/services/personalNumberAccounts/personalNumberAccounts.model";
import axios from "axios";

axios.defaults.baseURL = "https://stage.k8s.transparent-technology.ru/api/tg";

axios.interceptors.request.use((req) => {
  const accId =
    personalNumbersAcccountsService.outputs.$selectedHomeownerAccountId.getState();

  req.headers.Authorization = `Bearer ${authService.outputs.$authToken.getState()}`;
  req.headers["x-user-path"] = window.location.pathname || "none";
  req.params = {
    ...(req.params || {}),
    accId,
  };
  return req;
});

axios.interceptors.response.use(({ data }) => {
  return data;
});

export const api = axios;
