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
import { EIndividualDeviceRateType } from "@/api/types";

dayjs.locale("ru");

export const DeviceReadingInput: FC<DeviceReadingInputProps> = ({
  device,
  groupType,
  createReadingPayload,
  setReadingPayloadField,
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
        value={createReadingPayload?.value1 || ""}
        onChange={(e) =>
          setReadingPayloadField({
            value1: e.target.value ? Number(e.target.value) : null,
          })
        }
        placeholder={
          device.currentReading?.value1
            ? String(device.currentReading?.value1)
            : "000000,00"
        }
      />
      {device.rateType === EIndividualDeviceRateType.TwoZone && (
        <ReadingInput
          value={createReadingPayload?.value2 || ""}
          onChange={(e) =>
            setReadingPayloadField({
              value2: e.target.value ? Number(e.target.value) : null,
            })
          }
          placeholder={
            typeof createReadingPayload?.value2 === "number"
              ? createReadingPayload?.value2
                ? String(createReadingPayload?.value2)
                : "000000,00"
              : device.currentReading?.value2
              ? String(device.currentReading?.value2)
              : "000000,00"
          }
        />
      )}
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
