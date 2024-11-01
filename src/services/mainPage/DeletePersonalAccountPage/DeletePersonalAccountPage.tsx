import { FC, useEffect } from "react";
import {
  ButtonsWrapper,
  ChevronWrapper,
  ErrorMessage,
  ErrorMessageWrapper,
  ErrorTitle,
  Wrapper,
} from "./DeletePersonalAccountPage.styled";
import { Props } from "./DeletePersonalAccountPage.types";
import { TrashIcon } from "@/components/icons/Trash";
import { Button } from "@/components/Button";
import { useNavigate } from "react-router-dom";
import { useUnit } from "effector-react";
import { personalNumbersAcccountsService } from "@/services/personalNumberAccounts/personalNumberAccounts.model";

const { handleRedirectToInitialRoute } = personalNumbersAcccountsService.inputs;

export const DeletePersonalAccountPage: FC<Props> = () => {
  const navigate = useNavigate();
  const { handleDelete, currentCccount } = useUnit({
    handleDelete:
      personalNumbersAcccountsService.inputs.handleDeleteHomeownerAccount,
    currentCccount:
      personalNumbersAcccountsService.outputs.$currentHomeownerAccount,
  });

  useEffect(() => {
    return handleRedirectToInitialRoute.watch(() => {
      navigate("/addPersonalAccountNumberInitial");
    }).unsubscribe;
  }, [navigate]);

  return (
    <Wrapper>
      <div />
      <ErrorMessageWrapper>
        <ChevronWrapper>
          <TrashIcon />
        </ChevronWrapper>
        <ErrorTitle>Вы уверены, что хотите удалить лицевой счет? </ErrorTitle>
        <ErrorMessage>
          В этом случае вы не сможете управлять своим лицевым счетом через
          Telegram-приложении. Лицевой счет можно добавить обратно в любой
          момент.
        </ErrorMessage>
      </ErrorMessageWrapper>
      <ButtonsWrapper>
        <Button
          danger
          type="primary"
          block
          onClick={() => {
            if (!currentCccount) return;

            handleDelete(currentCccount.accountId);
            navigate("/");
          }}
        >
          Удалить лицевой счет
        </Button>
        <Button type="default" block onClick={() => navigate("/")}>
          Отмена
        </Button>
      </ButtonsWrapper>
    </Wrapper>
  );
};
