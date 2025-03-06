import styled from "styled-components";

export const Wrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  width: 100%;
  overflow: scroll;
`;

export const ResourceItem = styled.div<{ active: boolean }>`
  height: 40px;
  border-radius: 8px;
  padding: 0 8px;
  border: 1px solid ${({ active }) => (active ? "#189ee9" : "#DCDEE4")};
  background: #ffffff;
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;

  font-weight: ${({ active }) => (active ? 600 : 300)};
  transition: 0.2s;

  * {
    white-space: nowrap;
  }
`;
