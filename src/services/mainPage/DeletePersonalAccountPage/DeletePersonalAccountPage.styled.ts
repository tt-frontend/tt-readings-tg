import styled from "styled-components";

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 96dvh;
`;

export const ButtonsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export const ErrorMessageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 18px;
  justify-content: center;
  align-items: center;
`;

export const ErrorMessage = styled.div`
  font-weight: 400;
  font-size: 14px;
  width: 343px;
  text-align: center;
  line-height: 20px;
  color: #000000;
`;

export const ErrorTitle = styled.div`
  font-weight: 500;
  font-size: 20px;
  text-align: center;
`;

export const ChevronWrapper = styled.div`
  width: 80px;
  height: 80px;
  border-radius: 80px;
  border: 2px solid #fc525b;

  display: flex;
  justify-content: center;
  align-items: center;
`;
