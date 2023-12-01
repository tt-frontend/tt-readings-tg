import { FC } from "react";
import {
  DeviceReadingsInfoWrapper,
  ErrorMessage,
  Input,
  LastReading,
  ReadingMonth,
  ReadingsConsumption,
  Wrapper,
} from "./ReadingInput.styled";
import { Props } from "./ReadingInput.types";
import dayjs from "dayjs";
import { round } from "lodash";

export const ReadingInput: FC<Props> = ({
  value,
  handleChange,
  placeholder,
  prevReadingDate,
  prevReadingValue,
  validationResult,
  unit,
}) => {
  const consumption = (value || 0) - Number(prevReadingValue);

  const consumptionString = round(consumption, 3);

  return (
    <Wrapper>
      <Input
        type="number"
        error={validationResult?.type}
        value={value === null ? "" : String(value)}
        onChange={(e) => {
          const value = Number(e.target.value);

          if (Number.isNaN(value)) return;

          handleChange(e.target.value === "" ? null : value);
        }}
        placeholder={placeholder}
      />
      {validationResult && (
        <ErrorMessage errorType={validationResult.type}>
          {validationResult.message}
        </ErrorMessage>
      )}
      <DeviceReadingsInfoWrapper>
        <LastReading>
          <ReadingMonth>
            {dayjs(prevReadingDate).format("MMMM YYYY")}:
          </ReadingMonth>
          {prevReadingValue} {unit}
        </LastReading>
        {Boolean(value) && prevReadingValue && (
          <ReadingsConsumption>
            Расход: {consumptionString} {unit}
          </ReadingsConsumption>
        )}
      </DeviceReadingsInfoWrapper>
    </Wrapper>
  );
};
