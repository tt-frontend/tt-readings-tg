import { ReadingValidation } from "@/services/inputReadings/inputReadingsService.types";

export type Props = {
  value?: number | null;
  handleCange: (value: number | null) => void;
  placeholder: string;
  prevReadingValue?: number | null;
  prevReadingDate?: string;
  unit: string;
  validationResult: ReadingValidation | null;
};
