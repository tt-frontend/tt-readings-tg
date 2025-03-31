import { FC } from "react";
import { ResourceItem, Wrapper } from "./ResourceSelect.styled";
import { Props } from "./ResourceSelect.types";
import { ResourceIcon } from "@/components/ResourceIcon";
import { ResourceNamesLookup } from "@/components/ResourceIcon/ResourceIcon.constants";

export const ResourceSelect: FC<Props> = ({
  selectedResource,
  onChange,
  allowedResources,
}) => {
  return (
    <Wrapper>
      {allowedResources.map((resource) => (
        <ResourceItem
          active={selectedResource === resource}
          key={resource}
          onClick={() => onChange(resource)}
        >
          <ResourceIcon resource={resource} />
          <div>{ResourceNamesLookup[resource]}</div>
        </ResourceItem>
      ))}
    </Wrapper>
  );
};
