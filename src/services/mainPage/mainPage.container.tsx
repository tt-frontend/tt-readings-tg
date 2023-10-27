import { useUnit } from "effector-react";
import { MainPage } from "./MainPage";
import { personalNumbersAcccountsService } from "../personalNumberAccounts/personalNumberAccounts.model";
import { useEffect, useState } from "react";

export const MainPageContainer = () => {
  const [selectedPersonalNumber, setSelectedPersonalNumber] = useState<
    string | null
  >(null);
  const { homeownerAccounts } = useUnit({
    homeownerAccounts: personalNumbersAcccountsService.outputs.$personalNumbers,
  });

  useEffect(() => {
    if (!homeownerAccounts?.length) return;

    const defaultAcc = homeownerAccounts.find((elem) => elem.isDefault);

    if (defaultAcc) {
      setSelectedPersonalNumber(defaultAcc.accountId);

      return;
    }

    setSelectedPersonalNumber(homeownerAccounts[0].accountId);
  }, [homeownerAccounts]);

  return (
    <MainPage
      homeownerAccounts={homeownerAccounts}
      selectedPersonalNumber={selectedPersonalNumber}
      setSelectedPersonalNumber={setSelectedPersonalNumber}
    />
  );
};
