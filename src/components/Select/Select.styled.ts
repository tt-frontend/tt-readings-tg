import { Select as AntdSelect } from "antd";
import { styled } from "styled-components";

type AntdSelectType = typeof AntdSelect;

export const Select: AntdSelectType = styled(AntdSelect)`
   width: 100%;
   height: 48px;

   * {
      border: none !important;
   }

   .ant-select-selection-search-input {
      width: 100% !important;
      height: 48px !important;
   }
`;
