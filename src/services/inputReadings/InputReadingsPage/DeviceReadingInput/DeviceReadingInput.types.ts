import { IndividualDeviceForReadingResponse } from "@/api/types";
import { EGroupType } from "../InputReadingsPage.types";

export type DeviceReadingInputProps = {
  device: IndividualDeviceForReadingResponse;
  groupType: EGroupType;
};
