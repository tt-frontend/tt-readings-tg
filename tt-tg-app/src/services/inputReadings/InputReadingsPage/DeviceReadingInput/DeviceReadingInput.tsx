import { FC } from "react";
import { DeviceReadingInputProps } from "./DeviceReadingInput.types";
import {
  DeviceCard,
  Header,
  LastReading,
  MountPlace,
  ReadingInput,
} from "./DeviceReadingInput.styled";
import dayjs from "dayjs";
import "dayjs/locale/ru";
import { ResourceSummaryUnits } from "@/components/ResourceIcon/ResourceIcon.constants";

dayjs.locale("ru");

export const DeviceReadingInput: FC<DeviceReadingInputProps> = ({ device }) => {
  const lastReading = device.readings?.[0];

  return (
    <DeviceCard>
      <Header>
        <div>{device.serialNumber}</div>
        <MountPlace>{device.deviceMountPlace?.description}</MountPlace>
      </Header>
      <ReadingInput placeholder="000000,00" />
      <LastReading>
        {dayjs(lastReading?.entryDate).format("MMMM YYYY")}:{" "}
        {lastReading?.value1} {ResourceSummaryUnits[device.resource]}
      </LastReading>
    </DeviceCard>
  );
};
