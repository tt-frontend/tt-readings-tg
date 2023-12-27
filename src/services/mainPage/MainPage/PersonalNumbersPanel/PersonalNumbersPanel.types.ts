import { HomeownerAccountListResponse } from "@/api/types";

export type PersonalNumbersPanelProps = {
   personalNumbers: HomeownerAccountListResponse[];
   selectedNumber: string | null;
   handleSelect: (id: string) => void;
   handleDeleteHomeownerAccount: (id: string) => void;
};
