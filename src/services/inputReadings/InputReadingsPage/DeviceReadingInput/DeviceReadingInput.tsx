import { FC, useEffect, useMemo, useRef } from "react";
import {
  DeviceCard,
  DeviceSerialNumber,
  ErrorMessage,
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
import { useUnit } from "effector-react";
import { individualDevicesQuery } from "@/services/apartmentProfile/apartmentProfileService.api";
import { DeviceDate } from "@/services/mainPage/MainPage/NotificationBadges/NotificationBadges";

dayjs.locale("ru");

export const DeviceReadingInput: FC<DeviceReadingInputProps> = ({
  device,
  groupType,
  createReadingPayload,
  setReadingPayloadField,
  validationResult,
  numberOfFirstInputInBlockOfList,
  serverValidation,
}) => {
  const ref = useRef<null | HTMLDivElement>(null);

  const individualDevices = useUnit(individualDevicesQuery.$data);

  const unit = ResourceSummaryUnits[device.resource];

  const inputNumberForOneZone = numberOfFirstInputInBlockOfList;
  const inputNumberForTwoZone = numberOfFirstInputInBlockOfList + 1;

  const lightDevice = useMemo(() => {
    if (!individualDevices) return null;

    const lightDevice = individualDevices?.find(
      (elem) => elem.id === device.id
    );

    return lightDevice || null;
  }, [device.id, individualDevices]);

  const isCheckingDateExpired = useMemo(() => {
    if (!lightDevice) return false;

    const nextMonthDate = dayjs().add(1, "month");

    const diffOfNextMonth = dayjs(lightDevice.futureCheckingDate).diff(
      nextMonthDate
    );

    return diffOfNextMonth < 0;
  }, [lightDevice]);

  const errorMessage = serverValidation?.response.data.error.Text;

  useEffect(() => {
    if (!ref.current || !errorMessage) return;

    ref.current.scrollIntoView({ behavior: "smooth", block: "center" });
  }, [errorMessage]);

  return (
    <DeviceCard
      isError={Boolean(errorMessage) || isCheckingDateExpired}
      ref={ref}
    >
      <Header>
        <DeviceSerialNumber>
          {groupType === EGroupType.ByMountPlace && (
            <ResourceWrapper>
              <ResourceIcon resource={device.resource} />
            </ResourceWrapper>
          )}
          {device.serialNumber}
          {isCheckingDateExpired && lightDevice && (
            <DeviceDate date={lightDevice?.futureCheckingDate} />
          )}
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
        inputNumber={inputNumberForOneZone}
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
          inputNumber={inputNumberForTwoZone}
        />
      )}
      {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
      {!errorMessage && isCheckingDateExpired && (
        <ErrorMessage>
          Истекает срок поверки прибора. Обратитесь в УК или отправьте заявку
          через приложение.
        </ErrorMessage>
      )}
    </DeviceCard>
  );
};
