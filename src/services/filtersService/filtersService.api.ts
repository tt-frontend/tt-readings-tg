import { api } from "@/api";

export const getExistingCities = (): Promise<string[]> =>
  api.get("Filters/Cities");
