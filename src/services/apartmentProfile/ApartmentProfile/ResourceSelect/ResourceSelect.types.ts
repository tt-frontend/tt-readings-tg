import { EResourceType } from "@/api/types";

export type Props = {
  selectedResource: EResourceType;
  onChange: (resource: EResourceType) => void;
  allowedResources: EResourceType[];
};
