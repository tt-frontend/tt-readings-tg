import { FC, useState } from "react";
import {
   AddPersonalNumberButton,
   CheckCircle,
   PersonalNumber,
   Wrapper,
} from "./PersonalNumbersPanel.styled";
import { PersonalNumbersPanelProps } from "./PersonalNumbersPanel.types";
import { Check } from "@/components/icons/Check";
import { Plus } from "@/components/icons/Plus";
import { useNavigate } from "react-router-dom";
import { Popconfirm } from "antd";

export const PersonalNumbersPanel: FC<PersonalNumbersPanelProps> = ({
   personalNumbers,
   selectedNumber,
   handleSelect,
}) => {
   const navigate = useNavigate();

   const [onMouseDownTime, setOnMouseDownTime] = useState<number | null>(null);

   // let longPressTimer: NodeJS.Timeout | null = null;

   const [longPressTimer, setLongPressTimer] = useState<NodeJS.Timeout | null>(
      null
   );

   const [open, setOpen] = useState<boolean>(false);

   return (
      <Wrapper>
         {personalNumbers.map((elem) => (
            <Popconfirm
               key={elem.accountId}
               title="Вы хотите удалить лицевой счёт?"
               // description="ВЫ хотите удалить лицевой счёт"
               open={open}
               onConfirm={() => {
                  setOpen(false);
                  console.log({ accountId: elem.accountId });
               }}
               // okButtonProps={{ loading: confirmLoading }}
               onCancel={() => setOpen(false)}
            >
               <PersonalNumber
                  key={elem.accountId}
                  isActive={elem.accountId === selectedNumber}
                  onMouseDown={(event) => {
                     const startTime = event.timeStamp;
                     setOnMouseDownTime(event.timeStamp);

                     const timeout = 1000;

                     setLongPressTimer(
                        setTimeout(() => {
                           if (Date.now() - startTime > timeout) {
                              console.log("long");
                              setOpen(true);
                              return;
                           }
                        }, timeout)
                     );
                  }}
                  onMouseUp={(event) => {
                     longPressTimer && clearTimeout(longPressTimer);

                     if (event.timeStamp - onMouseDownTime! < 1000) {
                        console.log("single shot");
                        handleSelect(elem.accountId);
                     }
                  }}
               >
                  {elem.accountNumber}
                  {elem.accountId === selectedNumber && (
                     <CheckCircle>
                        <Check />
                     </CheckCircle>
                  )}
               </PersonalNumber>
            </Popconfirm>
         ))}
         <AddPersonalNumberButton
            onClick={() => navigate("/addPersonalAccountNumber")}
         >
            <Plus /> Добавить лицевой счет
         </AddPersonalNumberButton>
      </Wrapper>
   );
};
