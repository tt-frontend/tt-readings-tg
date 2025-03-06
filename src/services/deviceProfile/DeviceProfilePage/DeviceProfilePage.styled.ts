import styled from "styled-components";

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

export const SubWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const ResourceWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

export const Title = styled.div`
  color: #000;
  font-size: 20px;
  font-style: normal;
  font-weight: 600;
  line-height: 24px;
`;

export const SubTitle = styled(Title)`
  font-size: 15px;
`;

export const YearsWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;

  width: 100%;
  overflow: scroll;
`;

export const YearItem = styled.div<{ isActive: boolean }>`
  height: 40px;
  min-width: 80px;
  gap: 4px;
  border-radius: 8px;
  border-width: 1px;

  border: 1px solid ${({ isActive }) => (isActive ? `#189ee9` : "#DCDEE4")};
  transition: 0.2s;

  display: flex;
  align-items: center;
  justify-content: center;

  font-weight: ${({ isActive }) => (isActive ? 600 : 400)};
  font-size: 14px;
`;
