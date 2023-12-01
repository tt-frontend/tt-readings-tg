import { FC, useState } from "react";
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
  const [innerValue, setInnerValue] = useState(value);

  const consumption = (value || 0) - Number(prevReadingValue);

  const consumptionString = round(consumption, 3);

  return (
    <Wrapper>
      <Input
        type="number"
        pattern="[0-9]"
        error={validationResult?.type}
        value={innerValue === null ? "" : String(innerValue)}
        onChange={(e) => {
          const value = Number(e.target.value);

          if (Number.isNaN(value)) return;

          setInnerValue(e.target.value === "" ? null : value);
        }}
        onBlur={() => {
          if (typeof innerValue === "number" || innerValue === null) {
            handleChange(innerValue);
          }
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
