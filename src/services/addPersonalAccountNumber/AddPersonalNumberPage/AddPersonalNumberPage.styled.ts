import { Select } from "antd";
import { styled } from "styled-components";

export const PageWrapper = styled.div`
   display: flex;
   align-items: center;
   justify-content: center;
   height: 90vh;
`;

export const WindowWrapper = styled.div`
   width: 100%;
   background-color: rgba(24, 158, 233, 0.16);
   border-radius: 16px;
   padding: 16px;
   display: flex;
   flex-direction: column;
   gap: 16px;
`;

export const Title = styled.div`
   color: #000;
   font-size: 20px;
   font-style: normal;
   font-weight: 600;
   line-height: 24px;
`;

export const ButtonsWrapper = styled.div`
   display: flex;
   flex-direction: column;
   gap: 8px;
`;

export const Description = styled.div`
   color: #000;
   font-size: 15px;
   font-style: normal;
   font-weight: 400;
   line-height: 20px;
   margin-top: 4px;
`;

export const SelectSc = styled(Select)`
`;
