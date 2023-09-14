import { LinkInfoPanel } from "@/components/LinkInfoPanel";
import { Building } from "@/components/icons/Building";
import { Bag } from "@/components/icons/Bag";
import {
  ActionsTitle,
  ActionsWrapper,
  InfoLinksWrapper,
  Wrapper,
} from "./MainPage.styled";
import { PersonalNumbersPanel } from "./PersonalNumbersPanel/PersonalNumbersPanel";
import { useState } from "react";
import { ActionLink } from "@/components/ActionLink";

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
      <ActionsTitle>Что вы хотите сделать?</ActionsTitle>
      <ActionsWrapper>
        <ActionLink title="Ввести показания счетчиков" />
        <ActionLink title="Отправить заявку на опломбировку" />
        <ActionLink title="Отправить заявку на проверку" />
        <ActionLink
          title="Заявить о проблеме"
          description="Если прорвало трубу, перегорела лампочка или нет электричества"
        />
      </ActionsWrapper>
    </Wrapper>
  );
};
