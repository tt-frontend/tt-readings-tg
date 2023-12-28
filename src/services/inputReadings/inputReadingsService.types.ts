import { EIndividualDeviceRateType } from "@/api/types";
import { EffectFailDataAxiosError } from "@/types";

export type ReadingValues = { value1?: number | null; value2?: number | null };

export type CreateReadingsRequestPayload = {
  [deviceId: number]: ReadingValues;
};

export type SetReadingPayload = {
  id: number;
  values: ReadingValues;
};

export type ReadingValidation = {
  message: string;
  type: "critical" | "warning";
};

export type ReadingsValidationResult = {
  [key in keyof typeof EIndividualDeviceRateType]: ReadingValidation | null;
};

export type ReadingsValidationData = {
  [deviceId: number]: ReadingsValidationResult;
};

export type SaveReadingError = {
  deviceId: number;
  error: EffectFailDataAxiosError;
};
