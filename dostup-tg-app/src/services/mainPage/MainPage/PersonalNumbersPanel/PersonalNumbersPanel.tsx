import { FC } from "react";
import {
  AddPersonalNumberButton,
  CheckCircle,
  PersonalNumber,
  Wrapper,
} from "./PersonalNumbersPanel.styled";
import { PersonalNumbersPanelProps } from "./PersonalNumbersPanel.types";
import { Check } from "@/components/icons/Check";
import { Plus } from "@/components/icons/Plus";

export const PersonalNumbersPanel: FC<PersonalNumbersPanelProps> = ({
  personalNumbers,
  selectedNumber,
  handleSelect,
}) => {
  return (
    <Wrapper>
      {personalNumbers.map((elem) => (
        <PersonalNumber
          onClick={() => handleSelect(elem.id)}
          key={elem.id}
          isActive={elem.id === selectedNumber}
        >
          {elem.number}
          {elem.id === selectedNumber && (
            <CheckCircle>
              <Check />
            </CheckCircle>
          )}
        </PersonalNumber>
      ))}
      <AddPersonalNumberButton>
        <Plus /> Добавить лицевой счет
      </AddPersonalNumberButton>
    </Wrapper>
  );
};
