import { IndividualDeviceForReadingResponse } from "@/api/types";

export type InputReadingsPageProps = {
  individualDevicesList: IndividualDeviceForReadingResponse[] | null;
  isLoadingDevices: boolean;
};

export enum EGroupType {
  ByResource = "byResource",
  ByMountPlace = "byMountPlace",
}
