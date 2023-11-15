import { IndividualDeviceListItemResponse } from "@/api/types";
import { EGroupType } from "../InputReadingsPage.types";

export type DeviceReadingInputProps = {
  device: IndividualDeviceListItemResponse;
  groupType: EGroupType;
};
