import { styled } from "styled-components";

export const Wrapper = styled.div`
  width: 100%;
  height: 100px;
  border-radius: 16px;
  background: linear-gradient(-69deg, #0068b4 0%, #3aacff 99.06%);
  padding: 6px;
  display: grid;
  align-items: center;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
`;

export const BillInfoWrapper = styled.div`
  height: 100%;
  background: var(--dark-blue);
  display: flex;
  align-items: center;
  border-radius: 12px;
  padding-left: 12px;
  cursor: pointer;
`;

export const BillCount = styled.div`
  color: #fff;
  font-size: 36px;
  line-height: 42px;
  font-weight: 800;
`;

export const BillDescription = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  color: #bce3ff;
  font-size: 14px;
  font-weight: 500;
`;

export const TrafficContent = styled.div``;
