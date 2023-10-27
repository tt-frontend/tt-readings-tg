import { createEffect, createStore, sample } from "effector";
import { getExistingCities } from "./filtersService.api";
import { createGate } from "effector-react";

const ExistingCitiesGate = createGate();

const fetchExistingCitiesFx = createEffect(getExistingCities);

const $existingCities = createStore<string[] | null>(null).on(
  fetchExistingCitiesFx.doneData,
  (_, cities) => cities
);

sample({ clock: ExistingCitiesGate.open, target: fetchExistingCitiesFx });

export const filtersService = {
  outputs: { $existingCities },
  gates: { ExistingCitiesGate },
};
