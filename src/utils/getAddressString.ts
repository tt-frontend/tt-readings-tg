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

export const getFullAddressString = (address: Address | null) => {
  if (!address) return "";

  const corpusString = address.houseCorpus
    ? `корпус ${address.houseCorpus},`
    : null;

  return `${address.city}, улица ${address.street}, дом ${address.houseNumber}, ${
    corpusString || ""
  } квартира ${address.roomNumber}`;
};
