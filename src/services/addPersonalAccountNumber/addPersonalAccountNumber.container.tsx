import { useUnit } from "effector-react";
import { filtersService } from "../filtersService";
import { AddPersonalNumberPage } from "./AddPersonalNumberPage";
import { addPersonalAccountNumberService } from "./addPersonalAccountNumber.model";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const {
  gates: { ExistingCitiesGate },
} = filtersService;

const {
  inputs,
  outputs,
  gates: { AddPersonalAccountNumberGate },
} = addPersonalAccountNumberService;

export const AddPersonalAccountNumberContainer = () => {
  const {
    existingCities,
    handleFindAccount,
    homeownerAccount,
    isLoading,
    handleLinkAccount,
  } = useUnit({
    existingCities: filtersService.outputs.$existingCities,
    handleFindAccount: inputs.handleFindAccount,
    handleLinkAccount: inputs.handleLinkAccount,
    homeownerAccount: outputs.$homeownerAccount,
    isLoading: outputs.$isLoading,
  });

  const navigate = useNavigate();

  useEffect(() => {
    return inputs.handleSuccessLink.watch(() => navigate("/")).unsubscribe;
  }, [navigate]);

  return (
    <>
      <AddPersonalAccountNumberGate />
      <ExistingCitiesGate />
      <AddPersonalNumberPage
        handleFindAccount={handleFindAccount}
        homeownerAccount={homeownerAccount}
        existingCities={existingCities}
        isLoading={isLoading}
        handleLinkAccount={handleLinkAccount}
      />
    </>
  );
};
