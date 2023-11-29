import { FC, useState } from "react";
import {
  DeviceReadingsInfoWrapper,
  ErrorMessage,
  Input,
  LastReading,
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
        isError={Boolean(validationResult)}
        value={innerValue === null ? "" : String(innerValue)}
        onChange={(e) => {
          const value = Number(e.target.value);

          setInnerValue(
            Number.isNaN(value) || e.target.value === "" ? null : value
          );
        }}
        onBlur={() => {
          if (typeof innerValue === "number" || innerValue === null) {
            handleChange(innerValue);
          }
        }}
        placeholder={placeholder}
      />
      {validationResult && (
        <ErrorMessage>{validationResult.message}</ErrorMessage>
      )}
      <DeviceReadingsInfoWrapper>
        <LastReading>
          {dayjs(prevReadingDate).format("MMMM YYYY")}: {prevReadingValue}{" "}
          {unit}
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
