import { FC, useEffect, useMemo, useState } from "react";
import {
  ResourceWrapper,
  Title,
  SubWrapper,
  Wrapper,
  SubTitle,
  YearsWrapper,
  YearItem,
} from "./DeviceProfilePage.styled";
import { Props } from "./DeviceProfilePage.types";
import { ResourceIcon } from "@/components/ResourceIcon";
import {
  ResourceNamesLookup,
  ResourceSummaryUnits,
} from "@/components/ResourceIcon/ResourceIcon.constants";
import { ListPanel } from "@/components/ListPanel";
import dayjs from "dayjs";
import _ from "lodash";

export const DeviceProfilePage: FC<Props> = ({ device }) => {
  const unit = ResourceSummaryUnits[device.resource];

  const [selectedYear, setSelectedYear] = useState<string | null>(null);

  const readingsGroups = useMemo(() => {
    if (!device.readings) return null;

    return _.groupBy(
      [...device.readings.reverse()].sort(
        (a, b) => dayjs(a.readingDate).year() - dayjs(b.readingDate).year()
      ),
      (elem) => dayjs(elem.readingDate).year()
    );
  }, [device.readings]);

  useEffect(() => {
    if (!readingsGroups) return;

    const year = Object.keys(readingsGroups).sort((a, b) => +b - +a)[0];

    setSelectedYear(readingsGroups ? year : null);
  }, [readingsGroups]);

  const yearsList = useMemo(
    () => [...Object.keys(readingsGroups || {}).reverse()],
    [readingsGroups]
  );

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
        <YearsWrapper>
          {yearsList.map((elem) => (
            <YearItem
              key={elem}
              isActive={elem === selectedYear}
              onClick={() => setSelectedYear(elem)}
            >
              {elem}
            </YearItem>
          ))}
        </YearsWrapper>
        <ListPanel
          items={
            (selectedYear &&
              readingsGroups?.[selectedYear]?.map((elem) => ({
                key: dayjs(elem.readingDate).format("MMMM"),
                value: `${elem.consumtion1 || "—"} ${
                  elem.consumtion1 ? unit : ""
                }`,
              }))) ||
            []
          }
        />
      </SubWrapper>
    </Wrapper>
  );
};
