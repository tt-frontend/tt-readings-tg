import { FC } from "react";
import { DeviceReadingInputProps } from "./DeviceReadingInput.types";
import {
  DeviceCard,
  DeviceReadingsInfoWrapper,
  DeviceSerialNumber,
  Header,
  LastReading,
  MountPlace,
  ReadingInput,
  ReadingsConsumption,
  ResourceWrapper,
} from "./DeviceReadingInput.styled";
import dayjs from "dayjs";
import "dayjs/locale/ru";
import { EGroupType } from "../InputReadingsPage.types";
import { ResourceIcon } from "@/components/ResourceIcon";
import { ResourceSummaryUnits } from "@/components/ResourceIcon/ResourceIcon.constants";

dayjs.locale("ru");

export const DeviceReadingInput: FC<DeviceReadingInputProps> = ({
  device,
  groupType,
}) => {
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
        placeholder={
          device.currentReading?.value1
            ? String(device.currentReading?.value1)
            : "000000,00"
        }
      />
      {device.previousReading && (
        <DeviceReadingsInfoWrapper>
          <LastReading>
            {dayjs(device.previousReading.readingDate).format("MMMM YYYY")}:{" "}
            {device.previousReading.value1}{" "}
            {ResourceSummaryUnits[device.resource]}
          </LastReading>
          {device.currentReading?.value1 && device.previousReading.value1 && (
            <ReadingsConsumption>
              Расход:{" "}
              {device.currentReading?.value1 - device.previousReading.value1}{" "}
              {ResourceSummaryUnits[device.resource]}
            </ReadingsConsumption>
          )}
        </DeviceReadingsInfoWrapper>
      )}
    </DeviceCard>
  );
};
