import { LinkInfoPanel } from "@/components/LinkInfoPanel";
import { Building } from "@/components/icons/Building";
import { Bag } from "@/components/icons/Bag";
import { InfoLinksWrapper, Wrapper } from "./MainPage.styled";
import { PersonalNumbersPanel } from "./PersonalNumbersPanel/PersonalNumbersPanel";
import { useState } from "react";

export const MainPage = () => {
  const [selectedPersonalNumber, setSelectedPersonalNumber] = useState(1);

  return (
    <Wrapper>
      <PersonalNumbersPanel
        selectedNumber={selectedPersonalNumber}
        handleSelect={setSelectedPersonalNumber}
        personalNumbers={[
          {
            id: 1,
            number: "1298391381",
          },
          {
            id: 2,
            number: "72834792320",
          },
        ]}
      />
      <InfoLinksWrapper>
        <LinkInfoPanel
          icon={<Building />}
          title="Санкт-Петербург, улица Чайковского, дом 79, квартира 75"
        />
        <LinkInfoPanel icon={<Bag />} title="УК “Добрый дом”" />
      </InfoLinksWrapper>
    </Wrapper>
  );
};
