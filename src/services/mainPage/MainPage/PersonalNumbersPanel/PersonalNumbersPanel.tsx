import { FC, useEffect, useState } from "react";
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
   handleDeleteHomeownerAccount,
   isDeletingHomeownerAccount,
   handleSuccessDelete,
}) => {
   const navigate = useNavigate();

   const [onMouseDownTime, setOnMouseDownTime] = useState<number | null>(null);

   const [longPressTimer, setLongPressTimer] = useState<NodeJS.Timeout | null>(
      null
   );

   const [id, setId] = useState<string | null>();

   const timeout = 500;

   useEffect(() => {
      handleSuccessDelete.watch(() => setId(null)).unsubscribe;
   }, [handleSuccessDelete]);

   return (
      <Wrapper>
         {personalNumbers.map((elem) => {
            const isOpen = id === elem.accountId;
            return (
               <Popconfirm
                  key={elem.accountId}
                  title="Вы хотите удалить лицевой счёт?"
                  open={isOpen}
                  onConfirm={() => handleDeleteHomeownerAccount(elem.accountId)}
                  okButtonProps={{ loading: isDeletingHomeownerAccount }}
                  onCancel={() => setId(null)}
                  cancelText="Отмена"
                  okText="Удалить"
               >
                  <PersonalNumber
                     key={elem.accountId}
                     isActive={elem.accountId === selectedNumber}
                     onMouseDown={(event) => {
                        const startTime = event.timeStamp;
                        setOnMouseDownTime(event.timeStamp);

                        setLongPressTimer(
                           setTimeout(() => {
                              if (Date.now() - startTime > timeout) {
                                 setId(elem.accountId);
                                 return;
                              }
                           }, timeout)
                        );
                     }}
                     onMouseUp={(event) => {
                        longPressTimer && clearTimeout(longPressTimer);

                        if (event.timeStamp - onMouseDownTime! < timeout) {
                           handleSelect(elem.accountId);
                        }
                     }}
                     onTouchStart={(event) => {
                        const startTime = event.timeStamp;
                        setOnMouseDownTime(event.timeStamp);

                        setLongPressTimer(
                           setTimeout(() => {
                              if (Date.now() - startTime > timeout) {
                                 setId(elem.accountId);
                                 return;
                              }
                           }, timeout)
                        );
                     }}
                     onTouchEnd={(event) => {
                        longPressTimer && clearTimeout(longPressTimer);

                        if (event.timeStamp - onMouseDownTime! < timeout) {
                           handleSelect(elem.accountId);
                        }
                     }}
                     onTouchCancel={() => setId(null)}
                  >
                     {elem.accountNumber}
                     {elem.accountId === selectedNumber && (
                        <CheckCircle>
                           <Check />
                        </CheckCircle>
                     )}
                  </PersonalNumber>
               </Popconfirm>
            );
         })}
         <AddPersonalNumberButton
            onClick={() => navigate("/addPersonalAccountNumber")}
         >
            <Plus /> Добавить лицевой счет
         </AddPersonalNumberButton>
      </Wrapper>
   );
};
