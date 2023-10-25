import { api } from "@/api";

export const loginUser = (secret: string) =>
  api.get("Auth/Login", { params: { secret } });
