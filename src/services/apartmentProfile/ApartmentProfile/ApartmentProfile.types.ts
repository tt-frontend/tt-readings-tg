import {
  HomeownerAccountResponse,
  IndividualDeviceListItemResponse,
} from "@/api/types";

export type Props = {
  currentPersonalAccount: HomeownerAccountResponse | null;
  individualDevices: IndividualDeviceListItemResponse[] | null;
  isLoading: boolean;
};
