import { HomeownerAccountListResponse } from "@/api/types";

export type MainPageProps = {
  homeownerAccounts: HomeownerAccountListResponse[] | null;
  selectedPersonalNumber: string | null;
  setSelectedPersonalNumber: (id: string) => void;
};
