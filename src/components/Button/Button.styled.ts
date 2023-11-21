import { Button as AntdButton } from "antd";
import { css, styled } from "styled-components";

const borderStyles = css`
  border: 1px solid #007aff !important;
  color: #007aff;
`;

export const Button = styled(AntdButton)`
  ${({ ghost }) => (ghost ? "" : "border: none !important;")}
  height: 48px;
  border-radius: 12px;
  font-size: 16px;
  font-weight: 500;
  ${({ type }) => type === "default" && borderStyles}
`;
