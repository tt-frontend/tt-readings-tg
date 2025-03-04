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
