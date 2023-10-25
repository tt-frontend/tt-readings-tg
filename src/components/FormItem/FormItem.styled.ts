import { styled } from "styled-components";
import FormItemAntd from "antd/es/form/FormItem";

export const FormItem = styled(FormItemAntd)`
  margin-bottom: 0;

  .ant-form-item-row {
    display: flex;
    flex-direction: column;
  }

  .ant-form-item-label {
    font-weight: 400;
    font-size: 15px;
    padding-bottom: 4px;
  }
`;
