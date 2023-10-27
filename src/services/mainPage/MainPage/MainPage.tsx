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
import { ActionLink } from "@/components/ActionLink";
import { FC } from "react";
import { MainPageProps } from "./MainPage.types";

export const MainPage: FC<MainPageProps> = ({
  selectedPersonalNumber,
  setSelectedPersonalNumber,
  homeownerAccounts,
}) => {
  return (
    <Wrapper>
      <PersonalNumbersPanel
        selectedNumber={selectedPersonalNumber}
        handleSelect={setSelectedPersonalNumber}
        personalNumbers={homeownerAccounts || []}
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
        <ActionLink title="Ввести показания счетчиков" path="/inputReadings" />
        <ActionLink title="Отправить заявку на опломбировку" path="" />
        <ActionLink title="Отправить заявку на проверку" path="" />
        <ActionLink
          title="Заявить о проблеме"
          description="Если прорвало трубу, перегорела лампочка или нет электричества"
          path=""
        />
      </ActionsWrapper>
    </Wrapper>
  );
};
