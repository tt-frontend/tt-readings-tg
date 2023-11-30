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

  return (
    <Wrapper>
      <Input
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
            Расход: {(value || 0) - Number(prevReadingValue)} {unit}
          </ReadingsConsumption>
        )}
      </DeviceReadingsInfoWrapper>
    </Wrapper>
  );
};
