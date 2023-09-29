import styled from "styled-components";

export const IconWrapper = styled.div<{ color: string }>`
  background-color: ${({ color }) => color};
  height: 24px;
  width: 24px;
  max-width: 24px;
  border-radius: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
`;
