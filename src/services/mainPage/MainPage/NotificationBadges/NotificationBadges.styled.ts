import { Link } from "react-router-dom";
import styled from "styled-components";

export const AlertWrapper = styled(Link)`
  color: black;

  padding: 16px;
  background: #fff3f3;
  border: 1px solid #ed3b45;
  box-shadow: 0px 0px 8px 0px #0000000d;
  border-radius: 16px;

  display: flex;
  flex-direction: column;
  gap: 12px;
`;

export const AlertText = styled.div`
  font-size: 15px;
  font-weight: 400;
`;

export const AlertInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

export const DeviceInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  font-weight: 500;
`;
