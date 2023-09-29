import { ResourceIcon } from "@/components/ResourceIcon";
import {
  ResourceSection,
  ResourceSectionTitle,
  Title,
} from "./InputReadingsPage.styled";
import { mockData } from "./inputReadingsPage.constants";
import { groupBy } from "lodash";
import { EResourceType } from "@/api/types";
import { ResourceNamesLookup } from "@/components/ResourceIcon/ResourceIcon.constants";

export const InputReadingsPage = () => {
  const devices = mockData.items;

  const groups = groupBy(devices, (device) => device.resource);

  return (
    <div>
      <Title>Введите показания</Title>
      {Object.entries(groups).map(([resource]) => (
        <ResourceSection>
          <ResourceSectionTitle>
            <ResourceIcon resource={resource as EResourceType} />
            <div>{ResourceNamesLookup[resource as EResourceType]}</div>
          </ResourceSectionTitle>
        </ResourceSection>
      ))}
    </div>
  );
};
