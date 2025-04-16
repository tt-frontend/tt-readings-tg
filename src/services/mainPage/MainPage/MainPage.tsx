import { LinkInfoPanel } from "@/components/LinkInfoPanel";
import { Building } from "@/components/icons/Building";
import { Bag } from "@/components/icons/Bag";
import {
  ActionsTitle,
  ActionsWrapper,
  DividerSC,
  InfoLinksWrapper,
  LongSkeleton,
  Wrapper,
} from "./MainPage.styled";
import { PersonalNumbersPanel } from "./PersonalNumbersPanel/PersonalNumbersPanel";
import { ActionLink } from "@/components/ActionLink";
import { FC, useEffect } from "react";
import { MainPageProps } from "./MainPage.types";
import { getAddressString } from "@/utils/getAddressString";
import { Skeleton } from "antd";
import { useNavigate } from "react-router-dom";
import { NotificationBadges } from "./NotificationBadges";
import { ResourceDisconnectAlert } from "./NotificationBadges/NotificationBadges";

export const MainPage: FC<MainPageProps> = ({
  selectedPersonalNumber,
  setSelectedPersonalNumber,
  homeownerAccounts,
  currentHomeownerAccount,
  isLoadingHomeownerAccount,
  handleDeleteHomeownerAccount,
  isDeletingHomeownerAccount,
  handleSuccessDelete,
  handleRedirectToInitialRoute,
  individualDevices,
  notifications,
}) => {
  const navigate = useNavigate();

  useEffect(() => {
    return handleRedirectToInitialRoute.watch(() => {
      navigate("/addPersonalAccountNumberInitial");
    }).unsubscribe;
  }, [handleRedirectToInitialRoute, navigate]);

  return (
    <Wrapper>
      <PersonalNumbersPanel
        selectedNumber={selectedPersonalNumber}
        handleSelect={setSelectedPersonalNumber}
        personalNumbers={homeownerAccounts || []}
        handleDeleteHomeownerAccount={handleDeleteHomeownerAccount}
        isDeletingHomeownerAccount={isDeletingHomeownerAccount}
        handleSuccessDelete={handleSuccessDelete}
      />
      <NotificationBadges individualDevices={individualDevices} />
      {notifications?.resourceDisconnectingList?.map((notification) => (
        <ResourceDisconnectAlert notification={notification} />
      ))}
      {currentHomeownerAccount && (
        <>
          <InfoLinksWrapper>
            <LinkInfoPanel
              icon={<Building />}
              title={getAddressString(currentHomeownerAccount.address)}
              loader={{
                state: isLoadingHomeownerAccount,
                view: <LongSkeleton active />,
              }}
              link="/apartment"
            />
            <LinkInfoPanel
              icon={<Bag />}
              title={
                currentHomeownerAccount.managementFirmTitle || "Нет данных"
              }
              link="/managementFirm"
              loader={{
                state: isLoadingHomeownerAccount,
                view: <Skeleton.Input active />,
              }}
            />
          </InfoLinksWrapper>
          <ActionsTitle>Что вы хотите сделать?</ActionsTitle>
          <ActionsWrapper>
            <ActionLink
              title="Ввести показания счетчиков"
              path="/inputReadings"
            />
            <DividerSC />
            <ActionLink
              title="Удалить лицевой счет"
              description="Лицевой счет будет удален из вашего акаунта в Telegram-приложении"
              path="/deleteAccount"
            />
          </ActionsWrapper>
        </>
      )}
    </Wrapper>
  );
};
