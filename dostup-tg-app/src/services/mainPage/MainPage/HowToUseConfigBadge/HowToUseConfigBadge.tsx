import { useNavigate } from "react-router-dom";
import {
  ArrowWrapper,
  EmodjiWrapper,
  Wrapper,
} from "./HotToUseConfigBadge.styled";
import { ArrowRightCircleFill } from "react-bootstrap-icons";

export const HowToUseConfigBadge = () => {
  const navigate = useNavigate();

  return (
    <Wrapper onClick={() => navigate("/howToUse")}>
      <EmodjiWrapper>💡</EmodjiWrapper>
      <div>
        <div className="font-semibold text-darkBlue mt-1">
          Как использовать конфиг?
        </div>
        <div className="font-regular text-darkBlue text-xs mt-1">
          Мы используем WireGuard для подключения
        </div>
      </div>
      <div className="flex items-center">
        <ArrowWrapper>
          <ArrowRightCircleFill />
        </ArrowWrapper>
      </div>
    </Wrapper>
  );
};
