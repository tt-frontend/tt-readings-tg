import { Address } from "@/api/types";

export const getAddressString = (address: Address | null) => {
  if (!address) return "";

  const corpusString = address.houseCorpus
    ? `корпус ${address.houseCorpus},`
    : null;

  return `${address.city}, ул. ${address.street}, д. ${address.houseNumber}, ${
    corpusString || ""
  } кв. ${address.roomNumber}`;
};
