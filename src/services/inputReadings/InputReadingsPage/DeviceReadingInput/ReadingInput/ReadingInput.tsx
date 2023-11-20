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
  return (
    <Wrapper>
      <Input
        value={value === null ? "" : value}
        onChange={(e) => {
          const value = Number(e.target.value);
          handleCange(Number.isNaN(value) ? null : value);
        }}
        placeholder={placeholder}
      />
      <DeviceReadingsInfoWrapper>
        <LastReading>
          {dayjs(prevReadingDate).format("MMMM YYYY")}: {prevReadingValue}{" "}
          {unit}
        </LastReading>
        {value && prevReadingValue && (
          <ReadingsConsumption>
            Расход: {value - Number(prevReadingValue)} {unit}
          </ReadingsConsumption>
        )}
      </DeviceReadingsInfoWrapper>
    </Wrapper>
  );
};
