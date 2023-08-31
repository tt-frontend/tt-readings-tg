import { ArrowRightCircleIcon } from "@/components/icons/ArrowRightCircleIcon";
import {
  BillCount,
  BillDescription,
  BillInfoWrapper,
  TrafficContent,
  Wrapper,
} from "./BuillInfo.styled";

export const BillInfo = () => {
  return (
    <Wrapper>
      <BillInfoWrapper>
        <div>
          <BillCount>230₽</BillCount>
          <BillDescription>
            <ArrowRightCircleIcon /> баланс
          </BillDescription>
        </div>
      </BillInfoWrapper>
      <TrafficContent>
        <BillCount>321.3 gb </BillCount>
        <BillDescription>трафик за март</BillDescription>
      </TrafficContent>
    </Wrapper>
  );
};
