import { FC } from "react";
import { ResourceIconProps } from "./ResourceIcon.types";
import { IconWrapper } from "./ResourceIcon.styled";
import {
  ResourceColorLookup,
  ResourceIconsLookup,
} from "./ResourceIcon.constants";

export const ResourceIcon: FC<ResourceIconProps> = ({ resource }) => {
  return (
    <IconWrapper color={ResourceColorLookup[resource]}>
      {ResourceIconsLookup[resource]}
    </IconWrapper>
  );
};
