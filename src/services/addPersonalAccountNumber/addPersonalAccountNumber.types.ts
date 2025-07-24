export type FindHomeownerAccountRequest = {
  City: string;
  AccountNumber: string;
  ApartmentNumber: string;
};

export type AddAccRequest = {
  accId: string;
  enableNotifications?: boolean;
}