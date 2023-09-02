import { X } from "react-bootstrap-icons";
import { styled } from "styled-components";

export const SlideWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 16px;
  width: 100%;
  height: auto;
  position: relative;
`;

export const SlideImg = styled.img`
  width: auto;
  height: 70vh;
`;

export const CurrentSlideIndex = styled.div`
  position: absolute;
  left: calc(50% - 25px);
  bottom: -25px;
  border-radius: 14px;
  border: 4px solid #0094ff;
  background: #fff;
  box-shadow: 0px 4px 24px 0px rgba(0, 148, 255, 0.3);
  width: 50px;
  height: 50px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 2px;
`;

export const SlideIndexText = styled.div`
  color: #0094ff;
  font-family: Montserrat;
  font-size: 22px;
  font-style: normal;
  font-weight: 800;
  line-height: 16px; /* 72.727% */
  margin-top: 4px;
`;

export const SlideIndexStep = styled.div`
  color: #0094ff;
  font-family: Montserrat;
  font-size: 10px;
  font-style: normal;
  font-weight: 800;
  line-height: 16px; /* 160% */
`;

export const XSc = styled(X)`
  font-size: 40px;
  color: #0094ff;
  cursor: pointer;
`;

export const SlideArrow = styled.div<{ pos: "left" | "right" }>`
  position: absolute;
  ${({ pos }) => (pos === "right" ? `right: 0px;` : `left: 0px;`)}
  top: calc(50% - 25px);
  width: 50px;
  height: 50px;
  flex-shrink: 0;
  border-radius: 16px;
  background: #0094ff;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 32px;
  cursor: pointer;
`;
