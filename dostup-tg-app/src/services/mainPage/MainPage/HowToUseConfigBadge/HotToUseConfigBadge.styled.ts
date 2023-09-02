import styled from "styled-components";

export const Wrapper = styled.div`
  background-color: #cbe9ff;
  padding: 16px;
  border-radius: 16px;
  display: grid;
  grid-template-columns: 30px 1fr 40px;
  gap: 16px;
  cursor: pointer;
`;

export const EmodjiWrapper = styled.div`
  width: 30px;
  height: 30px;
  background-color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 8px;
  font-size: 14px;
`;

export const ArrowWrapper = styled.div`
  width: 40px;
  height: 40px;
  background-color: #31a1f3;
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 24px;
`;
