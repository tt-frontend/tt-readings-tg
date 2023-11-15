import { IndividualDeviceListItemResponse } from "@/api/types";

export type InputReadingsPageProps = {
  individualDevicesList: IndividualDeviceListItemResponse[] | null;
  isLoadingDevices: boolean;
};

export enum EGroupType {
  ByResource = "byResource",
  ByMountPlace = "byMountPlace",
}
