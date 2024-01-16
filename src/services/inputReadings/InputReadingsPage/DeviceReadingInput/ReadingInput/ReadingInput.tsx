import { FC, useEffect, useState } from "react";
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
import { useSwitchInputOnEnter } from "@/utils/useSwitchInputOnEnter";

export const ReadingInput: FC<Props> = ({
  value,
  handleChange,
  placeholder,
  prevReadingDate,
  prevReadingValue,
  validationResult,
  unit,
  inputNumber,
}) => {
  const [innerValue, setInnerValue] = useState("");

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value;
    if (/^\d*[\\.,]?\d{0,3}$/.test(inputValue)) {
      setInnerValue(inputValue);
    }
  };

  useEffect(() => {
    handleChange(innerValue ? Number(innerValue) : null);
  }, [innerValue]);

  const next = useSwitchInputOnEnter("bot-readings", false);

  const consumption = (value || 0) - Number(prevReadingValue);

  const consumptionString = round(consumption, 3);

  return (
    <Wrapper>
      <Input
        type="text"
        error={validationResult?.type}
        value={innerValue}
        onChange={handleInputChange}
        placeholder={placeholder}
        onKeyDown={(key) => {
          if (key.code === "Enter") {
            next(inputNumber);
          }
        }}
        data-reading-input="bot-readings"
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
