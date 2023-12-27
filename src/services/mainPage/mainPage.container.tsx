import { useUnit } from "effector-react";
import { MainPage } from "./MainPage";
import { personalNumbersAcccountsService } from "../personalNumberAccounts/personalNumberAccounts.model";

export const MainPageContainer = () => {
   const {
      homeownerAccounts,
      handleSelectHomeownerAccount,
      selectedHomeownerAccountId,
      currentHomeownerAccount,
      isLoadingHomeownerAccount,
      handleDeleteHomeownerAccount,
   } = useUnit({
      homeownerAccounts:
         personalNumbersAcccountsService.outputs.$personalNumbers,
      handleSelectHomeownerAccount:
         personalNumbersAcccountsService.inputs.handleSelectHomeownerAccount,
      selectedHomeownerAccountId:
         personalNumbersAcccountsService.outputs.$selectedHomeownerAccountId,
      currentHomeownerAccount:
         personalNumbersAcccountsService.outputs.$currentHomeownerAccount,
      isLoadingHomeownerAccount:
         personalNumbersAcccountsService.outputs.$isLoadingHomeownerAccount,
      handleDeleteHomeownerAccount:
         personalNumbersAcccountsService.inputs.handleDeleteHomeownerAccount,
   });

   return (
      <MainPage
         homeownerAccounts={homeownerAccounts}
         selectedPersonalNumber={selectedHomeownerAccountId}
         setSelectedPersonalNumber={handleSelectHomeownerAccount}
         currentHomeownerAccount={currentHomeownerAccount}
         isLoadingHomeownerAccount={isLoadingHomeownerAccount}
         handleDeleteHomeownerAccount={handleDeleteHomeownerAccount}
      />
   );
};
