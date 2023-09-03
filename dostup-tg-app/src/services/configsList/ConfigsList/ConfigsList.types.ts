import { ConfigResponse } from "@/api/types";

export type ConfigsListTypes = {
  isLoading: boolean;
  configs: ConfigResponse[] | null;
};
