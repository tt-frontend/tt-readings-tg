import { ResourceIcon } from "@/components/ResourceIcon";
import {
  Block,
  DevicesWrapper,
  ErrorMessage,
  ErrorMessageWrapper,
  ErrorTitle,
  LoaderInput,
  NoDeviceButton,
  ResourceSection,
  SectionTitle,
  SegmentedSC,
  SegmentedWrapper,
  Title,
} from "./InputReadingsPage.styled";
import { flatten, groupBy } from "lodash";
import { EResourceType } from "@/api/types";
import { ResourceNamesLookup } from "@/components/ResourceIcon/ResourceIcon.constants";
import { DeviceReadingInput } from "./DeviceReadingInput";
import { FC, useMemo, useState } from "react";
import { EGroupType, InputReadingsPageProps } from "./InputReadingsPage.types";
import { Skeleton } from "antd";
import { Button } from "@/components/Button";
import { useInputReadingButton } from "./InputReadingsPage.hook";
import { useNavigate } from "react-router-dom";
import { getNumberOfFirstInputInBlockOfList } from "./InputReadingsPage.utils";
import { NoDeviceIcon } from "@/components/icons/NoDevice";
import { ChevronWrapper } from "../SuccessfulReadingsPage/SuccessfulReadingsPage.styled";

export const InputReadingsPage: FC<InputReadingsPageProps> = ({
  individualDevicesList,
  isLoadingDevices,
  createReadingsPayload,
  setReadingPayloadField,
  handleSubmitReadings,
  isCreateReadingsLoading,
  validationResult,
  isExistDeltaReadings,
  saveReadingError,
  isIndividualDevicesError,
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

  const devicesFlatList = useMemo(
    () => flatten(Object.values(groups)),
    [groups]
  );

  useInputReadingButton(
    handleSubmitReadings,
    validationResult,
    isCreateReadingsLoading,
    isExistDeltaReadings
  );

  const ReadingLoader = () => {
    return (
      <>
        <SectionTitle>
          <Skeleton.Avatar active size="small" />
          <Skeleton.Input active />
        </SectionTitle>

        <Block>
          <LoaderInput active />
        </Block>
      </>
    );
  };

  if (isIndividualDevicesError) {
    return (
      <ErrorMessageWrapper>
        <ChevronWrapper>
          <NoDeviceIcon />
        </ChevronWrapper>
        <ErrorTitle>Неприемные дни</ErrorTitle>
        <ErrorMessage>
          В период с 26 по 7 число показания не принимаются. Пожалуйста,
          вернитесь 8 числа
        </ErrorMessage>
      </ErrorMessageWrapper>
    );
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
      {isLoadingDevices && <ReadingLoader />}
      {!isLoadingDevices &&
        Object.entries(groups).map(([dataKey, devices]) => (
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
              {devices.map((device) => {
                const currentIndex = devicesFlatList.findIndex(
                  (deviceInList) => deviceInList.id === device.id
                );

                const devicesArrSplitted = devicesFlatList.slice(
                  0,
                  currentIndex
                );

                const numberOfFirstInputInBlockOfList =
                  getNumberOfFirstInputInBlockOfList(devicesArrSplitted);

                return (
                  <DeviceReadingInput
                    createReadingPayload={
                      createReadingsPayload[device.id] || null
                    }
                    setReadingPayloadField={(values) =>
                      setReadingPayloadField({
                        id: device.id,
                        values,
                      })
                    }
                    validationResult={validationResult[device.id]}
                    serverValidation={
                      saveReadingError?.deviceId === device.id
                        ? saveReadingError.error
                        : null
                    }
                    device={device}
                    groupType={groupType}
                    numberOfFirstInputInBlockOfList={
                      numberOfFirstInputInBlockOfList
                    }
                  />
                );
              })}
            </DevicesWrapper>
          </ResourceSection>
        ))}
      {!isLoadingDevices && (
        <NoDeviceButton>
          <Button
            type="default"
            block
            onClick={() => navigate("/inputReadings/noDeviceHelp")}
          >
            Моего прибора здесь нет
          </Button>
        </NoDeviceButton>
      )}
    </div>
  );
};
