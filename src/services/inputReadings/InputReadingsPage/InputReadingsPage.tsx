import { ResourceIcon } from "@/components/ResourceIcon";
import {
  DevicesWrapper,
  ResourceSection,
  ResourceSectionTitle,
  Title,
} from "./InputReadingsPage.styled";
import { mockData } from "./inputReadingsPage.constants";
import { groupBy } from "lodash";
import { EResourceType, IndividualDeviceListItemResponse } from "@/api/types";
import { ResourceNamesLookup } from "@/components/ResourceIcon/ResourceIcon.constants";
import { DeviceReadingInput } from "./DeviceReadingInput";
import { useEffect } from "react";

export const InputReadingsPage = () => {
  const devices = mockData.items.filter((elem) => elem.closingDate === null);

  const groups = groupBy(devices, (device) => device.resource);

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
      {Object.entries(groups).map(([resource, devices]) => (
        <ResourceSection>
          <ResourceSectionTitle>
            <ResourceIcon resource={resource as EResourceType} />
            <div>{ResourceNamesLookup[resource as EResourceType]}</div>
          </ResourceSectionTitle>
          <DevicesWrapper>
            {devices.map((device) => (
              <DeviceReadingInput
                device={device as IndividualDeviceListItemResponse}
              />
            ))}
          </DevicesWrapper>
        </ResourceSection>
      ))}
    </div>
  );
};
