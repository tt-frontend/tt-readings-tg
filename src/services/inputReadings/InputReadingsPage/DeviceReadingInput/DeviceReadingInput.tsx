import { FC } from "react";
import {
  DeviceCard,
  DeviceSerialNumber,
  Header,
  MountPlace,
  ResourceWrapper,
} from "./DeviceReadingInput.styled";
import dayjs from "dayjs";
import "dayjs/locale/ru";
import { EGroupType } from "../InputReadingsPage.types";
import { ResourceIcon } from "@/components/ResourceIcon";
import { ResourceSummaryUnits } from "@/components/ResourceIcon/ResourceIcon.constants";
import { EIndividualDeviceRateType } from "@/api/types";
import { DeviceReadingInputProps } from "./DeviceReadingInput.types";
import { ReadingInput } from "./ReadingInput";

dayjs.locale("ru");

export const DeviceReadingInput: FC<DeviceReadingInputProps> = ({
  device,
  groupType,
  createReadingPayload,
  setReadingPayloadField,
  validationResult,
}) => {
  const unit = ResourceSummaryUnits[device.resource];

  return (
    <DeviceCard>
      <Header>
        <DeviceSerialNumber>
          {groupType === EGroupType.ByMountPlace && (
            <ResourceWrapper>
              <ResourceIcon resource={device.resource} />
            </ResourceWrapper>
          )}
          {device.serialNumber}
        </DeviceSerialNumber>
        {groupType === EGroupType.ByResource && (
          <MountPlace>{device.mountPlace}</MountPlace>
        )}
      </Header>

      <ReadingInput
        value={createReadingPayload?.value1}
        handleChange={(value) =>
          setReadingPayloadField({
            value1: value,
          })
        }
        placeholder="T1"
        validationResult={validationResult?.[EIndividualDeviceRateType.OneZone]}
        unit={unit}
        prevReadingDate={device.previousReading?.readingDate}
        prevReadingValue={device.previousReading?.value1}
      />

      {device.rateType === EIndividualDeviceRateType.TwoZone && (
        <ReadingInput
          value={createReadingPayload?.value2}
          validationResult={
            validationResult?.[EIndividualDeviceRateType.TwoZone]
          }
          handleChange={(value) =>
            setReadingPayloadField({
              value2: value,
            })
          }
          placeholder="T2"
          unit={unit}
          prevReadingDate={device.previousReading?.readingDate}
          prevReadingValue={device.previousReading?.value2}
        />
      )}
    </DeviceCard>
  );
};
