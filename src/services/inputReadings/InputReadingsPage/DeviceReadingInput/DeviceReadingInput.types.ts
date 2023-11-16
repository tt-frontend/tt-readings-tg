import { IndividualDeviceForReadingResponse } from "@/api/types";
import { EGroupType } from "../InputReadingsPage.types";
import { ReadingValues } from "../../inputReadingsService.types";

export type DeviceReadingInputProps = {
  device: IndividualDeviceForReadingResponse;
  groupType: EGroupType;
  createReadingPayload: ReadingValues | null;
  setReadingPayloadField: (values: ReadingValues) => void;
};
