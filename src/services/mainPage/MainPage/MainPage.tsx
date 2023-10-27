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
import { getAddressString } from "@/utils/getAddressString";
import { Skeleton } from "antd";

export const MainPage: FC<MainPageProps> = ({
  selectedPersonalNumber,
  setSelectedPersonalNumber,
  homeownerAccounts,
  currentHomeownerAccount,
  isLoadingHomeownerAccount,
}) => {
  return (
    <Wrapper>
      <PersonalNumbersPanel
        selectedNumber={selectedPersonalNumber}
        handleSelect={setSelectedPersonalNumber}
        personalNumbers={homeownerAccounts || []}
      />
      {isLoadingHomeownerAccount && <Skeleton active />}
      {currentHomeownerAccount && !isLoadingHomeownerAccount && (
        <>
          <InfoLinksWrapper>
            <LinkInfoPanel
              icon={<Building />}
              title={getAddressString(currentHomeownerAccount.address)}
            />
            <LinkInfoPanel
              icon={<Bag />}
              title={
                currentHomeownerAccount.managementFirmTitle || "Нет данных"
              }
            />
          </InfoLinksWrapper>
          <ActionsTitle>Что вы хотите сделать?</ActionsTitle>
          <ActionsWrapper>
            <ActionLink
              title="Ввести показания счетчиков"
              path="/inputReadings"
            />
            <ActionLink title="Отправить заявку на опломбировку" path="" />
            <ActionLink title="Отправить заявку на проверку" path="" />
            <ActionLink
              title="Заявить о проблеме"
              description="Если прорвало трубу, перегорела лампочка или нет электричества"
              path=""
            />
          </ActionsWrapper>
        </>
      )}
    </Wrapper>
  );
};
