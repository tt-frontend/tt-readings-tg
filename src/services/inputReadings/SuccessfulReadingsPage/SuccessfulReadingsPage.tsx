import { FC, useCallback, useEffect } from "react";
import { SuccessChevron } from "@/components/icons/SuccessChevron";
import { ChevronWrapper, Wrapper, Text } from "./SuccessfulReadingsPage.styled";
import { useNavigate } from "react-router-dom";

export const SuccessfulReadingsPage: FC = () => {
  const navigate = useNavigate();

  const goBack = useCallback(() => navigate("/"), [navigate]);

  useEffect(() => {
    const btn = Telegram.WebApp.MainButton;

    btn.text = "Вернуться в главное меню";
    btn.color = "#007AFF";
    btn.show();
    btn.onClick(goBack);

    return () => {
      btn.offClick(goBack);
      btn.hide();
    };
  }, [goBack]);

  return (
    <Wrapper>
      <ChevronWrapper>
        <SuccessChevron />
      </ChevronWrapper>
      <Text>Спасибо, ваши показания учтены!</Text>
    </Wrapper>
  );
};
