import { Event } from "effector";
import { HomeownerAccountListResponse } from "@/api/types";

export type PersonalNumbersPanelProps = {
   personalNumbers: HomeownerAccountListResponse[];
   selectedNumber: string | null;
   handleSelect: (id: string) => void;
   handleDeleteHomeownerAccount: (id: string) => void;
   isDeletingHomeownerAccount: boolean;
   handleSuccessDelete: Event<void>;
};
