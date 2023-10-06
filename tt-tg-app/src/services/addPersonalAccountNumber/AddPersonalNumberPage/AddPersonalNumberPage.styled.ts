import { styled } from "styled-components";

export const PageWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
`;

export const WindowWrapper = styled.div`
  width: 100%;
  background-color: rgba(24, 158, 233, 0.16);
  border-radius: 16px;
  padding: 16px;
`;

export const Title = styled.div`
  color: #000;
  font-size: 20px;
  font-style: normal;
  font-weight: 600;
  line-height: 24px;
`;

export const Select = styled.select`
  margin-top: 16px;
  width: 100%;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  padding: 16px;
  outline: none;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  background-color: white;
  color: black;
`;
