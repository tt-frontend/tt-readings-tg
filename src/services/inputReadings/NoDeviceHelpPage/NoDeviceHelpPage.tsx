import { FC, useCallback, useEffect } from "react";
import {
  ChevronWrapper,
  Wrapper,
  Text,
  Description,
  PhoneNumber,
} from "./NoDeviceHelpPage.styled";
import { Props } from "./NoDeviceHelpPage.types";
import { PhoneIcon } from "@/components/icons/Phone";
import { useNavigate } from "react-router-dom";
import { organizationInfoService } from "@/services/organizationInfo/organizationInfoService.models";
import { managementFirmDataQuery } from "@/services/organizationInfo/organizationInfoService.api";
import { useUnit } from "effector-react";

const {
  gates: { ManagementFirmGate },
} = organizationInfoService;

export const NoDeviceHelpPage: FC<Props> = () => {
  const navigate = useNavigate();

  const goBack = useCallback(() => navigate("/"), [navigate]);

  const managementInfo = useUnit(managementFirmDataQuery.$data);

  useEffect(() => {
    const btn = Telegram.WebApp.MainButton;

    btn.text = "Вернуться в главное меню";
    btn.show();
    btn.enable();
    btn.onClick(goBack);
    btn.color = "#007AFF";

    return () => {
      btn.offClick(goBack);
      btn.hide();
    };
  }, [goBack]);

  return (
    <>
      <ManagementFirmGate />
      <Wrapper>
        <ChevronWrapper>
          <PhoneIcon />
        </ChevronWrapper>
        <Text>Обратитесь в нашу службу поддержки!</Text>
        <Description>
          Позвоните нам для вызова контролера или добавления нового счетчика к
          расчету.
        </Description>
        <PhoneNumber>
          ☎️ Номер телефона {managementInfo?.phoneNumber || "—"}
        </PhoneNumber>
      </Wrapper>
    </>
  );
};
