import { HomeownerAccountResponse } from "@/api/types";
import { FindHomeownerAccountRequest } from "../addPersonalAccountNumber.types";

export type AddPersonalNumberPageProps = {
  existingCities: string[] | null;
  handleFindAccount: (payload: FindHomeownerAccountRequest) => void;
  homeownerAccount: HomeownerAccountResponse | null;
  isLoading: boolean;
  handleLinkAccount: (payload: string) => void;
};
