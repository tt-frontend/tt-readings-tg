import { FC } from "react";
import {
  DeviceReadingsInfoWrapper,
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
  unit,
}) => {
  console.log(value);
  return (
    <Wrapper>
      <Input
        value={value === null ? "" : String(value)}
        onChange={(e) => {
          const value = Number(e.target.value);

          handleCange(
            Number.isNaN(value) || e.target.value === "" ? null : value
          );
        }}
        placeholder={placeholder}
      />
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
