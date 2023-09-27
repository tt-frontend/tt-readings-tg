import { Link } from "react-router-dom";
import styled from "styled-components";

export const Wrapper = styled(Link)`
  border-radius: 16px;
  background: #fff;
  box-shadow: 0px 0px 8px 0px rgba(0, 0, 0, 0.05);
  display: flex;
  padding: 16px;
  gap: 12px;
  cursor: pointer;
`;

export const Title = styled.div`
  margin-top: 4px;
  width: 100%;
  color: #000;
  font-size: 15px;
  font-style: normal;
  font-weight: 400;
  line-height: 20px;
  letter-spacing: -0.4px;
`;

export const Description = styled.div`
  margin-top: 4px;
  color: #000000;
  opacity: 0.5;
  font-size: 13px;
  font-style: normal;
  font-weight: 400;
  line-height: 17px; /* 130.769% */
  letter-spacing: -0.408px;
`;

export const ChevronWrapper = styled.div`
  height: 28px;
  min-width: 28px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 24px;
  background: #007aff;
`;
