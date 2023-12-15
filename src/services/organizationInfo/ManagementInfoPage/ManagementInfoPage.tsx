import { FC } from "react";
import { Title, Wrapper } from "./ManagementInfoPage.styled";
import { Props } from "./ManagementInfoPage.types";
import { Empty, Skeleton } from "antd";
import { SegmentedSC } from "@/services/inputReadings/InputReadingsPage/InputReadingsPage.styled";
import { ListPanel } from "@/components/ListPanel";

export const ManagementInfoPage: FC<Props> = ({
  isLoading,
  managementFirmInfo,
}) => {
  if (isLoading) return <Skeleton active />;

  if (!managementFirmInfo)
    return (
      <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description="Нет данных" />
    );

  return (
    <Wrapper>
      <Title>{managementFirmInfo.managementFirmTitle}</Title>
      <SegmentedSC
        block
        options={[
          { label: "О компании", value: "about" },
          { label: "Уведомления", value: "notifications" },
        ]}
      />
      <ListPanel
        items={[
          {
            key: "Адрес",
            value: `ул. ${managementFirmInfo.address?.street}, офис ${managementFirmInfo.address?.houseNumber}`,
          },
          {
            key: "Телефон",
            value: managementFirmInfo.phoneNumber,
          },
          {
            key: "Email",
            value: managementFirmInfo.email,
          },
          {
            key: "Время работы",
            value: managementFirmInfo.workingTime,
          },
        ]}
      />
    </Wrapper>
  );
};
