import { FC } from "react";
import {
  ChevronWrapper,
  Wrapper,
  Text,
  Description,
  ButtonsWrapper,
} from "./ConfirmExitFromReadingsPage.styled";
import { Props } from "./ConfirmExitFromReadingsPage.types";
import { useNavigate } from "react-router-dom";
import { QuestionMark } from "@/components/icons/QuestionMark";
import { Button } from "@/components/Button";
import { useUnit } from "effector-react";
import { inputReadingsService } from "../inputReadingsService.model";

export const ConfirmExitFromReadingsPage: FC<Props> = () => {
  const navigate = useNavigate();

  const { setIsShowConfirmPage } = useUnit({
    setIsShowConfirmPage: inputReadingsService.inputs.setIsShowConfirmPage,
  });

  return (
    <Wrapper>
      <ChevronWrapper>
        <QuestionMark />
      </ChevronWrapper>
      <Text>Вы уверены, что хотите прервать ввод показаний? </Text>
      <Description>
        В этом случае показания по приборам не будут сохранены.
      </Description>
      <ButtonsWrapper>
        <Button
          onClick={() => setIsShowConfirmPage(false)}
          type="primary"
          block
        >
          Вернуться к вводу показаний
        </Button>
        <Button
          onClick={() => {
            navigate("/");
          }}
          type="default"
          block
        >
          Все равно выйти
        </Button>
      </ButtonsWrapper>
    </Wrapper>
  );
};
