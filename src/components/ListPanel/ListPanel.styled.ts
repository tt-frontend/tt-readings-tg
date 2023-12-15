import styled from "styled-components";

export const Wrapper = styled.div`
  display: flex;
  padding: 16px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 12px;

  border-radius: 16px;
  background: #fff;
  box-shadow: 0px 0px 8px 0px rgba(0, 0, 0, 0.05);
`;

export const LineItem = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;

  color: #000;
  font-size: 15px;
  font-style: normal;
  font-weight: 600;
  line-height: 20px;

  .list-item-key {
    font-weight: 400;
  }
`;

export const Line = styled.div`
  height: 1px;
  width: 100%;
  background-color: #f3f5f6;
`;
