import { FC, useMemo, useState } from "react";
import { Title, Wrapper } from "./ApartmentProfile.styled";
import { Props } from "./ApartmentProfile.types";
import { getFullAddressString } from "@/utils/getAddressString";
import { EResourceType } from "@/api/types";
import { ResourceSelect } from "./ResourceSelect";
import { Skeleton } from "antd";
import _ from "lodash";
import { DevicesList } from "./DevicesList";

export const ApartmentProfile: FC<Props> = ({
  currentPersonalAccount,
  isLoading,
  individualDevices,
}) => {
  const address = currentPersonalAccount?.address || null;
  const addressString = getFullAddressString(address);

  const [selectedResource, setSelectedResource] = useState(
    EResourceType.ColdWaterSupply
  );

  const individualDevicesByResource = useMemo(() => {
    return _.groupBy(individualDevices, "resource");
  }, [individualDevices]);

  const allowedResources = useMemo(
    () => Object.keys(individualDevicesByResource) as EResourceType[],
    [individualDevicesByResource]
  );

  if (isLoading) return <Skeleton active />;

  return (
    <Wrapper>
      <Title>{addressString}</Title>
      <ResourceSelect
        allowedResources={allowedResources}
        selectedResource={selectedResource}
        onChange={setSelectedResource}
      />
      <Title style={{ fontSize: "16px" }}>Счетчики</Title>
      <DevicesList devices={individualDevicesByResource[selectedResource] || []} />
    </Wrapper>
  );
};
