import { FC } from "react";
import {
  ResourceWrapper,
  Title,
  SubWrapper,
  Wrapper,
  SubTitle,
} from "./DeviceProfilePage.styled";
import { Props } from "./DeviceProfilePage.types";
import { ResourceIcon } from "@/components/ResourceIcon";
import {
  ResourceNamesLookup,
  ResourceSummaryUnits,
} from "@/components/ResourceIcon/ResourceIcon.constants";
import { ListPanel } from "@/components/ListPanel";
import dayjs from "dayjs";

export const DeviceProfilePage: FC<Props> = ({ device }) => {
  const unit = ResourceSummaryUnits[device.resource];

  return (
    <Wrapper>
      <SubWrapper>
        <Title>{device.serialNumber}</Title>
        <ResourceWrapper>
          <ResourceIcon resource={device.resource} />
          <div>{ResourceNamesLookup[device.resource]}</div>
        </ResourceWrapper>
      </SubWrapper>
      <SubWrapper>
        <SubTitle>Основная информация</SubTitle>
        <ListPanel
          items={[
            { key: "Модель прибора", value: device.model },
            { key: "Место установки", value: device.mountPlace },
            {
              key: "Поверка истекает",
              value: dayjs(device.futureCheckingDate).format("DD.MM.YYYY"),
            },
          ]}
        />
      </SubWrapper>
      <SubWrapper>
        <SubTitle>История потребления</SubTitle>
        <ListPanel
          items={
            device.readings?.map((elem) => ({
              key: dayjs(elem.readingDate).format("MMMM"),
              value: `${elem.consumtion1 || "—"} ${
                elem.consumtion1 ? unit : ""
              }`,
            })) || []
          }
        />
      </SubWrapper>
    </Wrapper>
  );
};
