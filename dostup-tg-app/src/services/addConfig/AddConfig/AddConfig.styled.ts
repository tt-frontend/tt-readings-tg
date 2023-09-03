import { Input } from "@nextui-org/react";
import { styled } from "styled-components";

export const Wrapper = styled.div`
  position: relative;
`;

export const InputSC = styled(Input)`
  input {
    background-color: transparent !important;
    font-weight: 600;
  }
`;

export const ButtonWrapper = styled.div`
  margin-top: 16px;

  * {
    color: white !important;
    font-weight: bold !important;
  }
`;
