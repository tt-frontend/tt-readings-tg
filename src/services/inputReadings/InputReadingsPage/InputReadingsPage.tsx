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
import { EResourceType } from "@/api/types";
import { ResourceNamesLookup } from "@/components/ResourceIcon/ResourceIcon.constants";
import { DeviceReadingInput } from "./DeviceReadingInput";
import { FC, useEffect, useMemo, useState } from "react";
import { EGroupType, InputReadingsPageProps } from "./InputReadingsPage.types";
import { Skeleton } from "antd";

export const InputReadingsPage: FC<InputReadingsPageProps> = ({
  individualDevicesList,
  isLoadingDevices,
  createReadingsPayload,
  setReadingPayloadField,
  handleSubmitReadings,
  isCreateReadingsLoading,
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
    btn.onClick(handleSubmitReadings);

    return () => {
      btn.hide();
      btn.offClick(handleSubmitReadings);
    };
  }, [handleSubmitReadings]);

  useEffect(() => {
    const btn = Telegram.WebApp.MainButton;

    if (isCreateReadingsLoading) {
      btn.showProgress(false);
    } else {
      btn.hideProgress();
    }

    return () => btn.hideProgress();
  }, [isCreateReadingsLoading]);

  if (isLoadingDevices) {
    return <Skeleton active />;
  }

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
                createReadingPayload={createReadingsPayload[device.id] || null}
                setReadingPayloadField={(values) =>
                  setReadingPayloadField({ id: device.id, ...values })
                }
                device={device}
                groupType={groupType}
              />
            ))}
          </DevicesWrapper>
        </ResourceSection>
      ))}
    </div>
  );
};
