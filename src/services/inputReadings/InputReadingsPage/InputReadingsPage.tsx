import { ResourceIcon } from "@/components/ResourceIcon";
import {
  DevicesWrapper,
  NoDeviceButton,
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
import { FC, useMemo, useState } from "react";
import { EGroupType, InputReadingsPageProps } from "./InputReadingsPage.types";
import { Skeleton } from "antd";
import { Button } from "@/components/Button";
import { useInputReadingButton } from "./InputReadingsPage.hook";
import { useNavigate } from "react-router-dom";

export const InputReadingsPage: FC<InputReadingsPageProps> = ({
  individualDevicesList,
  isLoadingDevices,
  createReadingsPayload,
  setReadingPayloadField,
  handleSubmitReadings,
  isCreateReadingsLoading,
  validationResult,
  isExistDeltaReadings,
}) => {
  const navigate = useNavigate();

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

  useInputReadingButton(
    handleSubmitReadings,
    validationResult,
    isCreateReadingsLoading,
    isExistDeltaReadings
  );

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
                  setReadingPayloadField({ id: device.id, values })
                }
                validationResult={validationResult[device.id]}
                device={device}
                groupType={groupType}
              />
            ))}
          </DevicesWrapper>
        </ResourceSection>
      ))}
      <NoDeviceButton>
        <Button
          type="default"
          block
          onClick={() => navigate("/inputReadings/noDeviceHelp")}
        >
          Моего прибора здесь нет
        </Button>
      </NoDeviceButton>
    </div>
  );
};
