import { useUnit } from "effector-react";
import { organizationInfoService } from "./organizationInfoService.models";
import { managementFirmDataQuery } from "./organizationInfoService.api";
import { getAddressString } from "@/utils/getAddressString";
import { Skeleton } from "antd";

const {
  gates: { ManagementFirmGate },
} = organizationInfoService;

export const OrganizationInfoContainer = () => {
  const { managementFirmInfo, isLoading } = useUnit({
    managementFirmInfo: managementFirmDataQuery.$data,
    isLoading: managementFirmDataQuery.$pending,
  });

  return (
    <>
      <ManagementFirmGate />
      {isLoading && <Skeleton active />}
      {!isLoading && managementFirmInfo && (
        <>{getAddressString(managementFirmInfo.address)}</>
      )}
    </>
  );
};
