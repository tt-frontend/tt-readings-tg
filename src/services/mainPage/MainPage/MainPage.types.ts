import { Event } from "effector";
import {
  HomeownerAccountListResponse,
  HomeownerAccountResponse,
  IndividualDeviceListItemResponse,
  NotificationsResponse,
} from "@/api/types";

export type MainPageProps = {
  homeownerAccounts: HomeownerAccountListResponse[] | null;
  selectedPersonalNumber: string | null;
  setSelectedPersonalNumber: (id: string) => void;
  currentHomeownerAccount: HomeownerAccountResponse | null;
  isLoadingHomeownerAccount: boolean;
  handleDeleteHomeownerAccount: (id: string) => void;
  isDeletingHomeownerAccount: boolean;
  handleSuccessDelete: Event<void>;
  handleRedirectToInitialRoute: Event<void>;
  individualDevices: IndividualDeviceListItemResponse[] | null;
  notifications: NotificationsResponse | null;
};
