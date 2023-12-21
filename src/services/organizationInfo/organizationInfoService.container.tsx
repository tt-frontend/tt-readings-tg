import { useUnit } from "effector-react";
import { organizationInfoService } from "./organizationInfoService.models";
import { managementFirmDataQuery } from "./organizationInfoService.api";
import { ManagementInfoPage } from "./ManagementInfoPage";

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

      <ManagementInfoPage
        managementFirmInfo={managementFirmInfo}
        isLoading={isLoading}
      />
    </>
  );
};
