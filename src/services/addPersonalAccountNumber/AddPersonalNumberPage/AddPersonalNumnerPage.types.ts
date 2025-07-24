import { HomeownerAccountResponse } from "@/api/types";
import {
   AddAccRequest,
   FindHomeownerAccountRequest,
} from "../addPersonalAccountNumber.types";

export type AddPersonalNumberPageProps = {
   existingCities: string[] | null;
   handleFindAccount: (payload: FindHomeownerAccountRequest) => void;
   homeownerAccount: HomeownerAccountResponse | null;
   isLoading: boolean;
   handleLinkAccount: (payload: AddAccRequest) => void;
};
