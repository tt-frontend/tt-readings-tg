import { useUnit } from "effector-react";
import { apartmentProfileService } from "./apartmentProfileService.models";
import { personalNumbersAcccountsService } from "../personalNumberAccounts/personalNumberAccounts.model";
import { ApartmentProfile } from "./ApartmentProfile";
import { individualDevicesQuery } from "./apartmentProfileService.api";

const {
  gates: { ApartmentProfileGate },
} = apartmentProfileService;

export const ApartmentProfileContainer = () => {
  const { currentPersonalAccount, individualDevices, isLoading } = useUnit({
    currentPersonalAccount:
      personalNumbersAcccountsService.outputs.$currentHomeownerAccount,
    individualDevices: individualDevicesQuery.$data,
    isLoading: individualDevicesQuery.$pending,
  });

  return (
    <>
      <ApartmentProfileGate />
      <ApartmentProfile
        currentPersonalAccount={currentPersonalAccount}
        individualDevices={individualDevices}
        isLoading={isLoading}
      />
    </>
  );
};
