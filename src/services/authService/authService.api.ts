import { api } from "@/api";
import { LoginResponse } from "@/api/types";

export const loginUser = (secret: string): Promise<LoginResponse> =>
  api.post("Auth/Login", { secret });
