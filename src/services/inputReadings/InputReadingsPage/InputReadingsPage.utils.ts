import {
   EIndividualDeviceRateType,
   IndividualDeviceForReadingResponse,
} from "@/api/types";

export const getNumberOfFirstInputInBlockOfList = (
   devicesArrSplitted: IndividualDeviceForReadingResponse[]
): number =>
   devicesArrSplitted.reduce((numberInList, device) => {
      if (device.rateType === EIndividualDeviceRateType.OneZone) {
         return numberInList + 1;
      }
      if (device.rateType === EIndividualDeviceRateType.TwoZone) {
         return numberInList + 2;
      }
      if (device.rateType === EIndividualDeviceRateType.ThreeZone) {
         return numberInList + 3;
      }

      return numberInList;
   }, 1);
