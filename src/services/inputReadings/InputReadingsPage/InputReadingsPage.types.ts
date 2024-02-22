import { IndividualDeviceForReadingResponse } from "@/api/types";
import {
  CreateReadingsRequestPayload,
  ReadingsValidationData,
  SaveReadingError,
  SetReadingPayload,
} from "../inputReadingsService.types";

export type InputReadingsPageProps = {
  individualDevicesList: IndividualDeviceForReadingResponse[] | null;
  isLoadingDevices: boolean;
  createReadingsPayload: CreateReadingsRequestPayload;
  setReadingPayloadField: (payload: SetReadingPayload) => void;
  isCreateReadingsLoading: boolean;
  handleSubmitReadings: () => void;
  validationResult: ReadingsValidationData;
  isExistDeltaReadings: boolean;
  saveReadingError: SaveReadingError | null;
  isIndividualDevicesError: boolean;
};

export enum EGroupType {
  ByResource = "byResource",
  ByMountPlace = "byMountPlace",
}
