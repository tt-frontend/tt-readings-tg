import axios from "axios";

export const getExistingCities = (): Promise<string[]> => axios.get("Filters/Cities");
