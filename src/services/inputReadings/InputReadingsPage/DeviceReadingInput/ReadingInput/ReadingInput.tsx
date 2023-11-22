import { FC } from "react";
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
  handleCange,
  placeholder,
  prevReadingDate,
  prevReadingValue,
  validationResult,
  unit,
}) => {
  return (
    <Wrapper>
      <Input
        isError={Boolean(validationResult)}
        value={value === null ? "" : String(value)}
        onChange={(e) => {
          const value = Number(e.target.value);

          handleCange(
            Number.isNaN(value) || e.target.value === "" ? null : value
          );
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
