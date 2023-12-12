import styled, { css } from "styled-components";

export const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const inputErrorStyles = css`
  border-color: #fc525b;
  background-color: #fff2f3;
`;

const inputWarningStyles = css`
  border-color: #fca452;
  background-color: #fff0e3;
`;

export const Input = styled.input<{ error?: "critical" | "warning" }>`
  outline: none;
  width: calc(100% - 20px);
  border-radius: 8px;
  border: none;
  background-color: #f3f5f6;
  border: 1px solid #f3f5f6;
  padding: 16px 10px;
  font-size: 16px;
  transition: 0.2s;

  ${({ error }) => error === "critical" && inputErrorStyles}
  ${({ error }) => error === "warning" && inputWarningStyles}
`;

export const LastReading = styled.div`
  width: 100%;
  color: var(--label-color-light-primary, #000);
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 16px;
  letter-spacing: -0.4px;
`;

export const DeviceReadingsInfoWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;

export const ReadingsConsumption = styled.div`
  font-weight: 500;
  font-size: 14px;
  white-space: nowrap;
`;

export const ErrorMessage = styled.div<{ errorType: "critical" | "warning" }>`
  color: ${({ errorType }) =>
    errorType === "warning" ? "#fca452" : "#fc525b"};
  font-size: 12px;
  font-style: normal;
  font-weight: 500;
  line-height: 16px;
`;

export const ReadingMonth = styled.span`
  opacity: 0.5;
  margin-right: 8px;
`;
