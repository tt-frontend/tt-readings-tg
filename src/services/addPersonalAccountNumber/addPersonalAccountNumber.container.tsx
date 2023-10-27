import { useUnit } from "effector-react";
import { filtersService } from "../filtersService";
import { AddPersonalNumberPage } from "./AddPersonalNumberPage";

const {
  gates: { ExistingCitiesGate },
} = filtersService;

export const AddPersonalAccountNumberContainer = () => {
  const { existingCities } = useUnit({
    existingCities: filtersService.outputs.$existingCities,
  });

  return (
    <>
      <ExistingCitiesGate />
      <AddPersonalNumberPage existingCities={existingCities} />
    </>
  );
};
