import { useUnit } from "effector-react";
import { filtersService } from "../filtersService";
import { AddPersonalNumberPage } from "./AddPersonalNumberPage";
import { addPersonalAccountNumberService } from "./addPersonalAccountNumber.model";

const {
  gates: { ExistingCitiesGate },
} = filtersService;

const {
  inputs,
  outputs,
  gates: { AddPersonalAccountNumberGate },
} = addPersonalAccountNumberService;

export const AddPersonalAccountNumberContainer = () => {
  const { existingCities, handleFindAccount, homeownerAccount, isLoading } =
    useUnit({
      existingCities: filtersService.outputs.$existingCities,
      handleFindAccount: inputs.handleFindAccount,
      homeownerAccount: outputs.$homeownerAccount,
      isLoading: outputs.$isLoading,
    });

  return (
    <>
      <AddPersonalAccountNumberGate />
      <ExistingCitiesGate />
      <AddPersonalNumberPage
        handleFindAccount={handleFindAccount}
        homeownerAccount={homeownerAccount}
        existingCities={existingCities}
        isLoading={isLoading}
      />
    </>
  );
};
