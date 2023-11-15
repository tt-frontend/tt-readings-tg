import { FC } from "react";
import { DeviceReadingInputProps } from "./DeviceReadingInput.types";
import {
  DeviceCard,
  DeviceSerialNumber,
  Header,
  LastReading,
  MountPlace,
  ReadingInput,
  ResourceWrapper,
} from "./DeviceReadingInput.styled";
import dayjs from "dayjs";
import "dayjs/locale/ru";
import { ResourceSummaryUnits } from "@/components/ResourceIcon/ResourceIcon.constants";
import { EGroupType } from "../InputReadingsPage.types";
import { ResourceIcon } from "@/components/ResourceIcon";

dayjs.locale("ru");

export const DeviceReadingInput: FC<DeviceReadingInputProps> = ({
  device,
  groupType,
}) => {
  const lastReading = device.readings?.[0];

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
      <ReadingInput placeholder="000000,00" />
      <LastReading>
        {dayjs(lastReading?.entryDate).format("MMMM YYYY")}:{" "}
        {lastReading?.value1} {ResourceSummaryUnits[device.resource]}
      </LastReading>
    </DeviceCard>
  );
};
