import { ResourceIcon } from "@/components/ResourceIcon";
import {
  DevicesWrapper,
  ResourceSection,
  SectionTitle,
  SegmentedSC,
  SegmentedWrapper,
  Title,
} from "./InputReadingsPage.styled";
import { groupBy } from "lodash";
import { EResourceType, IndividualDeviceListItemResponse } from "@/api/types";
import { ResourceNamesLookup } from "@/components/ResourceIcon/ResourceIcon.constants";
import { DeviceReadingInput } from "./DeviceReadingInput";
import { FC, useEffect, useMemo, useState } from "react";
import { EGroupType, InputReadingsPageProps } from "./InputReadingsPage.types";

export const InputReadingsPage: FC<InputReadingsPageProps> = ({
  individualDevicesList,
}) => {
  const [groupType, setGroupType] = useState(EGroupType.ByResource);

  const groups = useMemo(
    () =>
      groupBy(individualDevicesList, (device) =>
        groupType === EGroupType.ByResource
          ? device.resource
          : device.mountPlace
      ),
    [groupType, individualDevicesList]
  );

  useEffect(() => {
    const btn = Telegram.WebApp.MainButton;
    btn.text = "Отправить";
    btn.color = "#007AFF";
    btn.show();

    return () => btn.hide();
  }, []);

  return (
    <div>
      <Title>Введите показания</Title>
      <SegmentedWrapper>
        <SegmentedSC
          block
          value={groupType}
          onChange={(value) => setGroupType(value as EGroupType)}
          options={[
            { label: "По ресурсу", value: EGroupType.ByResource },
            { label: "По расположению", value: EGroupType.ByMountPlace },
          ]}
        />
      </SegmentedWrapper>
      {Object.entries(groups).map(([dataKey, devices]) => (
        <ResourceSection>
          {groupType === EGroupType.ByResource && (
            <SectionTitle>
              <ResourceIcon resource={dataKey as EResourceType} />
              <div>{ResourceNamesLookup[dataKey as EResourceType]}</div>
            </SectionTitle>
          )}
          {groupType === EGroupType.ByMountPlace && (
            <SectionTitle>
              {dataKey !== "null" ? dataKey : "Не указано"}
            </SectionTitle>
          )}
          <DevicesWrapper>
            {devices.map((device) => (
              <DeviceReadingInput
                device={device as IndividualDeviceListItemResponse}
                groupType={groupType}
              />
            ))}
          </DevicesWrapper>
        </ResourceSection>
      ))}
    </div>
  );
};
