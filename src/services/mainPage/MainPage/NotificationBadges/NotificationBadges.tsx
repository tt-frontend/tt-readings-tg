import { FC, useMemo } from "react";
import {
  AlertInfo,
  AlertText,
  AlertWrapper,
  DeviceInfo,
} from "./NotificationBadges.styled";
import { Props } from "./NotificationBadges.types";
import dayjs from "dayjs";
import { IndividualDeviceListItemResponse } from "@/api/types";
import { ResourceIcon } from "@/components/ResourceIcon";
import { ResourceNamesLookup } from "@/components/ResourceIcon/ResourceIcon.constants";
import { DateIcon } from "@/components/icons/Date";

export const NotificationBadges: FC<Props> = ({ individualDevices }) => {
  const expiringCheckingDateDevices = useMemo(() => {
    const nextMonthDate = dayjs().add(1, "month");

    return (
      individualDevices?.filter((device) => {
        const diffOfNextMonth = dayjs(device.futureCheckingDate).diff(
          nextMonthDate
        );

        return diffOfNextMonth < 0;
      }) || []
    );
  }, [individualDevices]);

  return (
    <>
      {expiringCheckingDateDevices.map((device) => (
        <CheckingDateAlert device={device} key={device.id} />
      ))}
    </>
  );
};

export const CheckingDateAlert: FC<{
  device: IndividualDeviceListItemResponse;
}> = ({ device }) => {
  const isExpired = dayjs(device.futureCheckingDate).diff(dayjs()) < 0;

  return (
    <AlertWrapper to={`/device/${device.id}`}>
      <AlertText>
        {isExpired ? "Истек" : "Истекает"} срок поверки прибора. Обратитесь в УК
        или отправьте заявку через приложение.
      </AlertText>

      <AlertInfo>
        <DeviceInfo>
          <ResourceIcon resource={device.resource} />
          {ResourceNamesLookup[device.resource]}
        </DeviceInfo>
        <DeviceInfo>
          <DateIcon />
          {dayjs(device.futureCheckingDate).format("DD.MM.YYYY")}
        </DeviceInfo>
      </AlertInfo>
    </AlertWrapper>
  );
};

export const DeviceDate: FC<{ date: string }> = ({ date }) => {
  return (
    <DeviceInfo>
      <DateIcon />
      {dayjs(date).format("DD.MM.YYYY")}
    </DeviceInfo>
  );
};
