import { Select as AntdSelect } from "antd";
import { styled } from "styled-components";

type AntdSelectType = typeof AntdSelect;

export const Select: AntdSelectType = styled(AntdSelect)`
  width: 100%;
  height: 48px;

  * {
    border: none !important;
  }
`;
